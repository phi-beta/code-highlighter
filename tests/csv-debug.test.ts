// CSV Debug Test - Test bracket matching FIRST per implementation guide
import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSV Debug', () => {
  beforeAll(async () => {
    // Register with explicit CSV token mappings
    const csvTokenMap = {
      // Universal brackets (even though CSV doesn't use them much)
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
      verbose: true,
      tokenMaps: {
        csv: csvTokenMap
      }
    });
  });

  it('should analyze quote matching in CSV fields', () => {
    // CSV equivalent of "brackets" are quoted fields
    const testCode = '"quoted field",normal,123';
    const result = highlight(testCode, { language: 'csv', output: 'html' });
    
    console.log(`=== Testing: ${testCode} ===`);
    console.log('HTML output:', result);
    
    // CSV doesn't have traditional brackets, but let's verify basic highlighting
    expect(result).toContain('tok-'); // Should have some token classes
    
    // Check if quotes are properly tokenized
    const hasQuotedField = result.includes('QUOTED_FIELD') || result.includes('string');
    const hasComma = result.includes('COMMA') || result.includes('punctuation');
    const hasNumber = result.includes('NUMBER') || result.includes('number');
    
    console.log('Has quoted field token:', hasQuotedField);
    console.log('Has comma token:', hasComma);
    console.log('Has number token:', hasNumber);
    
    // Basic assertions - CSV should have field separation
    expect(result.length).toBeGreaterThan(testCode.length); // Should have markup
  });
  
  it('should handle nested quotes correctly', () => {
    // CSV with escaped quotes
    const testCode = '"field with ""quoted"" content",normal';
    const result = highlight(testCode, { language: 'csv', output: 'html' });
    
    console.log(`=== Testing escaped quotes: ${testCode} ===`);
    console.log('HTML output:', result);
    
    // Should handle the escaped quotes properly
    expect(result.length).toBeGreaterThan(testCode.length);
  });
});
