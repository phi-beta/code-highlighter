// Quick test of SQL tokenization flow
const code = `SELECT id
FROM users`;

console.log('Testing tokenization...');
console.log('Input code:');
console.log(JSON.stringify(code));

// Simulate what the ANTLR adapter does
const sqlMiniCode = `
export class SqlMini {
  constructor(input) {
    this.input = input;
    this.pos = 0;
  }
  
  nextToken() {
    if (this.pos >= this.input.length) return { type: -1, text: '' };
    
    // Check for whitespace
    if (/\\s/.test(this.input[this.pos])) {
      const start = this.pos;
      while (this.pos < this.input.length && /\\s/.test(this.input[this.pos])) {
        this.pos++;
      }
      return { type: 101, text: this.input.slice(start, this.pos) }; // WHITESPACE = 101
    }
    
    // Check for keywords
    if (this.input.substr(this.pos, 6).toUpperCase() === 'SELECT') {
      this.pos += 6;
      return { type: 1, text: 'SELECT' }; // SELECT = 1
    }
    
    // Skip for now
    return { type: -1, text: '' };
  }
  
  static get _SYMBOLIC_NAMES() {
    return [null, 'SELECT', 'FROM', 'WHERE', ...Array(97).fill(null), 'WHITESPACE'];
  }
}

const lexer = new SqlMini(code);
let token;
do {
  token = lexer.nextToken();
  if (token.type > 0) {
    const name = SqlMini._SYMBOLIC_NAMES[token.type];
    console.log('Token:', name, JSON.stringify(token.text));
  }
} while (token.type > 0);
`;

eval(sqlMiniCode);
