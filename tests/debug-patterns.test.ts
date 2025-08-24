import { describe, it, expect, beforeAll } from 'vitest';
import { CharStreams } from 'antlr4ts';
import { MarkdownMini } from '../src/generated/antlr/MarkdownMini.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug failing patterns', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  it('should test each failing pattern directly', () => {
    const tests = [
      { name: 'reference link', input: 'This is a [reference link][ref1].' },
      { name: 'autolink', input: 'Visit <https://example.com> or email <user@example.com>.' },
      { name: 'footnote', input: 'Text with footnote[^1].' },
      { name: 'hard line break', input: 'Line one  \nLine two' }
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
