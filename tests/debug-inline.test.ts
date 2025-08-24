import { describe, it, expect, beforeAll } from 'vitest';
import { CharStreams } from 'antlr4ts';
import { MarkdownMini } from '../src/generated/antlr/MarkdownMini.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug inline patterns', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  it('should test individual inline patterns', () => {
    const tests = [
      { name: 'bold', input: '**bold text**' },
      { name: 'italic', input: '*italic text*' },
      { name: 'inline code', input: '`code`' },
      { name: 'autolink', input: '<https://example.com>' },
      { name: 'link reference', input: '[text][ref]' },
      { name: 'footnote ref', input: '[^1]' }
    ];

    for (const test of tests) {
      console.log(`\n[debug] Testing ${test.name}: ${JSON.stringify(test.input)}`);
      
      const lexer = new MarkdownMini(CharStreams.fromString(test.input));
      let token;
      while ((token = lexer.nextToken()).type !== -1) {
        const typeName = lexer.vocabulary.getSymbolicName(token.type) || `UNKNOWN_${token.type}`;
        const value = token.text;
        console.log(`  Token: ${typeName}:${JSON.stringify(value)}`);
      }
    }
  });
});
