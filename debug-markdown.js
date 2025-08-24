import { highlight } from './dist/src/index.js';
import { CharStreams } from 'antlr4ts';
import { MarkdownMiniLexer } from './src/generated/antlr/MarkdownMiniLexer.ts';

const sample = '- [x] Task';
console.log('Sample:', sample);

// Test the highlighter
const result = highlight(sample, { language: 'markdown', output: 'html' });
console.log('\nHighlighter result:');
console.log(result);

// Test the raw lexer
console.log('\nRaw lexer tokens:');
const lexer = new MarkdownMiniLexer(CharStreams.fromString(sample));
const tokens = [];
let token;
while ((token = lexer.nextToken()) && token.type > 0) {
  const name = lexer.constructor.VOCABULARY?.getSymbolicName?.(token.type) || 
               lexer.constructor._SYMBOLIC_NAMES?.[token.type] || 
               `TOKEN_${token.type}`;
  tokens.push({ type: token.type, name, text: token.text });
}
console.log(tokens);
