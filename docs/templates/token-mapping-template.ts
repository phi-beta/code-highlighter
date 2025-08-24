// Template for token mappings
// Add this to register-antlr.ts

const LANGUAGETokenMap: Record<string, string> = {
  // =====================================
  // UNIVERSAL MAPPINGS (COPY FOR ALL LANGUAGES)
  // =====================================
  LPAREN: 'punctuation',
  RPAREN: 'punctuation',
  LBRACE: 'punctuation',
  RBRACE: 'punctuation',
  LBRACKET: 'punctuation',
  RBRACKET: 'punctuation',
  SEMICOLON: 'punctuation',
  COMMA: 'punctuation',
  DOT: 'punctuation',
  COLON: 'punctuation',
  
  // =====================================
  // LANGUAGE-SPECIFIC MAPPINGS
  // =====================================
  KEYWORD: 'keyword',
  FUNCTION: 'function',
  STRING_DOUBLE: 'string',
  STRING_SINGLE: 'string',
  NUMBER: 'number',
  COMMENT_LINE: 'comment',
  COMMENT_BLOCK: 'comment',
  ASSIGN: 'operator',
  PLUS: 'operator',
  MINUS: 'operator',
  IDENTIFIER: 'identifier',
};

// Add to the lexerTokenMaps object:
// [language]: LANGUAGETokenMap,
