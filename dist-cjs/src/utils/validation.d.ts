/**
 * Validation utilities for token analysis JSON export format
 * Uses the JSON schema to validate output format
 */
import type { TokenAnalysis } from '../types/token-analysis.js';
/**
 * Validate a token analysis object against the JSON schema
 * Note: This is a basic structural validation. For full JSON Schema validation,
 * use a library like Ajv with the schema file.
 */
export declare function validateTokenAnalysis(analysis: any): analysis is TokenAnalysis;
/**
 * Get the JSON schema as an object
 * This can be used with JSON schema validation libraries like Ajv
 */
export declare function getTokenAnalysisSchema(): object;
/**
 * Validate token analysis using JSON Schema (requires Ajv)
 * Example usage with Ajv:
 *
 * import Ajv from 'ajv';
 * import addFormats from 'ajv-formats';
 *
 * const ajv = new Ajv();
 * addFormats(ajv);
 * const validate = ajv.compile(getTokenAnalysisSchema());
 * const isValid = validate(tokenAnalysisData);
 */
export declare function createSchemaValidator(): (data: any) => boolean;
/**
 * Common token types across different languages
 */
export declare const COMMON_TOKEN_TYPES: readonly ["keyword", "string", "number", "comment", "identifier", "operator", "punctuation", "whitespace", "function", "variable", "class", "type", "decorator", "bracket-depth-0", "bracket-depth-1", "bracket-depth-2", "bracket-depth-3", "bracket-depth-4", "bracket-depth-5", "bracket-unmatched", "heading", "strong", "emphasis", "code-inline", "code-block", "link", "image", "blockquote", "list-bullet", "list-enum", "rule", "strike", "code-fence-start", "code-fence-end", "code-fence-content", "property"];
export type CommonTokenType = typeof COMMON_TOKEN_TYPES[number];
