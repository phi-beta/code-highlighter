import { describe, it } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight } from '../src/index.js';
import { readFileSync, writeFileSync } from 'fs';

describe('Regenerate XML Sample', () => {
  it('should regenerate XML sample with fixed attribute highlighting', async () => {
    // Register all languages first
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    // Read the XML sample input
    const xmlCode = readFileSync('samples/inputs/xml.xml', 'utf8');
    
    // Generate HTML output with fixed attributes
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    
    // Save the updated output
    writeFileSync('samples/outputs/xml.xml.html', xmlHtml, 'utf8');
    
    console.log('✅ Regenerated XML HTML sample with fixed attribute highlighting');
    
    // Also generate ANSI output
    const xmlAnsi = highlight(xmlCode, { language: 'xml', output: 'ansi' });
    writeFileSync('samples/outputs/xml.xml.ansi.txt', xmlAnsi, 'utf8');
    
    console.log('✅ Regenerated XML ANSI sample with fixed attribute highlighting');
    
    // Verify attributes are now properly highlighted
    const containsPropertyTokens = xmlHtml.includes('tok-property');
    console.log('Contains property tokens:', containsPropertyTokens);
  });
});
