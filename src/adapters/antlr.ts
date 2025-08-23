/**
 * ANTLR adapter scaffold.
 * Provides helpers to adapt an ANTLR-generated lexer to the generic tokenizer interface
 * so languages defined via .g4 grammars (converted with antlr4ts) can supply tokens.
 * Current focus: lexer-only mapping (no parse tree) for highlighting speed & simplicity.
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

export interface AntlrAdapterOptions {
  tokenMap?: Record<string, string>; // symbolicName -> highlight token type
  defaultType?: string; // fallback highlight token type
  hiddenChannels?: string[]; // channel names to skip (e.g., 'HIDDEN')
  maxTokens?: number; // safety cap
}

export function tokenizeWithAntlr(createLexer: (code: string) => AntlrLexerLike, code: string, opts: AntlrAdapterOptions = {}): HLToken[] {
  const lexer = createLexer(code);
  const tokens: HLToken[] = [];
  const map = opts.tokenMap || {};
  const hidden = new Set(opts.hiddenChannels || ['HIDDEN']);
  const symbolic = lexer.symbolicNames || [];
  const max = opts.maxTokens || 200000;
  for (let i = 0; i < max; i++) {
    const t = lexer.nextToken();
    if (!t || t.type <= 0) break; // EOF
    const name = symbolic[t.type] || '';
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
  if (/whitespace|ws/i.test(lower)) return 'punctuation';
  return undefined;
}

export interface AntlrLanguageRegistrationOptions extends AntlrAdapterOptions {
  name: string;
  createLexer: (code: string) => AntlrLexerLike;
}

// Dynamically require registerLanguage to avoid circular ESM import cost.
export async function registerAntlrLanguage(opts: AntlrLanguageRegistrationOptions) {
  const mod = await import('../index.js');
  mod.registerLanguage(opts.name, (code: string) => tokenizeWithAntlr(opts.createLexer, code, opts));
}
