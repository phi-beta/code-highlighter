// Template for new language grammar
// Copy this to: src/grammars/antlr/[LANGUAGE]Mini.g4

lexer grammar [LANGUAGE]Mini;

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
// LANGUAGE-SPECIFIC TOKENS
// =====================================

// Keywords (customize for your language)
KEYWORD: ('if'|'else'|'function'|'class'|'return'|'var'|'let'|'const');

// Functions (NO PARENTHESES!)
FUNCTION: [a-zA-Z_][a-zA-Z0-9_]*;  // Refine based on language rules

// Literals
STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';
NUMBER: [0-9]+ ('.' [0-9]+)?;

// Comments (customize patterns)
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';

// Operators & Punctuation
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
COLON: ':';
ASSIGN: '=';
PLUS: '+';
MINUS: '-';

// Identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

// Whitespace
WS: [ \t\r\n]+ -> skip;

// Escape sequences (for strings)
fragment ESC: '\\' [btnfr"'\\];
