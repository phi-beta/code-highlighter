lexer grammar LuaMini;

// Keywords
LOCAL: 'local';
FUNCTION: 'function';
END: 'end';
IF: 'if';
THEN: 'then';
ELSE: 'else';
ELSEIF: 'elseif';
WHILE: 'while';
DO: 'do';
FOR: 'for';
IN: 'in';
REPEAT: 'repeat';
UNTIL: 'until';
BREAK: 'break';
RETURN: 'return';
AND: 'and';
OR: 'or';
NOT: 'not';
NIL: 'nil';
TRUE: 'true';
FALSE: 'false';
GOTO: 'goto';

// Comments
COMMENT_LINE: '--' (~('[' | '\r' | '\n') ~[\r\n]* | ) -> channel(HIDDEN);
COMMENT_BLOCK: '--[[' .*? ']]' -> channel(HIDDEN);

// String literals
STRING_DOUBLE: '"' (~["\\\r\n] | '\\' .)* '"';
STRING_SINGLE: '\'' (~['\\\r\n] | '\\' .)* '\'';
STRING_LONG: '[[' .*? ']]';
STRING_LONG_BRACKET: '[' '='* '[' .*? ']' '='* ']';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ ('.' [0-9a-fA-F]+)? ([pP] [+-]? [0-9]+)?;
NUMBER_SCIENTIFIC: [0-9]+ ('.' [0-9]+)? [eE] [+-]? [0-9]+;
NUMBER_FLOAT: [0-9]+ '.' [0-9]+;
NUMBER_INT: [0-9]+;

// Operators
CONCAT: '..';
VARARGS: '...';
EQ: '==';
NE: '~=';
LE: '<=';
GE: '>=';
LT: '<';
GT: '>';
ASSIGN: '=';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';
CARET: '^';
HASH: '#';
AMPERSAND: '&';
TILDE: '~';
PIPE: '|';
LSHIFT: '<<';
RSHIFT: '>>';
DOUBLE_SLASH: '//';

// Delimiters
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACK: '[';
RBRACK: ']';
SEMICOLON: ';';
COLON: ':';
COMMA: ',';
DOT: '.';
DOUBLE_COLON: '::';

// Identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

// Whitespace
WS: [ \t\r\n]+ -> skip;
