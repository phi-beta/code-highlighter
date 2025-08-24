"use strict";
/**
 * Validation utilities for token analysis JSON export format
 * Uses the JSON schema to validate output format
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_TOKEN_TYPES = void 0;
exports.validateTokenAnalysis = validateTokenAnalysis;
exports.getTokenAnalysisSchema = getTokenAnalysisSchema;
exports.createSchemaValidator = createSchemaValidator;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
/**
 * Validate a token analysis object against the JSON schema
 * Note: This is a basic structural validation. For full JSON Schema validation,
 * use a library like Ajv with the schema file.
 */
function validateTokenAnalysis(analysis) {
    // Basic structural validation
    if (!analysis || typeof analysis !== 'object') {
        return false;
    }
    // Check required top-level properties
    if (!analysis.metadata || !analysis.tokens || !analysis.statistics) {
        return false;
    }
    // Validate metadata
    const meta = analysis.metadata;
    if (!meta.language || !meta.timestamp || !meta.version || typeof meta.inputSize !== 'number') {
        return false;
    }
    // Validate tokens array
    if (!Array.isArray(analysis.tokens)) {
        return false;
    }
    for (const token of analysis.tokens) {
        if (!token.type || !token.value || !token.position) {
            return false;
        }
        const pos = token.position;
        if (typeof pos.start !== 'number' || typeof pos.end !== 'number' ||
            typeof pos.line !== 'number' || typeof pos.column !== 'number') {
            return false;
        }
    }
    // Validate statistics
    const stats = analysis.statistics;
    if (typeof stats.totalTokens !== 'number' || !stats.tokenTypes || !stats.coverage) {
        return false;
    }
    if (typeof stats.coverage.charactersAnalyzed !== 'number' ||
        typeof stats.coverage.percentage !== 'number') {
        return false;
    }
    return true;
}
/**
 * Get the JSON schema as an object
 * This can be used with JSON schema validation libraries like Ajv
 */
function getTokenAnalysisSchema() {
    try {
        const schemaPath = node_path_1.default.join(__dirname, '../schemas/token-analysis.json');
        const schemaContent = node_fs_1.default.readFileSync(schemaPath, 'utf-8');
        return JSON.parse(schemaContent);
    }
    catch (error) {
        throw new Error(`Failed to load token analysis schema: ${error.message}`);
    }
}
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
function createSchemaValidator() {
    try {
        // This would require Ajv as a dependency
        // For now, we'll use the basic validator
        return validateTokenAnalysis;
    }
    catch (error) {
        console.warn('JSON Schema validation not available, using basic validation');
        return validateTokenAnalysis;
    }
}
/**
 * Common token types across different languages
 */
exports.COMMON_TOKEN_TYPES = [
    // Programming language tokens
    'keyword', 'string', 'number', 'comment', 'identifier',
    'operator', 'punctuation', 'whitespace', 'function',
    'variable', 'class', 'type', 'decorator',
    // Bracket depth tracking
    'bracket-depth-0', 'bracket-depth-1', 'bracket-depth-2',
    'bracket-depth-3', 'bracket-depth-4', 'bracket-depth-5',
    'bracket-unmatched',
    // Markdown-specific tokens
    'heading', 'strong', 'emphasis', 'code-inline', 'code-block',
    'link', 'image', 'blockquote', 'list-bullet', 'list-enum',
    'rule', 'strike', 'code-fence-start', 'code-fence-end', 'code-fence-content',
    // Common extensions
    'property'
];
