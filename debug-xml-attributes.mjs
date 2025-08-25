import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

// Register ANTLR languages first
registerGeneratedAntlrLanguages();

const xmlCode = `<book id="123" category="fiction">
  <title lang="en">Test Book</title>
</book>`;

console.log('=== XML Tokenization Debug ===');
const result = highlight(xmlCode, 'xml', 'html');
console.log(result);
