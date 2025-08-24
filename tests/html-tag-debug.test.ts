import { describe, test, beforeAll } from 'vitest';
import { highlight, getLanguage } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('HTML tag debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('debug opening tag tokens', () => {
    const htmlCode = `<div>`;
    
    console.log('\n=== Opening Tag Debug ===');
    
    // Get the raw tokenizer function and examine what tokens it produces
    const tokenizer = getLanguage('html');
    if (tokenizer) {
      const rawTokens = tokenizer(htmlCode);
      console.log('Raw tokens:');
      rawTokens.forEach((token, i) => {
        console.log(`  ${i}: type="${token.type}" value="${token.value}"`);
      });
    }
  });
});
