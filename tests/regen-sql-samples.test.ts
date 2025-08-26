import { describe, test, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { readFileSync, writeFileSync } from 'fs';

describe('Generate SQL sample manually', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('should regenerate SQL sample outputs', () => {
    // Read the SQL input file
    const sqlInput = readFileSync('./samples/inputs/sql.sql', 'utf-8');
    
    console.log('[regen] SQL input preview:', sqlInput.substring(0, 100) + '...');
    
    // Generate HTML output
    const htmlOutput = highlight(sqlInput, { language: 'sql', output: 'html' });
    
    console.log('[regen] HTML output preview:', htmlOutput.substring(0, 200) + '...');
    
    // Generate ANSI output  
    const ansiOutput = highlight(sqlInput, { language: 'sql', output: 'ansi' });
    
    console.log('[regen] ANSI output preview:', ansiOutput.substring(0, 100) + '...');
    
    // Write the regenerated outputs
    writeFileSync('./samples/outputs/sql.sql.html', htmlOutput);
    writeFileSync('./samples/outputs/sql.sql.ansi.txt', ansiOutput);
    
    // Clear error files since SQL now works
    writeFileSync('./samples/outputs/sql.sql.html.error.txt', '');
    writeFileSync('./samples/outputs/sql.sql.ansi.error.txt', '');
    
    console.log('✅ SQL sample outputs regenerated successfully!');
    
    // Verify keywords are properly highlighted
    expect(htmlOutput).toContain('tok-keyword');
    expect(htmlOutput).toContain('lang-sql');
    expect(htmlOutput).toContain('SELECT');
    expect(htmlOutput).toContain('CREATE');
  });
});
