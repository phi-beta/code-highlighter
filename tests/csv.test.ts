import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSV Implementation', () => {
  beforeAll(async () => {
    // Register with explicit CSV token mappings
    const csvTokenMap = {
      // Universal brackets (required by framework)
      LPAREN: 'punctuation',
      RPAREN: 'punctuation',
      LBRACE: 'punctuation',
      RBRACE: 'punctuation', 
      LBRACKET: 'punctuation',
      RBRACKET: 'punctuation',
      
      // CSV-specific tokens
      QUOTED_FIELD: 'string',      // Quoted fields should be strings
      COMMA: 'punctuation',        // Field separators
      NEWLINE: 'punctuation',      // Record separators  
      FIELD_TEXT: 'identifier',    // Unquoted field content
      NUMBER: 'number',            // Numeric fields
    };
    
    await registerGeneratedAntlrLanguages({ 
      tokenMaps: {
        csv: csvTokenMap
      }
    });
  });

  it('should highlight CSV basic syntax correctly', () => {
    const csv = 'Name,Age,Salary\n"John Doe",30,75000.50';
    const result = highlight(csv, { language: 'csv', output: 'html' });
    
    // Should contain different token types
    expect(result).toContain('tok-string');     // "John Doe"
    expect(result).toContain('tok-number');     // 30, 75000.50
    expect(result).toContain('tok-punctuation'); // commas
    expect(result).toContain('tok-identifier');  // Name, Age, Salary
  });

  it('should handle quoted fields with commas', () => {
    const csv = '"Smith, John","New York, NY",25000';
    const result = highlight(csv, { language: 'csv', output: 'html' });
    
    expect(result).toContain('tok-string');     // Quoted fields
    expect(result).toContain('tok-number');     // 25000
    expect(result).toContain('tok-punctuation'); // Separating commas
  });

  it('should handle escaped quotes', () => {
    const csv = '"He said ""Hello""",normal,123';
    const result = highlight(csv, { language: 'csv', output: 'html' });
    
    expect(result).toContain('tok-string');     // Field with escaped quotes
    expect(result).toContain('tok-number');     // 123
    expect(result).toContain('tok-identifier'); // normal
  });

  it('should handle decimal numbers', () => {
    const csv = 'Item,Price,Quantity\nApple,1.50,10.25';
    const result = highlight(csv, { language: 'csv', output: 'html' });
    
    expect(result).toContain('tok-number'); // 1.50, 10.25
    expect(result).toContain('tok-identifier'); // Item, Price, Quantity, Apple
  });

  it('should handle mixed content types', () => {
    const csv = '"Text field",12345,"Another text",67.89,unquoted';
    const result = highlight(csv, { language: 'csv', output: 'html' });
    
    // Count different token types
    const strings = (result.match(/tok-string/g) || []).length;
    const numbers = (result.match(/tok-number/g) || []).length;
    const identifiers = (result.match(/tok-identifier/g) || []).length;
    const punctuation = (result.match(/tok-punctuation/g) || []).length;
    
    expect(strings).toBeGreaterThan(0);    // Quoted fields
    expect(numbers).toBeGreaterThan(0);    // Numeric fields  
    expect(identifiers).toBeGreaterThan(0); // Unquoted text
    expect(punctuation).toBeGreaterThan(0); // Commas
  });
  
  it('should handle complex edge cases with quotes and newlines', () => {
    // Test case with escaped quotes and newline in a field
    const complexCSV = '"Wilson, ""The Rock"" Johnson",45,"Miami\nBeach",120000.00';
    const result = highlight(complexCSV, { language: 'csv', output: 'html' });
    
    console.log('Complex CSV test result:', result);
    
    // Should handle the complex quoted field with escaped quotes
    expect(result).toContain('tok-string'); // The quoted fields
    expect(result).toContain('tok-number'); // 45, 120000.00
    expect(result).toContain('tok-punctuation'); // commas
    
    // Verify it doesn't break on the escaped quotes or newline
    expect(result).not.toContain('tok-bracket-unmatched');
  });
});
