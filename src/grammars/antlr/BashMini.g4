// Minimal Bash lexer grammar (very approximate)
lexer grammar BashMini;

KEYWORD: ('if'|'then'|'else'|'elif'|'fi'|'for'|'while'|'in'|'do'|'done'|'case'|'esac'|'function'|'select'|'time');
COMMENT: '#' ~[\r\n]*;
STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (~['\r\n])* '\'';
VAR: '$' [A-Za-z_][A-Za-z0-9_]*;
NUMBER: DIGIT+;
IDENTIFIER: [A-Za-z_][A-Za-z0-9_]*;
// Punctuation tokens (grouped as one). Using explicit alternatives to avoid char class escaping issues.
PUNCT: ('{'|'}'|'(' |')'|'['|']'|'.'|','|';'|':'|'+'|'-'|'*'|'/'|'%'|'&'|'|'|'^'|'!'|'?'|'='|'<'|'>');
WS: [ \t\r\n]+;
fragment DIGIT: [0-9];
fragment ESC: '\\' . ;
