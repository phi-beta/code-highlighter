// TypeScript lexer grammar - extends JavaScript with type annotations and TS-specific features
// Provides comprehensive TypeScript constructs while maintaining lexer simplicity.
lexer grammar TypeScriptMini;

// --- Lexer Rules (UPPERCASE) - Order matters! More specific patterns first ---

// === CRITICAL: Universal bracket tokens (NEVER include in composite tokens) ===
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// Decorators must come first to handle @ symbol
DECORATOR: '@' [A-Za-z_$] [A-Za-z0-9_$]* ;

// Comments first - both single and multi-line
COMMENT_SINGLE: '//' ~[\r\n]* ;
COMMENT_MULTI: '/*' .*? '*/' ;

// TypeScript-specific keywords (includes all JS keywords plus TS-specific ones)
KEYWORD: 'abstract' | 'any' | 'as' | 'asserts' | 'async' | 'await' | 'boolean' | 'break' | 'case' | 'catch' | 'class' | 'const' | 'constructor' | 'continue' | 'debugger' | 'declare' | 'default' | 'delete' | 'do' | 'else' | 'enum' | 'export' | 'extends' | 'false' | 'finally' | 'for' | 'from' | 'function' | 'get' | 'if' | 'implements' | 'import' | 'in' | 'infer' | 'instanceof' | 'interface' | 'is' | 'keyof' | 'let' | 'module' | 'namespace' | 'never' | 'new' | 'null' | 'number' | 'object' | 'of' | 'override' | 'private' | 'protected' | 'public' | 'readonly' | 'return' | 'set' | 'static' | 'string' | 'super' | 'switch' | 'symbol' | 'this' | 'throw' | 'true' | 'try' | 'type' | 'typeof' | 'undefined' | 'union' | 'unknown' | 'var' | 'void' | 'while' | 'with' | 'yield' ;

// String literals - template literals, regular strings
STRING_TEMPLATE: '`' ( '\\' . | '${' .*? '}' | ~[`\\] )*? '`' ;
STRING_DOUBLE: '"' ( '\\' . | ~[\\"] )*? '"' ;
STRING_SINGLE: '\'' ( '\\' . | ~[\\'] )*? '\'' ;

// Numbers - integers, floats, scientific notation, hex, binary, octal
NUMBER: 
    '0x' [0-9a-fA-F]+ |                     // Hexadecimal
    '0b' [01]+ |                            // Binary
    '0o' [0-7]+ |                           // Octal
    [0-9]+ '.' [0-9]+ ([eE] [+-]? [0-9]+)? | // Float with optional scientific
    [0-9]+ [eE] [+-]? [0-9]+ |              // Scientific notation
    [0-9]+ 'n'? ;                           // Integer with optional BigInt suffix

// Regular expressions
REGEX: '/' ( '\\' . | ~[\\/\r\n] )+ '/' [gimuy]* ;

// Type annotations and generics  
TYPE_ANNOTATION: ':' [ \t]* ~[;,)}[{\r\n]+ ;
GENERIC_TYPE: '<' ( ~[<>] | '<' ~[<>]* '>' )* '>' ;

// Operators and punctuation - TypeScript-specific operators
OPERATOR_TS: '?.' | '??' | '??=' | '||=' | '&&=' | '=>' | '...' | '?:' | '!' | '?' ;
OPERATOR: '+=' | '-=' | '*=' | '/=' | '%=' | '&=' | '|=' | '^=' | '<<=' | '>>=' | '>>>=' | '==' | '!=' | '===' | '!==' | '<=' | '>=' | '<<' | '>>' | '>>>' | '&&' | '||' | '++' | '--' | '+' | '-' | '*' | '/' | '%' | '&' | '|' | '^' | '~' | '<' | '>' | '=' ;

// Punctuation
PUNCTUATION: ';' | ',' | '.' | ':' ;

// Identifiers - variables, functions, types (must come after keywords)
IDENTIFIER: [A-Za-z_$] [A-Za-z0-9_$]* ;

// Whitespace and newlines
NEWLINE: ('\r'? '\n') ;
WHITESPACE: [ \t]+ -> channel(HIDDEN) ;

// Catch-all for any other characters
OTHER: . ;
