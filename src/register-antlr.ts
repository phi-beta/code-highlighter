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
import { getDirname } from './utils/dirname.js';
import { getAssetPath } from './utils/assets.js';
import { registerAntlrLanguage } from './adapters/antlr.js';

// Basic heuristic mapping from token symbolic names to highlight categories.
function mapSymbolicToType(symbolic: string): string | undefined {
  const raw = symbolic;
  const s = symbolic.toLowerCase();
  
  // Markdown tokens
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
    // PlantUML token mappings
  if (raw === 'START_UML' || raw === 'END_UML') return 'keyword';
  if (raw === 'START_SALT' || raw === 'END_SALT') return 'keyword';
  if (raw === 'START_DITAA' || raw === 'END_DITAA') return 'keyword';
  if (raw === 'START_DOT' || raw === 'END_DOT') return 'keyword';
  if (raw === 'START_MINDMAP' || raw === 'END_MINDMAP') return 'keyword';
  if (raw === 'START_WBS' || raw === 'END_WBS') return 'keyword';
  if (raw === 'START_GANTT' || raw === 'END_GANTT') return 'keyword';
  if (raw === 'START_JSON' || raw === 'END_JSON') return 'keyword';
  if (raw === 'START_YAML' || raw === 'END_YAML') return 'keyword';
  if (raw === 'PARTICIPANT' || raw === 'ACTOR' || raw === 'BOUNDARY') return 'keyword';
  if (raw === 'CONTROL' || raw === 'ENTITY' || raw === 'DATABASE') return 'keyword';
  if (raw === 'COLLECTIONS' || raw === 'QUEUE') return 'keyword';
  if (raw === 'ACTIVATE' || raw === 'DEACTIVATE' || raw === 'AUTONUMBER') return 'keyword';
  if (raw === 'CLASS' || raw === 'INTERFACE' || raw === 'ABSTRACT') return 'keyword';
  if (raw === 'ENUM' || raw === 'PACKAGE' || raw === 'NAMESPACE') return 'keyword';
  if (raw === 'EXTENDS' || raw === 'IMPLEMENTS') return 'keyword';
  if (raw === 'COMPONENT' || raw === 'NODE' || raw === 'CLOUD') return 'keyword';
  if (raw === 'FRAME' || raw === 'RECTANGLE' || raw === 'STORAGE') return 'keyword';
  if (raw === 'ARTIFACT' || raw === 'STATE' || raw === 'USECASE') return 'keyword';
  if (raw === 'START' || raw === 'STOP' || raw === 'END') return 'keyword';
  if (raw === 'IF' || raw === 'THEN' || raw === 'ELSE' || raw === 'ELSEIF' || raw === 'ENDIF') return 'keyword';
  if (raw === 'WHILE' || raw === 'ENDWHILE' || raw === 'REPEAT' || raw === 'BACKWARD') return 'keyword';
  if (raw === 'FORK_AGAIN' || raw === 'END_FORK') return 'keyword';
  if (raw === 'STEREOTYPE') return 'type';
  if (raw === 'VISIBILITY') return 'operator';
  if (raw === 'ARROW_RIGHT' || raw === 'ARROW_LEFT' || raw === 'ARROW_BOTH') return 'operator';
  if (raw === 'ARROW_ASYNC' || raw === 'ARROW_RETURN' || raw === 'ARROW_LOST') return 'operator';
  if (raw === 'ARROW_SHORT' || raw === 'ARROW_DOTTED') return 'operator';
  if (raw === 'EXTENSION' || raw === 'COMPOSITION' || raw === 'AGGREGATION') return 'operator';
  if (raw === 'DEPENDENCY' || raw === 'REALIZATION' || raw === 'ASSOCIATION') return 'operator';
  if (raw === 'SKINPARAM' || raw === 'STYLE' || raw === 'TITLE') return 'keyword';
  if (raw === 'HEADER' || raw === 'FOOTER' || raw === 'LEGEND' || raw === 'END_LEGEND') return 'keyword';
  if (raw === 'NOTE' || raw === 'AS' || raw === 'OVER') return 'keyword';
  if (raw === 'LEFT' || raw === 'RIGHT' || raw === 'TOP' || raw === 'BOTTOM') return 'keyword';
  if (raw === 'COLOR_NAME') return 'color';
  if (raw === 'COMMENT_LINE') return 'comment';
  if (raw === 'COMMENT_BLOCK' || raw === 'COMMENT_MULTILINE') return 'comment';
  
  // Mermaid token mappings
  if (raw === 'GRAPH' || raw === 'FLOWCHART') return 'keyword';
  if (raw === 'GRAPH_TD' || raw === 'GRAPH_BT' || raw === 'GRAPH_LR' || raw === 'GRAPH_RL') return 'keyword';
  if (raw === 'SEQUENCE_DIAGRAM') return 'keyword';
  if (raw === 'CLASS_DIAGRAM') return 'keyword';
  if (raw === 'STATE_DIAGRAM') return 'keyword';
  if (raw === 'ER_DIAGRAM') return 'keyword';
  if (raw === 'GANTT') return 'keyword';
  if (raw === 'PIE') return 'keyword';
  if (raw === 'JOURNEY') return 'keyword';
  if (raw === 'GIT_GRAPH') return 'keyword';
  if (raw === 'REQUIREMENT_DIAGRAM') return 'keyword';
  if (raw === 'LOOP' || raw === 'ALT' || raw === 'OPT' || raw === 'PAR') return 'keyword';
  if (raw === 'CRITICAL' || raw === 'BREAK') return 'keyword';
  if (raw === 'START_STATE' || raw === 'CHOICE' || raw === 'FORK' || raw === 'JOIN') return 'keyword';
  if (raw === 'TITLE' || raw === 'DATE_FORMAT' || raw === 'SECTION') return 'keyword';
  if (raw === 'EXCLUDES' || raw === 'INCLUDES' || raw === 'TODAYMARKER') return 'keyword';
  if (raw === 'SHOW_DATA' || raw === 'TASK') return 'keyword';
  if (raw === 'COMMIT' || raw === 'BRANCH' || raw === 'CHECKOUT' || raw === 'MERGE') return 'keyword';
  if (raw === 'CHERRY_PICK') return 'keyword';
  if (raw === 'REQUIREMENT' || raw === 'ELEMENT') return 'keyword';
  if (raw === 'FUNCTIONAL_REQUIREMENT' || raw === 'INTERFACE_REQUIREMENT') return 'keyword';
  if (raw === 'PERFORMANCE_REQUIREMENT' || raw === 'PHYSICAL_REQUIREMENT') return 'keyword';
  if (raw === 'DESIGN_CONSTRAINT') return 'keyword';
  if (raw === 'ARROW_SOLID' || raw === 'ARROW_DOTTED' || raw === 'ARROW_THICK') return 'operator';
  if (raw === 'ARROW_OPEN' || raw === 'ARROW_DOTTED_OPEN' || raw === 'ARROW_THICK_OPEN') return 'operator';
  if (raw === 'ARROW_CIRCLE' || raw === 'ARROW_CROSS' || raw === 'ARROW_BIDIRECTIONAL') return 'operator';
  if (raw === 'SEQ_SOLID_ARROW' || raw === 'SEQ_DOTTED_ARROW') return 'operator';
  if (raw === 'SEQ_SOLID_LINE' || raw === 'SEQ_DOTTED_LINE') return 'operator';
  if (raw === 'SEQ_SOLID_CROSS' || raw === 'SEQ_DOTTED_CROSS') return 'operator';
  if (raw === 'SEQ_SOLID_OPEN' || raw === 'SEQ_DOTTED_OPEN') return 'operator';
  if (raw === 'INHERITANCE' || raw === 'COMPOSITION' || raw === 'AGGREGATION') return 'operator';
  if (raw === 'ASSOCIATION' || raw === 'DEPENDENCY' || raw === 'REALIZATION' || raw === 'LINK') return 'operator';
  if (raw === 'ER_ZERO_OR_ONE' || raw === 'ER_EXACTLY_ONE') return 'operator';
  if (raw === 'ER_ZERO_OR_MORE' || raw === 'ER_ONE_OR_MORE') return 'operator';
  if (raw === 'STYLE' || raw === 'CLASS_DEF' || raw === 'CLASS_ASSIGN') return 'keyword';
  if (raw === 'LINK_STYLE' || raw === 'CLICK' || raw === 'CALLBACK' || raw === 'CALL') return 'keyword';
  if (raw === 'HREF' || raw === 'DIRECTION') return 'keyword';
  if (raw === 'TB' || raw === 'BT' || raw === 'LR' || raw === 'RL') return 'keyword';
  if (raw === 'LEFT_OF' || raw === 'RIGHT_OF' || raw === 'OVER_OF') return 'keyword';
  if (raw === 'PUBLIC' || raw === 'PRIVATE' || raw === 'PROTECTED' || raw === 'INTERNAL') return 'operator';
  if (raw === 'SUBGRAPH' || raw === 'END_SUBGRAPH') return 'keyword';
  if (raw === 'DATE') return 'number';
  if (raw === 'STRING_BACKTICK') return 'string';
  if (raw === 'COMMENT') return 'comment';
    // XML token mappings (MUST come before general fallback patterns)
  if (raw === 'XML_COMMENT') return 'comment';
  if (raw === 'XML_DECLARATION') return 'keyword';
  if (raw === 'PROCESSING_INSTRUCTION') return 'keyword';
  if (raw === 'CDATA_SECTION') return 'string';
  if (raw === 'XML_ENTITY') return 'string';
  if (raw === 'ATTRIBUTE_NAME') return 'property';
  if (raw === 'TAG_NAME') return 'keyword';  // For opening tag names
  if (raw === 'NAMESPACE_PREFIX') return 'type';  // Use type for namespace prefixes
  if (raw === 'QUESTION') return 'punctuation';
  
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
  // CSS token mappings
  if (raw === 'HEX_COLOR') return 'color';
  if (raw === 'NAMED_COLOR') return 'color';
  if (raw === 'FUNCTION') return 'function';
  if (raw === 'UNIT') return 'number';
  if (raw === 'PERCENTAGE') return 'number';
  if (raw === 'AT_RULE') return 'at-rule';
  if (raw === 'CLASS_SELECTOR') return 'selector';
  if (raw === 'ID_SELECTOR') return 'selector';
  if (raw === 'PSEUDO_CLASS') return 'selector';
  if (raw === 'PSEUDO_ELEMENT') return 'selector';
  if (raw === 'PROPERTY') return 'property';
  if (raw === 'CUSTOM_PROPERTY') return 'property';
  if (raw === 'IMPORTANT') return 'keyword';
  if (raw === 'URL') return 'string';
  if (raw === 'COMMENT_BLOCK') return 'comment';
  if (raw === 'ELEMENT') return 'identifier';
  if (raw === 'LPAREN') return 'punctuation';
  if (raw === 'RPAREN') return 'punctuation';
  // HTML token mappings
  if (raw === 'HTML_COMMENT') return 'comment';
  if (raw === 'DOCTYPE') return 'keyword';
  if (raw === 'CLOSING_TAG') return 'keyword';  // Closing tags same as opening tags
  if (raw === 'ATTRIBUTE_PATTERN') return 'property';  // Attribute name=value pairs
  if (raw === 'DOUBLE_QUOTED_STRING') return 'string';
  if (raw === 'SINGLE_QUOTED_STRING') return 'string';
  if (raw === 'CSS_SELECTOR') return 'function';  // CSS class/id selectors
  if (raw === 'CSS_PROPERTY') return 'property';  // CSS property: value pairs
  if (raw === 'HTML_ENTITY') return 'string';
  if (raw === 'TEXT_CONTENT') return 'text';  // Change from identifier to text for better contrast
  if (raw === 'LT') return 'punctuation';
  if (raw === 'GT') return 'punctuation';
  if (raw === 'SLASH') return 'punctuation';
  if (raw === 'EQUALS') return 'punctuation';
  if (raw === 'NEWLINE') return 'whitespace';
  if (raw === 'WHITESPACE') return 'whitespace';
  
  // CSV token mappings
  if (raw === 'QUOTED_FIELD') return 'string';
  if (raw === 'UNQUOTED_FIELD') return 'text';  
  if (raw === 'BOOLEAN') return 'keyword';
  if (raw === 'EMPTY_FIELD') return 'string';
  if (raw === 'COMMA') return 'punctuation';
  if (raw === 'SEMICOLON') return 'punctuation';
  if (raw === 'TAB') return 'punctuation';
  if (raw === 'PIPE') return 'punctuation';
  
  // YAML token mappings
  if (raw === 'DOCUMENT_START') return 'keyword';
  if (raw === 'DOCUMENT_END') return 'keyword';
  if (raw === 'DOUBLE_QUOTED_STRING') return 'string';
  if (raw === 'SINGLE_QUOTED_STRING') return 'string';
  if (raw === 'YAML_NUMBER') return 'number';
  if (raw === 'YAML_FLOAT') return 'number';
  if (raw === 'YAML_SPECIAL_FLOAT') return 'number';
  if (raw === 'YAML_BOOLEAN') return 'keyword';
  if (raw === 'YAML_NULL') return 'keyword';
  if (raw === 'ANCHOR') return 'type';  // & anchors as types
  if (raw === 'ALIAS') return 'type';   // * aliases as types  
  if (raw === 'TAG') return 'type'; // ! tags as type annotations
  if (raw === 'PLAIN_SCALAR') return 'text';
  if (raw === 'COLON') return 'punctuation';
  if (raw === 'DASH') return 'punctuation';
  if (raw === 'QUESTION') return 'punctuation';
  if (raw === 'GT') return 'punctuation';
  if (raw === 'AMPERSAND') return 'punctuation';
  if (raw === 'ASTERISK') return 'punctuation';
  
  return undefined;
}

/**
 * Post-process HTML tokens to fix opening tag recognition.
 * Converts 'identifier' tokens to 'keyword' when they appear in tag contexts.
 */
function postProcessHtmlTokens(tokens: { type: string; value: string }[]): { type: string; value: string }[] {
  const result = [...tokens];
  
  for (let i = 0; i < result.length; i++) {
    const token = result[i];
    const prevToken = i > 0 ? result[i - 1] : null;
    
    // If this is an identifier token that follows a '<' punctuation, 
    // it's likely an opening tag name that should be a keyword
    if (token.type === 'identifier' && 
        prevToken && 
        prevToken.type === 'punctuation' && 
        prevToken.value === '<') {
      result[i] = { ...token, type: 'keyword' };
    }
  }
  
  return result;
}

/**
 * Post-process XML tokens to fix opening tag recognition and text content.
 * - Converts 'property' tokens (ATTRIBUTE_NAME) to 'keyword' when they appear right after '<' (opening tag names)
 * - Converts 'property' tokens (ATTRIBUTE_NAME) to 'text' when they appear between '>' and '<' (text content)
 */
function postProcessXmlTokens(tokens: { type: string; value: string }[]): { type: string; value: string }[] {
  const result = [...tokens];
  let insideTag = false;
  
  for (let i = 0; i < result.length; i++) {
    const token = result[i];
    const prevToken = i > 0 ? result[i - 1] : null;
    
    // Track whether we're inside a tag or in text content
    if (token.type === 'punctuation') {
      if (token.value === '<') {
        insideTag = true;
      } else if (token.value === '>') {
        insideTag = false;
      }
    }
    
    // Handle property tokens (ATTRIBUTE_NAME) based on context
    if (token.type === 'property') {
      if (prevToken && 
          prevToken.type === 'punctuation' && 
          prevToken.value === '<') {
        // This is an opening tag name - convert to keyword
        result[i] = { ...token, type: 'keyword' };
      } else if (!insideTag) {
        // This is text content between tags - convert to text
        result[i] = { ...token, type: 'text' };
      }
      // Otherwise, it's a real attribute name - keep as property
    }
  }
  
  return result;
}

/**
 * Map SQL symbolic token names to semantic types.
 */
function mapSqlSymbolicToType(raw: string): string | undefined {
  // SQL Keywords
  if (['SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
       'CREATE', 'DROP', 'ALTER', 'TABLE', 'VIEW', 'INDEX', 'DATABASE', 'SCHEMA',
       'USE', 'SHOW', 'DESCRIBE', 'DESC', 'DISTINCT', 'GROUP', 'BY', 'HAVING',
       'ORDER', 'ASC', 'DESC_ORDER', 'LIMIT', 'AS', 'IF', 'EXISTS', 'ADD', 'MODIFY',
       'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'ON', 'WITH',
       'AND', 'OR', 'NOT', 'NULL', 'PRIMARY', 'FOREIGN', 'KEY', 'REFERENCES',
       'UNIQUE', 'AUTO_INCREMENT', 'DEFAULT', 'TABLES', 'DATABASES', 'COLUMN'].includes(raw)) {
    return 'keyword';
  }
  
  // Data Types
  if (['VARCHAR', 'CHAR', 'INT', 'INTEGER', 'BIGINT', 'SMALLINT', 'TINYINT',
       'DECIMAL', 'NUMERIC', 'FLOAT', 'DOUBLE', 'REAL', 'DATE', 'TIME',
       'DATETIME', 'TIMESTAMP', 'TEXT', 'BLOB', 'BOOLEAN'].includes(raw)) {
    return 'type';
  }
  
  // SQL Functions (Aggregate, Window, etc.)
  if (['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'RANK', 'DENSE_RANK', 'ROW_NUMBER',
       'OVER', 'PARTITION', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'].includes(raw)) {
    return 'function';
  }
  
  // Boolean literals
  if (['TRUE', 'FALSE', 'BOOLEAN_LITERAL'].includes(raw)) {
    return 'boolean';
  }
  
  // Strings and Numbers
  if (raw === 'STRING') return 'string';
  if (raw === 'NUMBER') return 'number';
  
  // Comments
  if (raw === 'COMMENT') return 'comment';
  
  // Whitespace - essential for preserving formatting
  if (raw === 'WHITESPACE') return 'whitespace';
  
  // Operators
  if (['EQUALS', 'NOT_EQUALS', 'LESS_THAN', 'GREATER_THAN', 'LESS_EQUAL', 'GREATER_EQUAL',
       'PLUS', 'MINUS', 'MULTIPLY', 'DIVIDE', 'MODULO'].includes(raw)) {
    return 'operator';
  }
  
  // Punctuation and Brackets
  if (['SEMICOLON', 'COMMA', 'MULTIPLY'].includes(raw)) return 'punctuation';
  if (['LPAREN', 'RPAREN'].includes(raw)) return 'bracket';
  
  // Identifiers (table names, column names, etc.)
  if (['IDENTIFIER', 'QUOTED_IDENTIFIER'].includes(raw)) return 'identifier';
  
  return undefined;
}

/**
 * Post-process YAML tokens to highlight keys differently from values.
 * Converts 'text' tokens (PLAIN_SCALAR) to 'property' when they appear before ':' (YAML keys).
 * Avoids converting timestamp components by detecting timestamp patterns.
 */
function postProcessYamlTokens(tokens: { type: string; value: string }[]): { type: string; value: string }[] {
  const result = [...tokens];
  
  for (let i = 0; i < result.length; i++) {
    const token = result[i];
    const nextToken = i < result.length - 1 ? result[i + 1] : null;
    const nextNextToken = i < result.length - 2 ? result[i + 2] : null;
    
    // If this is a text token (PLAIN_SCALAR) that is followed by a colon
    if (token.type === 'text' && 
        nextToken && 
        nextToken.type === 'punctuation' && 
        nextToken.value === ':') {
      
      // Check if this looks like a timestamp pattern to avoid false key detection
      // Patterns like: "2023-01-01T00:00:00Z" or "HH:MM:SS"
      const isTimestampComponent = 
        // Check if token looks like a date/time component (ends with T + digits)
        /\d{4}-\d{2}-\d{2}T\d{2}$/.test(token.value) ||
        // Check if next token after colon is a number (time component)
        (nextNextToken && nextNextToken.type === 'number' && /^\d{2}$/.test(nextNextToken.value)) ||
        // Check if this token is just digits (time component) and preceded by another time component
        (/^\d{2}$/.test(token.value) && i > 1 && 
         result[i-1].type === 'punctuation' && result[i-1].value === ':' &&
         result[i-2].type === 'number');
      
      if (!isTimestampComponent) {
        // This is a real YAML key - convert to property
        result[i] = { ...token, type: 'property' };
      }
    }
  }
  
  return result;
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
  // Use explicit path relative to this module's directory
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  let baseDir = opts.dir || path.join(currentDir, 'generated/antlr');
  
  // If the compiled version doesn't exist, try multiple fallback paths
  if (!fs.existsSync(baseDir)) {
    // FIRST: Try the source directory relative to current module (for source .ts files during tests)
    const sourcePath = path.join(currentDir, '../../src/generated/antlr');
    if (fs.existsSync(sourcePath)) {
      baseDir = sourcePath;
    } else {
      // FALLBACK: Try from current working directory (when running from project root)
      const cwdPath = path.join(process.cwd(), 'src/generated/antlr');
      if (fs.existsSync(cwdPath)) {
        baseDir = cwdPath;
      } else {
        baseDir = sourcePath; // Keep for error message
      }
    }
  }
  
  // In pkg, also try the snapshot path directly
  if ((process as any).pkg && !opts.dir) {
    const pkgPath = `/snapshot/${path.basename(process.execPath, path.extname(process.execPath))}/dist-cjs/src/generated/antlr`;
    if (fs.existsSync(pkgPath)) {
      baseDir = pkgPath;
    }
  }
  // If antlr4ts CLI nested structure is present, descend into it
  // DISABLED: This causes issues when running from compiled dist/ because .ts files can't be imported
  // const nested = path.join(baseDir, 'src', 'grammars', 'antlr');
  // if (fs.existsSync(nested)) baseDir = nested;
  if (!fs.existsSync(baseDir)) {
    if (opts.verbose) console.warn('[register-antlr] No generated ANTLR directory found at', baseDir);
    return;
  }
  // Accept either .js (built) or .ts (stub/ts-node) files
  const all = fs.readdirSync(baseDir).filter(f => /\.(js|ts)$/.test(f) && !/\.d\.ts$/.test(f));
  
  // Prioritize .ts files over .js files for each base name
  const filesMap = new Map<string, string>();
  for (const file of all) {
    const base = file.replace(/\.(js|ts)$/, '');
    const isTs = file.endsWith('.ts');
    
    if (!filesMap.has(base) || isTs) {
      filesMap.set(base, file);
    }
  }
  const prioritizedFiles = Array.from(filesMap.values());
  
  // Classify candidates - for parser grammars, we want *Lexer.ts files
  const stubLexerFiles = new Set(prioritizedFiles.filter(f => /Lexer\.(js|ts)$/.test(f) && /(Bash|CSS|CSV|Html|JavaScript|Json|Markdown|Python|TypeScript)MiniLexer/.test(f)));
  const realGeneratedFiles = new Set(prioritizedFiles.filter(f => /Mini\.(js|ts)$/.test(f) && !/Lexer\.(js|ts)$/.test(f)));
  // For parser grammars, also include the generated lexer files
  const parserLexerFiles = new Set(prioritizedFiles.filter(f => /MiniLexer\.(js|ts)$/.test(f)));
  
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
    const isStub = /Lexer\.(js|ts)$/.test(file) && !/(Bash|CSS|CSV|Html|JavaScript|Json|Markdown|Python|TypeScript)MiniLexer/.test(file);
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
          // Use SQL-specific mapping for SQL language, otherwise use general mapping
          const mapped = langName === 'sql' ? mapSqlSymbolicToType(name) : mapSymbolicToType(name);
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
      
      // Special post-processing for HTML to fix opening tag recognition
      if (langName === 'html') {
        const { registerLanguage, getLanguage } = await import('./index.js');
        const { tokenizeWithAntlr } = await import('./adapters/antlr.js');
        const { createDelegatingHtmlTokenizer } = await import('./utils/html-delegation.js');
        
        // Create the base HTML tokenizer
        const baseHtmlTokenizer = (code: string) => {
          const rawTokens = tokenizeWithAntlr(createLexer, code, { tokenMap, defaultType: 'identifier' });
          return postProcessHtmlTokens(rawTokens);
        };
        
        // Register HTML with delegation to CSS/JS tokenizers
        registerLanguage('html', (code: string) => {
          const cssTokenizer = getLanguage('css');
          const jsTokenizer = getLanguage('javascript');
          
          const delegatingTokenizer = createDelegatingHtmlTokenizer(
            baseHtmlTokenizer,
            cssTokenizer,
            jsTokenizer
          );
          
          return delegatingTokenizer(code);
        });
      }
      
      // Special post-processing for XML to fix opening tag recognition
      if (langName === 'xml') {
        const { registerLanguage } = await import('./index.js');
        const { tokenizeWithAntlr } = await import('./adapters/antlr.js');
        
        // Register XML with post-processing to fix opening tag recognition
        registerLanguage('xml', (code: string) => {
          const rawTokens = tokenizeWithAntlr(createLexer, code, { tokenMap, defaultType: 'identifier' });
          return postProcessXmlTokens(rawTokens);
        });
      }
      
      // Special post-processing for YAML to highlight keys differently from values
      if (langName === 'yaml') {
        const { registerLanguage } = await import('./index.js');
        const { tokenizeWithAntlr } = await import('./adapters/antlr.js');
        
        // Register YAML with post-processing to highlight keys as properties
        registerLanguage('yaml', (code: string) => {
          const rawTokens = tokenizeWithAntlr(createLexer, code, { tokenMap, defaultType: 'identifier' });
          return postProcessYamlTokens(rawTokens);
        });
      }
      
      if (langName === 'javascript') await registerAntlrLanguage({ name: 'js', createLexer, tokenMap });
      if (langName === 'python') await registerAntlrLanguage({ name: 'py', createLexer, tokenMap });
      if (langName === 'bash') await registerAntlrLanguage({ name: 'sh', createLexer, tokenMap });
      if (langName === 'markdown') await registerAntlrLanguage({ name: 'md', createLexer, tokenMap });
      if (langName === 'typescript') await registerAntlrLanguage({ name: 'ts', createLexer, tokenMap });
      // CSS has no common aliases but register main name
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
