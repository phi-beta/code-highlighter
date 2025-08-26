import { SqlMini } from './src/generated/antlr/SqlMini.ts';

// Test simple SQL with whitespace
const sqlCode = `SELECT id, name
FROM users`;

console.log('Input SQL:');
console.log(JSON.stringify(sqlCode));

const lexer = new SqlMini(sqlCode);
console.log('\nTokens:');
let token;
do {
  token = lexer.nextToken();
  if (token.type > 0) {
    const symbolicName = SqlMini._SYMBOLIC_NAMES[token.type] || `UNKNOWN_${token.type}`;
    console.log(`Type: ${token.type} (${symbolicName}), Text: ${JSON.stringify(token.text)}`);
  }
} while (token.type > 0);
