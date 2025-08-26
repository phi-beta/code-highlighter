const { SqlMini } = require('./dist-cjs/src/generated/antlr/SqlMini.js');

const sqlCode = `SELECT id
FROM users;`;

console.log('Creating lexer...');
const lexer = new SqlMini(sqlCode);

console.log('Getting symbolic names...');
console.log('symbolicNames:', lexer.symbolicNames);
console.log('static _SYMBOLIC_NAMES:', SqlMini._SYMBOLIC_NAMES?.slice(-5)); // last 5 entries

console.log('\nTokenizing...');
let token;
let count = 0;
do {
  token = lexer.nextToken();
  if (token.type > 0 && count < 10) {
    const symbolicName = SqlMini._SYMBOLIC_NAMES?.[token.type] || 'UNKNOWN';
    console.log(`Token ${count}: type=${token.type} (${symbolicName}), text=${JSON.stringify(token.text)}`);
    count++;
  }
} while (token.type > 0 && count < 10);
