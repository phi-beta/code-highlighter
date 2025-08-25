/**
 * Multi-pass HTML tokenizer that delegates embedded CSS and JavaScript
 * to their specialized tokenizers for better syntax highlighting.
 */
import type { Token } from '../index.js';
export interface EmbeddedBlock {
    type: 'css' | 'javascript';
    start: number;
    end: number;
    content: string;
}
/**
 * Enhanced HTML tokenizer with CSS/JS delegation
 */
export declare function createDelegatingHtmlTokenizer(htmlTokenizer: (code: string) => Token[], cssTokenizer?: (code: string) => Token[], jsTokenizer?: (code: string) => Token[]): (code: string) => Token[];
