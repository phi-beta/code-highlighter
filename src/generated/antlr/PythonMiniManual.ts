/**
 * Manual Python lexer for precise syntax highlighting
 * Addresses issues with built-in function vs keyword classification
 */

export interface TokenLike {
  type: number;
  text: string;
}

export class PythonMiniManual {
  // Token constants
  static readonly KEYWORD = 1;
  static readonly BOOLEAN = 2;
  static readonly NONE = 3;
  static readonly COMMENT = 4;
  static readonly F_STRING = 5;
  static readonly RAW_STRING = 6;
  static readonly TRIPLE_STRING = 7;
  static readonly STRING_DOUBLE = 8;
  static readonly STRING_SINGLE = 9;
  static readonly NUMBER = 10;
  static readonly HEX_NUMBER = 11;
  static readonly BIN_NUMBER = 12;
  static readonly OCT_NUMBER = 13;
  static readonly FLOAT_NUMBER = 14;
  static readonly INT_NUMBER = 15;
  static readonly OPERATOR = 16;
  static readonly PUNCT = 17;
  static readonly DECORATOR = 18;
  static readonly FUNCTION = 19;  // Built-in functions
  static readonly IDENTIFIER = 20;
  static readonly NEWLINE = 21;
  static readonly WS = 22;

  // Python keywords (NOT including print, which is a function in Python 3)
  private static readonly KEYWORDS = new Set([
    'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 
    'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'raise', 
    'return', 'try', 'while', 'with', 'yield', 'async', 'await', 'nonlocal'
  ]);

  // Python built-in functions (should be highlighted as functions, not keywords)
  private static readonly BUILTIN_FUNCTIONS = new Set([
    'print', 'input', 'len', 'range', 'str', 'int', 'float', 'bool', 'list', 
    'dict', 'set', 'tuple', 'type', 'isinstance', 'hasattr', 'getattr', 
    'setattr', 'delattr', 'dir', 'vars', 'locals', 'globals', 'id', 'hash',
    'repr', 'ascii', 'ord', 'chr', 'bin', 'oct', 'hex', 'abs', 'round',
    'min', 'max', 'sum', 'any', 'all', 'sorted', 'reversed', 'enumerate',
    'zip', 'map', 'filter', 'iter', 'next', 'open', 'exec', 'eval',
    'compile', 'format', 'divmod', 'pow', 'callable', 'property',
    'classmethod', 'staticmethod', 'super', 'slice', 'memoryview',
    'bytearray', 'bytes', 'frozenset', 'complex', 'object'
  ]);

  // Boolean literals
  private static readonly BOOLEAN_LITERALS = new Set(['True', 'False']);

  // Python operators
  private static readonly OPERATORS = [
    '==', '!=', '<=', '>=', '<<', '>>', '//', '**',
    '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', 
    '>>=', '<<=', '//=', '**=', '->', ':=',
    '+', '-', '*', '/', '%', '&', '|', '^', '!', '?', '=', '<', '>', '~', '@'
  ];

  // Punctuation characters
  private static readonly PUNCTUATION = new Set([
    '{', '}', '(', ')', '[', ']', '.', ',', ';', ':'
  ]);

  private input: string;
  private pos: number = 0;

  constructor(input: string) {
    this.input = input;
    this.pos = 0;
  }

  nextToken(): TokenLike {
    if (this.pos >= this.input.length) {
      return { type: -1, text: '' }; // EOF
    }

    this.skipWhitespace();
    
    if (this.pos >= this.input.length) {
      return { type: -1, text: '' }; // EOF
    }

    const start = this.pos;
    const char = this.input[this.pos];

    // Comments
    if (char === '#') {
      return this.readComment(start);
    }

    // Newlines
    if (char === '\n' || (char === '\r' && this.peek() === '\n')) {
      return this.readNewline(start);
    }

    // Strings
    if (char === '"' || char === "'") {
      return this.readString(start);
    }

    // Triple-quoted strings, f-strings, raw strings
    if (this.pos + 2 < this.input.length) {
      const next3 = this.input.substring(this.pos, this.pos + 3);
      if (next3 === '"""' || next3 === "'''") {
        return this.readTripleString(start);
      }
    }

    // F-strings and raw strings
    if ((char === 'f' || char === 'F' || char === 'r' || char === 'R') && 
        this.pos + 1 < this.input.length &&
        (this.input[this.pos + 1] === '"' || this.input[this.pos + 1] === "'")) {
      return this.readPrefixedString(start);
    }

    // Numbers
    if (this.isDigit(char)) {
      return this.readNumber(start);
    }

    // Hex, binary, octal numbers
    if (char === '0' && this.pos + 1 < this.input.length) {
      const next = this.input[this.pos + 1].toLowerCase();
      if (next === 'x' || next === 'b' || next === 'o') {
        return this.readSpecialNumber(start);
      }
    }

    // Decorators
    if (char === '@') {
      return this.readDecorator(start);
    }

    // Operators (check multi-character first)
    const opToken = this.readOperator(start);
    if (opToken) {
      return opToken;
    }

    // Punctuation
    if (PythonMiniManual.PUNCTUATION.has(char)) {
      this.pos++;
      return {
        type: PythonMiniManual.PUNCT,
        text: char
      };
    }

    // Identifiers, keywords, built-in functions
    if (this.isAlpha(char) || char === '_') {
      return this.readIdentifierOrKeyword(start);
    }

    // Unknown character - consume and continue
    this.pos++;
    return {
      type: PythonMiniManual.IDENTIFIER, // Default to identifier for unknown
      text: char
    };
  }

  private readComment(start: number): TokenLike {
    this.pos++; // skip '#'
    while (this.pos < this.input.length && 
           this.input[this.pos] !== '\n' && 
           this.input[this.pos] !== '\r') {
      this.pos++;
    }
    
    return {
      type: PythonMiniManual.COMMENT,
      text: this.input.substring(start, this.pos)
    };
  }

  private readNewline(start: number): TokenLike {
    if (this.input[this.pos] === '\r') {
      this.pos++;
    }
    if (this.pos < this.input.length && this.input[this.pos] === '\n') {
      this.pos++;
    }
    
    return {
      type: PythonMiniManual.NEWLINE,
      text: this.input.substring(start, this.pos)
    };
  }

  private readString(start: number): TokenLike {
    const quote = this.input[this.pos];
    this.pos++; // skip opening quote
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      
      if (char === quote) {
        this.pos++; // skip closing quote
        break;
      }
      
      if (char === '\\') {
        this.pos += 2; // skip escape sequence
      } else {
        this.pos++;
      }
    }
    
    return {
      type: quote === '"' ? PythonMiniManual.STRING_DOUBLE : PythonMiniManual.STRING_SINGLE,
      text: this.input.substring(start, this.pos)
    };
  }

  private readTripleString(start: number): TokenLike {
    const quotes = this.input.substring(this.pos, this.pos + 3);
    this.pos += 3;
    
    while (this.pos <= this.input.length - 3) {
      if (this.input.substring(this.pos, this.pos + 3) === quotes) {
        this.pos += 3;
        break;
      }
      this.pos++;
    }
    
    return {
      type: PythonMiniManual.TRIPLE_STRING,
      text: this.input.substring(start, this.pos)
    };
  }

  private readPrefixedString(start: number): TokenLike {
    const prefix = this.input[this.pos].toLowerCase();
    this.pos++; // skip prefix
    const stringToken = this.readString(this.pos - 1);
    
    return {
      type: prefix === 'f' ? PythonMiniManual.F_STRING : PythonMiniManual.RAW_STRING,
      text: this.input.substring(start, this.pos)
    };
  }

  private readNumber(start: number): TokenLike {
    let hasDecimal = false;
    let hasExponent = false;
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      
      if (this.isDigit(char)) {
        this.pos++;
      } else if (char === '.' && !hasDecimal && !hasExponent) {
        hasDecimal = true;
        this.pos++;
      } else if ((char === 'e' || char === 'E') && !hasExponent) {
        hasExponent = true;
        this.pos++;
        if (this.pos < this.input.length && 
            (this.input[this.pos] === '+' || this.input[this.pos] === '-')) {
          this.pos++;
        }
      } else {
        break;
      }
    }
    
    let type = PythonMiniManual.INT_NUMBER;
    
    if (hasDecimal || hasExponent) {
      type = PythonMiniManual.FLOAT_NUMBER;
    }
    
    return {
      type,
      text: this.input.substring(start, this.pos)
    };
  }

  private readSpecialNumber(start: number): TokenLike {
    this.pos += 2; // skip '0x', '0b', or '0o'
    const base = this.input[start + 1].toLowerCase();
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos].toLowerCase();
      
      if ((base === 'x' && this.isHexDigit(char)) ||
          (base === 'b' && (char === '0' || char === '1')) ||
          (base === 'o' && char >= '0' && char <= '7')) {
        this.pos++;
      } else {
        break;
      }
    }
    
    const type = base === 'x' ? PythonMiniManual.HEX_NUMBER : 
                 base === 'b' ? PythonMiniManual.BIN_NUMBER : PythonMiniManual.OCT_NUMBER;
    
    return {
      type,
      text: this.input.substring(start, this.pos)
    };
  }

  private readDecorator(start: number): TokenLike {
    this.pos++; // skip '@'
    
    // Read identifier after @
    while (this.pos < this.input.length && 
           (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_')) {
      this.pos++;
    }
    
    // Handle dotted decorators like @class.method
    while (this.pos < this.input.length && this.input[this.pos] === '.') {
      this.pos++; // skip '.'
      while (this.pos < this.input.length && 
             (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_')) {
        this.pos++;
      }
    }
    
    return {
      type: PythonMiniManual.DECORATOR,
      text: this.input.substring(start, this.pos)
    };
  }

  private readOperator(start: number): TokenLike | null {
    // Sort operators by length (longest first) to match multi-character operators
    const sortedOps = [...PythonMiniManual.OPERATORS].sort((a, b) => b.length - a.length);
    
    for (const op of sortedOps) {
      if (this.input.substring(this.pos, this.pos + op.length) === op) {
        this.pos += op.length;
        return {
          type: PythonMiniManual.OPERATOR,
          text: op
        };
      }
    }
    
    return null;
  }

  private readIdentifierOrKeyword(start: number): TokenLike {
    while (this.pos < this.input.length && 
           (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_')) {
      this.pos++;
    }
    
    const text = this.input.substring(start, this.pos);
    
    // Determine token type
    let type: number;
    if (PythonMiniManual.KEYWORDS.has(text)) {
      type = PythonMiniManual.KEYWORD;
    } else if (PythonMiniManual.BOOLEAN_LITERALS.has(text)) {
      type = PythonMiniManual.BOOLEAN;
    } else if (text === 'None') {
      type = PythonMiniManual.NONE;
    } else if (PythonMiniManual.BUILTIN_FUNCTIONS.has(text)) {
      type = PythonMiniManual.FUNCTION;  // This is the key fix!
    } else {
      type = PythonMiniManual.IDENTIFIER;
    }
    
    return {
      type,
      text
    };
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (char === ' ' || char === '\t') {
        this.pos++;
      } else {
        break;
      }
    }
  }

  private peek(): string {
    return this.pos + 1 < this.input.length ? this.input[this.pos + 1] : '';
  }

  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  private isHexDigit(char: string): boolean {
    return this.isDigit(char) || (char >= 'a' && char <= 'f') || (char >= 'A' && char <= 'F');
  }

  private isAlpha(char: string): boolean {
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  // Symbolic names for ANTLR compatibility
  static readonly symbolicNames = [
    null, 'KEYWORD', 'BOOLEAN', 'NONE', 'COMMENT', 'F_STRING', 'RAW_STRING',
    'TRIPLE_STRING', 'STRING_DOUBLE', 'STRING_SINGLE', 'NUMBER', 'HEX_NUMBER',
    'BIN_NUMBER', 'OCT_NUMBER', 'FLOAT_NUMBER', 'INT_NUMBER', 'OPERATOR',
    'PUNCT', 'DECORATOR', 'FUNCTION', 'IDENTIFIER', 'NEWLINE', 'WS'
  ];
}

