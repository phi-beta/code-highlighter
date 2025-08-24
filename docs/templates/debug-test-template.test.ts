// Template for debug test
// Copy this to: tests/[language]-debug.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('[LANGUAGE] Debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  it('should analyze bracket matching in function calls', () => {
    // Test basic function call - CUSTOMIZE THIS FOR YOUR LANGUAGE
    const testCode = 'func(param)';  // Replace with language-appropriate syntax
    const result = highlight(testCode, 'LANGUAGE', 'html');
    
    console.log(`=== Testing: ${testCode} ===`);
    console.log('HTML output:', result);
    
    // Verify function token exists
    expect(result).toContain('tok-function');
    
    // Critical: Verify brackets are properly matched (not unmatched)
    expect(result).not.toContain('tok-bracket-unmatched');
    
    // Verify bracket depth tokens exist
    expect(result).toContain('tok-bracket-depth-0');
    
    // Log analysis for debugging
    const hasUnmatched = result.includes('tok-bracket-unmatched');
    const hasFunction = result.includes('tok-function');
    console.log('Has unmatched brackets:', hasUnmatched);
    console.log('Has function token:', hasFunction);
    
    // Assertions
    expect(hasUnmatched).toBe(false);
    expect(hasFunction).toBe(true);
  });
  
  it('should handle nested brackets correctly', () => {
    // Test nested brackets - CUSTOMIZE FOR YOUR LANGUAGE
    const testCode = 'outer(inner(param))';  // Replace with appropriate syntax
    const result = highlight(testCode, 'LANGUAGE', 'html');
    
    console.log(`=== Testing nested: ${testCode} ===`);
    console.log('HTML output:', result);
    
    // Should have multiple bracket depths
    expect(result).toContain('tok-bracket-depth-0');
    expect(result).toContain('tok-bracket-depth-1');
    expect(result).not.toContain('tok-bracket-unmatched');
  });
});
