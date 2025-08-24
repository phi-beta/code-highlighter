/**
 * ANTLR adapter for both lexer-only and full parser grammars.
 * Provides helpers to adapt ANTLR-generated lexers/parsers to the generic tokenizer interface
 * so languages defined via .g4 grammars (converted with antlr4ts) can supply tokens.
 * Supports both lexer-only mode (for simple tokenization) and parser mode (for context-aware parsing).
 */
import type { Token as HLToken } from '../index.js';
export interface AntlrTokenLike {
    text: string | undefined;
    type: number;
}
export interface AntlrLexerLike {
    readonly _input: any;
    nextToken(): AntlrTokenLike;
    symbolicNames?: string[];
    channelNames?: string[];
}
export interface AntlrParserLike {
    document?: () => any;
    reset(): void;
}
export interface AntlrAdapterOptions {
    tokenMap?: Record<string, string>;
    defaultType?: string;
    hiddenChannels?: string[];
    maxTokens?: number;
    useParser?: boolean;
}
export declare function tokenizeWithAntlr(createLexer: (code: string) => AntlrLexerLike, code: string, opts?: AntlrAdapterOptions): HLToken[];
export interface AntlrLanguageRegistrationOptions extends AntlrAdapterOptions {
    name: string;
    createLexer: (code: string) => AntlrLexerLike;
    createParser?: (lexer: AntlrLexerLike) => AntlrParserLike;
}
export declare function registerAntlrLanguage(opts: AntlrLanguageRegistrationOptions): Promise<void>;
