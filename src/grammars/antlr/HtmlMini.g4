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

// === String literals (attribute values) - HIGHEST PRIORITY ===
DOUBLE_QUOTED_STRING: '"' (~["\r\n] | '\\"')* '"';
SINGLE_QUOTED_STRING: '\'' (~['\r\n] | '\\\'')* '\'';

// === HTML Entities ===
HTML_ENTITY: '&' [a-zA-Z][a-zA-Z0-9]* ';' | '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';';

// === Numbers ===
NUMBER: [0-9]+ ('.' [0-9]+)?;

// === HTML Closing tag indicator (MUST come before TAG_NAME) ===  
CLOSING_TAG: '/' [a-zA-Z][a-zA-Z0-9]*;

// === HTML Tag names (HIGHER PRIORITY - before generic identifiers) ===
TAG_NAME: [a-zA-Z][a-zA-Z0-9]*;

// === HTML Attribute patterns ===
ATTRIBUTE_PATTERN: [a-zA-Z][a-zA-Z0-9\-]* '=' ('"' (~["\r\n])* '"' | '\'' (~['\r\n])* '\'');

// === CSS selectors and properties ===
CSS_SELECTOR: [.#][a-zA-Z][a-zA-Z0-9\-]*;
CSS_PROPERTY: [a-zA-Z\-]+ ':' [ \t]* [^;}]+;

// === Generic identifiers (LOWER PRIORITY) - more restrictive pattern ===
IDENTIFIER: [a-zA-Z_$][a-zA-Z0-9_$]*;

// === Text content (LOWEST PRIORITY) ===
TEXT_CONTENT: ~[<>&\r\n\t ()[\]{}=:."'/]+;

// === Whitespace (preserve for formatting) ===
NEWLINE: [\r\n]+;
WHITESPACE: [ \t]+;
