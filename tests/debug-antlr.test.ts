import { describe, it, expect, beforeAll } from 'vitest';
import { CharStreams } from 'antlr4ts';
import { MarkdownMini } from '../src/generated/antlr/MarkdownMini.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Debug ANTLR directly', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
  });

  it('should test ANTLR lexer directly', () => {
    const input = '1. enum item\n';
    console.log('[antlr-debug] Input:', JSON.stringify(input));
    
    const lexer = new MarkdownMini(CharStreams.fromString(input));
    const tokens: Array<{type: string, value: string}> = [];
    let token;
    while ((token = lexer.nextToken()).type !== -1) {
      const typeName = lexer.vocabulary.getSymbolicName(token.type) || `UNKNOWN_${token.type}`;
      const value = token.text;
      console.log(`[antlr-debug] Token: ${typeName}:${JSON.stringify(value)}`);
      tokens.push({ type: typeName, value });
    }
  });
});
