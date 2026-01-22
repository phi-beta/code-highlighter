lexer grammar ScalaMini;

// =====================================
// KEYWORDS
// =====================================

ABSTRACT: 'abstract';
CASE: 'case';
CATCH: 'catch';
CLASS: 'class';
DEF: 'def';
DO: 'do';
ELSE: 'else';
EXTENDS: 'extends';
FALSE: 'false';
FINAL: 'final';
FINALLY: 'finally';
FOR: 'for';
FORSOME: 'forSome';
IF: 'if';
IMPLICIT: 'implicit';
IMPORT: 'import';
LAZY: 'lazy';
MACRO: 'macro';
MATCH: 'match';
NEW: 'new';
NULL: 'null';
OBJECT: 'object';
OVERRIDE: 'override';
PACKAGE: 'package';
PRIVATE: 'private';
PROTECTED: 'protected';
RETURN: 'return';
SEALED: 'sealed';
SUPER: 'super';
THIS: 'this';
THROW: 'throw';
TRAIT: 'trait';
TRY: 'try';
TRUE: 'true';
TYPE: 'type';
VAL: 'val';
VAR: 'var';
WHILE: 'while';
WITH: 'with';
YIELD: 'yield';

// =====================================
// BUILT-IN TYPES
// =====================================

INT_TYPE: 'Int';
LONG_TYPE: 'Long';
SHORT_TYPE: 'Short';
BYTE_TYPE: 'Byte';
DOUBLE_TYPE: 'Double';
FLOAT_TYPE: 'Float';
CHAR_TYPE: 'Char';
BOOLEAN_TYPE: 'Boolean';
STRING_TYPE: 'String';
UNIT_TYPE: 'Unit';
ANY_TYPE: 'Any';
ANYREF_TYPE: 'AnyRef';
ANYVAL_TYPE: 'AnyVal';
NOTHING_TYPE: 'Nothing';
NULL_TYPE: 'Null';

// Collection types
OPTION_TYPE: 'Option';
SOME_TYPE: 'Some';
NONE_TYPE: 'None';
LIST_TYPE: 'List';
SEQ_TYPE: 'Seq';
SET_TYPE: 'Set';
MAP_TYPE: 'Map';
VECTOR_TYPE: 'Vector';
ARRAY_TYPE: 'Array';

// =====================================
// ANNOTATIONS
// =====================================

ANNOTATION: '@' [a-zA-Z_][a-zA-Z0-9_]*;

// =====================================
// COMMENTS
// =====================================

COMMENT_DOC: '/**' .*? '*/';
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_LINE: '//' ~[\r\n]*;

// =====================================
// STRING LITERALS
// =====================================

STRING_INTERPOLATED_S: 's' '"' ( STRING_ESCAPE | STRING_INTERPOLATION | ~[\\"\r\n$] )* '"';
STRING_INTERPOLATED_F: 'f' '"' ( STRING_ESCAPE | STRING_INTERPOLATION | ~[\\"\r\n$] )* '"';
STRING_INTERPOLATED_RAW: 'raw' '"' ( STRING_INTERPOLATION | ~["\r\n$] )* '"';
STRING_TRIPLE: '"""' .*? '"""';
STRING_DOUBLE: '"' ( STRING_ESCAPE | ~[\\"\r\n] )* '"';
CHAR_LITERAL: '\'' ( STRING_ESCAPE | ~[\\'\r\n] ) '\'';

fragment STRING_ESCAPE: '\\' [btnfr"'\\];
fragment STRING_INTERPOLATION: '$' [a-zA-Z_][a-zA-Z0-9_]* | '${' .*? '}';

// =====================================
// SYMBOL LITERAL
// =====================================

SYMBOL: '\'' [a-zA-Z_][a-zA-Z0-9_]*;

// =====================================
// NUMBERS
// =====================================

NUMBER_FLOAT: [0-9]+ '.' [0-9]+ ([eE][+-]?[0-9]+)? [fFdD]?;
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+[lL]?;
NUMBER_LONG: [0-9]+ [lL];
NUMBER_INT: [0-9]+;

// =====================================
// OPERATORS AND SPECIAL SYMBOLS
// =====================================

// Arrow and special operators
ARROW: '=>';
LEFT_ARROW: '<-';
UNDERSCORE: '_';
COLON_COLON: '::';
TRIPLE_COLON: ':::';
DOUBLE_PLUS: '++';
COLON_EQUAL: ':=';
HASH_HASH: '##';

// Type bounds
UPPER_BOUND: '<:';
LOWER_BOUND: '>:';
VIEW_BOUND: '<%';

// Arithmetic operators
PLUS_EQUAL: '+=';
MINUS_EQUAL: '-=';
STAR_EQUAL: '*=';
SLASH_EQUAL: '/=';
PERCENT_EQUAL: '%=';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';

// Comparison operators
EQUAL_EQUAL: '==';
NOT_EQUAL: '!=';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
LESS: '<';
GREATER: '>';

// Logical operators
AND_AND: '&&';
OR_OR: '||';
EXCLAMATION: '!';

// Bitwise operators
AND: '&';
OR: '|';
XOR: '^';
TILDE: '~';
LEFT_SHIFT: '<<';
RIGHT_SHIFT: '>>';
UNSIGNED_RIGHT_SHIFT: '>>>';

// Assignment and other
EQUAL: '=';
AT_SIGN: '@';

// =====================================
// IDENTIFIERS
// =====================================

IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;
BACKTICK_IDENTIFIER: '`' ~[`\r\n]+ '`';

// =====================================
// DELIMITERS
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
QUESTION: '?';

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
