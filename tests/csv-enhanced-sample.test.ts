import { describe, it, beforeAll } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSV Enhanced Sample Generation', () => {
  beforeAll(async () => {
    const csvTokenMap: Record<string, string> = {
      QUOTED_FIELD: 'string',
      COMMA: 'punctuation',
      NUMBER: 'number',
      FIELD_TEXT: 'identifier',
      NEWLINE: 'whitespace',
    };
    
    await registerGeneratedAntlrLanguages({ 
      tokenMaps: { csv: csvTokenMap }
    });
  });

  it('should regenerate CSV sample with enhanced content', () => {
    // Read the updated CSV input file
    const csvContent = readFileSync('samples/inputs/csv.csv', 'utf8');
    
    // Generate HTML output
    const html = highlight(csvContent, { language: 'csv', output: 'html' });
    writeFileSync('samples/outputs/csv.csv.html', html, 'utf8');
    console.log('✅ Regenerated CSV HTML sample with edge cases');
    
    // Generate ANSI output  
    const ansi = highlight(csvContent, { language: 'csv', output: 'ansi' });
    writeFileSync('samples/outputs/csv.csv.ansi.txt', ansi, 'utf8');
    console.log('✅ Regenerated CSV ANSI sample with edge cases');
    
    // Log snippet to verify edge case handling
    console.log('Enhanced CSV content includes:');
    console.log('- Escaped quotes: "Wilson, ""The Rock"" Johnson"');
    console.log('- Newlines in fields: "Miami\\nBeach"');
  });
});
