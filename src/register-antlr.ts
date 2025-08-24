/**
 * register-antlr.ts
 * Dynamically discovers and registers antlr4ts-generated lexer classes located in
 * ./generated/antlr (produced via `npm run generate:antlr`). Each *Lexer file is
 * loaded and wrapped with the ANTLR adapter.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { CharStreams } from 'antlr4ts';
import { registerAntlrLanguage } from './adapters/antlr.js';

// Basic heuristic mapping from token symbolic names to highlight categories.
function mapSymbolicToType(symbolic: string): string | undefined {
  const raw = symbolic;
  const s = symbolic.toLowerCase();
  // Direct exact name handling for stub & generated lexers
  if (s === 'keyword') return 'keyword';
  if (s === 'string') return 'string';
  if (s === 'number') return 'number';
  if (s === 'comment') return 'comment';
  if (s === 'punct' || s === 'punctuation') return 'punctuation';
  if (s === 'identifier' || s === 'id') return 'identifier';
  if (s === 'ws' || s === 'whitespace') return 'whitespace';
  if (s.includes('comment')) return 'comment';
  if (s.includes('string') || s.includes('template')) return 'string';
  if (s === 'number' || /^(num|int|float|double|digit)$/.test(s)) return 'number';
  if (/^(kw|keyword)$|^(class|return|if|for|while|else|import|from|def)$/.test(s)) return 'keyword';
  if (/^(punct|punctuation)$|^(brace|brack|paren|colon|comma|semi|operator|curly)$/.test(s)) return 'punctuation';
  // Markdown symbolic token names – map to temporary raw types we post-process later
  // ANTLR symbolic names are uppercase (e.g., HEADING); map them case-insensitively
  if (raw === 'HEADING') return 'md-raw-heading';
  if (raw === 'HEADING_ATX') return 'md-raw-heading';
  if (raw === 'SETEXT_UNDERLINE_1') return 'md-raw-heading-setext';
  if (raw === 'SETEXT_UNDERLINE_2') return 'md-raw-heading-setext';
  if (raw === 'HR') return 'md-raw-hr';
  if (raw === 'BLOCKQUOTE') return 'md-raw-blockquote';
  if (raw === 'LIST_BULLET') return 'md-raw-list-bullet';
  if (raw === 'LIST_ENUM') return 'md-raw-list-enum';
  if (raw === 'TASK_LIST_ITEM') return 'md-raw-task-list';
  if (raw === 'CODE_FENCE_START') return 'md-raw-code-fence-start';
  if (raw === 'CODE_FENCE_END') return 'md-raw-code-fence-end';
  if (raw === 'CODE_TEXT') return 'md-raw-code-text';
  if (raw === 'CODE_BLOCK_INDENTED') return 'md-raw-code-block';
  if (raw === 'TABLE_ROW') return 'md-raw-table';
  if (raw === 'TABLE_SEPARATOR') return 'md-raw-table';
  if (raw === 'IMAGE') return 'md-raw-image';
  if (raw === 'LINK_REFERENCE') return 'md-raw-link-reference';
  if (raw === 'LINK_DEFINITION') return 'md-raw-link-definition';
  if (raw === 'AUTOLINK') return 'md-raw-autolink';
  if (raw === 'FOOTNOTE_REF') return 'md-raw-footnote';
  if (raw === 'FOOTNOTE_DEF') return 'md-raw-footnote';
  if (raw === 'HARD_LINE_BREAK') return 'md-raw-line-break';
  // Existing inline constructs
  if (raw === 'BOLD') return 'md-raw-bold';
  if (raw === 'ITALIC') return 'md-raw-italic';
  if (raw === 'BOLDITALIC') return 'md-raw-bolditalic';
  if (raw === 'STRIKETHROUGH') return 'md-raw-strike';
  if (raw === 'INLINE_CODE') return 'md-raw-inline-code';
  if (raw === 'CODE_FENCE') return 'md-raw-code-fence';
  if (raw === 'LINK') return 'md-raw-link';
  // Bash shell token mappings
  if (raw === 'ARITHMETIC_EXPANSION') return 'arithmetic-expansion';
  if (raw === 'COMMAND_SUBSTITUTION') return 'command-substitution';
  if (raw === 'COMMAND_SUBSTITUTION_BACKTICK') return 'command-substitution';
  if (raw === 'PARAMETER_EXPANSION') return 'parameter-expansion';
  if (raw === 'VAR_POSITIONAL') return 'variable';
  if (raw === 'VAR_SPECIAL') return 'variable';
  if (raw === 'TEST_OP') return 'operator';
  if (raw === 'REDIRECT') return 'operator';
  if (raw === 'PIPE') return 'operator';
  if (raw === 'LOGICAL') return 'operator';
  // General fallback patterns
  if (s === 'comment') return 'comment';
  if (s === 'ws' || s === 'whitespace') return 'whitespace';
  if (/identifier|id|name/.test(s)) return 'identifier';
  // Python token mappings
  if (raw === 'BOOLEAN') return 'keyword';
  if (raw === 'NONE') return 'keyword';
  if (raw === 'F_STRING') return 'string';
  if (raw === 'RAW_STRING') return 'string';
  if (raw === 'TRIPLE_STRING') return 'string';
  if (raw === 'STRING_DOUBLE') return 'string';
  if (raw === 'STRING_SINGLE') return 'string';
  if (raw === 'HEX_NUMBER') return 'number';
  if (raw === 'BIN_NUMBER') return 'number';
  if (raw === 'OCT_NUMBER') return 'number';
  if (raw === 'FLOAT_NUMBER') return 'number';
  if (raw === 'INT_NUMBER') return 'number';
  if (raw === 'OPERATOR') return 'operator';
  if (raw === 'DECORATOR') return 'decorator';
  // TypeScript token mappings
  if (raw === 'TYPE_ANNOTATION') return 'type';
  if (raw === 'GENERIC_TYPE') return 'type';
  if (raw === 'STRING_TEMPLATE') return 'string';
  if (raw === 'OPERATOR_TS') return 'operator';
  if (raw === 'REGEX') return 'string';
  return undefined;
}

export interface AutoRegisterOptions {
  /** If true, logs each language registration */
  verbose?: boolean;
  /** Explicit directory override (defaults to ./generated/antlr relative to this file) */
  dir?: string;
  /** Provide an explicit token map override per language */
  tokenMaps?: Record<string, Record<string,string>>;
}

export async function registerGeneratedAntlrLanguages(opts: AutoRegisterOptions = {}) {
  const here = path.dirname(fileURLToPath(import.meta.url));
  let baseDir = opts.dir || path.join(here, 'generated', 'antlr');
  // If antlr4ts CLI nested structure is present, descend into it
  const nested = path.join(baseDir, 'src', 'grammars', 'antlr');
  if (fs.existsSync(nested)) baseDir = nested;
  if (!fs.existsSync(baseDir)) {
    if (opts.verbose) console.warn('[register-antlr] No generated ANTLR directory found at', baseDir);
    return;
  }
  // Accept either .js (built) or .ts (stub/ts-node) files
  const all = fs.readdirSync(baseDir).filter(f => /\.(js|ts)$/.test(f) && !/\.d\.ts$/.test(f));
  // Classify candidates - for parser grammars, we want *Lexer.ts files
  const stubLexerFiles = new Set(all.filter(f => /Lexer\.(js|ts)$/.test(f) && /(Bash|JavaScript|Json|Markdown|Python|TypeScript)MiniLexer/.test(f)));
  const realGeneratedFiles = new Set(all.filter(f => /Mini\.(js|ts)$/.test(f) && !/Lexer\.(js|ts)$/.test(f)));
  // For parser grammars, also include the generated lexer files
  const parserLexerFiles = new Set(all.filter(f => /MiniLexer\.(js|ts)$/.test(f)));
  
  // If both a real generated *Mini and a stub *MiniLexer exist, drop the stub.
  for (const real of realGeneratedFiles) {
    const base = real.replace(/\.(js|ts)$/,'');
    const stub = base + 'Lexer.ts';
    const stubJs = base + 'Lexer.js';
    stubLexerFiles.delete(stub);
    stubLexerFiles.delete(stubJs);
  }
  // Final list: parser lexers first, then real generated, then any remaining stubs.
  const files = [ ...Array.from(parserLexerFiles).sort(), ...Array.from(realGeneratedFiles).sort(), ...Array.from(stubLexerFiles).sort() ];
  if (opts.verbose) console.log('[register-antlr] Found lexer candidates:', files);
  for (const file of files) {
    const isStub = /Lexer\.(js|ts)$/.test(file) && !/(Bash|JavaScript|Json|Markdown|Python)MiniLexer/.test(file);
    const isParserLexer = /MiniLexer\.(js|ts)$/.test(file);
    let langBase: string;
    
    if (isParserLexer) {
      langBase = file.replace(/MiniLexer\.(js|ts)$/, '');
    } else if (isStub) {
      langBase = file.replace(/Lexer\.(js|ts)$/, '');
    } else {
      langBase = file.replace(/Mini\.(js|ts)$/, '');
    }
    
    const langName = langBase.replace(/Mini$/,'').toLowerCase();
    try {
      const filePath = path.join(baseDir, file);
      // Use file URL to ensure Windows path compatibility for dynamic import of .ts during tests.
      const mod = await import(pathToFileURL(filePath).href);
      let LexerClass;
      
      if (isParserLexer) {
        // For parser grammars, look for MarkdownMiniLexer class
        LexerClass = (mod as any)[langBase + 'MiniLexer'] || (mod as any)[langBase + 'Lexer'] || (mod as any).default;
      } else if (isStub) {
        LexerClass = (mod as any)[langBase + 'Lexer'] || (mod as any)[langBase];
      } else {
        // For lexer-only grammars, try the full file base name first, then default
        LexerClass = (mod as any)[langBase + 'Mini'] || (mod as any).default || (mod as any)[langBase];
      }
      if (!LexerClass) continue;
      const explicitMap = opts.tokenMaps?.[langName];
      const tokenMap: Record<string,string> = explicitMap || {};
      const symNames = LexerClass.symbolicNames || (LexerClass as any)._SYMBOLIC_NAMES || [];
      
      if (!explicitMap && Array.isArray(symNames)) {
        for (const name of symNames) {
          if (!name) continue;
            const mapped = mapSymbolicToType(name);
            if (mapped) tokenMap[name] = mapped;
        }
      }
      // Distinguish between real antlr4ts generated lexers and stub "Mini" lexers.
      // Real generated lexers expose serializedATN/ruleNames and require a CharStream.
      // Stubs expect a plain source string; passing a CharStream caused empty token output intermittently.
      const isRealAntlr = !isStub && ('serializedATN' in LexerClass || 'ruleNames' in (LexerClass.prototype || {}));
      const createLexer = (code: string) => isRealAntlr
        ? new LexerClass(CharStreams.fromString(code))
        : new LexerClass(code);
      await registerAntlrLanguage({
        name: langName,
        createLexer,
        tokenMap,
        defaultType: 'identifier'
      });
      if (langName === 'javascript') await registerAntlrLanguage({ name: 'js', createLexer, tokenMap });
      if (langName === 'python') await registerAntlrLanguage({ name: 'py', createLexer, tokenMap });
      if (langName === 'bash') await registerAntlrLanguage({ name: 'sh', createLexer, tokenMap });
      if (langName === 'markdown') await registerAntlrLanguage({ name: 'md', createLexer, tokenMap });
      if (langName === 'typescript') await registerAntlrLanguage({ name: 'ts', createLexer, tokenMap });
  if (opts.verbose) console.log(`[register-antlr] Registered ${langName}`);
    } catch (e) {
      if (opts.verbose) console.warn('[register-antlr] Failed for', file, e);
    }
  }
}

/**
 * Attempts to auto-register generated lexers but never throws; returns the list
 * of languages registered before & after for diagnostic use.
 */
export async function attemptAutoRegisterGeneratedAntlrLanguages(opts: AutoRegisterOptions = {}) {
  const before = (await import('./index.js')).listLanguages();
  try { await registerGeneratedAntlrLanguages(opts); } catch { /* swallow */ }
  const after = (await import('./index.js')).listLanguages();
  return { before, after };
}

export default { registerGeneratedAntlrLanguages };
