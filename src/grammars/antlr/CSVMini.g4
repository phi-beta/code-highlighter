// CSV Mini lexer grammar
lexer grammar CSVMini;

// =====================================
// UNIVERSAL BRACKETS (ALWAYS REQUIRED)
// =====================================
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// =====================================
// CSV-SPECIFIC TOKENS
// =====================================

// Quoted fields (CSV's main "bracket" concept)
QUOTED_FIELD: '"' (ESC_QUOTE | ~["])* '"';

// Field separator
COMMA: ',';

// Record separator
NEWLINE: '\r'? '\n';

// Numbers (for highlighting numeric fields) - PUT BEFORE FIELD_TEXT!
NUMBER: [0-9]+ ('.' [0-9]+)?;

// Unquoted field content (anything except comma, quote, newline)
FIELD_TEXT: ~[,"\r\n]+;

// Whitespace (spaces and tabs, but not newlines - they're significant in CSV)
WS: [ \t]+ -> skip;

// Escape sequences (escaped quotes in CSV)
fragment ESC_QUOTE: '""';
