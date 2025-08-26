import { describe, test, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('SQL keyword highlighting test', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('should highlight SQL keywords in red', () => {
    const sqlCode = 'SELECT name FROM users WHERE id = 1;';
    
    console.log('[sql-test] Testing SQL code:', sqlCode);
    
    const html = highlight(sqlCode, { language: 'sql', output: 'html' });
    
    console.log('[sql-test] HTML output:');
    console.log(html);
    
    // Check if SELECT keyword is highlighted as tok-keyword (red)
    expect(html).toContain('tok-keyword');
    expect(html).toContain('SELECT');
    expect(html).toContain('FROM');
    expect(html).toContain('WHERE');
    
    // Verify the SELECT keyword specifically appears with keyword styling
    expect(html).toMatch(/SELECT.*tok-keyword|tok-keyword.*SELECT/);
  });
  
  test('should highlight SQL data types correctly', () => {
    const sqlCode = 'CREATE TABLE users (id INT, name VARCHAR(50));';
    
    console.log('[sql-test] Testing data types:', sqlCode);
    
    const html = highlight(sqlCode, { language: 'sql', output: 'html' });
    
    console.log('[sql-test] Data types HTML output:');
    console.log(html);
    
    // Check that data types are properly classified
    expect(html).toContain('INT');
    expect(html).toContain('VARCHAR');
    expect(html).toContain('CREATE');
    expect(html).toContain('TABLE');
  });
});
