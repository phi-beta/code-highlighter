import { describe, test, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSS Debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('should analyze function parenthesis tokens in HTML output', async () => {
    const cssCode = 'var(--test)';
    
    console.log(`\n=== Testing: ${cssCode} ===`);
    
    const html = highlight(cssCode, { output: 'html', language: 'css' });
    console.log('\nHTML output:', html);
    
    // Check if the closing parenthesis is marked as unmatched
    const hasUnmatched = html.includes('tok-bracket-unmatched');
    console.log('Has unmatched brackets:', hasUnmatched);
    
    // Check if function token is present
    const hasFunction = html.includes('tok-function');
    console.log('Has function token:', hasFunction);
    
    expect(html).toBeDefined();
  });
});
