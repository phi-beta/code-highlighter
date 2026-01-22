lexer grammar CMini;

// Keywords - Control Flow
KEYWORD_CONTROL:
    'if' | 'else' | 'for' | 'while' | 'do' | 'switch' | 'case' | 'default' |
    'break' | 'continue' | 'return' | 'goto';

// Keywords - Types
KEYWORD_TYPE:
    'void' | 'char' | 'short' | 'int' | 'long' | 'float' | 'double' |
    'signed' | 'unsigned' | 'struct' | 'union' | 'enum' | 'typedef';

// Keywords - Storage & Qualifiers
KEYWORD_MODIFIER:
    'auto' | 'register' | 'static' | 'extern' | 'const' | 'volatile' | 'restrict' |
    'inline' | '_Atomic' | '_Thread_local';

// Keywords - Other
KEYWORD_OTHER:
    'sizeof' | 'typeof' | '__typeof__' | '_Alignas' | '_Alignof' | '_Bool' | '_Complex' |
    '_Generic' | '_Imaginary' | '_Noreturn' | '_Static_assert';

// Preprocessor directives
PREPROCESSOR:
    '#' [ \t]* ('include' | 'define' | 'undef' | 'ifdef' | 'ifndef' | 'if' | 'elif' | 
    'else' | 'endif' | 'error' | 'warning' | 'pragma' | 'line') ~[\r\n]*;

// Comments
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';

// String literals
STRING: '"' ( ESC | ~["\\\r\n] )* '"';

// Character literals
CHARACTER: '\'' ( ESC | ~['\\\r\n] ) '\'';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ [uUlL]*;
NUMBER_OCTAL: '0' [0-7]+ [uUlL]*;
NUMBER_FLOAT:
    [0-9]+ '.' [0-9]* ([eE] [+\-]? [0-9]+)? [fFlL]? |
    '.' [0-9]+ ([eE] [+\-]? [0-9]+)? [fFlL]? |
    [0-9]+ [eE] [+\-]? [0-9]+ [fFlL]?;
NUMBER_DECIMAL: [0-9]+ [uUlL]*;

// Operators - Multi-character first for proper matching
OPERATOR:
    '<<=' | '>>=' | '++' | '--' | '<<' | '>>' | '<=' | '>=' | '==' | '!=' | '&&' | '||' |
    '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' |
    '->' | '...' |
    '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | '!' | '~' | '=' | '<' | '>' | '?' | ':';

// Identifiers
IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

// Punctuation
PUNCT: '{' | '}' | '(' | ')' | '[' | ']' | '.' | ',' | ';';

// Whitespace
WS: [ \t\r\n]+;

// Escape sequences (fragment)
fragment ESC:
    '\\' ([abfnrtv"'\\?] | [0-7] [0-7]? [0-7]? | 'x' [0-9a-fA-F]+);
