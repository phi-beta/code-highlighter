import { MarkdownMiniLexer } from './src/generated/antlr/MarkdownMiniLexer.js';
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
    const html = highlight(testCase.text, { language: 'markdown', output: 'html' });
    
    // Extract class names from the HTML
    const classMatches = html.match(/class="([^"]*tok-[^"]*)"/g) || [];
    const tokens = classMatches.map(match => {
      const className = match.match(/tok-[^"\s]*/)?.[0];
      return className;
    }).filter(Boolean);
    
    console.log(`  Tokens: ${tokens.join(', ')}`);
    console.log(`  Has task-list: ${/tok-task-list/.test(html)}`);
    console.log(`  Has list-bullet: ${/tok-list-bullet/.test(html)}`);
  } catch (err) {
    console.log(`  Error: ${err.message}`);
  }
  console.log('');
}
