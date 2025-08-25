// YAML lexer grammar - YAML 1.2 core features
// Handles documents, scalars, sequences, mappings, and anchors
lexer grammar YamlMini;

// === CRITICAL: Universal bracket tokens (NEVER include in composite tokens) ===
LPAREN: '(';
RPAREN: ')';
LBRACE: '{';
RBRACE: '}';
LBRACKET: '[';
RBRACKET: ']';

// === YAML Document markers ===
DOCUMENT_START: '---';
DOCUMENT_END: '...';

// === YAML Comments ===
COMMENT: '#' ~[\r\n]*;

// === YAML Indicators ===
COLON: ':';
DASH: '-';
QUESTION: '?';
PIPE: '|';
GT: '>';
AMPERSAND: '&';
ASTERISK: '*';

// === YAML Quoted strings (highest priority) ===
DOUBLE_QUOTED_STRING: '"' (~["\r\n\\] | '\\' .)* '"';
SINGLE_QUOTED_STRING: '\'' (~['\r\n] | '\'\'')* '\'';

// === YAML Numbers ===
YAML_NUMBER: '-'? [0-9]+ ('.' [0-9]+)? ([eE] [+-]? [0-9]+)?;
YAML_FLOAT: '-'? ('.' [0-9]+ ([eE] [+-]? [0-9]+)? | [0-9]+ '.' [0-9]* ([eE] [+-]? [0-9]+)?);
YAML_SPECIAL_FLOAT: '.inf' | '.Inf' | '.INF' | '-.inf' | '-.Inf' | '-.INF' | '.nan' | '.NaN' | '.NAN';

// === YAML Boolean and null ===
YAML_BOOLEAN: 'true' | 'false' | 'True' | 'False' | 'TRUE' | 'FALSE' | 'yes' | 'no' | 'Yes' | 'No' | 'YES' | 'NO' | 'on' | 'off' | 'On' | 'Off' | 'ON' | 'OFF';
YAML_NULL: 'null' | 'Null' | 'NULL' | '~';

// === YAML Anchors and aliases ===
ANCHOR: '&' [a-zA-Z_][a-zA-Z0-9_-]*;
ALIAS: '*' [a-zA-Z_][a-zA-Z0-9_-]*;

// === YAML Tag ===
TAG: '!' [a-zA-Z0-9_-]* ('!' [a-zA-Z0-9_-]*)?;

// === YAML Plain scalars (last priority) ===
PLAIN_SCALAR: [a-zA-Z0-9_] [a-zA-Z0-9_\-.]*;

// === Line endings and indentation ===
NEWLINE: [\r\n]+;
INDENT: [ \t]+;
