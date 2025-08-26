grammar SqlMini;

// Parser rules
sqlFile: statement* EOF;

statement: 
    selectStatement SEMICOLON?
    | insertStatement SEMICOLON?
    | updateStatement SEMICOLON?
    | deleteStatement SEMICOLON?
    | createStatement SEMICOLON?
    | dropStatement SEMICOLON?
    | alterStatement SEMICOLON?
    | useStatement SEMICOLON?
    | showStatement SEMICOLON?
    | describeStatement SEMICOLON?
    | comment SEMICOLON?
    ;

selectStatement: 
    SELECT DISTINCT? selectList
    FROM tableList
    (WHERE expression)?
    (GROUP BY columnList)?
    (HAVING expression)?
    (ORDER BY orderList)?
    (LIMIT NUMBER)?
    ;

insertStatement:
    INSERT INTO tableName 
    (LPAREN columnList RPAREN)?
    (VALUES LPAREN valueList RPAREN | selectStatement)
    ;

updateStatement:
    UPDATE tableName
    SET updateList
    (WHERE expression)?
    ;

deleteStatement:
    DELETE FROM tableName
    (WHERE expression)?
    ;

createStatement:
    CREATE (TABLE | VIEW | INDEX | DATABASE | SCHEMA) 
    tableName
    createBody?
    ;

dropStatement:
    DROP (TABLE | VIEW | INDEX | DATABASE | SCHEMA)
    (IF EXISTS)?
    tableName
    ;

alterStatement:
    ALTER TABLE tableName
    (ADD | DROP | MODIFY) 
    columnDefinition
    ;

useStatement: USE databaseName;
showStatement: SHOW (TABLES | DATABASES | COLUMNS FROM tableName);
describeStatement: (DESCRIBE | DESC) tableName;

selectList: (STAR | expression (AS? alias)?) (COMMA expression (AS? alias)?)*;
tableList: tableName (AS? alias)? (COMMA tableName (AS? alias)?)*;
columnList: columnName (COMMA columnName)*;
valueList: expression (COMMA expression)*;
updateList: columnName EQUALS expression (COMMA columnName EQUALS expression)*;
orderList: columnName (ASC | DESC)? (COMMA columnName (ASC | DESC)?)*;

expression:
    LPAREN expression RPAREN
    | expression (PLUS | MINUS | MULTIPLY | DIVIDE | MODULO) expression
    | expression (EQUALS | NOT_EQUALS | LESS_THAN | GREATER_THAN | LESS_EQUALS | GREATER_EQUALS) expression
    | expression (AND | OR) expression
    | NOT expression
    | functionCall
    | columnName
    | literal
    | subquery
    ;

subquery: LPAREN selectStatement RPAREN;

functionCall: 
    functionName LPAREN 
    (DISTINCT? expression (COMMA expression)* | STAR)? 
    RPAREN
    ;

createBody: LPAREN columnDefinition (COMMA columnDefinition)* RPAREN;
columnDefinition: columnName dataType constraintList?;
dataType: 
    (VARCHAR | CHAR) LPAREN NUMBER RPAREN
    | (INT | INTEGER | BIGINT | SMALLINT | TINYINT)
    | (DECIMAL | NUMERIC) LPAREN NUMBER (COMMA NUMBER)? RPAREN
    | (FLOAT | DOUBLE | REAL)
    | (DATE | TIME | DATETIME | TIMESTAMP)
    | TEXT | BLOB
    | BOOLEAN
    ;

constraintList: constraint+;
constraint: 
    NOT NULL
    | PRIMARY KEY
    | UNIQUE
    | AUTO_INCREMENT
    | DEFAULT literal
    | FOREIGN KEY REFERENCES tableName LPAREN columnName RPAREN
    ;

tableName: identifier;
columnName: identifier;
databaseName: identifier;
functionName: identifier;
alias: identifier;

identifier: IDENTIFIER | QUOTED_IDENTIFIER;

literal:
    STRING
    | NUMBER
    | BOOLEAN_LITERAL
    | NULL
    ;

comment: COMMENT;

// Lexer rules

// Keywords (case-insensitive)
SELECT: S E L E C T;
FROM: F R O M;
WHERE: W H E R E;
INSERT: I N S E R T;
INTO: I N T O;
VALUES: V A L U E S;
UPDATE: U P D A T E;
SET: S E T;
DELETE: D E L E T E;
CREATE: C R E A T E;
DROP: D R O P;
ALTER: A L T E R;
TABLE: T A B L E;
VIEW: V I E W;
INDEX: I N D E X;
DATABASE: D A T A B A S E;
SCHEMA: S C H E M A;
USE: U S E;
SHOW: S H O W;
TABLES: T A B L E S;
DATABASES: D A T A B A S E S;
COLUMNS: C O L U M N S;
DESCRIBE: D E S C R I B E;
DESC: D E S C;
DISTINCT: D I S T I N C T;
GROUP: G R O U P;
BY: B Y;
HAVING: H A V I N G;
ORDER: O R D E R;
ASC: A S C;
DESC_ORDER: D E S C;
LIMIT: L I M I T;
AS: A S;
IF: I F;
EXISTS: E X I S T S;
ADD: A D D;
MODIFY: M O D I F Y;
AND: A N D;
OR: O R;
NOT: N O T;
NULL: N U L L;
TRUE: T R U E;
FALSE: F A L S E;
PRIMARY: P R I M A R Y;
FOREIGN: F O R E I G N;
KEY: K E Y;
REFERENCES: R E F E R E N C E S;
UNIQUE: U N I Q U E;
AUTO_INCREMENT: A U T O '_' I N C R E M E N T;
DEFAULT: D E F A U L T;

// Data types
VARCHAR: V A R C H A R;
CHAR: C H A R;
INT: I N T;
INTEGER: I N T E G E R;
BIGINT: B I G I N T;
SMALLINT: S M A L L I N T;
TINYINT: T I N Y I N T;
DECIMAL: D E C I M A L;
NUMERIC: N U M E R I C;
FLOAT: F L O A T;
DOUBLE: D O U B L E;
REAL: R E A L;
DATE: D A T E;
TIME: T I M E;
DATETIME: D A T E T I M E;
TIMESTAMP: T I M E S T A M P;
TEXT: T E X T;
BLOB: B L O B;
BOOLEAN: B O O L E A N;

// Operators and punctuation
EQUALS: '=';
NOT_EQUALS: '!=' | '<>';
LESS_THAN: '<';
GREATER_THAN: '>';
LESS_EQUALS: '<=';
GREATER_EQUALS: '>=';
PLUS: '+';
MINUS: '-';
MULTIPLY: '*';
DIVIDE: '/';
MODULO: '%';
STAR: '*';
SEMICOLON: ';';
COMMA: ',';
LPAREN: '(';
RPAREN: ')';

// Literals
STRING: '\'' (~['\r\n] | '\'\'')* '\'';
QUOTED_IDENTIFIER: '"' (~["\r\n])* '"' | '`' (~[`\r\n])* '`';
NUMBER: [0-9]+ ('.' [0-9]+)?;
BOOLEAN_LITERAL: TRUE | FALSE;

// Identifiers
IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;

// Comments
COMMENT: ('--' ~[\r\n]* | '/*' .*? '*/');

// Whitespace
WS: [ \t\r\n]+ -> skip;

// Case-insensitive helper fragments
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
