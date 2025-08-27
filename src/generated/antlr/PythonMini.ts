/**
 * SQL Mini-Lexer Stub - Manual Token Classification
 * Provides basic SQL s  static readonly CASE = 66;
  static readonly WHEN = 67;
  static readonly THEN = 68;
  static readonly ELSE = 69;
  static readonly END = 70;
  static readonly ASC = 71;
  static readonly DESC = 72;ighlighting without complex ANTLR dependencies.
 */

export interface TokenLike {
  type: number;
  text: string;
}

export class SqlMini {
  private input: string;
  private pos: number = 0;
  
  // Token type constants - match ANTLR convention
  static readonly SELECT = 1;
  static readonly FROM = 2;
  static readonly WHERE = 3;
  static readonly INSERT = 4;
  static readonly INTO = 5;
  static readonly VALUES = 6;
  static readonly UPDATE = 7;
  static readonly SET = 8;
  static readonly DELETE = 9;
  static readonly CREATE = 10;
  static readonly DROP = 11;
  static readonly ALTER = 12;
  static readonly TABLE = 13;
  static readonly INDEX = 14;
  static readonly VIEW = 15;
  static readonly DATABASE = 16;
  static readonly SCHEMA = 17;
  static readonly JOIN = 18;
  static readonly INNER = 19;
  static readonly LEFT = 20;
  static readonly RIGHT = 21;
  static readonly FULL = 22;
  static readonly OUTER = 23;
  static readonly ON = 24;
  static readonly AS = 25;
  static readonly ORDER = 26;
  static readonly BY = 27;
  static readonly GROUP = 28;
  static readonly HAVING = 29;
  static readonly LIMIT = 30;
  static readonly OFFSET = 31;
  static readonly UNION = 32;
  static readonly ALL = 33;
  static readonly DISTINCT = 34;
  static readonly ASC = 35;
  static readonly DESC = 36;
  static readonly AND = 37;
  static readonly OR = 38;
  static readonly NOT = 39;
  static readonly IN = 40;
  static readonly EXISTS = 41;
  static readonly BETWEEN = 42;
  static readonly LIKE = 43;
  static readonly IS = 44;
  static readonly NULL = 45;
  static readonly TRUE = 46;
  static readonly FALSE = 47;
  static readonly COUNT = 48;
  static readonly SUM = 49;
  static readonly AVG = 50;
  static readonly MIN = 51;
  static readonly MAX = 52;
  static readonly RANK = 53;
  static readonly DENSE_RANK = 54;
  static readonly ROW_NUMBER = 55;
  static readonly OVER = 56;
  static readonly PARTITION = 57;
  static readonly USE = 58;
  static readonly WITH = 59;
  static readonly SHOW = 60;
  static readonly IF = 61;
  static readonly COLUMN = 62;
  static readonly TABLES = 63;
  static readonly DATABASES = 64;
  static readonly DESCRIBE = 65;
  static readonly CASE = 66;
  static readonly WHEN = 67;
  static readonly THEN = 68;
  static readonly ELSE = 69;
  static readonly END = 70;
  static readonly INT = 71;
  static readonly INTEGER = 72;
  static readonly VARCHAR = 73;
  static readonly CHAR = 74;
  static readonly TEXT = 75;
  static readonly BOOLEAN = 76;
  static readonly DECIMAL = 77;
  static readonly FLOAT = 78;
  static readonly DOUBLE = 79;
  static readonly DATE = 80;
  static readonly TIME = 81;
  static readonly TIMESTAMP = 82;
  static readonly PRIMARY = 83;
  static readonly KEY = 84;
  static readonly FOREIGN = 85;
  static readonly REFERENCES = 86;
  static readonly UNIQUE = 87;
  static readonly NOT_NULL = 88;
  static readonly DEFAULT = 89;
  static readonly AUTO_INCREMENT = 90;
  static readonly CHECK = 91;
  static readonly ADD = 92;
  static readonly MODIFY = 93;
  static readonly EQUALS = 94;
  static readonly NOT_EQUALS = 95;
  static readonly LESS_THAN = 96;
  static readonly GREATER_THAN = 97;
  static readonly LESS_EQUAL = 98;
  static readonly GREATER_EQUAL = 99;
  static readonly PLUS = 100;
  static readonly MINUS = 101;
  static readonly MULTIPLY = 102;
  static readonly DIVIDE = 103;
  static readonly MODULO = 104;
  static readonly SEMICOLON = 105;
  static readonly COMMA = 106;
  static readonly DOT = 107;
  static readonly LPAREN = 108;
  static readonly RPAREN = 109;
  static readonly STRING_LITERAL = 110;
  static readonly DOUBLE_QUOTED_STRING = 111;
  static readonly NUMBER = 112;
  static readonly IDENTIFIER = 113;
  static readonly LINE_COMMENT = 114;
  static readonly BLOCK_COMMENT = 115;
  static readonly WHITESPACE = 116;
  
  // SQL Keywords mapping
  private static readonly KEYWORDS: Record<string, number> = {
    'select': SqlMini.SELECT,
    'from': SqlMini.FROM,
    'where': SqlMini.WHERE,
    'insert': SqlMini.INSERT,
    'into': SqlMini.INTO,
    'values': SqlMini.VALUES,
    'update': SqlMini.UPDATE,
    'set': SqlMini.SET,
    'delete': SqlMini.DELETE,
    'create': SqlMini.CREATE,
    'drop': SqlMini.DROP,
    'alter': SqlMini.ALTER,
    'table': SqlMini.TABLE,
    'index': SqlMini.INDEX,
    'view': SqlMini.VIEW,
    'database': SqlMini.DATABASE,
    'schema': SqlMini.SCHEMA,
    'join': SqlMini.JOIN,
    'inner': SqlMini.INNER,
    'left': SqlMini.LEFT,
    'right': SqlMini.RIGHT,
    'full': SqlMini.FULL,
    'outer': SqlMini.OUTER,
    'on': SqlMini.ON,
    'as': SqlMini.AS,
    'order': SqlMini.ORDER,
    'by': SqlMini.BY,
    'group': SqlMini.GROUP,
    'having': SqlMini.HAVING,
    'limit': SqlMini.LIMIT,
    'offset': SqlMini.OFFSET,
    'union': SqlMini.UNION,
    'all': SqlMini.ALL,
    'distinct': SqlMini.DISTINCT,
    'asc': SqlMini.ASC,
    'desc': SqlMini.DESC,
    'and': SqlMini.AND,
    'or': SqlMini.OR,
    'not': SqlMini.NOT,
    'in': SqlMini.IN,
    'exists': SqlMini.EXISTS,
    'between': SqlMini.BETWEEN,
    'like': SqlMini.LIKE,
    'is': SqlMini.IS,
    'null': SqlMini.NULL,
    'true': SqlMini.TRUE,
    'false': SqlMini.FALSE,
    'count': SqlMini.COUNT,
    'sum': SqlMini.SUM,
    'avg': SqlMini.AVG,
    'min': SqlMini.MIN,
    'max': SqlMini.MAX,
    'rank': SqlMini.RANK,
    'dense_rank': SqlMini.DENSE_RANK,
    'row_number': SqlMini.ROW_NUMBER,
    'over': SqlMini.OVER,
    'partition': SqlMini.PARTITION,
    'use': SqlMini.USE,
    'with': SqlMini.WITH,
    'show': SqlMini.SHOW,
    'if': SqlMini.IF,
    'column': SqlMini.COLUMN,
    'tables': SqlMini.TABLES,
    'databases': SqlMini.DATABASES,
    'describe': SqlMini.DESCRIBE,
    'case': SqlMini.CASE,
    'when': SqlMini.WHEN,
    'then': SqlMini.THEN,
    'else': SqlMini.ELSE,
    'end': SqlMini.END,
    'int': SqlMini.INT,
    'integer': SqlMini.INTEGER,
    'varchar': SqlMini.VARCHAR,
    'char': SqlMini.CHAR,
    'text': SqlMini.TEXT,
    'boolean': SqlMini.BOOLEAN,
    'decimal': SqlMini.DECIMAL,
    'float': SqlMini.FLOAT,
    'double': SqlMini.DOUBLE,
    'date': SqlMini.DATE,
    'time': SqlMini.TIME,
    'timestamp': SqlMini.TIMESTAMP,
    'primary': SqlMini.PRIMARY,
    'key': SqlMini.KEY,
    'foreign': SqlMini.FOREIGN,
    'references': SqlMini.REFERENCES,
    'unique': SqlMini.UNIQUE,
    'default': SqlMini.DEFAULT,
    'check': SqlMini.CHECK,
    'add': SqlMini.ADD,
    'modify': SqlMini.MODIFY
  };
  
  static readonly _SYMBOLIC_NAMES = [
    null, // 0 is unused
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'CREATE', 'DROP', 'ALTER', 'TABLE', 'INDEX', 'VIEW', 'DATABASE', 'SCHEMA',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER', 'ON', 'AS', 'ORDER', 'BY',
    'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'DISTINCT', 'ASC', 'DESC',
    'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'TRUE', 'FALSE',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'OVER', 'PARTITION', 'USE', 'WITH', 'SHOW', 'IF', 'COLUMN', 'TABLES', 'DATABASES', 'DESCRIBE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    'INT', 'INTEGER', 'VARCHAR', 'CHAR', 'TEXT', 'BOOLEAN', 'DECIMAL', 'FLOAT', 'DOUBLE',
    'DATE', 'TIME', 'TIMESTAMP', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE',
    'NOT_NULL', 'DEFAULT', 'AUTO_INCREMENT', 'CHECK', 'ADD', 'MODIFY',
    'EQUALS', 'NOT_EQUALS', 'LESS_THAN', 'GREATER_THAN', 'LESS_EQUAL', 'GREATER_EQUAL',
    'PLUS', 'MINUS', 'MULTIPLY', 'DIVIDE', 'MODULO',
    'SEMICOLON', 'COMMA', 'DOT', 'LPAREN', 'RPAREN',
    'STRING_LITERAL', 'DOUBLE_QUOTED_STRING', 'NUMBER', 'IDENTIFIER',
    'LINE_COMMENT', 'BLOCK_COMMENT', 'WHITESPACE'
  ];
  
  constructor(input: string) {
    this.input = input;
  }
  
  // Expose symbolic names for ANTLR adapter
  get symbolicNames(): string[] {
    return SqlMini._SYMBOLIC_NAMES.map(name => name || '');
  }
  
  nextToken(): TokenLike {
    // Don't skip whitespace automatically - handle it as tokens
    
    if (this.pos >= this.input.length) {
      return { type: -1, text: '' }; // EOF
    }
    
    const char = this.input[this.pos];
    
    // Handle whitespace as tokens to preserve formatting
    if (/\s/.test(char)) {
      return this.readWhitespace();
    }
    
    // Comments
    if (char === '-' && this.peek(1) === '-') {
      return this.readLineComment();
    }
    if (char === '/' && this.peek(1) === '*') {
      return this.readBlockComment();
    }
    
    // String literals
    if (char === "'") {
      return this.readStringSingle();
    }
    if (char === '"') {
      return this.readStringDouble();
    }
    
    // Numbers
    if (/\d/.test(char)) {
      return this.readNumber();
    }
    
    // Operators and punctuation
    if (char === '=' ) return { type: SqlMini.EQUALS, text: this.consume() };
    if (char === '!' && this.peek(1) === '=') return { type: SqlMini.NOT_EQUALS, text: this.consume() + this.consume() };
    if (char === '<' && this.peek(1) === '>') return { type: SqlMini.NOT_EQUALS, text: this.consume() + this.consume() };
    if (char === '<' && this.peek(1) === '=') return { type: SqlMini.LESS_EQUAL, text: this.consume() + this.consume() };
    if (char === '>' && this.peek(1) === '=') return { type: SqlMini.GREATER_EQUAL, text: this.consume() + this.consume() };
    if (char === '<') return { type: SqlMini.LESS_THAN, text: this.consume() };
    if (char === '>') return { type: SqlMini.GREATER_THAN, text: this.consume() };
    if (char === '+') return { type: SqlMini.PLUS, text: this.consume() };
    if (char === '-') return { type: SqlMini.MINUS, text: this.consume() };
    if (char === '*') return { type: SqlMini.MULTIPLY, text: this.consume() };
    if (char === '/') return { type: SqlMini.DIVIDE, text: this.consume() };
    if (char === '%') return { type: SqlMini.MODULO, text: this.consume() };
    if (char === ';') return { type: SqlMini.SEMICOLON, text: this.consume() };
    if (char === ',') return { type: SqlMini.COMMA, text: this.consume() };
    if (char === '.') return { type: SqlMini.DOT, text: this.consume() };
    if (char === '(') return { type: SqlMini.LPAREN, text: this.consume() };
    if (char === ')') return { type: SqlMini.RPAREN, text: this.consume() };
    
    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      return this.readIdentifierOrKeyword();
    }
    
    // Unknown character - skip it
    return { type: SqlMini.IDENTIFIER, text: this.consume() };
  }
  
  private consume(): string {
    return this.input[this.pos++];
  }
  
  private peek(offset: number): string {
    const pos = this.pos + offset;
    return pos < this.input.length ? this.input[pos] : '';
  }
  
  private skipWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
  }
  
  private readWhitespace(): TokenLike {
    const start = this.pos;
    while (this.pos < this.input.length && /\s/.test(this.input[this.pos])) {
      this.pos++;
    }
    return { type: SqlMini.WHITESPACE, text: this.input.slice(start, this.pos) };
  }
  
  private readLineComment(): TokenLike {
    const start = this.pos;
    this.pos += 2; // skip '--'
    while (this.pos < this.input.length && this.input[this.pos] !== '\n') {
      this.pos++;
    }
    return { type: SqlMini.LINE_COMMENT, text: this.input.slice(start, this.pos) };
  }
  
  private readBlockComment(): TokenLike {
    const start = this.pos;
    this.pos += 2; // skip '/*'
    while (this.pos < this.input.length - 1) {
      if (this.input[this.pos] === '*' && this.input[this.pos + 1] === '/') {
        this.pos += 2;
        break;
      }
      this.pos++;
    }
    return { type: SqlMini.BLOCK_COMMENT, text: this.input.slice(start, this.pos) };
  }
  
  private readStringSingle(): TokenLike {
    const start = this.pos;
    this.pos++; // skip opening quote
    while (this.pos < this.input.length) {
      if (this.input[this.pos] === "'") {
        if (this.peek(1) === "'") {
          this.pos += 2; // skip escaped quote
        } else {
          this.pos++; // skip closing quote
          break;
        }
      } else {
        this.pos++;
      }
    }
    return { type: SqlMini.STRING_LITERAL, text: this.input.slice(start, this.pos) };
  }
  
  private readStringDouble(): TokenLike {
    const start = this.pos;
    this.pos++; // skip opening quote
    while (this.pos < this.input.length) {
      if (this.input[this.pos] === '"') {
        if (this.peek(1) === '"') {
          this.pos += 2; // skip escaped quote
        } else {
          this.pos++; // skip closing quote
          break;
        }
      } else {
        this.pos++;
      }
    }
    return { type: SqlMini.DOUBLE_QUOTED_STRING, text: this.input.slice(start, this.pos) };
  }
  
  private readNumber(): TokenLike {
    const start = this.pos;
    while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
      this.pos++;
    }
    if (this.pos < this.input.length && this.input[this.pos] === '.') {
      this.pos++; // decimal point
      while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
        this.pos++;
      }
    }
    return { type: SqlMini.NUMBER, text: this.input.slice(start, this.pos) };
  }
  
  private readIdentifierOrKeyword(): TokenLike {
    const start = this.pos;
    while (this.pos < this.input.length && /[a-zA-Z0-9_]/.test(this.input[this.pos])) {
      this.pos++;
    }
    const text = this.input.slice(start, this.pos);
    const lowerText = text.toLowerCase();
    const keywordType = SqlMini.KEYWORDS[lowerText];
    return {
      type: keywordType || SqlMini.IDENTIFIER,
      text: text
    };
  }
}
