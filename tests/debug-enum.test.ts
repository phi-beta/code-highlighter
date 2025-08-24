import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug enum list token', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
  });

  it('should classify enum list', () => {
    const sample = '1. enum item\n';
    console.log('[debug-enum] Input:', JSON.stringify(sample));
    
    // Get raw tokens to see what ANTLR produces
    const result = highlight(sample, { language: 'markdown', output: 'tokens' });
    if (Array.isArray(result)) {
      console.log('[debug-enum] Raw tokens:', result.map(t => `${t.type}:${JSON.stringify(t.value)}`));
    } else {
      console.log('[debug-enum] Not array result:', result);
    }
    
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    console.log('[debug-enum] HTML:', html);
  });
});
