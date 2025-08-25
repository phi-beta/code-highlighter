import { describe, it, expect } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';

describe('XML Attribute Highlighting Test', () => {
  it('should highlight XML attributes correctly', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    // Simple XML with attributes
    const xmlCode = `<book id="123" category="fiction">
  <title lang="en">Test Book</title>
</book>`;
    
    console.log('XML input:', xmlCode);
    
    // Generate HTML output
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    console.log('=== XML HTML Output ===');
    console.log(xmlHtml);
    
    // Check for attribute highlighting
    const hasPropertyTokens = xmlHtml.includes('tok-property');
    const hasIdAttribute = xmlHtml.includes('id');
    const hasCategoryAttribute = xmlHtml.includes('category');
    const hasLangAttribute = xmlHtml.includes('lang');
    
    console.log('Has property tokens:', hasPropertyTokens);
    console.log('Has id attribute:', hasIdAttribute);
    console.log('Has category attribute:', hasCategoryAttribute);
    console.log('Has lang attribute:', hasLangAttribute);
    
    // Verify attributes are highlighted as properties
    expect(hasPropertyTokens).toBe(true);
  });
});
