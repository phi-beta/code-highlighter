// Enhanced Python lexer grammar for comprehensive syntax highlighting
lexer grammar PythonMini;

// Enhanced keywords (more comprehensive Python keyword coverage)
KEYWORD: ('and'|'as'|'assert'|'break'|'class'|'continue'|'def'|'del'|'elif'|'else'|'except'|'exec'|'finally'|'for'|'from'|'global'|'if'|'import'|'in'|'is'|'lambda'|'not'|'or'|'pass'|'print'|'raise'|'return'|'try'|'while'|'with'|'yield'|'async'|'await'|'nonlocal');

// Boolean and None literals
BOOLEAN: ('True'|'False');
NONE: 'None';

// Comments  
COMMENT: '#' ~[\r\n]*;

// Enhanced string patterns with f-strings and raw strings
F_STRING: [fF] ('"' (~["\r\n] | ESC)* '"' | '\'' (~['\r\n] | ESC)* '\'');
RAW_STRING: [rR] ('"' (~["\\\r\n] | ESC)* '"' | '\'' (~['\\\r\n] | ESC)* '\'');
TRIPLE_STRING: ('"""' .*? '"""' | '\'\'\'' .*? '\'\'\'');
STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';

// Enhanced number patterns (integers, floats, scientific notation, hex, binary, octal)
NUMBER: HEX_NUMBER | BIN_NUMBER | OCT_NUMBER | FLOAT_NUMBER | INT_NUMBER;
HEX_NUMBER: '0' [xX] [0-9a-fA-F]+;
BIN_NUMBER: '0' [bB] [01]+;
OCT_NUMBER: '0' [oO] [0-7]+;
FLOAT_NUMBER: DIGIT+ '.' DIGIT* EXPONENT? | '.' DIGIT+ EXPONENT? | DIGIT+ EXPONENT;
INT_NUMBER: DIGIT+;

// Enhanced operators and punctuation
OPERATOR: ('=='|'!='|'<='|'>='|'<<'|'>>'|'//'|'**'|'+='|'-='|'*='|'/='|'%='|'&='|'|='|'^='|'>>='|'<<='|'//='|'**='|'->'|':=');
PUNCT: ('{'|'}'|'('|')'|'['|']'|'.'|','|';'|':'|'+'|'-'|'*'|'/'|'%'|'&'|'|'|'^'|'!'|'?'|'='|'<'|'>'|'~'|'@');

// Decorators
DECORATOR: '@' IDENTIFIER ('.' IDENTIFIER)*;

// Identifiers (including special attributes and methods)
IDENTIFIER: [A-Za-z_] [A-Za-z0-9_]*;

// Whitespace and newlines
NEWLINE: ('\r'? '\n');
WS: [ \t]+ -> channel(HIDDEN);

// Fragments
fragment DIGIT: [0-9];
fragment ESC: '\\' .;
fragment EXPONENT: [eE] [+-]? DIGIT+;
