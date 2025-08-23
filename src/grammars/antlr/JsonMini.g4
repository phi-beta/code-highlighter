// Minimal JSON lexer grammar
lexer grammar JsonMini;

LCURLY: '{';
RCURLY: '}';
LBRACK: '[';
RBRACK: ']';
COLON: ':';
COMMA: ',';
TRUE: 'true';
FALSE: 'false';
NULL: 'null';
NUMBER: '-'? DIGIT+ ('.' DIGIT+)? ([eE] [+-]? DIGIT+)?;
STRING: '"' (ESC | ~["\\\r\n])* '"';
WS: [ \t\r\n]+;

fragment DIGIT: [0-9];
fragment ESC: '\\' ["\\/bfnrt] | '\\' 'u' HEX HEX HEX HEX;
fragment HEX: [0-9a-fA-F];
