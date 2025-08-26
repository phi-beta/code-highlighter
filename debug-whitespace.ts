import { highlight } from './src/index.js';
import { registerGeneratedAntlrLanguages } from './src/register-antlr.js';

// Register all languages
await registerGeneratedAntlrLanguages();

// Test simple SQL with whitespace
const sqlCode = `SELECT id, name
FROM users
WHERE active = TRUE;`;

console.log('Input SQL:');
console.log(JSON.stringify(sqlCode));

console.log('\nHighlighted HTML:');
const highlighted = highlight(sqlCode, { language: 'sql' });
console.log(highlighted);

// Test direct tokenization to see what tokens are produced
import { SqlMini } from './src/generated/antlr/SqlMini.js';
const lexer = new SqlMini(sqlCode);
console.log('\nDirect tokens:');
let token;
do {
  token = lexer.nextToken();
  if (token.type > 0) {
    console.log(`Type: ${token.type}, Text: ${JSON.stringify(token.text)}`);
  }
} while (token.type > 0);
