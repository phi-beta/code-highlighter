import { describe, it } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('XML Token Debug', () => {
  it('shows XML tokens after post-processing fix', async () => {
    const code = '<book id="1">';
    
    // Register languages and test processed tokens
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const { getLanguage } = await import('../src/index.js');
    const xmlTokenizer = getLanguage('xml');
    if (!xmlTokenizer) {
      console.log('XML language not registered');
      return;
    }

    const result = xmlTokenizer(code);
    
    console.log('\nProcessed tokens for "<book id="1">":');
    result.forEach((token, i) => {
      console.log(`  ${i}: type="${token.type}" value="${token.value}"`);
    });
    
    // Test that opening tag name is now a keyword
    const bookToken = result.find(t => t.value === 'book');
    console.log(`\nTag name "book" token type: ${bookToken?.type}`);
    console.log(`Expected: keyword, Actual: ${bookToken?.type}`);
    
    // Test with a more complex example from the actual sample
    const complexCode = '<bookstore xmlns="http://example.com/bookstore">';
    const complexResult = xmlTokenizer(complexCode);
    
    console.log('\nProcessed tokens for bookstore tag:');
    complexResult.forEach((token, i) => {
      console.log(`  ${i}: type="${token.type}" value="${token.value}"`);
    });
    
    const bookstoreToken = complexResult.find(t => t.value === 'bookstore');
    console.log(`\nTag name "bookstore" token type: ${bookstoreToken?.type}`);
  });
});
