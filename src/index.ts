/**
 * Core highlighting engine.
 * - Defines token / theme interfaces
 * - Provides pluggable language & output handler registries
 * - Real language support is expected to come from generated ANTLR lexers
 *   (see register-antlr.ts). Legacy inline regex tokenizers have been removed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getDirname } from './utils/dirname.js';
import { getAssetPath } from './utils/assets.js';
import { ANSI_DEFAULT_CONFIG, HTML_DEFAULT_CONFIG, HTML_THEME, ANSI_THEME } from './config/embedded.js';
import { isHexColor, createColorTokenHtml, hexToClosestAnsi } from './utils/color-utils.js';

// Use embedded configuration for standalone executables, fallback to files for development
let ansiDefault: any, htmlDefault: any, htmlTheme: any, ansiTheme: any;

try {
  // Try to load from files first (for development/testing)
  if ((process as any).pkg) {
    // In pkg bundle, use embedded config
    ansiDefault = ANSI_DEFAULT_CONFIG;
    htmlDefault = HTML_DEFAULT_CONFIG;
    htmlTheme = HTML_THEME;
    ansiTheme = ANSI_THEME;
  } else {
    // Normal execution, try to load from files
    ansiDefault = JSON.parse(fs.readFileSync(getAssetPath('./handlers/ansi.config.json'), 'utf-8'));
    htmlDefault = JSON.parse(fs.readFileSync(getAssetPath('./handlers/html.config.json'), 'utf-8'));
    htmlTheme = JSON.parse(fs.readFileSync(getAssetPath('./themes/html.theme.json'), 'utf-8'));
    ansiTheme = JSON.parse(fs.readFileSync(getAssetPath('./themes/ansi.theme.json'), 'utf-8'));
  }
} catch (error) {
  // Fallback to embedded config if files can't be loaded
  ansiDefault = ANSI_DEFAULT_CONFIG;
  htmlDefault = HTML_DEFAULT_CONFIG;
  htmlTheme = HTML_THEME;
  ansiTheme = ANSI_THEME;
}
// (File system utilities no longer needed here after removing regex grammar loader.)

export interface Token {
  type: string;
  value: string;
}

// Enhanced token with position information for JSON export
// For complete type definitions, see: src/types/token-analysis.d.ts
// For JSON schema validation, see: schemas/token-analysis.json
export interface EnhancedToken extends Token {
  position: {
    start: number;
    end: number;
    line: number;
    column: number;
  };
}

// JSON export format for token analysis
export interface TokenAnalysis {
  metadata: {
    language: string;
    totalTokens: number;
    totalLines: number;
    totalCharacters: number;
    timestamp: string;
  };
  tokens: EnhancedToken[];
  statistics: {
    tokenTypes: Record<string, number>;
    averageTokenLength: number;
    longestToken: { type: string; value: string; length: number };
  };
}

export interface ThemeStyle {
  color?: string; // hex or ansi name (we'll map)
  fontStyle?: 'bold' | 'italic' | 'underline' | 'dim';
}

export interface ThemeDefinition {
  [tokenType: string]: ThemeStyle;
}

export interface HighlightOptions {
  theme?: ThemeDefinition;
  html?: boolean; // output HTML instead of ANSI if true
  language?: string; // specify the language for tokenization
  block?: boolean; // when html: wrap in <pre><code>
  fullDocument?: boolean; // when html: produce full HTML document
  title?: string; // used if fullDocument
  output?: string; // explicit output handler id (e.g., 'ansi','html')
  handlerConfig?: Record<string, any>; // custom per-handler config
  /** Enable rainbow bracket/brace/paren nesting coloration (default: true) */
  bracketNesting?: boolean;
  /** Override HTML color palette for bracket depths (array cycled). */
  bracketPaletteHtml?: string[];
  /** Override ANSI escape palette for bracket depths (array cycled). */
  bracketPaletteAnsi?: string[];
}

// Base themes now per output type; we pick one later (ansi vs html) and then merge user overrides.
const htmlBaseTheme: ThemeDefinition = htmlTheme as ThemeDefinition;
const ansiBaseTheme: ThemeDefinition = ansiTheme as ThemeDefinition;

// --- Language registry ----------------------------------------------------
export type Tokenizer = (code: string) => Token[];
const languages: Map<string, Tokenizer> = new Map();
export function registerLanguage(name: string, tokenizer: Tokenizer) { languages.set(name.toLowerCase(), tokenizer); }
// Safer idempotent variant (internal use): only replace if different reference
function ensureLanguage(name: string, tokenizer: Tokenizer) {
  const k = name.toLowerCase();
  const existing = languages.get(k);
  if (!existing || existing !== tokenizer) languages.set(k, tokenizer);
}
export function getLanguage(name: string): Tokenizer | undefined { return languages.get(name.toLowerCase()); }
export function listLanguages(): string[] { return [...languages.keys()].sort(); }
// Test/maintenance helper: allow removal in case a test needs a clean slate.
export function unregisterLanguage(name: string) { languages.delete(name.toLowerCase()); }

// ANSI helpers (theme already stores ANSI escape codes in color field)
function applyAnsi(style: ThemeStyle, text: string): string {
  let prefix = '';
  if (style.color) prefix += style.color; // expected to be an ANSI escape sequence
  if (style.fontStyle) {
    const map: Record<string,string> = { bold: '\u001b[1m', italic: '\u001b[3m', underline: '\u001b[4m', dim: '\u001b[2m' };
    if (map[style.fontStyle]) prefix += map[style.fontStyle];
  }
  if (!prefix) return text;
  return prefix + text + '\u001b[0m';
}
// Note: No built-in regex tokenizers are registered anymore. Users (or the CLI
// bootstrap) must call registerGeneratedAntlrLanguages() from register-antlr to
// populate languages. This keeps the core small and guarantees a single source
// of truth (the ANTLR grammars) for token classification.

function escapeHtml(str: string): string {
  return str.replace(/[&<>\"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;','\'':'&#39;'}[c]!));
}

function themeToCss(theme: ThemeDefinition): string {
  const parts: string[] = [];
  for (const [type, style] of Object.entries(theme)) {
    const css: string[] = [];
    if (style.color) css.push(`color: ${style.color}`);
    if (style.fontStyle === 'bold') css.push('font-weight:600');
    if (style.fontStyle === 'italic') css.push('font-style:italic');
    if (style.fontStyle === 'underline') css.push('text-decoration:underline');
    if (style.fontStyle === 'dim') css.push('opacity:0.75');
    if (css.length) parts.push(`.tok-${type}{${css.join(';')}}`);
  }
  return parts.join('');
}

// ---------------- Output Handlers -----------------------------------------
export interface OutputHandler {
  id: string;
  render(tokens: Token[], theme: ThemeDefinition, context: { language: string; config: Record<string, any> }): string;
  defaultConfig?: Record<string, any>;
}
// Lazily initialized map to avoid any temporal dead zone or cyclic-import timing issues.
let _outputHandlers: Map<string, OutputHandler> | undefined;
function ensureOutputHandlers() { if (!_outputHandlers) _outputHandlers = new Map(); return _outputHandlers; }
export function registerOutputHandler(handler: OutputHandler) { ensureOutputHandlers().set(handler.id, handler); }
export function getOutputHandler(id: string): OutputHandler | undefined { return ensureOutputHandlers().get(id); }
export function listOutputHandlers(): string[] { return [...ensureOutputHandlers().keys()].sort(); }

// Defer built-in handler registration until first access to avoid TDZ/cycle timing.
let handlersRegistered = false;
function ensureBuiltInHandlers() {
  if (handlersRegistered) return;
  handlersRegistered = true;
  registerOutputHandler({
    id: 'ansi',
    defaultConfig: ansiDefault as any,
    render(tokens, theme) {
      return tokens.map(t => {
        if (t.type === 'whitespace') return t.value;
        
        // Special handling for color tokens (hex colors)
        if (t.type === 'color') {
          if (isHexColor(t.value)) {
            // Use closest ANSI color for hex values
            const ansiColor = hexToClosestAnsi(t.value);
            const style = { ...theme[t.type], color: ansiColor };
            return applyAnsi(style, t.value);
          }
        }
        
        const style = theme[t.type] || {};
        return applyAnsi(style, t.value);
      }).join('');
    }
  });
  registerOutputHandler({
    id: 'html',
    defaultConfig: htmlDefault as any,
    render(tokens, theme, ctx) {
      const { config, language } = ctx;
      const body = tokens.map(t => {
        if (t.type === 'whitespace') return escapeHtml(t.value);
        const style = theme[t.type] || {};
        const css: string[] = [];
        if (style.color) css.push(`color: ${style.color}`);
        if (style.fontStyle === 'bold') css.push('font-weight:600');
        if (style.fontStyle === 'italic') css.push('font-style:italic');
        if (style.fontStyle === 'underline') css.push('text-decoration:underline');
        if (style.fontStyle === 'dim') css.push('opacity:0.75');
        
        // Special handling for color tokens (hex colors)
        if (t.type === 'color') {
          if (isHexColor(t.value)) {
            const colorStyles = createColorTokenHtml(t.value, css);
            return `<span class=\"tok-${t.type}\" style=\"${colorStyles}\">${escapeHtml(t.value)}</span>`;
          }
        }
        
        return `<span class=\"tok-${t.type}\" style=\"${css.join(';')}\">${escapeHtml(t.value)}</span>`;
      }).join('');
      const block = config.block !== false; // default true
      if (config.fullDocument) {
        const cssTheme = themeToCss(theme);
        const title = escapeHtml(config.title || `Code (${language})`);
        const content = block ? `<pre class=\"ch-pre\"><code class=\"ch-code lang-${language}\">${body}</code></pre>` : body;
        return `<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/><title>${title}</title><style>body{background:#fff;color:#000;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;line-height:1.4;padding:1rem}.ch-pre{margin:0;white-space:pre;overflow:auto;background:#fafafa;padding:1rem;border:1px solid #e1e4e8;border-radius:6px}.ch-code{white-space:pre}span[class^=tok-]{white-space:pre-wrap}${cssTheme}</style></head><body>${content}</body></html>`;
      }
      if (block) return `<pre class=\"ch-pre\"><code class=\"ch-code lang-${language}\">${body}</code></pre>`;
      return body;
    }
  });
}

export function highlight(code: string, options: HighlightOptions = {}): string {
  ensureBuiltInHandlers();
  const langName = options.language || 'javascript';
  const tokenizer = getLanguage(langName);
  if (!tokenizer) {
    throw new Error(`Language '${langName}' is not registered. Generate & register ANTLR lexers via registerGeneratedAntlrLanguages().`);
  }
  let tokens = tokenizer(code);
  // Language-specific post-processing (lightweight heuristics without full parse)
  if (langName === 'json') {
    // Reclassify object property keys: a STRING immediately followed (ignoring whitespace) by ':'
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type === 'string') {
        let j = i + 1;
        while (j < tokens.length && tokens[j].type === 'whitespace') j++;
        if (j < tokens.length && tokens[j].value === ':') {
          t.type = 'property';
        }
      }
    }
  }
  if (langName === 'markdown' || langName === 'md') {
    // Map raw tokens first
    tokens = tokens.map(tok => {
      switch (tok.type) {
        case 'md-raw-heading':
        case 'md-raw-heading_atx': return { ...tok, type: 'heading' };
        case 'md-raw-heading-setext': return { ...tok, type: 'heading-setext' };
        case 'md-raw-bold': return { ...tok, type: 'strong' };
        case 'md-raw-bolditalic': return { ...tok, type: 'strong' }; // treat triple as strong for now
        case 'md-raw-italic': return { ...tok, type: 'emphasis' };
        case 'md-raw-strike': return { ...tok, type: 'strike' };
        case 'md-raw-inline-code': return { ...tok, type: 'code-inline' };
        case 'md-raw-code-fence':
        case 'md-raw-code-fence-start': return { ...tok, type: 'code-fence-start' };
        case 'md-raw-code-fence-end': return { ...tok, type: 'code-fence-end' };
        case 'md-raw-code-text': return { ...tok, type: 'code-fence-content' };
        case 'md-raw-code-block': return { ...tok, type: 'code-block' };
        case 'md-raw-task-list': return { ...tok, type: 'task-list' };
        case 'md-raw-table': return { ...tok, type: 'table' };
        case 'md-raw-link': return { ...tok, type: 'link' };
        case 'md-raw-link-reference': return { ...tok, type: 'link-reference' };
        case 'md-raw-link-definition': return { ...tok, type: 'link-definition' };
        case 'md-raw-autolink': return { ...tok, type: 'autolink' };
        case 'md-raw-footnote': return { ...tok, type: 'footnote' };
        case 'md-raw-line-break': return { ...tok, type: 'line-break' };
        case 'md-raw-image': return { ...tok, type: 'image' };
        case 'md-raw-hr': return { ...tok, type: 'rule' };
        case 'md-raw-blockquote': return { ...tok, type: 'blockquote' };
        case 'md-raw-list-bullet': return { ...tok, type: 'list-bullet' };
        case 'md-raw-list-enum': return { ...tok, type: 'list-enum' };
        default: return tok;
      }
    });
    // Heuristic reclassification for structural lines the lexer may have left as generic tokens
    tokens = tokens.map(tok => {
      if (tok.type !== 'identifier') return tok;
      const raw = tok.value;
      const line = raw.replace(/\r?\n$/, '');
      if (/^ {0,3}>( |$)/.test(line)) return { ...tok, type: 'blockquote' };
      if (/^ {0,3}(?:---+|\*\*\*+|___+)[ \t]*$/.test(line)) return { ...tok, type: 'rule' };
      if (/^ {0,3}[-*+] +(?!\[[ xX]\]).*\S/.test(line)) return { ...tok, type: 'list-bullet' };
      if (/^ {0,3}\d+\. +\S/.test(line)) return { ...tok, type: 'list-enum' };
      if (/^#+\s+/.test(line)) return { ...tok, type: 'heading' };
      if (/^```/.test(line)) {
        // classify as fence start or end depending on if more backticks only
        if (/^```\s*[^`]*$/.test(line) && !/^```+$/.test(line.trim())) return { ...tok, type: 'code-fence-start' };
        if (/^```+$/.test(line.trim())) return { ...tok, type: 'code-fence-end' };
      }
      if (/^~~.+~~$/.test(line)) return { ...tok, type: 'strike' };
      if (/^!\[[^\]]*\]\([^\)]+\)$/.test(line)) return { ...tok, type: 'image' };
      return tok;
    });
    // Secondary heuristic: the current minimal lexer may classify entire lines as TEXT.
    // We'll split TEXT tokens using regex patterns for emphasis, strong, code, links.
    const out: Token[] = [];
    // Simple fenced code re-highlight: gather sequences between code-fence-start and end
    // If a language hint is present on the start line (after ```), attempt nested highlight.
    const final: Token[] = [];
    let i = 0;
    while (i < tokens.length) {
      const t = tokens[i];
      if (t.type === 'code-fence-start') {
        // Extract language id heuristic: after backticks until whitespace/newline
        const langMatch = t.value.match(/^```\s*([a-zA-Z0-9_-]+)/);
        const lang = langMatch?.[1];
        final.push({ type: 'code-fence-start', value: t.value });
        i++;
        const inner: Token[] = [];
        while (i < tokens.length && tokens[i].type !== 'code-fence-end') {
          inner.push(tokens[i]);
          i++;
        }
        if (i < tokens.length && tokens[i].type === 'code-fence-end') {
          // Combine inner values and re-highlight if language available.
          const innerText = inner.map(it => it.value).join('');
          if (lang && getLanguage(lang)) {
            try {
              const nested = getLanguage(lang)!(innerText);
              // map nested tokens to code-inline style but preserve nesting
              for (const nt of nested) final.push({ type: nt.type, value: nt.value });
            } catch {
              final.push({ type: 'code-fence-content', value: innerText });
            }
          } else {
            final.push({ type: 'code-fence-content', value: innerText });
          }
          final.push(tokens[i]);
          i++;
        }
        continue;
      }
      final.push(t); i++;
    }
    tokens = final;
  const pattern = /(!\[[^\]\n]+\]\([^\)\n]+\)|`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^\)\n]+\)|<[^<>\s]+>|\[[\^][^\]]+\]|\[[^\]]+\]\[[^\]]*\]|\[[^\]]+\]:\s*[^\s\n]+(\s+"[^"\n]*")?)/g;
    for (const tok of tokens) {
      if (tok.type !== 'identifier' && tok.type !== 'TEXT'.toLowerCase() && tok.type !== 'code-fence-content') { out.push(tok); continue; }
      const value = tok.value;
      // Heading heuristic: line starting with one or more # followed by space
      if (/^#+\s/.test(value)) {
        out.push({ type: 'heading', value });
        continue;
      }
      let lastIndex = 0; let m: RegExpExecArray | null;
      while ((m = pattern.exec(value))){
        if (m.index > lastIndex) out.push({ type: 'identifier', value: value.slice(lastIndex, m.index) });
        const seg = m[0];
    if (seg.startsWith('![')) out.push({ type: 'image', value: seg });
    else if (seg.startsWith('**')) out.push({ type: 'strong', value: seg });
        else if (seg.startsWith('*')) out.push({ type: 'emphasis', value: seg });
        else if (seg.startsWith('`')) out.push({ type: 'code-inline', value: seg });
        else if (seg.startsWith('<')) out.push({ type: 'autolink', value: seg });
        else if (seg.startsWith('[^')) out.push({ type: 'footnote', value: seg });
        else if (seg.includes(']:')) out.push({ type: 'link-definition', value: seg });
        else if (seg.includes('][')) out.push({ type: 'link-reference', value: seg });
        else if (seg.startsWith('[')) out.push({ type: 'link', value: seg });
        else out.push({ type: 'identifier', value: seg });
        lastIndex = m.index + seg.length;
      }
      if (lastIndex < value.length) out.push({ type: 'identifier', value: value.slice(lastIndex) });
    }
    
    // Special handling for hard line breaks: tokens ending with 2+ spaces before newline
    const processedOut: Token[] = [];
    for (let i = 0; i < out.length; i++) {
      const tok = out[i];
      const nextTok = out[i + 1];
      
      // Check if current token ends with 2+ spaces and next token is a newline
      if (tok.type === 'identifier' && tok.value.endsWith('  ') && 
          nextTok && nextTok.type === 'identifier' && nextTok.value === '\n') {
        // Split the current token: content without spaces + line break
        const content = tok.value.replace(/  +$/, '');
        const spaces = tok.value.match(/  +$/)?.[0] || '';
        
        if (content) processedOut.push({ type: 'identifier', value: content });
        processedOut.push({ type: 'line-break', value: spaces + nextTok.value });
        i++; // Skip the newline token since we consumed it
      } else {
        processedOut.push(tok);
      }
    }
    
    tokens = processedOut.length ? processedOut : out;
    // Final normalization pass: reclassify any remaining structural markers missed earlier
    tokens = tokens.map(t => {
      if (t.type !== 'identifier') return t;
      const v = t.value.replace(/\r?\n$/, '');
      if (/^ {0,3}(?:---+|\*\*\*+|___+)[ \t]*$/.test(v)) return { ...t, type: 'rule' };
      if (/^ {0,3}>( |$)/.test(v)) return { ...t, type: 'blockquote' };
      if (/^ {0,3}[-*+] +(?!\[[ xX]\]).*\S/.test(v)) return { ...t, type: 'list-bullet' };
      if (/^ {0,3}\d+\. +\S/.test(v)) return { ...t, type: 'list-enum' };
      if (/^#+\s+/.test(v)) return { ...t, type: 'heading' };
      return t;
    });
  }
  // Determine output handler (back-compat with html flag)
  const outputId = options.output || (options.html ? 'html' : 'ansi');
  const handler = getOutputHandler(outputId) || getOutputHandler('ansi');
  if (!handler) throw new Error('No output handler available');
  const base = outputId === 'html' ? htmlBaseTheme : ansiBaseTheme;
  const theme = { ...base, ...(options.theme||{}) };
  // Optional rainbow bracket coloring pass (post-tokenization decoration)
  if (options.bracketNesting !== false) {
    const openToClose: Record<string,string> = { '(': ')', '{': '}', '[': ']' };
    const closes = new Set(Object.values(openToClose));
    const stack: string[] = [];
    const htmlPalette = options.bracketPaletteHtml && options.bracketPaletteHtml.length
      ? options.bracketPaletteHtml
      : ['#d73a49', '#22863a', '#6f42c1', '#005cc5', '#e36209', '#0366d6'];
    const ansiPalette = options.bracketPaletteAnsi && options.bracketPaletteAnsi.length
      ? options.bracketPaletteAnsi
      : ['\u001b[31m', '\u001b[32m', '\u001b[35m', '\u001b[34m', '\u001b[33m', '\u001b[36m'];
    const ensureThemeEntry = (depth: number) => {
      const key = `bracket-depth-${depth}`;
      if (!theme[key]) {
        theme[key] = { color: outputId === 'html' ? htmlPalette[depth % htmlPalette.length] : ansiPalette[depth % ansiPalette.length] };
      }
    };
    const unmatchedType = 'bracket-unmatched';
    if (!theme[unmatchedType]) {
      theme[unmatchedType] = { color: outputId === 'html' ? '#ff0000' : '\u001b[31m', fontStyle: 'bold' };
    }
    tokens = tokens.map(tok => {
      if (tok.value.length !== 1) return tok;
      const ch = tok.value;
      if (!(ch in openToClose) && !closes.has(ch)) return tok;
      if (openToClose[ch]) { // opening
        const depth = stack.length;
        stack.push(openToClose[ch]);
        ensureThemeEntry(depth);
        return { ...tok, type: `bracket-depth-${depth}` };
      } else if (closes.has(ch)) { // closing
        // find matching top
        if (stack.length && stack[stack.length - 1] === ch) {
          const depth = stack.length - 1;
            stack.pop();
            ensureThemeEntry(depth);
            return { ...tok, type: `bracket-depth-${depth}` };
        }
        // unmatched closing – still color but mark unmatched
        return { ...tok, type: unmatchedType };
      }
      return tok;
    });
  }
  // Merge config precedence: handler.defaultConfig <- html-specific legacy options <- options.handlerConfig
  const legacy: Record<string, any> = {};
  if (outputId === 'html') {
    if (options.block !== undefined) legacy.block = options.block;
    if (options.fullDocument !== undefined) legacy.fullDocument = options.fullDocument;
    if (options.title !== undefined) legacy.title = options.title;
  }
  const config = { ...(handler.defaultConfig||{}), ...legacy, ...(options.handlerConfig||{}) };
  return handler.render(tokens, theme, { language: langName, config });
}

/**
 * Export token analysis as structured JSON data
 * @param code Source code to analyze
 * @param language Programming language for tokenization
 * @returns TokenAnalysis object with detailed token information
 */
export function exportTokens(code: string, language: string = 'javascript'): TokenAnalysis {
  const tokenizer = getLanguage(language);
  if (!tokenizer) {
    throw new Error(`Language '${language}' is not registered. Generate & register ANTLR lexers via registerGeneratedAntlrLanguages().`);
  }

  let tokens = tokenizer(code);
  
  // Apply same post-processing as highlight function
  if (language === 'json') {
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.type === 'string') {
        let j = i + 1;
        while (j < tokens.length && tokens[j].type === 'whitespace') j++;
        if (j < tokens.length && tokens[j].value === ':') {
          t.type = 'property';
        }
      }
    }
  }

  if (language === 'markdown' || language === 'md') {
    // Apply markdown post-processing (simplified version)
    tokens = tokens.map(tok => {
      switch (tok.type) {
        case 'md-raw-heading':
        case 'md-raw-heading_atx': return { ...tok, type: 'heading' };
        case 'md-raw-bold': return { ...tok, type: 'strong' };
        case 'md-raw-italic': return { ...tok, type: 'emphasis' };
        case 'md-raw-inline-code': return { ...tok, type: 'code-inline' };
        case 'md-raw-task-list': return { ...tok, type: 'task-list' };
        default: return tok;
      }
    });
  }

  // Calculate positions
  const enhancedTokens: EnhancedToken[] = [];
  let currentPos = 0;
  let currentLine = 1;
  let currentColumn = 1;

  for (const token of tokens) {
    const start = currentPos;
    const end = currentPos + token.value.length;
    
    enhancedTokens.push({
      ...token,
      position: {
        start,
        end,
        line: currentLine,
        column: currentColumn
      }
    });

    // Update position tracking
    for (const char of token.value) {
      if (char === '\n') {
        currentLine++;
        currentColumn = 1;
      } else {
        currentColumn++;
      }
    }
    currentPos = end;
  }

  // Calculate statistics
  const tokenTypes: Record<string, number> = {};
  let totalLength = 0;
  let longestToken = { type: '', value: '', length: 0 };

  for (const token of enhancedTokens) {
    tokenTypes[token.type] = (tokenTypes[token.type] || 0) + 1;
    totalLength += token.value.length;
    
    if (token.value.length > longestToken.length) {
      longestToken = {
        type: token.type,
        value: token.value.substring(0, 50) + (token.value.length > 50 ? '...' : ''),
        length: token.value.length
      };
    }
  }

  const averageTokenLength = enhancedTokens.length > 0 ? totalLength / enhancedTokens.length : 0;
  const totalLines = currentLine;

  return {
    metadata: {
      language,
      totalTokens: enhancedTokens.length,
      totalLines,
      totalCharacters: code.length,
      timestamp: new Date().toISOString()
    },
    tokens: enhancedTokens,
    statistics: {
      tokenTypes,
      averageTokenLength: Math.round(averageTokenLength * 100) / 100,
      longestToken
    }
  };
}

/**
 * Export token analysis as JSON string
 * @param code Source code to analyze  
 * @param language Programming language for tokenization
 * @param pretty Whether to format JSON with indentation
 * @returns JSON string representation of token analysis
 */
export function exportTokensAsJson(code: string, language: string = 'javascript', pretty: boolean = true): string {
  const analysis = exportTokens(code, language);
  return pretty ? JSON.stringify(analysis, null, 2) : JSON.stringify(analysis);
}

export default { highlight, exportTokens, exportTokensAsJson, registerLanguage, unregisterLanguage, listLanguages, registerOutputHandler, listOutputHandlers };
