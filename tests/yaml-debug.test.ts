import { describe, test, expect } from 'vitest';
import { highlight } from '../src/index.js';

describe('YAML Debug Test', () => {
  test('should handle basic YAML brackets without unmatched errors', async () => {
    const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
    
    // Register languages
    await registerGeneratedAntlrLanguages();
    
    const yamlCode = `---
name: "John Doe"
age: 30
active: true
items: [apple, banana]
config: {debug: false, timeout: 30}`;

    const result = highlight(yamlCode, { language: 'yaml', output: 'html' });
    
    // Critical test: No unmatched brackets
    expect(result).not.toContain('tok-bracket-unmatched');
    
    // Basic functionality test
    expect(result).toContain('tok-keyword'); // Should have document markers, booleans
    expect(result).toContain('tok-string');  // Should have quoted strings
    expect(result).toContain('tok-number');  // Should have numbers
    expect(result).toContain('tok-punctuation'); // Should have colons, brackets
    
    console.log('YAML bracket test result:', result.slice(0, 200) + '...');
  });
  
  test('should handle complex YAML structures', async () => {
    const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
    await registerGeneratedAntlrLanguages();
    
    const complexYamlCode = `---
defaults: &default
  timeout: 30
  retries: 3

server:
  <<: *default
  host: "example.com"
  values: [1.5, .inf, .nan]
  enabled: yes`;
    
    const result = highlight(complexYamlCode, { language: 'yaml', output: 'html' });
    
    // Should handle complex cases without bracket issues
    expect(result).not.toContain('tok-bracket-unmatched');
    
    console.log('Complex YAML test passed');
  });
});
