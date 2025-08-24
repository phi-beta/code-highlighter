// Enhanced Markdown lexer grammar - lexer-only with proper precedence
// Provides comprehensive CommonMark constructs while maintaining lexer simplicity.
lexer grammar MarkdownMini;

// --- Lexer Rules (UPPERCASE) - Order matters! More specific patterns first ---

// Enhanced lists with task list support - TASK_LIST_ITEM must come before LIST_BULLET  
TASK_LIST_ITEM: ('-'|'*'|'+') ' [' ('x'|'X'|' ') ']' ' ' ~[\r\n]* NEWLINE? ;
LIST_BULLET: ('-'|'*'|'+') ' '+ ~[\r\n]* NEWLINE? ;
LIST_ENUM: [0-9]+ '.' ' '+ ~[\r\n]* NEWLINE? ;

// Headers
HEADING_ATX: '#'+ ' '+ ~[\r\n]* NEWLINE? ;

// HR - must come before setext to prioritize horizontal rules
HR: ( '***' '*'+ | '___' '_'+ | '---' '-'* ) [ \t]* NEWLINE ;

// Setext headers - underlines only (parser would match with preceding text)
SETEXT_UNDERLINE_1: '===' '='+ [ \t]* NEWLINE ;
SETEXT_UNDERLINE_2: '---' '-'+ [ \t]* NEWLINE ;

// Tables - must come before other patterns
TABLE_SEPARATOR: '|' [ \t]* ('-'+ | ':' '-'+ | '-'+ ':' | ':' '-'+ ':') [ \t]* ('|' [ \t]* ('-'+ | ':' '-'+ | '-'+ ':' | ':' '-'+ ':') [ \t]*)+ '|'? [ \t]* NEWLINE ;
TABLE_ROW: '|' (~[|\r\n]+ '|')+ [ \t]* NEWLINE ;

BLOCKQUOTE: '>' ' '? ~[\r\n]* NEWLINE ;

// Code blocks - must come before inline patterns
CODE_FENCE_START: '```' (~[\r\n`])* NEWLINE ;
CODE_FENCE_END: '```' NEWLINE? ;
CODE_BLOCK_INDENTED: ('    ' | '\t') ~[\r\n]* NEWLINE ;

// --- Inline lexer tokens - must come before TEXT ----------------------------
// Emphasis and formatting - most specific first
BOLDITALIC: ('***' (~[*\r\n])+ '***') | ('___' (~[_\r\n])+ '___');
BOLD: ('**' (~[*\r\n]|'*' ~'*')+ '**') | ('__' (~[_\r\n]|'_' ~'_')+ '__');
ITALIC: ('*' (~[*\r\n])+ '*') | ('_' (~[_\r\n])+ '_');
STRIKETHROUGH: '~~' (~[~\r\n])+ '~~';
INLINE_CODE: '`' (~[`\r\n])+ '`' ;

// Links and images
IMAGE: '![' (~[\]\r\n])* ']' '(' (~[)\r\n])+ ')' ;
LINK: '[' (~[\]\r\n])* ']' '(' (~[)\r\n])+ ')' ;
LINK_REFERENCE: '[' (~[\]\r\n])+ ']' '[' (~[\]\r\n])* ']' ;
LINK_DEFINITION: '[' (~[\]\r\n])+ ']:' [ \t]* (~[ \t\r\n])+ [ \t]* ('"' (~["\r\n])* '"')? [ \t]* NEWLINE ;
AUTOLINK: '<' (~[<>\r\n ])+ '>' ;

// Footnotes
FOOTNOTE_REF: '[^' (~[\]\r\n])+ ']' ;
FOOTNOTE_DEF: '[^' (~[\]\r\n])+ ']:' [ \t]* (~[\r\n])* NEWLINE ;

// Line breaks - very specific pattern
HARD_LINE_BREAK: '  '+ NEWLINE ;

// HTML and escaping
HTML_TAG: '<' (~[<>\r\n])* '>' ;
ESCAPED_CHAR: '\\' . ;
COMMENT: '<!--' .*? '-->' ;

// Basic tokens - TEXT must come last as fallback
// CODE_TEXT for content that should be further processed for inline patterns  
CODE_TEXT: ~[`\r\n]+ ;
TEXT: ~[\r\n]+ ;
NEWLINE: ('\r'? '\n');
WS: [ \t]+ -> channel(HIDDEN);
