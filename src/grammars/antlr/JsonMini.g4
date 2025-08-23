// JSON (RFC 8259) complete lexer grammar for highlighting.
// We keep it as a pure lexer grammar so the existing auto-registration
// continues to work without generating separate parser files.
lexer grammar JsonMini;

// Structural tokens
LCURLY: '{';
RCURLY: '}';
LBRACK: '[';
RBRACK: ']';
COLON: ':';
COMMA: ',';

// Literals
TRUE: 'true';
FALSE: 'false';
NULL: 'null';

// Number (strict JSON spec):
// number = [ minus ] int [ frac ] [ exp ]
// int = zero / (digit1-9 *DIGIT)
// frac = '.' 1*DIGIT
// exp = ('e' / 'E') ['-' / '+'] 1*DIGIT
NUMBER: MINUS? INT FRACTION? EXPONENT?;

// String (no unescaped control chars, standard escapes + \uXXXX)
STRING: '"' ( ESC | ~["\\\r\n] )* '"';

// Whitespace (produce token so spacing preserved for output handlers)
WS: [ \t\r\n]+;

// Fragments
fragment MINUS: '-';
fragment INT: '0' | [1-9] DIGITS?;
fragment DIGITS: DIGIT+;
fragment DIGIT: [0-9];
fragment FRACTION: '.' DIGITS;
fragment EXPONENT: [eE] [+-]? DIGITS;
fragment ESC: '\\' ["\\/bfnrt] | UNICODE;
fragment UNICODE: '\\' 'u' HEX HEX HEX HEX;
fragment HEX: [0-9a-fA-F];
