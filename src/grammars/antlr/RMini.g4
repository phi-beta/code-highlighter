lexer grammar RMini;

// Keywords
IF: 'if';
ELSE: 'else';
FOR: 'for';
IN: 'in';
WHILE: 'while';
REPEAT: 'repeat';
FUNCTION: 'function';
RETURN: 'return';
BREAK: 'break';
NEXT: 'next';

// Boolean and special constants
TRUE: 'TRUE' | 'T';
FALSE: 'FALSE' | 'F';
NULL: 'NULL';
NA: 'NA' | 'NA_integer_' | 'NA_real_' | 'NA_complex_' | 'NA_character_';
NAN: 'NaN';
INF: 'Inf';

// Comments
COMMENT: '#' ~[\r\n]*;

// Strings
STRING_DOUBLE: '"' (~["\\\r\n] | '\\' .)* '"';
STRING_SINGLE: '\'' (~['\\\r\n] | '\\' .)* '\'';

// Numbers
NUMBER_SCIENTIFIC: [0-9]+ ('.' [0-9]+)? [eE] [+-]? [0-9]+;
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+;
NUMBER_FLOAT: [0-9]+ '.' [0-9]+ | '.' [0-9]+;
NUMBER_INT: [0-9]+ [Ll]?;

// Operators - Assignment
LEFT_ASSIGN: '<-' | ':=';
RIGHT_ASSIGN: '->';
LEFT_SUPER_ASSIGN: '<<-';
RIGHT_SUPER_ASSIGN: '->>';
EQUAL_ASSIGN: '=';

// Operators - Pipe
PIPE_BASE: '|>';
PIPE_MAGRITTR: '%>%';

// Operators - Namespace
NAMESPACE: '::';
NAMESPACE_INTERNAL: ':::';

// Operators - Formula
TILDE: '~';

// Operators - Special infix
SPECIAL_OP: '%' ~[%]* '%';

// Operators - Arithmetic
PLUS: '+';
MINUS: '-';
MULT: '*';
DIV: '/';
POWER: '^' | '**';
MOD: '%%';
INT_DIV: '%/%';
MATRIX_MULT: '%*%';
OUTER_PROD: '%o%';
KRONECKER: '%x%';

// Operators - Comparison
LT: '<';
GT: '>';
LE: '<=';
GE: '>=';
EQ: '==';
NE: '!=' | '<>';

// Operators - Logical
AND: '&' | '&&';
OR: '|' | '||';
NOT: '!';

// Operators - Indexing
DOLLAR: '$';
AT: '@';

// Operators - Range
COLON: ':';

// Punctuation
LPAREN: '(';
RPAREN: ')';
LBRACKET: '[';
RBRACKET: ']';
LBRACE: '{';
RBRACE: '}';
DOUBLE_LBRACKET: '[[';
DOUBLE_RBRACKET: ']]';
COMMA: ',';
SEMICOLON: ';';
QUESTION: '?';

// Ellipsis
ELLIPSIS: '...';

// Identifiers
IDENTIFIER: [a-zA-Z.][a-zA-Z0-9._]*;
BACKTICK_ID: '`' (~[`\r\n])+ '`';

// Whitespace
WS: [ \t\r\n]+ -> channel(HIDDEN);
