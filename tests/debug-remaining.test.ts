import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug remaining issues', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  it('should debug link definition and line break', () => {
    const tests = [
      { name: 'link definition', input: '[ref1]: https://example.com "Title"' },
      { name: 'line break', input: 'Line one  \nLine two' }
    ];

    for (const test of tests) {
      console.log(`\n[debug] Testing ${test.name}: ${JSON.stringify(test.input)}`);
      
      const result = highlight(test.input, { language: 'markdown', output: 'tokens' });
      if (Array.isArray(result)) {
        console.log('  Tokens:', result.map(t => `${t.type}:${JSON.stringify(t.value)}`));
      } else {
        console.log('  Non-array result:', result);
      }
      
      const html = highlight(test.input, { language: 'markdown', output: 'html' });
      console.log('  HTML:', html);
    }
  });
});
