import { describe, it, expect, beforeAll } from 'vitest';
import { highlight, getLanguage } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug enum token mapping', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
  });

  it('should trace enum token through pipeline', () => {
    const input = '1. enum item\n';
    console.log('[debug-pipeline] Input:', JSON.stringify(input));
    
    // Test the raw ANTLR adapter
    const tokenizer = getLanguage('markdown');
    if (tokenizer) {
      const rawTokens = tokenizer(input);
      console.log('[debug-pipeline] Raw tokenizer output:', rawTokens.map(t => `${t.type}:${JSON.stringify(t.value)}`));
    }
  });
});
