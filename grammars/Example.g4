// Minimal demo grammar (arbitrary) for showcase only
grammar Example;

program: (statement NEWLINE*)* EOF;
statement: KW_RETURN expr | expr;
expr: INT | STRING | IDENT | expr OP expr | '(' expr ')';

KW_RETURN: 'return';
INT: [0-9]+;
STRING: '"' (~['"'] | '\\' .)* '"';
IDENT: [a-zA-Z_][a-zA-Z0-9_]*;
OP: '+' | '-' | '*' | '/';
COMMENT: '//' ~[\r\n]* -> channel(HIDDEN);
WS: [ \t\r\n]+ -> channel(HIDDEN);
NEWLINE: '\n';
