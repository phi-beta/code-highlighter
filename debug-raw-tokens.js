import { MarkdownMiniLexer } from './dist/src/generated/antlr/MarkdownMiniLexer.js';
import { CharStreams } from 'antlr4ts';

const input = '- [x] Completed task\n- [ ] Incomplete task\n- normal bullet';
console.log('Input:', JSON.stringify(input));

const inputStream = CharStreams.fromString(input);
const lexer = new MarkdownMiniLexer(inputStream);

const allTokens = [];
let token;
while ((token = lexer.nextToken()) && token.type !== -1) {
  allTokens.push({
    type: token.type,
    typeName: lexer.vocabulary.getSymbolicName(token.type),
    text: token.text,
    start: token.startIndex,
    stop: token.stopIndex
  });
}

console.log('\nTokens generated:');
allTokens.forEach((t, i) => {
  console.log(`${i}: ${t.typeName} = ${JSON.stringify(t.text)} (${t.start}-${t.stop})`);
});
