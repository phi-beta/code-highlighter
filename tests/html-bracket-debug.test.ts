import { describe, it, beforeAll, expect } from 'vitest';
import { highlight, listLanguages, getLanguage } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('HTML Bracket Matching Debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
    console.log('Available languages after registration:', listLanguages());
  });

  it('should have separate bracket tokens for HTML', () => {
    // Test basic HTML structure with brackets
    const html = '<div class="test">\n  <p>Content (with parens) [and brackets]</p>\n</div>';
    
    // Get the tokenizer and tokenize directly
    const tokenizer = getLanguage('html');
    if (!tokenizer) {
      console.log('ERROR: HTML tokenizer not found');
      console.log('Available languages:', listLanguages());
      expect(true).toBe(false);
      return;
    }
    
    const tokens = tokenizer(html);
    console.log('HTML tokens (first 10):', JSON.stringify(tokens.slice(0, 10), null, 2));
    console.log('Total tokens:', tokens.length);
    
    // Check that we have separate bracket tokens
    const bracketTokens = tokens.filter(token => 
      ['(', ')', '[', ']', '{', '}'].includes(token.value)
    );
    
    console.log('Bracket tokens found:', bracketTokens);
    
    // Should find parentheses and square brackets from the content
    expect(bracketTokens.length).toBeGreaterThan(0);
    
    // Verify no composite tokens containing brackets
    const compositeWithBrackets = tokens.filter(token => 
      token.value.length > 1 && /[(){}\[\]]/.test(token.value)
    );
    
    console.log('Composite tokens with brackets (should be empty):', compositeWithBrackets);
    expect(compositeWithBrackets).toHaveLength(0);
  });

  it('should handle HTML angle brackets separately', () => {
    const html = '<p>Hello</p>';
    
    const tokenizer = getLanguage('html');
    if (!tokenizer) {
      console.log('ERROR: HTML tokenizer not found');
      expect(true).toBe(false);
      return;
    }
    
    const tokens = tokenizer(html);
    console.log('Simple HTML tokens:', JSON.stringify(tokens, null, 2));
    
    // Should have separate < and > tokens
    const angleBrackets = tokens.filter(token => 
      token.value === '<' || token.value === '>'
    );
    
    console.log('Angle bracket tokens:', angleBrackets);
    expect(angleBrackets.length).toBeGreaterThan(0);
  });
});
