// Expanded Markdown lexer grammar (approximation of CommonMark constructs)
// NOTE: This is still a lexer-only approximation. True Markdown parsing rules
// (especially for nested emphasis, list tightness, code fences w/ language info,
// block quote continuation, etc.) require a parser or dedicated Markdown engine.
// We focus on producing reasonably granular tokens for highlighting.
lexer grammar MarkdownMini;

// --- Block-level constructs -------------------------------------------------
HEADING_ATX: ATX_START ATX_TEXT? NEWLINE? {this.text.charAt(0) == '#'}? ;
fragment ATX_START: '#' '#'* ' '+ ;
fragment ATX_TEXT: ~[\r\n]* ;

HR: ( '---' | '***' | '___' ) [ \t]* NEWLINE ;
BLOCKQUOTE: '>' ' '? ~[\r\n]* NEWLINE? ;
LIST_BULLET: ('-'|'*'|'+') ' '+ ~[\r\n]* NEWLINE? ;
LIST_ENUM: DIGITS '.' ' '+ ~[\r\n]* NEWLINE? ;
fragment DIGITS: [0-9]+ ;

CODE_FENCE_START: '```' (~[\r\n`])* NEWLINE -> pushMode(CODE); // optional lang/info string

// --- Inline constructs ------------------------------------------------------
IMAGE: '![' (~[\]\r\n])* ']' '(' (~[)\r\n])+ ')' ;
LINK: '[' (~[\]\r\n])* ']' '(' (~[)\r\n])+ ')' ;
INLINE_CODE: '`' (~[`\r\n])+ '`' ;
BOLDITALIC: ('***' (~['*'\r\n])+ '***') | ('___' (~['_'\r\n])+ '___');
BOLD: ('**' (~['*'\r\n]|'*' ~'*')+ '**') | ('__' (~['_\r\n]|'_' ~'_')+ '__');
ITALIC: ('*' (~['*'\r\n])+ '*') | ('_' (~['_\r\n])+ '_');
STRIKETHROUGH: '~~' (~['~'\r\n])+ '~~';
HTML_TAG: '<' (~['<' '>'\r\n])* '>' ;
ESCAPED_CHAR: '\\' . ;
COMMENT: '<!--' .*? '-->' ;

// Fallback text for any non-newline remaining content
TEXT: ~[\r\n]+ ;

NEWLINE: ('\r'? '\n');
WS: [ \t]+ -> channel(HIDDEN);

// --- Code fence mode --------------------------------------------------------
mode CODE;
CODE_FENCE_END: '```' NEWLINE? -> popMode ;
CODE_TEXT: ~[`]+? (NEWLINE | EOF) ;
// Allow backticks inside code until closing fence (simplified)
