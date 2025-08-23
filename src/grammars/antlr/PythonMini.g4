// Minimal Python lexer grammar (simplified)
lexer grammar PythonMini;

KEYWORD: ('def'|'return'|'if'|'elif'|'else'|'for'|'while'|'import'|'from'|'as'|'class'|'try'|'except'|'finally'|'with'|'yield'|'lambda'|'pass'|'break'|'continue'|'and'|'or'|'not'|'in'|'is'|'None'|'True'|'False');
COMMENT: '#' ~[\r\n]*;
TRIPLE_STRING: ('"""' .*? '"""' | '\'\'\'' .*? '\'\'\'');
STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';
NUMBER: DIGIT+ ('.' DIGIT+)?;
IDENTIFIER: [A-Za-z_] [A-Za-z0-9_]*;
PUNCT: ('{'|'}'|'('|')'|'['|']'|'.'|','|';'|':'|'+'|'-'|'*'|'/'|'%'|'&'|'|'|'^'|'!'|'?'|'='|'<'|'>');
WS: [ \t\r\n]+; // preserve whitespace
fragment DIGIT: [0-9];
fragment ESC: '\\' . ;
