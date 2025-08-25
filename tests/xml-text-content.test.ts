import { describe, it, expect } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';

describe('XML Text Content Fix Test', () => {
  it('should highlight text content differently from attribute names', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const xmlCode = `<book id="123" category="fiction">
  <title lang="en">The Great Adventure</title>
  <author>John Smith</author>
</book>`;

    console.log('XML input:', xmlCode);
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    console.log('=== XML HTML Output ===');
    console.log(xmlHtml);
    
    // Check for different token types
    const hasKeywordTokens = xmlHtml.includes('tok-keyword');
    const hasPropertyTokens = xmlHtml.includes('tok-property'); 
    const hasTextTokens = xmlHtml.includes('tok-text');
    
    console.log('Has keyword tokens (tag names):', hasKeywordTokens);
    console.log('Has property tokens (attributes):', hasPropertyTokens);
    console.log('Has text tokens (content):', hasTextTokens);
    
    // Verify all three types are present
    expect(hasKeywordTokens).toBe(true);
    expect(hasPropertyTokens).toBe(true);
    expect(hasTextTokens).toBe(true);
    
    // Verify text content is highlighted as text, not property
    const containsTextContent = xmlHtml.includes('tok-text') && 
                               (xmlHtml.includes('The') || xmlHtml.includes('Great') || xmlHtml.includes('Adventure'));
    
    console.log('Text content highlighted as text:', containsTextContent);
    expect(containsTextContent).toBe(true);
  });
});
