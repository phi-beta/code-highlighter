/**
 * Core highlighting engine.
 * - Defines token / theme interfaces
 * - Provides pluggable language registry with built-in JS & Python regex tokenizers
 * - Supports ANSI & HTML output (inline spans, <pre><code>, or full document)
 * - Exposes registration utilities for future adapters (e.g., ANTLR)
 */
import ansiDefault from './handlers/ansi.config.json' with { type: 'json' };
import htmlDefault from './handlers/html.config.json' with { type: 'json' };
import htmlTheme from './themes/html.theme.json' with { type: 'json' };
import ansiTheme from './themes/ansi.theme.json' with { type: 'json' };

export interface Token {
  type: string;
  value: string;
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
}

// Base themes now per output type; we pick one later (ansi vs html) and then merge user overrides.
const htmlBaseTheme: ThemeDefinition = htmlTheme as ThemeDefinition;
const ansiBaseTheme: ThemeDefinition = ansiTheme as ThemeDefinition;

// --- Language registry ----------------------------------------------------
export type Tokenizer = (code: string) => Token[];
const languages: Map<string, Tokenizer> = new Map();
export function registerLanguage(name: string, tokenizer: Tokenizer) { languages.set(name.toLowerCase(), tokenizer); }
export function getLanguage(name: string): Tokenizer | undefined { return languages.get(name.toLowerCase()); }
export function listLanguages(): string[] { return [...languages.keys()].sort(); }

// JavaScript tokenizer (baseline)
const jsKeywordSet = new Set(['break','case','catch','class','const','continue','debugger','default','delete','do','else','export','extends','finally','for','function','if','import','in','instanceof','let','new','return','super','switch','this','throw','try','typeof','var','void','while','with','yield','enum','await','implements','package','protected','static','interface','private','public']);
export function tokenizeJavaScript(code: string): Token[] {
  const tokens: Token[] = [];
  const regex = /\/\/.*?$|\/\*[\s\S]*?\*\/|\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|[A-Za-z_$][A-Za-z0-9_$]*|[{}()[\].,;:+\-*/%&|^!?=<>]|\s+/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    const value = match[0];
    let type: string;
    if (/^\/\//.test(value) || /^\/\*/.test(value)) type = 'comment';
    else if (/^[`'\"]/.test(value)) type = 'string';
    else if (/^\d/.test(value)) type = 'number';
    else if (jsKeywordSet.has(value)) type = 'keyword';
    else if (/^[A-Za-z_$]/.test(value)) type = 'identifier';
    else if (/^\s+$/.test(value)) type = 'whitespace';
    else type = 'punctuation';
    tokens.push({ type, value });
  }
  return tokens;
}

// (Early handler registration removed; handlers are registered after outputHandlers map is created.)
// (Removed duplicate stray tokenize snippet from earlier patch)

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
// Python tokenizer (very small subset)
const pyKeywordSet = new Set(['def','return','if','elif','else','for','while','import','from','as','class','try','except','finally','with','yield','lambda','pass','break','continue','and','or','not','in','is','None','True','False']);
export function tokenizePython(code: string): Token[] {
  const tokens: Token[] = [];
  const regex = /#.*$|"""[\s\S]*?"""|'''[\s\S]*?'''|\"(?:\\.|[^\"\\])*\"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b|[A-Za-z_][A-Za-z0-9_]*|[{}()[\].,;:+\-*/%&|^!?=<>]|\s+/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    const value = match[0];
    let type: string;
    if (/^#/.test(value) || /^"""/.test(value) || /^'''/.test(value)) type = 'comment';
    else if (/^["']/.test(value)) type = 'string';
    else if (/^\d/.test(value)) type = 'number';
    else if (pyKeywordSet.has(value)) type = 'keyword';
    else if (/^[A-Za-z_]/.test(value)) type = 'identifier';
    else if (/^\s+$/.test(value)) type = 'whitespace';
    else type = 'punctuation';
    tokens.push({ type, value });
  }
  return tokens;
}

// Register built-ins
registerLanguage('javascript', tokenizeJavaScript);
registerLanguage('js', tokenizeJavaScript);
registerLanguage('python', tokenizePython);
registerLanguage('py', tokenizePython);

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
const outputHandlers: Map<string, OutputHandler> = new Map();
export function registerOutputHandler(handler: OutputHandler) { outputHandlers.set(handler.id, handler); }
export function getOutputHandler(id: string): OutputHandler | undefined { return outputHandlers.get(id); }
export function listOutputHandlers(): string[] { return [...outputHandlers.keys()].sort(); }

// Built-in ANSI handler
registerOutputHandler({
  id: 'ansi',
  defaultConfig: ansiDefault as any,
  render(tokens, theme) {
    return tokens.map(t => {
      if (t.type === 'whitespace') return t.value;
      const style = theme[t.type] || {};
      return applyAnsi(style, t.value);
    }).join('');
  }
});

// Built-in HTML handler
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

export function highlight(code: string, options: HighlightOptions = {}): string {
  const langName = options.language || 'javascript';
  const tokenizer = getLanguage(langName) || tokenizeJavaScript;
  const tokens = tokenizer(code);
  // Determine output handler (back-compat with html flag)
  const outputId = options.output || (options.html ? 'html' : 'ansi');
  const handler = getOutputHandler(outputId) || getOutputHandler('ansi');
  if (!handler) throw new Error('No output handler available');
  const base = outputId === 'html' ? htmlBaseTheme : ansiBaseTheme;
  const theme = { ...base, ...(options.theme||{}) };
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

export default { highlight, tokenizeJavaScript, tokenizePython, registerLanguage, listLanguages, registerOutputHandler, listOutputHandlers };
