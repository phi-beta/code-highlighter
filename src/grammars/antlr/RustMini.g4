lexer grammar RustMini;

// =====================================
// KEYWORDS
// =====================================

// Control flow
IF: 'if';
ELSE: 'else';
MATCH: 'match';
LOOP: 'loop';
WHILE: 'while';
FOR: 'for';
BREAK: 'break';
CONTINUE: 'continue';
RETURN: 'return';

// Declaration keywords
FN: 'fn';
LET: 'let';
MUT: 'mut';
CONST: 'const';
STATIC: 'static';
TYPE: 'type';

// Module system
MOD: 'mod';
USE: 'use';
PUB: 'pub';
CRATE: 'crate';
SUPER: 'super';
SELF: 'self';
EXTERN: 'extern';

// Type-related
STRUCT: 'struct';
ENUM: 'enum';
UNION: 'union';
TRAIT: 'trait';
IMPL: 'impl';
WHERE: 'where';
AS: 'as';

// Ownership & Borrowing
REF: 'ref';
MOVE: 'move';
UNSAFE: 'unsafe';

// Async/Await
ASYNC: 'async';
AWAIT: 'await';
DYN: 'dyn';

// Boolean literals
TRUE: 'true';
FALSE: 'false';

// Other keywords
IN: 'in';
BOX: 'box';
MACRO_RULES: 'macro_rules';

// =====================================
// PRIMITIVE TYPES
// =====================================

// Integer types
I8: 'i8';
I16: 'i16';
I32: 'i32';
I64: 'i64';
I128: 'i128';
ISIZE: 'isize';
U8: 'u8';
U16: 'u16';
U32: 'u32';
U64: 'u64';
U128: 'u128';
USIZE: 'usize';

// Float types
F32: 'f32';
F64: 'f64';

// Other primitives
BOOL_TYPE: 'bool';
CHAR_TYPE: 'char';
STR_TYPE: 'str';

// =====================================
// OPERATORS & PUNCTUATION
// =====================================

// Multi-character operators (must come before single-char)
FAT_ARROW: '=>';
THIN_ARROW: '->';
PATH_SEP: '::';
RANGE_INCLUSIVE: '..=';
RANGE_EXCLUSIVE: '..';
AND_AND: '&&';
OR_OR: '||';
EQ_EQ: '==';
NOT_EQ: '!=';
LE: '<=';
GE: '>=';
SHL: '<<';
SHR: '>>';
PLUS_EQ: '+=';
MINUS_EQ: '-=';
STAR_EQ: '*=';
SLASH_EQ: '/=';
PERCENT_EQ: '%=';
AND_EQ: '&=';
OR_EQ: '|=';
CARET_EQ: '^=';
SHL_EQ: '<<=';
SHR_EQ: '>>=';

// Single-character operators
LT: '<';
GT: '>';
PLUS: '+';
MINUS: '-';
STAR: '*';
SLASH: '/';
PERCENT: '%';
CARET: '^';
NOT: '!';
AND: '&';
OR: '|';
EQ: '=';
AT: '@';
UNDERSCORE: '_';
DOT: '.';
COMMA: ',';
SEMI: ';';
COLON: ':';
QUESTION: '?';
HASH: '#';
DOLLAR: '$';

// Universal brackets
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// =====================================
// LITERALS
// =====================================

// Character literal
CHAR_LITERAL: '\'' ( ESC_CHAR | ~['\\\r\n] ) '\'';

// String literals
STRING_LITERAL: '"' ( ESC_CHAR | ~["\\\r\n] )* '"';

// Raw string literals r#"..."# or r##"..."## etc
RAW_STRING_LITERAL: 'r' HASH* '"' .*? '"' HASH*;

// Byte string b"..."
BYTE_STRING: 'b"' ( ESC_CHAR | ~["\\\r\n] )* '"';

// Byte literal b'x'
BYTE_LITERAL: 'b\'' ( ESC_CHAR | ~['\\\r\n] ) '\'';

// Numbers
HEX_NUMBER: '0x' [0-9a-fA-F] [0-9a-fA-F_]*;
BIN_NUMBER: '0b' [01] [01_]*;
OCT_NUMBER: '0o' [0-7] [0-7_]*;

FLOAT_NUMBER: [0-9] [0-9_]* '.' [0-9] [0-9_]* (EXPONENT)? [fF]? ('32' | '64')?
            | [0-9] [0-9_]* EXPONENT [fF]? ('32' | '64')?
            ;

INT_NUMBER: [0-9] [0-9_]* ('i8' | 'i16' | 'i32' | 'i64' | 'i128' | 'isize' | 'u8' | 'u16' | 'u32' | 'u64' | 'u128' | 'usize')?;

// =====================================
// SPECIAL TOKENS
// =====================================

// Lifetime annotation
LIFETIME: '\'' [a-zA-Z_] [a-zA-Z0-9_]*;

// Attribute
ATTRIBUTE: '#' '[' .*? ']';

// Macro invocation
MACRO_INVOCATION: [a-zA-Z_] [a-zA-Z0-9_]* '!';

// =====================================
// COMMENTS
// =====================================

LINE_COMMENT: '//' ~[\r\n]*;
BLOCK_COMMENT: '/*' .*? '*/';
DOC_COMMENT_LINE: '///' ~[\r\n]*;
DOC_COMMENT_BLOCK: '/**' .*? '*/';

// =====================================
// IDENTIFIERS
// =====================================

// Identifiers must not end with certain characters to allow proper tokenization
IDENTIFIER: [a-zA-Z_] [a-zA-Z0-9_]*;

// =====================================
// WHITESPACE
// =====================================

WS: [ \t\r\n]+;

// =====================================
// FRAGMENTS
// =====================================

fragment EXPONENT: [eE] [+-]? [0-9] [0-9_]*;

fragment ESC_CHAR
    : '\\' [nrt\\'"0]
    | '\\x' HEX_DIGIT HEX_DIGIT
    | '\\u{' HEX_DIGIT+ '}'
    ;

fragment HEX_DIGIT: [0-9a-fA-F];
