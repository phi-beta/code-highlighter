import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('HTML Token Debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  it('should analyze what tokens are produced for simple HTML', () => {
    // Test multiple cases
    const testCases = [
      '<div>',
      'div',
      '/div',
      'class="test"'
    ];
    
    console.log('\n=== Testing HTML tokenization ===');
    
    testCases.forEach(input => {
      console.log(`\nInput: "${input}"`);
      const result = highlight(input, { language: 'html', html: true });
      console.log('Result:', result);
      
      const tokenMatches = result.match(/tok-[a-z-]+/g);
      const uniqueTokens = [...new Set(tokenMatches)];
      console.log('Tokens:', uniqueTokens);
    });

    // Test complete tag
    const testHtml = '<div class="test">content</div>';
    console.log(`\nComplete test: "${testHtml}"`);
    const result = highlight(testHtml, { language: 'html', html: true });
    console.log('HTML result:', result);

    const tokenMatches = result.match(/tok-[a-z-]+/g);
    const uniqueTokens = [...new Set(tokenMatches)];
    console.log('\nToken types found:', uniqueTokens);

    // Check specifically if we have tag tokens
    const hasTagTokens = uniqueTokens.some(token => token.includes('keyword'));
    console.log('Has keyword tokens:', hasTagTokens);
    
    expect(result).toContain('tok-');
  });
});
