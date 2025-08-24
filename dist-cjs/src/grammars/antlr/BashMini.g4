// Enhanced Bash lexer grammar with proper shell constructs
lexer grammar BashMini;

// Keywords - order matters for longest match
KEYWORD: ('function'|'select'|'time'|'if'|'then'|'else'|'elif'|'fi'|'for'|'while'|'in'|'do'|'done'|'case'|'esac'|'until'|'test');

// Comments and shebang
COMMENT: '#' ~[\r\n]*;

// Shell expansions - must come before simpler patterns
ARITHMETIC_EXPANSION: '$((' (~[)])+ '))';
COMMAND_SUBSTITUTION: '$(' (~[)])+ ')';
COMMAND_SUBSTITUTION_BACKTICK: '`' (~[`\r\n])+ '`';
PARAMETER_EXPANSION: '${' (~[}\r\n])+ '}';

// Strings - order matters for precedence  
STRING_DOUBLE: '"' (ESC | '$' [A-Za-z_][A-Za-z0-9_]* | '$' [0-9]+ | '$' [*@#?$!-] | ~["\\\r\n$])* '"';
STRING_SINGLE: '\'' (~['\r\n])* '\'';

// Variables - simple and complex forms
VAR: '$' [A-Za-z_][A-Za-z0-9_]*;
VAR_POSITIONAL: '$' [0-9]+;
VAR_SPECIAL: '$' [*@#?$!-];

// Numbers
NUMBER: DIGIT+ ('.' DIGIT+)?;

// Test operators
TEST_OP: ('-eq'|'-ne'|'-lt'|'-le'|'-gt'|'-ge'|'-z'|'-n'|'-f'|'-d'|'-e'|'-r'|'-w'|'-x');

// Identifiers and commands
IDENTIFIER: [A-Za-z_./][A-Za-z0-9_./]*;

// Operators and punctuation
REDIRECT: ('>>'|'<<'|'2>'|'2>>'|'&>'|'&>>'|'<'|'>');
PIPE: ('|'|'||'|'&&');
LOGICAL: ('=='|'!='|'=~');
PUNCT: ('{'|'}'|'('|')'|'['|']'|'.'|','|';'|':'|'+'|'-'|'*'|'/'|'%'|'&'|'^'|'!'|'?'|'=');

WS: [ \t\r\n]+;

// Fragments
fragment DIGIT: [0-9];
fragment ESC: '\\' . ;
