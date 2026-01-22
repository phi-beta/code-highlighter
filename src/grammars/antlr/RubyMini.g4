lexer grammar RubyMini;

// =====================================
// KEYWORDS
// =====================================

CLASS: 'class';
MODULE: 'module';
DEF: 'def';
END: 'end';
IF: 'if';
UNLESS: 'unless';
ELSIF: 'elsif';
ELSE: 'else';
CASE: 'case';
WHEN: 'when';
WHILE: 'while';
UNTIL: 'until';
FOR: 'for';
DO: 'do';
BREAK: 'break';
NEXT: 'next';
REDO: 'redo';
RETRY: 'retry';
RETURN: 'return';
YIELD: 'yield';
SUPER: 'super';
SELF: 'self';
TRUE: 'true';
FALSE: 'false';
NIL: 'nil';
AND: 'and';
OR: 'or';
NOT: 'not';
BEGIN: 'begin';
RESCUE: 'rescue';
ENSURE: 'ensure';
RAISE: 'raise';
THEN: 'then';
IN: 'in';
ALIAS: 'alias';
DEFINED: 'defined?';
UNDEF: 'undef';
REQUIRE: 'require';
REQUIRE_RELATIVE: 'require_relative';
LOAD: 'load';
INCLUDE: 'include';
EXTEND: 'extend';
PREPEND: 'prepend';
ATTR_READER: 'attr_reader';
ATTR_WRITER: 'attr_writer';
ATTR_ACCESSOR: 'attr_accessor';
PRIVATE: 'private';
PROTECTED: 'protected';
PUBLIC: 'public';

// =====================================
// SPECIAL KEYWORDS
// =====================================

FILE_CONSTANT: '__FILE__';
LINE_CONSTANT: '__LINE__';
ENCODING_CONSTANT: '__ENCODING__';

// =====================================
// COMMENTS
// =====================================

COMMENT_BLOCK: '=begin' .*? '=end';
COMMENT_LINE: '#' ~[\r\n]*;

// =====================================
// SYMBOLS
// =====================================

SYMBOL: ':' [a-zA-Z_][a-zA-Z0-9_]*[?!]?;
SYMBOL_QUOTED: ':"' ( '\\' . | ~[\\"\r\n] )* '"';
SYMBOL_SINGLE_QUOTED: ':\'' ( '\\' . | ~[\\'\r\n] )* '\'';

// =====================================
// STRING LITERALS
// =====================================

STRING_DOUBLE: '"' ( STRING_ESCAPE | STRING_INTERPOLATION | ~[\\"\r\n] )* '"';
STRING_SINGLE: '\'' ( '\\' [\\'] | ~[\\'\r\n] )* '\'';
STRING_HEREDOC: '<<' [-~]? [A-Z_][A-Z0-9_]* .*? '\n' [A-Z_][A-Z0-9_]*;

fragment STRING_ESCAPE: '\\' [nrtbf"'\\];
fragment STRING_INTERPOLATION: '#{' .*? '}';

// =====================================
// REGULAR EXPRESSIONS
// =====================================

REGEX: '/' ( '\\' . | ~[/\r\n\\] )+ '/' [imxo]*;

// =====================================
// PERCENT LITERALS
// =====================================

PERCENT_W: '%w' [(\[{<] .*? [)\]}>];
PERCENT_I: '%i' [(\[{<] .*? [)\]}>];
PERCENT_Q: '%q' [(\[{<] .*? [)\]}>];
PERCENT_UPPER_Q: '%Q' [(\[{<] .*? [)\]}>];
PERCENT_R: '%r' [(\[{<] .*? [)\]}>] [imxo]*;
PERCENT_X: '%x' [(\[{<] .*? [)\]}>];

// =====================================
// NUMBERS
// =====================================

NUMBER_FLOAT: [0-9]+ '.' [0-9]+ ([eE][+-]?[0-9]+)?;
NUMBER_HEX: '0x' [0-9a-fA-F]+;
NUMBER_OCTAL: '0o' [0-7]+;
NUMBER_BINARY: '0b' [01]+;
NUMBER_INT: [0-9]+;

// =====================================
// VARIABLES
// =====================================

GLOBAL_VAR: '$' [a-zA-Z_][a-zA-Z0-9_]*;
GLOBAL_SPECIAL: '$' [!@&`'+~=/\\,;.<>*$?:"];
CLASS_VAR: '@@' [a-zA-Z_][a-zA-Z0-9_]*;
INSTANCE_VAR: '@' [a-zA-Z_][a-zA-Z0-9_]*;

// =====================================
// OPERATORS
// =====================================

// Comparison
SPACESHIP: '<=>';
MATCH: '=~';
NOT_MATCH: '!~';
EQUAL_EQUAL: '==';
NOT_EQUAL: '!=';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
CASE_EQUAL: '===';

// Logical
AND_AND: '&&';
OR_OR: '||';
EXCLAMATION: '!';

// Bitwise
LEFT_SHIFT: '<<';
RIGHT_SHIFT: '>>';
AMPERSAND: '&';
PIPE: '|';
CARET: '^';
TILDE: '~';

// Assignment
PLUS_EQUAL: '+=';
MINUS_EQUAL: '-=';
STAR_EQUAL: '*=';
SLASH_EQUAL: '/=';
PERCENT_EQUAL: '%=';
POWER_EQUAL: '**=';
LEFT_SHIFT_EQUAL: '<<=';
RIGHT_SHIFT_EQUAL: '>>=';
AND_EQUAL: '&&=';
OR_EQUAL: '||=';
AMPERSAND_EQUAL: '&=';
PIPE_EQUAL: '|=';
CARET_EQUAL: '^=';

// Arithmetic
POWER: '**';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';

// Range
RANGE_INCLUSIVE: '..';
RANGE_EXCLUSIVE: '...';

// Other
ARROW: '=>';
DOUBLE_COLON: '::';
SAFE_NAVIGATION: '&.';
EQUAL: '=';
QUESTION: '?';
LESS: '<';
GREATER: '>';

// =====================================
// IDENTIFIERS
// =====================================

CONSTANT: [A-Z][a-zA-Z0-9_]*;
IDENTIFIER: [a-z_][a-zA-Z0-9_]*[?!]?;

// =====================================
// DELIMITERS
// =====================================

LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACK: '[';
RBRACK: ']';

SEMICOLON: ';';
COMMA: ',';
DOT: '.';
COLON: ':';
AT: '@';
DOLLAR: '$';

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;
