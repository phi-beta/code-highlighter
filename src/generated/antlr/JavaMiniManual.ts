/**
 * Manual Java lexer for precise syntax highlighting
 * Follows ANTLR approach but without dependencies
 */

export interface TokenLike {
  type: number;
  text: string;
}

export class JavaMiniManual {
  // Token constants
  static readonly KEYWORD = 1;
  static readonly TYPE = 2;
  static readonly BOOLEAN = 3;
  static readonly NULL = 4;
  static readonly COMMENT_LINE = 5;
  static readonly COMMENT_BLOCK = 6;
  static readonly COMMENT_DOC = 7;
  static readonly ANNOTATION = 8;
  static readonly STRING = 9;
  static readonly CHARACTER = 10;
  static readonly NUMBER_HEX = 11;
  static readonly NUMBER_BINARY = 12;
  static readonly NUMBER_OCTAL = 13;
  static readonly NUMBER_DECIMAL = 14;
  static readonly NUMBER_FLOAT = 15;
  static readonly OPERATOR = 16;
  static readonly IDENTIFIER = 17;
  static readonly PUNCT = 18;
  static readonly WS = 19;

  // Java keywords
  private static readonly KEYWORDS = new Set([
    'abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 'continue',
    'default', 'do', 'else', 'enum', 'extends', 'final', 'finally', 'for',
    'goto', 'if', 'implements', 'import', 'instanceof', 'interface', 'native',
    'new', 'package', 'private', 'protected', 'public', 'return', 'static',
    'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
    'transient', 'try', 'volatile', 'while'
  ]);

  // Java primitive types
  private static readonly TYPES = new Set([
    'boolean', 'byte', 'char', 'double', 'float', 'int', 'long', 'short', 'void'
  ]);

  // Boolean literals
  private static readonly BOOLEAN_LITERALS = new Set(['true', 'false']);

  // Java operators
  private static readonly OPERATORS = [
    '==', '!=', '<=', '>=', '<<', '>>', '>>>', '++', '--', '&&', '||',
    '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>>=',
    '->', '::', '+', '-', '*', '/', '%', '&', '|', '^', '!', '~', '=', '<', '>', '?'
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

    const start = this.pos;
    const char = this.input[this.pos];

    // Whitespace
    if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
      return this.readWhitespace(start);
    }

    // Comments
    if (char === '/' && this.pos + 1 < this.input.length) {
      const next = this.input[this.pos + 1];
      if (next === '/') {
        return this.readLineComment(start);
      } else if (next === '*') {
        return this.readBlockComment(start);
      }
    }

    // Strings
    if (char === '"') {
      return this.readString(start);
    }

    // Character literals
    if (char === "'") {
      return this.readCharacter(start);
    }

    // Numbers
    if (this.isDigit(char)) {
      return this.readNumber(start);
    }

    // Hex, binary, octal numbers
    if (char === '0' && this.pos + 1 < this.input.length) {
      const next = this.input[this.pos + 1].toLowerCase();
      if (next === 'x' || next === 'b') {
        return this.readSpecialNumber(start);
      } else if (this.isDigit(next)) {
        return this.readOctalNumber(start);
      }
    }

    // Annotations
    if (char === '@') {
      return this.readAnnotation(start);
    }

    // Operators (check multi-character first)
    const opToken = this.readOperator(start);
    if (opToken) {
      return opToken;
    }

    // Punctuation
    if (JavaMiniManual.PUNCTUATION.has(char)) {
      this.pos++;
      return {
        type: JavaMiniManual.PUNCT,
        text: char
      };
    }

    // Identifiers, keywords, types
    if (this.isAlpha(char) || char === '_' || char === '$') {
      return this.readIdentifierOrKeyword(start);
    }

    // Unknown character - consume and continue
    this.pos++;
    return {
      type: JavaMiniManual.IDENTIFIER, // Default to identifier for unknown
      text: char
    };
  }

  private readLineComment(start: number): TokenLike {
    this.pos += 2; // skip '//'
    while (this.pos < this.input.length && 
           this.input[this.pos] !== '\n' && 
           this.input[this.pos] !== '\r') {
      this.pos++;
    }
    
    return {
      type: JavaMiniManual.COMMENT_LINE,
      text: this.input.substring(start, this.pos)
    };
  }

  private readBlockComment(start: number): TokenLike {
    this.pos += 2; // skip '/*'
    
    // Check if it's a doc comment
    const isDocComment = this.pos < this.input.length && this.input[this.pos] === '*';
    
    while (this.pos + 1 < this.input.length) {
      if (this.input[this.pos] === '*' && this.input[this.pos + 1] === '/') {
        this.pos += 2;
        break;
      }
      this.pos++;
    }
    
    return {
      type: isDocComment ? JavaMiniManual.COMMENT_DOC : JavaMiniManual.COMMENT_BLOCK,
      text: this.input.substring(start, this.pos)
    };
  }

  private readString(start: number): TokenLike {
    this.pos++; // skip opening quote
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      
      if (char === '"') {
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
      type: JavaMiniManual.STRING,
      text: this.input.substring(start, this.pos)
    };
  }

  private readCharacter(start: number): TokenLike {
    this.pos++; // skip opening quote
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      
      if (char === "'") {
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
      type: JavaMiniManual.CHARACTER,
      text: this.input.substring(start, this.pos)
    };
  }

  private readNumber(start: number): TokenLike {
    let hasDecimal = false;
    let hasExponent = false;
    let hasFloatSuffix = false;
    
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
      } else if ((char === 'f' || char === 'F' || char === 'd' || char === 'D' || char === 'l' || char === 'L')) {
        hasFloatSuffix = true;
        this.pos++;
        break;
      } else {
        break;
      }
    }
    
    let type = JavaMiniManual.NUMBER_DECIMAL;
    
    if (hasDecimal || hasExponent || hasFloatSuffix) {
      type = JavaMiniManual.NUMBER_FLOAT;
    }
    
    return {
      type,
      text: this.input.substring(start, this.pos)
    };
  }

  private readSpecialNumber(start: number): TokenLike {
    this.pos += 2; // skip '0x', '0b'
    const base = this.input[start + 1].toLowerCase();
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos].toLowerCase();
      
      if ((base === 'x' && this.isHexDigit(char)) ||
          (base === 'b' && (char === '0' || char === '1'))) {
        this.pos++;
      } else if (char === 'l') {
        this.pos++; // long suffix
        break;
      } else {
        break;
      }
    }
    
    const type = base === 'x' ? JavaMiniManual.NUMBER_HEX : JavaMiniManual.NUMBER_BINARY;
    
    return {
      type,
      text: this.input.substring(start, this.pos)
    };
  }

  private readOctalNumber(start: number): TokenLike {
    this.pos++; // skip '0'
    
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      
      if (char >= '0' && char <= '7') {
        this.pos++;
      } else if (char === 'l' || char === 'L') {
        this.pos++; // long suffix
        break;
      } else {
        break;
      }
    }
    
    return {
      type: JavaMiniManual.NUMBER_OCTAL,
      text: this.input.substring(start, this.pos)
    };
  }

  private readAnnotation(start: number): TokenLike {
    this.pos++; // skip '@'
    
    // Read identifier after @
    while (this.pos < this.input.length && 
           (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_' || this.input[this.pos] === '$')) {
      this.pos++;
    }
    
    // Handle dotted annotations like @javax.annotation.Nonnull
    while (this.pos < this.input.length && this.input[this.pos] === '.') {
      this.pos++; // skip '.'
      while (this.pos < this.input.length && 
             (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_' || this.input[this.pos] === '$')) {
        this.pos++;
      }
    }
    
    return {
      type: JavaMiniManual.ANNOTATION,
      text: this.input.substring(start, this.pos)
    };
  }

  private readOperator(start: number): TokenLike | null {
    // Sort operators by length (longest first) to match multi-character operators
    const sortedOps = [...JavaMiniManual.OPERATORS].sort((a, b) => b.length - a.length);
    
    for (const op of sortedOps) {
      if (this.input.substring(this.pos, this.pos + op.length) === op) {
        this.pos += op.length;
        return {
          type: JavaMiniManual.OPERATOR,
          text: op
        };
      }
    }
    
    return null;
  }

  private readIdentifierOrKeyword(start: number): TokenLike {
    while (this.pos < this.input.length && 
           (this.isAlphaNumeric(this.input[this.pos]) || this.input[this.pos] === '_' || this.input[this.pos] === '$')) {
      this.pos++;
    }
    
    const text = this.input.substring(start, this.pos);
    
    // Determine token type
    let type: number;
    if (JavaMiniManual.KEYWORDS.has(text)) {
      type = JavaMiniManual.KEYWORD;
    } else if (JavaMiniManual.TYPES.has(text)) {
      type = JavaMiniManual.TYPE;
    } else if (JavaMiniManual.BOOLEAN_LITERALS.has(text)) {
      type = JavaMiniManual.BOOLEAN;
    } else if (text === 'null') {
      type = JavaMiniManual.NULL;
    } else {
      type = JavaMiniManual.IDENTIFIER;
    }
    
    return {
      type,
      text
    };
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        this.pos++;
      } else {
        break;
      }
    }
  }

  private readWhitespace(start: number): TokenLike {
    while (this.pos < this.input.length) {
      const char = this.input[this.pos];
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        this.pos++;
      } else {
        break;
      }
    }
    
    return {
      type: JavaMiniManual.WS,
      text: this.input.substring(start, this.pos)
    };
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
    null, 'KEYWORD', 'TYPE', 'BOOLEAN', 'NULL', 'COMMENT_LINE', 'COMMENT_BLOCK',
    'COMMENT_DOC', 'ANNOTATION', 'STRING', 'CHARACTER', 'NUMBER_HEX',
    'NUMBER_BINARY', 'NUMBER_OCTAL', 'NUMBER_DECIMAL', 'NUMBER_FLOAT',
    'OPERATOR', 'IDENTIFIER', 'PUNCT', 'WS'
  ];
}
