lexer grammar SqlMiniLexer;

// SQL Keywords - DML
SELECT: S E L E C T;
FROM: F R O M;
WHERE: W H E R E;
INSERT: I N S E R T;
INTO: I N T O;
VALUES: V A L U E S;
UPDATE: U P D A T E;
SET: S E T;
DELETE: D E L E T E;

// SQL Keywords - DDL
CREATE: C R E A T E;
DROP: D R O P;
ALTER: A L T E R;
TABLE: T A B L E;
INDEX: I N D E X;
VIEW: V I E W;
DATABASE: D A T A B A S E;
SCHEMA: S C H E M A;

// SQL Keywords - Other
JOIN: J O I N;
INNER: I N N E R;
LEFT: L E F T;
RIGHT: R I G H T;
FULL: F U L L;
OUTER: O U T E R;
ON: O N;
AS: A S;
ORDER: O R D E R;
BY: B Y;
GROUP: G R O U P;
HAVING: H A V I N G;
LIMIT: L I M I T;
OFFSET: O F F S E T;
UNION: U N I O N;
ALL: A L L;
DISTINCT: D I S T I N C T;
ASC: A S C;
DESC: D E S C;

// SQL Keywords - Logic
AND: A N D;
OR: O R;
NOT: N O T;
IN: I N;
EXISTS: E X I S T S;
BETWEEN: B E T W E E N;
LIKE: L I K E;
IS: I S;
NULL: N U L L;
TRUE: T R U E;
FALSE: F A L S E;

// SQL Keywords - Functions
COUNT: C O U N T;
SUM: S U M;
AVG: A V G;
MIN: M I N;
MAX: M A X;
CASE: C A S E;
WHEN: W H E N;
THEN: T H E N;
ELSE: E L S E;
END: E N D;

// Data Types
INT: I N T;
INTEGER: I N T E G E R;
VARCHAR: V A R C H A R;
CHAR: C H A R;
TEXT: T E X T;
BOOLEAN: B O O L E A N;
DECIMAL: D E C I M A L;
FLOAT: F L O A T;
DOUBLE: D O U B L E;
DATE: D A T E;
TIME: T I M E;
TIMESTAMP: T I M E S T A M P;

// Constraints and Modifiers
PRIMARY: P R I M A R Y;
KEY: K E Y;
FOREIGN: F O R E I G N;
REFERENCES: R E F E R E N C E S;
UNIQUE: U N I Q U E;
NOT_NULL: N O T ' ' N U L L;
DEFAULT: D E F A U L T;
AUTO_INCREMENT: A U T O '_' I N C R E M E N T;
CHECK: C H E C K;

// Operators
EQUALS: '=';
NOT_EQUALS: '!=' | '<>';
LESS_THAN: '<';
GREATER_THAN: '>';
LESS_EQUAL: '<=';
GREATER_EQUAL: '>=';
PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: '%';

// Punctuation
SEMICOLON: ';';
COMMA: ',';
DOT: '.';
LPAREN: '(';
RPAREN: ')';

// String literals
STRING_LITERAL: '\'' (~'\'' | '\'\'')* '\'';
DOUBLE_QUOTED_STRING: '"' (~'"' | '""')* '"';

// Numeric literals
NUMBER: [0-9]+ ('.' [0-9]+)?;

// Identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

// Comments
LINE_COMMENT: '--' ~[\r\n]* -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

// Whitespace
WHITESPACE: [ \t\r\n]+ -> skip;

// Case-insensitive fragments
fragment A: [aA];
fragment B: [bB];
fragment C: [cC];
fragment D: [dD];
fragment E: [eE];
fragment F: [fF];
fragment G: [gG];
fragment H: [hH];
fragment I: [iI];
fragment J: [jJ];
fragment K: [kK];
fragment L: [lL];
fragment M: [mM];
fragment N: [nN];
fragment O: [oO];
fragment P: [pP];
fragment Q: [qQ];
fragment R: [rR];
fragment S: [sS];
fragment T: [tT];
fragment U: [uU];
fragment V: [vV];
fragment W: [wW];
fragment X: [xX];
fragment Y: [yY];
fragment Z: [zZ];
