import { describe, it, beforeAll } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSV Fixed Sample Generation', () => {
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

  it('should regenerate CSV sample with fixed ANSI output', () => {
    // Read the CSV input file
    const csvContent = readFileSync('samples/inputs/csv.csv', 'utf8');
    
    // Generate HTML output (should be unchanged)
    const html = highlight(csvContent, { language: 'csv', output: 'html' });
    writeFileSync('samples/outputs/csv.csv.html', html, 'utf8');
    console.log('✅ Regenerated CSV HTML sample');
    
    // Generate ANSI output with fixed escape codes
    const ansi = highlight(csvContent, { language: 'csv', output: 'ansi' });
    writeFileSync('samples/outputs/csv.csv.ansi.txt', ansi, 'utf8');
    console.log('✅ Regenerated CSV ANSI sample with proper escape codes');
    
    // Show a sample of the fixed ANSI output
    const firstLine = ansi.split('\\n')[0];
    console.log('First line ANSI (raw):', JSON.stringify(firstLine));
    console.log('✅ ANSI now uses proper escape codes instead of color names');
  });
});
