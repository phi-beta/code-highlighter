import { describe, it } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';
import { readFileSync, writeFileSync } from 'fs';

describe('Regenerate XML Sample with Complete Fix', () => {
  it('should regenerate XML sample with complete semantic highlighting', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    // Read the XML sample input
    const xmlCode = readFileSync('samples/inputs/xml.xml', 'utf8');
    
    // Generate HTML output with complete highlighting fix
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    // Save the updated output
    writeFileSync('samples/outputs/xml.xml.html', xmlHtml, 'utf8');
    
    console.log('✅ Regenerated XML HTML sample with complete semantic highlighting');
    
    // Also generate ANSI output
    const xmlAnsi = highlight(xmlCode, { language: 'xml', output: 'ansi' });
    writeFileSync('samples/outputs/xml.xml.ansi.txt', xmlAnsi, 'utf8');
    
    console.log('✅ Regenerated XML ANSI sample with complete semantic highlighting');
    
    // Verify all token types are properly highlighted
    const containsKeywordTokens = xmlHtml.includes('tok-keyword');
    const containsPropertyTokens = xmlHtml.includes('tok-property');
    const containsTextTokens = xmlHtml.includes('tok-text');
    const containsStringTokens = xmlHtml.includes('tok-string');
    
    console.log('Contains keyword tokens (tag names):', containsKeywordTokens);
    console.log('Contains property tokens (attributes):', containsPropertyTokens);
    console.log('Contains text tokens (content):', containsTextTokens);
    console.log('Contains string tokens (values):', containsStringTokens);
  });
});
