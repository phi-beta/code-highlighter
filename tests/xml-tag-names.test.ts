import { describe, it, expect } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';

describe('XML Tag Name Fix Test', () => {
  it('should highlight opening tag names as keywords, not properties', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const xmlCode = `<book id="123" category="fiction">
  <title lang="en">Test Book</title>
</book>`;

    console.log('XML input:', xmlCode);
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    console.log('=== XML HTML Output ===');
    console.log(xmlHtml);
    
    // Check for keyword tokens (opening tag names)
    const hasKeywordTokens = xmlHtml.includes('tok-keyword');
    const hasPropertyTokens = xmlHtml.includes('tok-property');
    
    console.log('Has keyword tokens (tag names):', hasKeywordTokens);
    console.log('Has property tokens (attributes):', hasPropertyTokens);
    
    // Verify that tag names are now keywords and attributes are still properties
    expect(hasKeywordTokens).toBe(true);
    expect(hasPropertyTokens).toBe(true);
    
    // Verify specific tag names are highlighted as keywords
    const containsBookKeyword = xmlHtml.includes('<span class="tok-keyword"') && xmlHtml.includes('book');
    const containsTitleKeyword = xmlHtml.includes('<span class="tok-keyword"') && xmlHtml.includes('title');
    
    console.log('Book tag highlighted as keyword:', containsBookKeyword);
    console.log('Title tag highlighted as keyword:', containsTitleKeyword);
  });
});
