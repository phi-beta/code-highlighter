// Minimal Java lexer grammar (simplified)
lexer grammar JavaMini;

// Java keywords
KEYWORD: ('abstract'|'assert'|'boolean'|'break'|'byte'|'case'|'catch'|'char'|'class'|'const'|'continue'|'default'|'do'|'double'|'else'|'enum'|'extends'|'final'|'finally'|'float'|'for'|'goto'|'if'|'implements'|'import'|'instanceof'|'int'|'interface'|'long'|'native'|'new'|'package'|'private'|'protected'|'public'|'return'|'short'|'static'|'strictfp'|'super'|'switch'|'synchronized'|'this'|'throw'|'throws'|'transient'|'try'|'void'|'volatile'|'while');

// Java primitive types
TYPE: ('boolean'|'byte'|'char'|'double'|'float'|'int'|'long'|'short'|'void');

// Java boolean literals
BOOLEAN: ('true'|'false');

// Java null literal
NULL: 'null';

// Comments
COMMENT_LINE: '//' ~[\r\n]* ;
COMMENT_BLOCK: '/*' .*? '*/';
COMMENT_DOC: '/**' .*? '*/';

// Annotations
ANNOTATION: '@' [A-Za-z_] [A-Za-z0-9_]*;

// Strings and characters
STRING: '"' (ESC | ~["\\\r\n])* '"';
CHARACTER: '\'' (ESC | ~['\\\r\n]) '\'';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ [lL]?;
NUMBER_BINARY: '0' [bB] [01]+ [lL]?;
NUMBER_OCTAL: '0' [0-7]+ [lL]?;
NUMBER_DECIMAL: DIGIT+ ('.' DIGIT+)? ([eE] [+-]? DIGIT+)? [fFdDlL]?;
NUMBER_FLOAT: '.' DIGIT+ ([eE] [+-]? DIGIT+)? [fFdD]?;

// Operators
OPERATOR: ('=='|'!='|'<='|'>='|'<<'|'>>'|'>>>'|'++'|'--'|'&&'|'||'|'+='|'-='|'*='|'/='|'%='|'&='|'|='|'^='|'<<='|'>>='|'>>>='|'->'|'::'|'+'|'-'|'*'|'/'|'%'|'&'|'|'|'^'|'!'|'~'|'='|'<'|'>'|'?');

// Identifiers
IDENTIFIER: [A-Za-z_$] [A-Za-z0-9_$]*;

// Punctuation
PUNCT: [{}()\\[\\].,;:];

// Whitespace
WS: [ \t\r\n]+; // keep as token (not skipping) so spacing preserved

// Fragments
fragment DIGIT: [0-9];
fragment ESC: '\\' ([btnfr"'\\] | [0-3]?[0-7][0-7]? | 'u' [0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]);
