lexer grammar SwiftMini;

// =====================================
// KEYWORDS - DECLARATIONS
// =====================================

CLASS: 'class';
STRUCT: 'struct';
ENUM: 'enum';
PROTOCOL: 'protocol';
EXTENSION: 'extension';
TYPEALIAS: 'typealias';
ASSOCIATEDTYPE: 'associatedtype';
ACTOR: 'actor';

// =====================================
// KEYWORDS - PROPERTIES & FUNCTIONS
// =====================================

FUNC: 'func';
VAR: 'var';
LET: 'let';
INIT: 'init';
DEINIT: 'deinit';
SUBSCRIPT: 'subscript';
STATIC: 'static';
MUTATING: 'mutating';
NONMUTATING: 'nonmutating';
INOUT: 'inout';

// =====================================
// KEYWORDS - CONTROL FLOW
// =====================================

IF: 'if';
ELSE: 'else';
GUARD: 'guard';
SWITCH: 'switch';
CASE: 'case';
DEFAULT: 'default';
WHERE: 'where';
FOR: 'for';
WHILE: 'while';
REPEAT: 'repeat';
IN: 'in';
BREAK: 'break';
CONTINUE: 'continue';
FALLTHROUGH: 'fallthrough';
RETURN: 'return';
DEFER: 'defer';

// =====================================
// KEYWORDS - ERROR HANDLING
// =====================================

DO: 'do';
TRY: 'try';
CATCH: 'catch';
THROW: 'throw';
THROWS: 'throws';
RETHROWS: 'rethrows';

// =====================================
// KEYWORDS - CONCURRENCY
// =====================================

ASYNC: 'async';
AWAIT: 'await';
TASK: 'Task';

// =====================================
// KEYWORDS - ACCESS CONTROL
// =====================================

PUBLIC: 'public';
PRIVATE: 'private';
FILEPRIVATE: 'fileprivate';
INTERNAL: 'internal';
OPEN: 'open';

// =====================================
// KEYWORDS - MODIFIERS
// =====================================

FINAL: 'final';
LAZY: 'lazy';
OPTIONAL: 'optional';
REQUIRED: 'required';
CONVENIENCE: 'convenience';
DYNAMIC: 'dynamic';
OVERRIDE: 'override';
WEAK: 'weak';
UNOWNED: 'unowned';

// =====================================
// KEYWORDS - OTHER
// =====================================

IMPORT: 'import';
AS: 'as';
IS: 'is';
SELF: 'self';
SUPER: 'super';
SOME: 'some';
ANY: 'any';
TYPE: 'Type';
NIL: 'nil';
TRUE: 'true';
FALSE: 'false';
GET: 'get';
SET: 'set';
WILLSET: 'willSet';
DIDSET: 'didSet';

// =====================================
// BUILT-IN TYPES
// =====================================

INT_TYPE: 'Int';
INT8_TYPE: 'Int8';
INT16_TYPE: 'Int16';
INT32_TYPE: 'Int32';
INT64_TYPE: 'Int64';
UINT_TYPE: 'UInt';
UINT8_TYPE: 'UInt8';
UINT16_TYPE: 'UInt16';
UINT32_TYPE: 'UInt32';
UINT64_TYPE: 'UInt64';
FLOAT_TYPE: 'Float';
DOUBLE_TYPE: 'Double';
BOOL_TYPE: 'Bool';
STRING_TYPE: 'String';
CHARACTER_TYPE: 'Character';
VOID_TYPE: 'Void';
ARRAY_TYPE: 'Array';
DICTIONARY_TYPE: 'Dictionary';
SET_TYPE: 'Set';
OPTIONAL_TYPE: 'Optional';

// =====================================
// ATTRIBUTES
// =====================================

ATTRIBUTE: '@' [a-zA-Z_][a-zA-Z0-9_]*;

// =====================================
// COMMENTS
// =====================================

COMMENT_DOC: '///' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_LINE: '//' ~[\r\n]*;

// =====================================
// STRING LITERALS
// =====================================

STRING_MULTI: '"""' .*? '"""';
STRING_LITERAL: '"' ( STRING_ESCAPE | STRING_INTERPOLATION | ~[\\"\r\n] )* '"';

fragment STRING_ESCAPE: '\\' [0\\tnr"'];
fragment STRING_INTERPOLATION: '\\(' .*? ')';

// =====================================
// NUMBERS
// =====================================

NUMBER_FLOAT: [0-9]+ '.' [0-9]+ ([eE][+-]?[0-9]+)?;
NUMBER_HEX: '0x' [0-9a-fA-F]+ ('.' [0-9a-fA-F]+)?;
NUMBER_OCTAL: '0o' [0-7]+;
NUMBER_BINARY: '0b' [01]+;
NUMBER_INT: [0-9]+;

// =====================================
// OPERATORS
// =====================================

// Optional operators
QUESTION: '?';
EXCLAMATION: '!';
QUESTION_QUESTION: '??';
QUESTION_DOT: '?.';

// Arrow
ARROW: '->';

// Range operators
RANGE_CLOSED: '...';
RANGE_HALF_OPEN: '..<';

// Arithmetic
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

// Comparison
EQUAL_EQUAL: '==';
NOT_EQUAL: '!=';
TRIPLE_EQUAL: '===';
NOT_TRIPLE_EQUAL: '!==';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
LESS: '<';
GREATER: '>';

// Logical
AND_AND: '&&';
OR_OR: '||';

// Bitwise
AND: '&';
OR: '|';
XOR: '^';
TILDE: '~';
LEFT_SHIFT: '<<';
RIGHT_SHIFT: '>>';

// Assignment
EQUAL: '=';

// Other
UNDERSCORE: '_';
HASH: '#';
DOLLAR: '$';
AT: '@';

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

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
