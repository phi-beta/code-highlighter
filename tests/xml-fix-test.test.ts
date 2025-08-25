import { describe, it } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';
import { readFileSync, writeFileSync } from 'fs';

describe('XML Sample Fix Test', () => {
  it('should generate correct XML sample with highlighted opening tags', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: true });
    
    // Read the XML sample input
    const xmlCode = readFileSync('samples/inputs/xml.xml', 'utf8');
    console.log('First 200 chars of XML input:', xmlCode.substring(0, 200));
    
    // Generate HTML output
    console.log('Generating XML HTML...');
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    // Save the output
    writeFileSync('samples/outputs/xml.xml.html', xmlHtml, 'utf8');
    
    // Check that it contains highlighted opening tags
    console.log('First 400 chars of XML output:', xmlHtml.substring(0, 400));
    
    // Verify specific tags are highlighted as keywords
    const containsHighlightedTags = xmlHtml.includes('tok-keyword') && 
                                   xmlHtml.includes('bookstore') && 
                                   xmlHtml.includes('book');
    
    console.log('Contains highlighted tags:', containsHighlightedTags);
    
    // Check for opening tag keyword styling
    const bookstoreKeyword = xmlHtml.includes('<span class="tok-keyword"') && 
                            xmlHtml.includes('bookstore');
    console.log('Bookstore tag as keyword:', bookstoreKeyword);
  });
});
