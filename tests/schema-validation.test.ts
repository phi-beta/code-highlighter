/**
 * Test the JSON schema and validation utilities
 */

import { describe, it, expect } from 'vitest';
import { validateTokenAnalysis, COMMON_TOKEN_TYPES } from '../src/utils/validation.js';
import type { TokenAnalysis } from '../src/types/token-analysis.js';

describe('Token Analysis Schema Validation', () => {
  const validTokenAnalysis: TokenAnalysis = {
    metadata: {
      language: 'javascript',
      timestamp: '2025-08-24T15:30:45.123Z',
      version: '0.1.0',
      inputSize: 32
    },
    tokens: [
      {
        type: 'keyword',
        value: 'const',
        position: { start: 0, end: 5, line: 1, column: 1 }
      },
      {
        type: 'identifier',
        value: 'x',
        position: { start: 6, end: 7, line: 1, column: 7 }
      }
    ],
    statistics: {
      totalTokens: 2,
      tokenTypes: { keyword: 1, identifier: 1 },
      coverage: { charactersAnalyzed: 32, percentage: 100.0 }
    }
  };

  it('should validate a correct token analysis object', () => {
    expect(validateTokenAnalysis(validTokenAnalysis)).toBe(true);
  });

  it('should reject invalid objects', () => {
    expect(validateTokenAnalysis(null)).toBe(false);
    expect(validateTokenAnalysis({})).toBe(false);
    expect(validateTokenAnalysis({ metadata: {} })).toBe(false);
  });

  it('should reject objects with missing required fields', () => {
    const invalidAnalysis = { ...validTokenAnalysis };
    delete (invalidAnalysis as any).metadata;
    expect(validateTokenAnalysis(invalidAnalysis)).toBe(false);
  });

  it('should reject tokens with invalid position data', () => {
    const invalidAnalysis = {
      ...validTokenAnalysis,
      tokens: [{
        type: 'keyword',
        value: 'const',
        position: { start: 'invalid', end: 5, line: 1, column: 1 }
      }]
    };
    expect(validateTokenAnalysis(invalidAnalysis)).toBe(false);
  });

  it('should include common token types', () => {
    expect(COMMON_TOKEN_TYPES).toContain('keyword');
    expect(COMMON_TOKEN_TYPES).toContain('string');
    expect(COMMON_TOKEN_TYPES).toContain('bracket-depth-0');
    expect(COMMON_TOKEN_TYPES).toContain('heading'); // Markdown
  });
});
