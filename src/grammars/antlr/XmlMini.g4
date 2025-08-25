// XML lexer grammar - comprehensive XML 1.0 syntax support
// Handles elements, attributes, namespaces, CDATA, processing instructions, and comments
lexer grammar XmlMini;

// === CRITICAL: Universal bracket tokens (NEVER include in composite tokens) ===
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// === XML-specific delimiters ===
LT: '<';
GT: '>';
SLASH: '/';
EQUALS: '=';
QUESTION: '?';

// === XML Comments ===
XML_COMMENT: '<!--' .*? '-->';

// === Processing Instructions ===
PROCESSING_INSTRUCTION: '<?' ~[?]* '?>';

// === XML Declaration ===
XML_DECLARATION: '<?xml' [ \t\r\n]+ .*? '?>';

// === CDATA sections ===
CDATA_SECTION: '<![CDATA[' .*? ']]>';

// === DOCTYPE declaration ===
DOCTYPE: '<!DOCTYPE' [ \t\r\n]+ ~[>]+ '>';

// === XML Entity references ===
XML_ENTITY: '&' [a-zA-Z][a-zA-Z0-9]* ';' | '&#' [0-9]+ ';' | '&#x' [0-9a-fA-F]+ ';';

// === String literals (attribute values) - HIGHEST PRIORITY ===
DOUBLE_QUOTED_STRING: '"' (~["\r\n] | '\\"')* '"';
SINGLE_QUOTED_STRING: '\'' (~['\r\n] | '\\\'')* '\'';

// === Numbers ===
NUMBER: [0-9]+ ('.' [0-9]+)?;

// === XML closing tag indicator (MUST come before TAG_NAME) ===  
CLOSING_TAG: '/' [a-zA-Z_:][a-zA-Z0-9_:.-]*;

// === XML Attribute names (MAIN IDENTIFIER PATTERN) ===
ATTRIBUTE_NAME: [a-zA-Z_:][a-zA-Z0-9_:.-]*;

// === XML Namespace prefix ===
NAMESPACE_PREFIX: [a-zA-Z_][a-zA-Z0-9_]* ':';

// === Text content (LOWEST PRIORITY) ===
TEXT_CONTENT: ~[<>&\r\n\t ()[\]{}=]+ ;

// === Whitespace (preserve for formatting) ===
NEWLINE: [\r\n]+;
WHITESPACE: [ \t]+;
