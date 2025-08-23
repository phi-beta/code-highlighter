// Minimal JavaScript lexer grammar (simplified)
lexer grammar JavaScriptMini;

KEYWORD: ('break'|'case'|'catch'|'class'|'const'|'continue'|'debugger'|'default'|'delete'|'do'|'else'|'export'|'extends'|'finally'|'for'|'function'|'if'|'import'|'in'|'instanceof'|'let'|'new'|'return'|'super'|'switch'|'this'|'throw'|'try'|'typeof'|'var'|'void'|'while'|'with'|'yield'|'enum'|'await'|'implements'|'package'|'protected'|'static'|'interface'|'private'|'public');

COMMENT_LINE: '//' ~[\r\n]* ;
COMMENT_BLOCK: '/*' .*? '*/';

STRING_DOUBLE: '"' (ESC | ~["\\\r\n])* '"';
STRING_SINGLE: '\'' (ESC | ~['\\\r\n])* '\'';
TEMPLATE: '`' (ESC | ~[`\\])* '`';

NUMBER: DIGIT+ ('.' DIGIT+)?;
IDENTIFIER: [_$A-Za-z] [_$A-Za-z0-9]*;
// Punctuation and operators simplified as one token
PUNCT: ('{'|'}'|'('|')'|'['|']'|'.'|','|';'|':'|'+'|'-'|'*'|'/'|'%'|'&'|'|'|'^'|'!'|'?'|'='|'<'|'>');
WS: [ \t\r\n]+; // keep as token (not skipping) so spacing preserved

fragment DIGIT: [0-9];
fragment ESC: '\\' . ;
