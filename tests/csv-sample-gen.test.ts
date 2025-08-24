import { describe, it, beforeAll } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSV Sample Generation', () => {
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

  it('should generate CSV sample output', () => {
    // Read the CSV input file
    const csvContent = readFileSync('samples/inputs/csv.csv', 'utf8');
    
    // Generate HTML output
    const html = highlight(csvContent, { language: 'csv', output: 'html' });
    writeFileSync('samples/outputs/csv.csv.html', html, 'utf8');
    console.log('✅ Generated CSV HTML sample');
    
    // Generate ANSI output  
    const ansi = highlight(csvContent, { language: 'csv', output: 'ansi' });
    writeFileSync('samples/outputs/csv.csv.ansi.txt', ansi, 'utf8');
    console.log('✅ Generated CSV ANSI sample');
    
    // Log the HTML output for verification
    console.log('CSV HTML output:', html);
  });
});
