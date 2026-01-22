lexer grammar JavaMini;

// Keywords
KEYWORD:
    'abstract' | 'assert' | 'break' | 'case' | 'catch' | 'class' | 'const' | 'continue' |
    'default' | 'do' | 'else' | 'enum' | 'extends' | 'final' | 'finally' | 'for' |
    'goto' | 'if' | 'implements' | 'import' | 'instanceof' | 'interface' | 'native' |
    'new' | 'package' | 'private' | 'protected' | 'public' | 'return' | 'static' |
    'strictfp' | 'super' | 'switch' | 'synchronized' | 'this' | 'throw' | 'throws' |
    'transient' | 'try' | 'volatile' | 'while';

// Primitive types
TYPE:
    'boolean' | 'byte' | 'char' | 'double' | 'float' | 'int' | 'long' | 'short' | 'void';

// Boolean literals
BOOLEAN: 'true' | 'false';

// Null literal
NULL: 'null';

// Comments (keep on default channel to preserve in output)
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_DOC: '/**' .*? '*/';

// Annotations
ANNOTATION: '@' [a-zA-Z_$] [a-zA-Z0-9_$]* ('.' [a-zA-Z_$] [a-zA-Z0-9_$]*)*;

// String literals
STRING: '"' ( ESC | ~["\\\r\n] )* '"';

// Character literals
CHARACTER: '\'' ( ESC | ~['\\\r\n] ) '\'';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ [lL]?;
NUMBER_BINARY: '0' [bB] [01]+ [lL]?;
NUMBER_OCTAL: '0' [0-7]+ [lL]?;
NUMBER_FLOAT: 
    [0-9]+ '.' [0-9]* ([eE] [+\-]? [0-9]+)? [fFdD]? |
    '.' [0-9]+ ([eE] [+\-]? [0-9]+)? [fFdD]? |
    [0-9]+ [eE] [+\-]? [0-9]+ [fFdD]? |
    [0-9]+ [fFdD];
NUMBER_DECIMAL: [0-9]+ [lL]?;

// Operators
OPERATOR:
    '==' | '!=' | '<=' | '>=' | '<<' | '>>' | '>>>' | '++' | '--' | '&&' | '||' |
    '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>=' | '>>>=' |
    '->' | '::' | '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | '!' | '~' | '=' | '<' | '>' | '?';

// Identifiers
IDENTIFIER: [a-zA-Z_$] [a-zA-Z0-9_$]*;

// Punctuation
PUNCT: '{' | '}' | '(' | ')' | '[' | ']' | '.' | ',' | ';' | ':';

// Whitespace (keep on default channel for preservation)
WS: [ \t\r\n]+;

// Escape sequences (fragment)
fragment ESC: '\\' ([btnfr"'\\] | [0-3]? [0-7] [0-7]? | 'u' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]);
