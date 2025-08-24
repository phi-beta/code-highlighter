/**
 * TypeScript type definitions for the code-highlighter JSON export format
 * This file corresponds to the JSON schema at schemas/token-analysis.json
 */

export interface TokenPosition {
  /** Starting character index in the source code (0-based) */
  start: number;
  /** Ending character index in the source code (0-based, exclusive) */
  end: number;
  /** Line number where the token appears (1-based) */
  line: number;
  /** Column number where the token starts (1-based) */
  column: number;
}

export interface EnhancedToken {
  /** The token type classification */
  type: string;
  /** The actual text content of the token */
  value: string;
  /** Position information for the token within the source code */
  position: TokenPosition;
}

export interface AnalysisMetadata {
  /** The programming language used for tokenization */
  language: string;
  /** ISO 8601 timestamp when the analysis was performed */
  timestamp: string;
  /** Version of the code-highlighter library used */
  version: string;
  /** Size of the input code in characters */
  inputSize: number;
  /** The output format used for highlighting (if applicable) */
  outputFormat?: 'html' | 'ansi';
  /** Theme name or path used for highlighting (if applicable) */
  theme?: string;
}

export interface CoverageInfo {
  /** Number of characters that were successfully tokenized */
  charactersAnalyzed: number;
  /** Percentage of input characters that were tokenized */
  percentage: number;
}

export interface TokenStatistics {
  /** Total number of tokens found */
  totalTokens: number;
  /** Count of tokens by type */
  tokenTypes: Record<string, number>;
  /** Analysis coverage information */
  coverage: CoverageInfo;
  /** Total number of lines in the source code */
  lineCount?: number;
  /** Average number of tokens per line */
  averageTokensPerLine?: number;
}

export interface TokenAnalysis {
  /** Information about the analysis context and configuration */
  metadata: AnalysisMetadata;
  /** Array of tokens with their types, values, and position information */
  tokens: EnhancedToken[];
  /** Statistical analysis of the tokenization results */
  statistics: TokenStatistics;
}

/**
 * Common token types used across different languages
 */
export type CommonTokenType = 
  // Programming language tokens
  | 'keyword' | 'string' | 'number' | 'comment' | 'identifier' 
  | 'operator' | 'punctuation' | 'whitespace' | 'function' 
  | 'variable' | 'class' | 'type' | 'decorator'
  // Bracket depth tracking
  | 'bracket-depth-0' | 'bracket-depth-1' | 'bracket-depth-2' 
  | 'bracket-depth-3' | 'bracket-depth-4' | 'bracket-depth-5'
  | 'bracket-unmatched'
  // Markdown-specific tokens
  | 'heading' | 'strong' | 'emphasis' | 'code-inline' | 'code-block'
  | 'link' | 'image' | 'blockquote' | 'list-bullet' | 'list-enum'
  | 'rule' | 'strike' | 'code-fence-start' | 'code-fence-end' | 'code-fence-content'
  // Language-specific extensions
  | 'property' | string; // Allow custom token types

/**
 * Export options for JSON analysis
 */
export interface ExportOptions {
  /** Include position information for each token */
  includePositions?: boolean;
  /** Include statistical analysis */
  includeStatistics?: boolean;
  /** Pretty-print the JSON output */
  compact?: boolean;
  /** Additional metadata to include */
  metadata?: Partial<AnalysisMetadata>;
}
