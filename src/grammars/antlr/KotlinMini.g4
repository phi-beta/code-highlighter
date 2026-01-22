lexer grammar KotlinMini;

// Keywords
KEYWORD:
    'abstract' | 'actual' | 'annotation' | 'as' | 'break' | 'by' | 'catch' | 'class' |
    'companion' | 'const' | 'constructor' | 'continue' | 'crossinline' | 'data' | 'delegate' |
    'do' | 'dynamic' | 'else' | 'enum' | 'expect' | 'external' | 'final' | 'finally' |
    'for' | 'fun' | 'get' | 'if' | 'import' | 'in' | 'infix' | 'init' | 'inline' |
    'inner' | 'interface' | 'internal' | 'is' | 'lateinit' | 'noinline' | 'object' |
    'open' | 'operator' | 'out' | 'override' | 'package' | 'private' | 'protected' |
    'public' | 'reified' | 'return' | 'sealed' | 'set' | 'suspend' | 'tailrec' |
    'this' | 'throw' | 'try' | 'typealias' | 'typeof' | 'val' | 'var' | 'vararg' |
    'when' | 'where' | 'while';

// Soft keywords (contextual)
SOFT_KEYWORD:
    'catch' | 'finally' | 'field' | 'file' | 'property' | 'receiver' | 'param' | 'setparam' |
    'delegate' | 'import' | 'constructor' | 'by' | 'companion' | 'init' | 'where';

// Boolean literals
BOOLEAN: 'true' | 'false';

// Null literal
NULL: 'null';

// Primitive types (built-in)
TYPE:
    'Byte' | 'Short' | 'Int' | 'Long' | 'Float' | 'Double' | 'Char' | 'Boolean' | 
    'String' | 'Unit' | 'Nothing' | 'Any';

// Comments
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_DOC: '/**' .*? '*/';

// Annotations
ANNOTATION: '@' [a-zA-Z_] [a-zA-Z0-9_]* ('.' [a-zA-Z_] [a-zA-Z0-9_]*)*;

// String literals
STRING: '"' ( ESC | ~["\\\r\n] )* '"';
STRING_MULTILINE: '"""' .*? '"""';
STRING_TEMPLATE: '$' ( IDENTIFIER | '{' ~[}]* '}' );

// Character literals
CHARACTER: '\'' ( ESC | ~['\\\r\n] ) '\'';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ [lL]?;
NUMBER_BINARY: '0' [bB] [01]+ [lL]?;
NUMBER_FLOAT:
    [0-9]+ '.' [0-9]* ([eE] [+\-]? [0-9]+)? [fFdD]? |
    '.' [0-9]+ ([eE] [+\-]? [0-9]+)? [fFdD]? |
    [0-9]+ [eE] [+\-]? [0-9]+ [fFdD]? |
    [0-9]+ [fFdD];
NUMBER_DECIMAL: [0-9]+ [lL]?;

// Operators
OPERATOR:
    '==' | '!=' | '===' | '!==' | '<=' | '>=' | '<<' | '>>' | '>>>' | '++' | '--' |
    '&&' | '||' | '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' |
    '->' | '=>' | '::' | '?.' | '?:' | '!!' | '..' | '?:' | '::' |
    '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | '!' | '~' | '=' | '<' | '>' | '?';

// Identifiers (including backtick identifiers)
IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]* | '`' ~[`\r\n]+ '`';

// Labels
LABEL: '@' [a-zA-Z_] [a-zA-Z0-9_]*;

// Punctuation
PUNCT: '{' | '}' | '(' | ')' | '[' | ']' | '.' | ',' | ';' | ':';

// Whitespace
WS: [ \t\r\n]+;

// Fragments
fragment ESC: '\\' ([abfnrtvx'"\\0] | 'u' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]);
