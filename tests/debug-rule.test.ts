import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug rule token', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
  });

  it('should classify horizontal rule', () => {
    const sample = '---\n';
    console.log('[debug-rule] Input:', JSON.stringify(sample));
    
    // Get raw tokens to see what ANTLR produces
    const result = highlight(sample, { language: 'markdown', output: 'tokens' });
    if (Array.isArray(result)) {
      console.log('[debug-rule] Raw tokens:', result.map(t => `${t.type}:${JSON.stringify(t.value)}`));
    } else {
      console.log('[debug-rule] Not array result:', result);
    }
    
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    console.log('[debug-rule] HTML:', html);
  });
});
