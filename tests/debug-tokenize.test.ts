// Debug test to see what tokens are produced by the tokenize function
import { describe, test, expect } from 'vitest';
import { getLanguage } from '../src/index.js';
import { attemptAutoRegisterGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('debug tokenize function', () => {
  test('shows what tokens are produced for task lists', async () => {
    await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
    
    const input = '- [x] Completed task';
    const tokenizer = getLanguage('markdown');
    expect(tokenizer).toBeDefined();
    
    const tokens = tokenizer!(input);
    
    console.log('Input:', JSON.stringify(input));
    console.log('Tokens:', tokens.map(t => `{type: ${t.type}, value: ${JSON.stringify(t.value)}}`));
    
    // Check if we have the correct token type
    const taskTokens = tokens.filter(t => t.type === 'task-list');
    console.log('Task list tokens:', taskTokens);
    
    expect(tokens.length).toBeGreaterThan(0);
  });
  
  test('shows what tokens are produced for normal bullets', async () => {
    await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
    
    const input = '- normal bullet item';
    const tokenizer = getLanguage('markdown');
    expect(tokenizer).toBeDefined();
    
    const tokens = tokenizer!(input);
    
    console.log('Input:', JSON.stringify(input));
    console.log('Tokens:', tokens.map(t => `{type: ${t.type}, value: ${JSON.stringify(t.value)}}`));
    
    expect(tokens.length).toBeGreaterThan(0);
  });
});
