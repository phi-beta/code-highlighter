lexer grammar HtmlMini;

// === CRITICAL: Universal bracket tokens (NEVER include in composite tokens) ===
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// === HTML-specific delimiters ===
LT: '<';
GT: '>';
SLASH: '/';
EQUALS: '=';

// === HTML Comments ===
HTML_COMMENT: '<!--' .*? '-->';

// === DOCTYPE declaration ===
DOCTYPE: '<!DOCTYPE' [ \t\r\n]+ [a-zA-Z]+ [ \t\r\n]* '>';

// === HTML Tag names ===
TAG_NAME: [a-zA-Z][a-zA-Z0-9]*;

// === HTML Attribute names ===
ATTRIBUTE_NAME: [a-zA-Z][a-zA-Z0-9\-]*;

// === String literals (attribute values) ===
DOUBLE_QUOTED_STRING: '"' (~["\r\n] | '\\"')* '"';
SINGLE_QUOTED_STRING: '\'' (~['\r\n] | '\\\'')* '\'';

// === CSS in style blocks ===
// Note: This is simplified - in a real implementation, you'd switch to CSS lexer mode
STYLE_CONTENT: '{' .*? '}';

// === JavaScript in script blocks ===
// Note: This is simplified - in a real implementation, you'd switch to JS lexer mode  
SCRIPT_CONTENT: 'function' | 'const' | 'let' | 'var' | 'if' | 'else' | 'for' | 'while';

// === HTML Entities ===
HTML_ENTITY: '&' [a-zA-Z][a-zA-Z0-9]* ';' | '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';';

// === Numbers ===
NUMBER: [0-9]+ ('.' [0-9]+)?;

// === Generic identifiers ===
IDENTIFIER: [a-zA-Z_$][a-zA-Z0-9_$\-]*;

// === Text content ===
TEXT_CONTENT: ~[<>&\r\n\t ]+;

// === Whitespace ===
WS: [ \t\r\n]+ -> skip;
