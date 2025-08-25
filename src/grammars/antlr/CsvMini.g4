// CSV lexer grammar - RFC 4180 compliant CSV syntax
// Handles quoted fields, escaped quotes, and multi-line content
lexer grammar CsvMini;

// === CRITICAL: Universal bracket tokens (NEVER include in composite tokens) ===
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// === CSV-specific delimiters ===
COMMA: ',';
SEMICOLON: ';';  // Alternative delimiter
TAB: '\t';       // Tab-separated values
PIPE: '|';       // Pipe-separated values

// === CSV quoted fields (highest priority) ===
QUOTED_FIELD: '"' ('""' | ~["])* '"';

// === CSV Numbers (before unquoted fields) ===
NUMBER: '-'? [0-9]+ ('.' [0-9]+)? ([eE] [+-]? [0-9]+)?;

// === CSV Boolean values ===
BOOLEAN: 'true' | 'false' | 'TRUE' | 'FALSE' | 'True' | 'False';

// === CSV Empty field ===
EMPTY_FIELD: '""';

// === CSV Unquoted field (most permissive) ===
UNQUOTED_FIELD: ~[,;\t|\r\n"]+;

// === Line endings ===
NEWLINE: [\r\n]+;

// === Whitespace (preserve for CSV structure) ===
WHITESPACE: [ ]+;
