lexer grammar DartMini;

// =====================================
// KEYWORDS
// =====================================

// Declaration keywords
CLASS: 'class';
ABSTRACT: 'abstract';
INTERFACE: 'interface';
MIXIN: 'mixin';
EXTENSION: 'extension';
ENUM: 'enum';
TYPEDEF: 'typedef';

// Function keywords
VOID: 'void';
ASYNC: 'async';
SYNC: 'sync';
AWAIT: 'await';
YIELD: 'yield';

// Variable keywords
VAR: 'var';
FINAL: 'final';
CONST: 'const';
LATE: 'late';
REQUIRED: 'required';
STATIC: 'static';

// Control flow
IF: 'if';
ELSE: 'else';
FOR: 'for';
WHILE: 'while';
DO: 'do';
SWITCH: 'switch';
CASE: 'case';
DEFAULT: 'default';
BREAK: 'break';
CONTINUE: 'continue';
RETURN: 'return';
THROW: 'throw';
RETHROW: 'rethrow';
TRY: 'try';
CATCH: 'catch';
FINALLY: 'finally';
ASSERT: 'assert';

// OOP keywords
THIS: 'this';
SUPER: 'super';
NEW: 'new';
FACTORY: 'factory';
OPERATOR: 'operator';
GET: 'get';
SET: 'set';
EXTERNAL: 'external';
COVARIANT: 'covariant';

// Visibility
LIBRARY: 'library';
IMPORT: 'import';
EXPORT: 'export';
PART: 'part';
OF: 'of';
SHOW: 'show';
HIDE: 'hide';
AS: 'as';
DEFERRED: 'deferred';

// Special keywords
IN: 'in';
IS: 'is';
WITH: 'with';
ON: 'on';
IMPLEMENTS: 'implements';
EXTENDS: 'extends';

// =====================================
// BUILT-IN TYPES
// =====================================

// Primitive types
INT_TYPE: 'int';
DOUBLE_TYPE: 'double';
NUM_TYPE: 'num';
BOOL_TYPE: 'bool';
STRING_TYPE: 'String';
OBJECT_TYPE: 'Object';
DYNAMIC_TYPE: 'dynamic';
NEVER_TYPE: 'Never';

// Collection types
LIST_TYPE: 'List';
SET_TYPE: 'Set';
MAP_TYPE: 'Map';
ITERABLE_TYPE: 'Iterable';

// Async types
FUTURE_TYPE: 'Future';
STREAM_TYPE: 'Stream';

// Special types
FUNCTION_TYPE: 'Function';
SYMBOL_TYPE: 'Symbol';
TYPE_TYPE: 'Type';

// =====================================
// BOOLEAN LITERALS
// =====================================

BOOLEAN: 'true' | 'false';
NULL: 'null';

// =====================================
// COMMENTS
// =====================================

COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_DOC: '///' ~[\r\n]*;

// =====================================
// ANNOTATIONS
// =====================================

ANNOTATION: '@' [a-zA-Z_][a-zA-Z0-9_]*;

// =====================================
// STRINGS
// =====================================

// Raw strings
RAW_STRING_SINGLE: 'r\'' (~['\r\n] | '\\' .)* '\'';
RAW_STRING_DOUBLE: 'r"' (~["\r\n] | '\\' .)* '"';

// Triple-quoted strings (multi-line)
STRING_TRIPLE_SINGLE: '\'\'\'' .*? '\'\'\'';
STRING_TRIPLE_DOUBLE: '"""' .*? '"""';

// Regular strings with interpolation support
STRING_SINGLE: '\'' ( STRING_INTERPOLATION | ~['$\r\n\\] | '\\' . )* '\'';
STRING_DOUBLE: '"' ( STRING_INTERPOLATION | ~["$\r\n\\] | '\\' . )* '"';

fragment STRING_INTERPOLATION: '$' [a-zA-Z_][a-zA-Z0-9_]* | '${' .*? '}';

// =====================================
// NUMBERS
// =====================================

NUMBER_HEX: '0x' [0-9A-Fa-f]+;
NUMBER_SCIENTIFIC: [0-9]+ ('.' [0-9]+)? [eE] [+-]? [0-9]+;
NUMBER_FLOAT: [0-9]+ '.' [0-9]+;
NUMBER_INT: [0-9]+;

// =====================================
// OPERATORS
// =====================================

// Null-aware operators
QUESTION_QUESTION: '??';
QUESTION_QUESTION_EQUAL: '??=';
QUESTION_DOT: '?.';
EXCLAMATION: '!';

// Cascade operator
CASCADE: '..';
CASCADE_NULLABLE: '?..';

// Spread operators
SPREAD: '...';
SPREAD_NULLABLE: '...?';

// Arrow function
ARROW: '=>';

// Comparison operators
EQ_EQ: '==';
NOT_EQ: '!=';
LE: '<=';
GE: '>=';
LT: '<';
GT: '>';

// Logical operators
AND_AND: '&&';
OR_OR: '||';

// Assignment operators
PLUS_EQ: '+=';
MINUS_EQ: '-=';
STAR_EQ: '*=';
SLASH_EQ: '/=';
TILDE_SLASH_EQ: '~/=';
PERCENT_EQ: '%=';
SHL_EQ: '<<=';
SHR_EQ: '>>=';
AND_EQ: '&=';
OR_EQ: '|=';
CARET_EQ: '^=';

// Arithmetic operators
PLUS_PLUS: '++';
MINUS_MINUS: '--';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
TILDE_SLASH: '~/';  // Integer division
PERCENT: '%';

// Bitwise operators
SHL: '<<';
SHR: '>>';
AND: '&';
OR: '|';
CARET: '^';
TILDE: '~';

// Other operators
EQUAL: '=';
COLON: ':';
QUESTION: '?';
HASH: '#';

// =====================================
// IDENTIFIERS
// =====================================

IDENTIFIER: [a-zA-Z_$][a-zA-Z0-9_$]*;

// =====================================
// PUNCTUATION & BRACKETS
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
AT: '@';

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
