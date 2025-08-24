import { describe, it, expect, beforeAll } from 'vitest';
import { exportTokens, exportTokensAsJson } from '../src/index.js';

describe('JSON Export functionality', () => {
  beforeAll(async () => {
    // Register ANTLR languages
    try {
      const { attemptAutoRegisterGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
      await attemptAutoRegisterGeneratedAntlrLanguages?.({ verbose: false });
    } catch (e) {
      // ignore registration errors in tests
    }
  });
  it('should export tokens with position tracking', async () => {
    const code = 'const x = 42;';
    const result = exportTokens(code, 'javascript');
    
    expect(result.metadata.language).toBe('javascript');
    expect(result.metadata.totalTokens).toBeGreaterThan(0);
    expect(result.metadata.totalCharacters).toBe(code.length);
    expect(result.tokens).toHaveLength(result.metadata.totalTokens);
    
    // Check that all tokens have position data
    result.tokens.forEach(token => {
      expect(token.position).toBeDefined();
      expect(token.position.start).toBeGreaterThanOrEqual(0);
      expect(token.position.end).toBeGreaterThan(token.position.start);
      expect(token.position.line).toBeGreaterThan(0);
      expect(token.position.column).toBeGreaterThan(0);
    });
    
    // Check statistics
    expect(result.statistics.tokenTypes).toBeDefined();
    expect(result.statistics.averageTokenLength).toBeGreaterThan(0);
    expect(result.statistics.longestToken).toBeDefined();
  });

  it('should export JSON format correctly', async () => {
    const code = 'let name = "test";';
    const jsonString = exportTokensAsJson(code, 'javascript', true);
    
    expect(() => JSON.parse(jsonString)).not.toThrow();
    const parsed = JSON.parse(jsonString);
    
    expect(parsed.metadata).toBeDefined();
    expect(parsed.tokens).toBeDefined();
    expect(parsed.statistics).toBeDefined();
    expect(parsed.metadata.timestamp).toBeDefined();
  });

  it('should handle TypeScript decorators', async () => {
    const code = '@Component()\nclass Test {}';
    const result = exportTokens(code, 'typescript');
    
    // Find decorator tokens
    const decoratorTokens = result.tokens.filter(t => t.type === 'decorator');
    expect(decoratorTokens.length).toBeGreaterThan(0);
    
    const componentDecorator = decoratorTokens.find(t => t.value.includes('Component'));
    expect(componentDecorator).toBeDefined();
    expect(componentDecorator?.position.line).toBe(1);
  });

  it('should calculate positions correctly across multiple lines', async () => {
    const code = 'line1\nline2\nline3';
    const result = exportTokens(code, 'javascript');
    
    const newlineTokens = result.tokens.filter(t => t.value === '\n');
    expect(newlineTokens.length).toBe(2); // Two newlines for three lines
    
    // Check that line numbers increment correctly
    let maxLine = 0;
    result.tokens.forEach(token => {
      maxLine = Math.max(maxLine, token.position.line);
    });
    expect(maxLine).toBe(3); // Should reach line 3
  });
});
