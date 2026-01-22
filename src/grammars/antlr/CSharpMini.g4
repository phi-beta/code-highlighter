lexer grammar CSharpMini;

// Keywords
KEYWORD:
    'abstract' | 'as' | 'base' | 'break' | 'case' | 'catch' | 'checked' | 'class' |
    'const' | 'continue' | 'default' | 'delegate' | 'do' | 'else' | 'enum' | 'event' |
    'explicit' | 'extern' | 'finally' | 'fixed' | 'for' | 'foreach' | 'goto' | 'if' |
    'implicit' | 'in' | 'interface' | 'internal' | 'is' | 'lock' | 'namespace' | 'new' |
    'operator' | 'out' | 'override' | 'params' | 'private' | 'protected' | 'public' |
    'readonly' | 'ref' | 'return' | 'sealed' | 'sizeof' | 'stackalloc' | 'static' |
    'struct' | 'switch' | 'this' | 'throw' | 'try' | 'typeof' | 'unchecked' | 'unsafe' |
    'using' | 'virtual' | 'void' | 'volatile' | 'while' | 'add' | 'alias' | 'ascending' |
    'async' | 'await' | 'by' | 'descending' | 'dynamic' | 'equals' | 'from' | 'get' |
    'global' | 'group' | 'into' | 'join' | 'let' | 'nameof' | 'on' | 'orderby' |
    'partial' | 'remove' | 'select' | 'set' | 'value' | 'var' | 'when' | 'where' | 'yield' |
    'record' | 'init' | 'with' | 'required';

// Primitive types
TYPE:
    'bool' | 'byte' | 'sbyte' | 'char' | 'decimal' | 'double' | 'float' | 'int' | 'uint' |
    'long' | 'ulong' | 'short' | 'ushort' | 'object' | 'string';

// Boolean literals
BOOLEAN: 'true' | 'false';

// Null literal
NULL: 'null';

// Comments
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_DOC: '///' ~[\r\n]*;
COMMENT_DOC_BLOCK: '/**' .*? '*/';

// Attributes (C# style)
ATTRIBUTE: '[' ~[\]]*? ']';

// Preprocessor directives
PREPROCESSOR: '#' [ \t]* ('if' | 'else' | 'elif' | 'endif' | 'define' | 'undef' | 'warning' | 'error' | 'line' | 'region' | 'endregion' | 'pragma' | 'nullable') ~[\r\n]*;

// String literals
STRING: '"' ( ESC | ~["\\\r\n] )* '"';
STRING_VERBATIM: '@"' ( '""' | ~["] )* '"';
STRING_INTERPOLATED: '$"' ( ESC | INTERPOLATION | ~["{"\\\r\n] )* '"';
STRING_RAW: '"""' .*? '"""';

// Character literals
CHARACTER: '\'' ( ESC | ~['\\\r\n] ) '\'';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ ([uU] [lL]? | [lL] [uU]? | [fFdDmM])?;
NUMBER_BINARY: '0' [bB] [01]+ ([uU] [lL]? | [lL] [uU]?)?;
NUMBER_FLOAT: 
    [0-9]+ '.' [0-9]* ([eE] [+\-]? [0-9]+)? [fFdDmM]? |
    '.' [0-9]+ ([eE] [+\-]? [0-9]+)? [fFdDmM]? |
    [0-9]+ [eE] [+\-]? [0-9]+ [fFdDmM]? |
    [0-9]+ [fFdDmM];
NUMBER_DECIMAL: [0-9]+ ([uU] [lL]? | [lL] [uU]? | [mM])?;

// Operators
OPERATOR:
    '==' | '!=' | '<=' | '>=' | '<<' | '>>' | '++' | '--' | '&&' | '||' | '??' | '??=' |
    '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>=' |
    '->' | '=>' | '::' | '?.' | '!' | '~' | '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | 
    '=' | '<' | '>' | '?';

// Identifiers (including @ prefix for verbatim identifiers)
IDENTIFIER: '@'? [a-zA-Z_] [a-zA-Z0-9_]*;

// Punctuation
PUNCT: '{' | '}' | '(' | ')' | '[' | ']' | '.' | ',' | ';' | ':';

// Whitespace
WS: [ \t\r\n]+;

// Fragments
fragment ESC: '\\' ([abfnrtvx'"\\0] | 'u' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] | 'U' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]);
fragment INTERPOLATION: '{' ~[}]* '}';
