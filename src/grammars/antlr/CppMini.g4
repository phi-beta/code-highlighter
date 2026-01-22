lexer grammar CppMini;

// Keywords
KEYWORD:
    'alignas' | 'alignof' | 'and' | 'and_eq' | 'asm' | 'auto' | 'bitand' | 'bitor' |
    'break' | 'case' | 'catch' | 'class' | 'compl' | 'concept' | 'const' | 'consteval' |
    'constexpr' | 'constinit' | 'const_cast' | 'continue' | 'co_await' | 'co_return' |
    'co_yield' | 'decltype' | 'default' | 'delete' | 'do' | 'dynamic_cast' | 'else' |
    'enum' | 'explicit' | 'export' | 'extern' | 'for' | 'friend' | 'goto' | 'if' |
    'inline' | 'mutable' | 'namespace' | 'new' | 'noexcept' | 'not' | 'not_eq' |
    'operator' | 'or' | 'or_eq' | 'private' | 'protected' | 'public' | 'register' |
    'reinterpret_cast' | 'requires' | 'return' | 'sizeof' | 'static' | 'static_assert' |
    'static_cast' | 'struct' | 'switch' | 'template' | 'this' | 'thread_local' |
    'throw' | 'try' | 'typedef' | 'typeid' | 'typename' | 'union' | 'using' |
    'virtual' | 'volatile' | 'while' | 'xor' | 'xor_eq';

// Primitive types
TYPE:
    'bool' | 'char' | 'char8_t' | 'char16_t' | 'char32_t' | 'wchar_t' |
    'short' | 'int' | 'long' | 'signed' | 'unsigned' |
    'float' | 'double' | 'void';

// Boolean literals
BOOLEAN: 'true' | 'false';

// Null pointer literals
NULL_PTR: 'nullptr' | 'NULL';

// Preprocessor directives
PREPROCESSOR: '#' [ \t]* ('include' | 'define' | 'undef' | 'if' | 'ifdef' | 'ifndef' | 'else' | 'elif' | 'endif' | 'line' | 'error' | 'pragma') ~[\r\n]*;

// Comments (keep on default channel to preserve in output)
COMMENT_LINE: '//' ~[\r\n]*;
COMMENT_BLOCK: '/*' .*? '*/';

// String literals
STRING: 
    ('L' | 'u8' | 'u' | 'U')? '"' ( ESC | ~["\\\r\n] )* '"';

// Character literals
CHARACTER: 
    ('L' | 'u' | 'U')? '\'' ( ESC | ~['\\\r\n] )+ '\'';

// Raw string literals (simplified)
RAW_STRING: ('L' | 'u8' | 'u' | 'U')? 'R"' [a-zA-Z0-9_]* '(' .*? ')' [a-zA-Z0-9_]* '"';

// Numbers
NUMBER_HEX: '0' [xX] [0-9a-fA-F]+ ([uU] [lL]? [lL]? | [lL] [lL]? [uU]?)?;
NUMBER_BINARY: '0' [bB] [01]+ ([uU] [lL]? [lL]? | [lL] [lL]? [uU]?)?;
NUMBER_OCTAL: '0' [0-7]+ ([uU] [lL]? [lL]? | [lL] [lL]? [uU]?)?;
NUMBER_FLOAT: 
    [0-9]+ '.' [0-9]* ([eE] [+\-]? [0-9]+)? [fFlL]? |
    '.' [0-9]+ ([eE] [+\-]? [0-9]+)? [fFlL]? |
    [0-9]+ [eE] [+\-]? [0-9]+ [fFlL]? |
    [0-9]+ [fFlL];
NUMBER_DECIMAL: [0-9]+ ([uU] [lL]? [lL]? | [lL] [lL]? [uU]?)?;

// Operators
OPERATOR:
    '==' | '!=' | '<=' | '>=' | '<<' | '>>' | '++' | '--' | '&&' | '||' | '->' | '->*' | '.*' | '::' |
    '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>=' | '<=>' |
    '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | '!' | '~' | '=' | '<' | '>' | '?';

// Identifiers
IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

// Punctuation
PUNCT: '{' | '}' | '(' | ')' | '[' | ']' | '.' | ',' | ';' | ':';

// Whitespace (keep on default channel for preservation)
WS: [ \t\r\n]+;

// Escape sequences (fragment)
fragment ESC: 
    '\\' ([abfnrtvx'"\\?] | [0-7] [0-7]? [0-7]? | 'x' [0-9a-fA-F]+ | 'u' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] | 'U' [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]);
