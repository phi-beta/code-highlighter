import { describe, test, beforeAll } from 'vitest';
import { highlight, getLanguage } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('HTML opening tag tokenization', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('should show what tokens are generated for opening tags', () => {
    const htmlCode = `<div>`;
    
    console.log('\n=== HTML Opening Tag Tokenization Debug ===');
    console.log('Input:', htmlCode);
    
    // Get the raw tokenizer function and examine what tokens it produces
    const tokenizer = getLanguage('html');
    if (tokenizer) {
      const rawTokens = tokenizer(htmlCode);
      console.log('\nRaw tokens from ANTLR:');
      rawTokens.forEach((token, i) => {
        console.log(`Raw Token ${i}: type="${token.type}" content="${token.value}"`);
      });
    }
    
    // Try with explicit HTML output format
    const result = highlight(htmlCode, { language: 'html', html: true });
    console.log('\nOutput length:', result.length);
    console.log('Contains spans:', result.includes('<span'));
    
    // Extract just the span elements to see token types
    const spanMatches = result.match(/<span class="tok-[^"]*"[^>]*>[^<]*<\/span>/g) || [];
    
    console.log('Found spans:', spanMatches.length);
    spanMatches.forEach((span, i) => {
      const tokenType = span.match(/tok-([^"]*)/)?.[1];
      const content = span.match(/>([^<]*)</)?.[1];
      console.log(`Token ${i}: "${content}" → tok-${tokenType}`);
    });
    
    console.log('\nFull HTML output:');
    console.log(result);
  });
});
