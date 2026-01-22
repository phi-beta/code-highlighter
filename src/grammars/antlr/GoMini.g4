lexer grammar GoMini;

// =====================================
// KEYWORDS
// =====================================

// Package and imports
PACKAGE: 'package';
IMPORT: 'import';

// Function and type declarations
FUNC: 'func';
VAR: 'var';
CONST: 'const';
TYPE: 'type';
STRUCT: 'struct';
INTERFACE: 'interface';
MAP: 'map';
CHAN: 'chan';

// Control flow
IF: 'if';
ELSE: 'else';
FOR: 'for';
RANGE: 'range';
SWITCH: 'switch';
CASE: 'case';
DEFAULT: 'default';
BREAK: 'break';
CONTINUE: 'continue';
GOTO: 'goto';
FALLTHROUGH: 'fallthrough';
RETURN: 'return';
SELECT: 'select';

// Goroutines and concurrency
GO: 'go';
DEFER: 'defer';

// Boolean literals
TRUE: 'true';
FALSE: 'false';

// Nil
NIL: 'nil';

// =====================================
// BUILT-IN TYPES
// =====================================

// Integer types
INT: 'int';
INT8: 'int8';
INT16: 'int16';
INT32: 'int32';
INT64: 'int64';
UINT: 'uint';
UINT8: 'uint8';
UINT16: 'uint16';
UINT32: 'uint32';
UINT64: 'uint64';
UINTPTR: 'uintptr';

// Float types
FLOAT32: 'float32';
FLOAT64: 'float64';

// Complex types
COMPLEX64: 'complex64';
COMPLEX128: 'complex128';

// Other types
BOOL: 'bool';
BYTE: 'byte';
RUNE: 'rune';
STRING_TYPE: 'string';
ERROR: 'error';

// Built-in functions
MAKE: 'make';
NEW: 'new';
LEN: 'len';
CAP: 'cap';
APPEND: 'append';
COPY: 'copy';
DELETE: 'delete';
CLOSE: 'close';
PANIC: 'panic';
RECOVER: 'recover';
PRINT: 'print';
PRINTLN: 'println';

// =====================================
// OPERATORS
// =====================================

// Assignment and declaration
COLON_ASSIGN: ':=';
ELLIPSIS: '...';
ARROW: '<-';

// Increment/Decrement
PLUS_PLUS: '++';
MINUS_MINUS: '--';

// Logical operators
AND_AND: '&&';
OR_OR: '||';

// Comparison operators
EQ_EQ: '==';
NOT_EQ: '!=';
LE: '<=';
GE: '>=';

// Bitwise operators
SHL: '<<';
SHR: '>>';
AND_NOT: '&^';

// Compound assignment
PLUS_EQ: '+=';
MINUS_EQ: '-=';
STAR_EQ: '*=';
SLASH_EQ: '/=';
PERCENT_EQ: '%=';
AND_EQ: '&=';
OR_EQ: '|=';
CARET_EQ: '^=';
SHL_EQ: '<<=';
SHR_EQ: '>>=';
AND_NOT_EQ: '&^=';

// Simple operators
LT: '<';
GT: '>';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';
CARET: '^';
NOT: '!';
AND: '&';
OR: '|';
EQ: '=';

// =====================================
// PUNCTUATION
// =====================================

LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACK: '[';
RBRACK: ']';
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
COLON: ':';

// =====================================
// LITERALS
// =====================================

// Rune literal (character)
RUNE_LITERAL: '\'' ( ~['\\\r\n] | '\\' . ) '\'';

// String literals
RAW_STRING: '`' ~'`'* '`';
STRING_LITERAL: '"' ( ~["\\\r\n] | '\\' . )* '"';

// Numbers
HEX_NUMBER: '0' [xX] [0-9a-fA-F] ([0-9a-fA-F] | '_')* ;
OCTAL_NUMBER: '0' [oO] [0-7] ([0-7] | '_')* ;
BINARY_NUMBER: '0' [bB] [01] ([01] | '_')* ;

FLOAT_NUMBER: 
    [0-9] ([0-9] | '_')* '.' [0-9] ([0-9] | '_')* ([eE] [+-]? [0-9] ([0-9] | '_')*)?
    | [0-9] ([0-9] | '_')* [eE] [+-]? [0-9] ([0-9] | '_')*
    | '.' [0-9] ([0-9] | '_')* ([eE] [+-]? [0-9] ([0-9] | '_')*)?
    ;

INT_NUMBER: [0-9] ([0-9] | '_')* ;

// Imaginary literals
IMAGINARY: (INT_NUMBER | FLOAT_NUMBER) 'i';

// =====================================
// IDENTIFIERS
// =====================================

IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]* ;

// =====================================
// COMMENTS
// =====================================

LINE_COMMENT: '//' ~[\r\n]* ;
BLOCK_COMMENT: '/*' .*? '*/' ;

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+ ;
