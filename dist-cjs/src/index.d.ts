export interface Token {
    type: string;
    value: string;
}
export interface EnhancedToken extends Token {
    position: {
        start: number;
        end: number;
        line: number;
        column: number;
    };
}
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
        longestToken: {
            type: string;
            value: string;
            length: number;
        };
    };
}
export interface ThemeStyle {
    color?: string;
    fontStyle?: 'bold' | 'italic' | 'underline' | 'dim';
}
export interface ThemeDefinition {
    [tokenType: string]: ThemeStyle;
}
export interface HighlightOptions {
    theme?: ThemeDefinition;
    html?: boolean;
    language?: string;
    block?: boolean;
    fullDocument?: boolean;
    title?: string;
    output?: string;
    handlerConfig?: Record<string, any>;
    /** Enable rainbow bracket/brace/paren nesting coloration (default: true) */
    bracketNesting?: boolean;
    /** Override HTML color palette for bracket depths (array cycled). */
    bracketPaletteHtml?: string[];
    /** Override ANSI escape palette for bracket depths (array cycled). */
    bracketPaletteAnsi?: string[];
}
export type Tokenizer = (code: string) => Token[];
export declare function registerLanguage(name: string, tokenizer: Tokenizer): void;
export declare function getLanguage(name: string): Tokenizer | undefined;
export declare function listLanguages(): string[];
export declare function unregisterLanguage(name: string): void;
export interface OutputHandler {
    id: string;
    render(tokens: Token[], theme: ThemeDefinition, context: {
        language: string;
        config: Record<string, any>;
    }): string;
    defaultConfig?: Record<string, any>;
}
export declare function registerOutputHandler(handler: OutputHandler): void;
export declare function getOutputHandler(id: string): OutputHandler | undefined;
export declare function listOutputHandlers(): string[];
export declare function highlight(code: string, options?: HighlightOptions): string;
/**
 * Export token analysis as structured JSON data
 * @param code Source code to analyze
 * @param language Programming language for tokenization
 * @returns TokenAnalysis object with detailed token information
 */
export declare function exportTokens(code: string, language?: string): TokenAnalysis;
/**
 * Export token analysis as JSON string
 * @param code Source code to analyze
 * @param language Programming language for tokenization
 * @param pretty Whether to format JSON with indentation
 * @returns JSON string representation of token analysis
 */
export declare function exportTokensAsJson(code: string, language?: string, pretty?: boolean): string;
declare const _default: {
    highlight: typeof highlight;
    exportTokens: typeof exportTokens;
    exportTokensAsJson: typeof exportTokensAsJson;
    registerLanguage: typeof registerLanguage;
    unregisterLanguage: typeof unregisterLanguage;
    listLanguages: typeof listLanguages;
    registerOutputHandler: typeof registerOutputHandler;
    listOutputHandlers: typeof listOutputHandlers;
};
export default _default;
