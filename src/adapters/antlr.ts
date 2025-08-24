/**
 * ANTLR adapter for both lexer-only and full parser grammars.
 * Provides helpers to adapt ANTLR-generated lexers/parsers to the generic tokenizer interface
 * so languages defined via .g4 grammars (converted with antlr4ts) can supply tokens.
 * Supports both lexer-only mode (for simple tokenization) and parser mode (for context-aware parsing).
 */

import type { Token as HLToken, ThemeDefinition } from '../index.js';
// Lazy import antlr runtime to avoid cost if unused.

export interface AntlrTokenLike { text: string | undefined; type: number; }
export interface AntlrLexerLike {
  readonly _input: any; // underlying CharStream
  nextToken(): AntlrTokenLike;
  symbolicNames?: string[]; // generated array mapping type -> name
  channelNames?: string[];
}

export interface AntlrParserLike {
  document?: () => any; // start rule method
  reset(): void;
}

export interface AntlrAdapterOptions {
  tokenMap?: Record<string, string>; // symbolicName -> highlight token type
  defaultType?: string; // fallback highlight token type
  hiddenChannels?: string[]; // channel names to skip (e.g., 'HIDDEN')
  maxTokens?: number; // safety cap
  useParser?: boolean; // if true, use parser for context-aware tokenization
}

export function tokenizeWithAntlr(createLexer: (code: string) => AntlrLexerLike, code: string, opts: AntlrAdapterOptions = {}): HLToken[] {
  const lexer = createLexer(code);
  const tokens: HLToken[] = [];
  const map = opts.tokenMap || {};
  const hidden = new Set(opts.hiddenChannels || ['HIDDEN']);
  
  // Support both actual ANTLR lexers (symbolicNames on instance) and our stub lexers (static property only)
  // Try various locations for symbolic names depending on generator/runtime version.
  let symbolic: string[] = (lexer as any).symbolicNames || (lexer as any).constructor?.symbolicNames || [];
  if ((!symbolic || symbolic.length === 0) && (lexer as any).constructor?._SYMBOLIC_NAMES) {
    symbolic = (lexer as any).constructor._SYMBOLIC_NAMES as string[];
  }
  const vocabulary = (lexer as any).vocabulary || (lexer as any).constructor?.VOCABULARY;
  const max = opts.maxTokens || 200000;
  
  for (let i = 0; i < max; i++) {
    const t = lexer.nextToken();
    if (!t || t.type <= 0) break; // EOF
    let name = symbolic[t.type] || '';
    if (!name && vocabulary && typeof vocabulary.getSymbolicName === 'function') {
      name = vocabulary.getSymbolicName(t.type) || '';
    }
    if (name && hidden.has(name)) continue;
    const value = t.text ?? '';
    const hlType = map[name] || guessTokenType(name, value) || opts.defaultType || 'identifier';
    tokens.push({ type: hlType, value });
  }
  return tokens;
}

function guessTokenType(name: string, value: string): string | undefined {
  const lower = name.toLowerCase();
  if (/(comment)/i.test(lower)) return 'comment';
  if (/string|char/i.test(lower)) return 'string';
  if (/number|int|float|double|numeric|digit/i.test(lower)) return 'number';
  if (/bool|true|false|null|undefined/i.test(lower)) return 'keyword';
  if (/kw|keyword|if|for|while|return|class/i.test(lower)) return 'keyword';
  if (/punct|brace|bracket|paren|operator/i.test(lower)) return 'punctuation';
  if (/identifier|id|name/i.test(lower)) return 'identifier';
  if (/whitespace|ws/i.test(lower)) return 'whitespace';
  return undefined;
}

export interface AntlrLanguageRegistrationOptions extends AntlrAdapterOptions {
  name: string;
  createLexer: (code: string) => AntlrLexerLike;
  createParser?: (lexer: AntlrLexerLike) => AntlrParserLike; // optional for parser grammars
}

// Dynamically require registerLanguage to avoid circular ESM import cost.
export async function registerAntlrLanguage(opts: AntlrLanguageRegistrationOptions) {
  const mod = await import('../index.js');
  mod.registerLanguage(opts.name, (code: string) => tokenizeWithAntlr(opts.createLexer, code, opts));
}
