lexer grammar PHPMini;

// Keywords
ABSTRACT: 'abstract';
AND: 'and';
ARRAY: 'array';
AS: 'as';
BREAK: 'break';
CALLABLE: 'callable';
CASE: 'case';
CATCH: 'catch';
CLASS: 'class';
CLONE: 'clone';
CONST: 'const';
CONTINUE: 'continue';
DECLARE: 'declare';
DEFAULT: 'default';
DIE: 'die';
DO: 'do';
ECHO: 'echo';
ELSE: 'else';
ELSEIF: 'elseif';
EMPTY: 'empty';
ENDDECLARE: 'enddeclare';
ENDFOR: 'endfor';
ENDFOREACH: 'endforeach';
ENDIF: 'endif';
ENDSWITCH: 'endswitch';
ENDWHILE: 'endwhile';
EVAL: 'eval';
EXIT: 'exit';
EXTENDS: 'extends';
FINAL: 'final';
FINALLY: 'finally';
FN: 'fn';
FOR: 'for';
FOREACH: 'foreach';
FUNCTION: 'function';
GLOBAL: 'global';
GOTO: 'goto';
IF: 'if';
IMPLEMENTS: 'implements';
INCLUDE: 'include';
INCLUDE_ONCE: 'include_once';
INSTANCEOF: 'instanceof';
INSTEADOF: 'insteadof';
INTERFACE: 'interface';
ISSET: 'isset';
LIST: 'list';
MATCH: 'match';
NAMESPACE: 'namespace';
NEW: 'new';
OR: 'or';
PRINT: 'print';
PRIVATE: 'private';
PROTECTED: 'protected';
PUBLIC: 'public';
READONLY: 'readonly';
REQUIRE: 'require';
REQUIRE_ONCE: 'require_once';
RETURN: 'return';
STATIC: 'static';
SWITCH: 'switch';
THROW: 'throw';
TRAIT: 'trait';
TRY: 'try';
UNSET: 'unset';
USE: 'use';
VAR: 'var';
WHILE: 'while';
XOR: 'xor';
YIELD: 'yield';
YIELD_FROM: 'yield from';

// Type keywords
BOOL: 'bool';
INT: 'int';
FLOAT: 'float';
STRING: 'string';
OBJECT: 'object';
VOID: 'void';
NEVER: 'never';
MIXED: 'mixed';
ITERABLE: 'iterable';

// Constants
TRUE: 'true' | 'TRUE';
FALSE: 'false' | 'FALSE';
NULL: 'null' | 'NULL';

// PHP tags
PHP_OPEN: '<?php' | '<?';
PHP_CLOSE: '?>';

// Comments
COMMENT_LINE: '//' ~[\r\n]* -> channel(HIDDEN);
COMMENT_LINE_HASH: '#' ~[\r\n]* -> channel(HIDDEN);
COMMENT_BLOCK: '/*' .*? '*/' -> channel(HIDDEN);

// Strings
STRING_DOUBLE: '"' (~["\\\r\n] | '\\' .)* '"';
STRING_SINGLE: '\'' (~['\\\r\n] | '\\' .)* '\'';
STRING_HEREDOC: '<<<' [ \t]* [a-zA-Z_][a-zA-Z0-9_]* ('\r'? '\n') .*? ('\r'? '\n') [a-zA-Z_][a-zA-Z0-9_]* ';'?;
STRING_NOWDOC: '<<<' [ \t]* '\'' [a-zA-Z_][a-zA-Z0-9_]* '\'' ('\r'? '\n') .*? ('\r'? '\n') [a-zA-Z_][a-zA-Z0-9_]* ';'?;
STRING_BACKTICK: '`' (~[`\\] | '\\' .)* '`';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ ('_' [0-9a-fA-F]+)*;
NUMBER_OCTAL: '0' [oO]? [0-7]+ ('_' [0-7]+)*;
NUMBER_BINARY: '0' [bB] [01]+ ('_' [01]+)*;
NUMBER_FLOAT: [0-9]+ ('_' [0-9]+)* '.' [0-9]+ ('_' [0-9]+)* ([eE] [+-]? [0-9]+)?
            | [0-9]+ ('_' [0-9]+)* [eE] [+-]? [0-9]+;
NUMBER_INT: [0-9]+ ('_' [0-9]+)*;

// Variables
VARIABLE: '$' [a-zA-Z_] [a-zA-Z0-9_]*;
SUPERGLOBAL: '$_' ('GET'|'POST'|'REQUEST'|'COOKIE'|'SESSION'|'SERVER'|'FILES'|'ENV'|'GLOBALS');

// Operators
ARROW: '->';
DOUBLE_ARROW: '=>';
NULLSAFE: '?->';
SCOPE: '::';
ELLIPSIS: '...';
SPACESHIP: '<=>';
COALESCE: '??';
COALESCE_EQUAL: '??=';
POW: '**';
POW_EQUAL: '**=';
CONCAT: '.';
CONCAT_EQUAL: '.=';
EQUAL: '==';
IDENTICAL: '===';
NOT_EQUAL: '!=' | '<>';
NOT_IDENTICAL: '!==';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
LESS: '<';
GREATER: '>';
PLUS_EQUAL: '+=';
MINUS_EQUAL: '-=';
MUL_EQUAL: '*=';
DIV_EQUAL: '/=';
MOD_EQUAL: '%=';
AND_EQUAL: '&=';
OR_EQUAL: '|=';
XOR_EQUAL: '^=';
SHIFT_LEFT: '<<';
SHIFT_RIGHT: '>>';
SHIFT_LEFT_EQUAL: '<<=';
SHIFT_RIGHT_EQUAL: '>>=';
LOGICAL_AND: '&&';
LOGICAL_OR: '||';
INCREMENT: '++';
DECREMENT: '--';
ASSIGN: '=';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';
AMPERSAND: '&';
PIPE: '|';
CARET: '^';
TILDE: '~';
EXCLAMATION: '!';
QUESTION: '?';
AT: '@';
DOLLAR: '$';
BACKSLASH: '\\';

// Delimiters
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACK: '[';
RBRACK: ']';
SEMICOLON: ';';
COMMA: ',';
COLON: ':';

// Identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

// Whitespace
WS: [ \t\r\n]+ -> channel(HIDDEN);
