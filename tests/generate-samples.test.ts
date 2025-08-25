import { describe, test, expect } from 'vitest';
import { writeFileSync, readFileSync } from 'fs';
import { highlight } from '../src/index.js';

describe('Generate Missing Sample Outputs', () => {
  test('should generate XML and YAML sample outputs', async () => {
    const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
    await registerGeneratedAntlrLanguages();
    
    // XML
    const xmlCode = readFileSync('samples/inputs/xml.xml', 'utf8');
    
    console.log('Generating XML HTML...');
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    writeFileSync('samples/outputs/xml.xml.html', xmlHtml, 'utf8');
    
    console.log('Generating XML ANSI...');
    const xmlAnsi = highlight(xmlCode, { language: 'xml', output: 'ansi' });
    writeFileSync('samples/outputs/xml.xml.ansi.txt', xmlAnsi, 'utf8');
    
    // YAML
    const yamlCode = readFileSync('samples/inputs/yaml.yaml', 'utf8');
    
    console.log('Generating YAML HTML...');
    const yamlHtml = highlight(yamlCode, { language: 'yaml', output: 'html' });
    writeFileSync('samples/outputs/yaml.yaml.html', yamlHtml, 'utf8');
    
    console.log('Generating YAML ANSI...');
    const yamlAnsi = highlight(yamlCode, { language: 'yaml', output: 'ansi' });
    writeFileSync('samples/outputs/yaml.yaml.ansi.txt', yamlAnsi, 'utf8');
    
    console.log('✅ All sample outputs generated successfully!');
    
    // Verify files were created
    expect(xmlHtml).toContain('lang-xml');
    expect(yamlHtml).toContain('lang-yaml');
    expect(xmlAnsi).toBeTruthy();
    expect(yamlAnsi).toBeTruthy();
  });
});
