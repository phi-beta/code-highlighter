// Debug test to see exactly what tokens the ANTLR lexer produces
import { describe, test, expect } from 'vitest';
import { CharStreams } from 'antlr4ts';
import { MarkdownMini } from '../src/generated/antlr/MarkdownMini.js';

describe('debug ANTLR lexer directly', () => {
  test('shows raw ANTLR token types', () => {
    const input = '- [x] Completed task';  // Full task list
    const lexer = new MarkdownMini(CharStreams.fromString(input));
    
    console.log('Testing input:', JSON.stringify(input));
    
    // Token type to name mapping from .tokens file
    const tokenNames: Record<number, string> = {
      1: 'TASK_LIST_ITEM',
      2: 'LIST_ENUM', 
      3: 'HEADING_ATX',
      29: 'CODE_TEXT',
      30: 'TEXT',
      31: 'NEWLINE',
      32: 'WS'
    };
    
    const tokens: Array<{ type: number; symbolic: string; text: string | undefined }> = [];
    while (true) {
      const token = lexer.nextToken();
      if (token.type <= 0) break; // EOF
      
      const symbolicName = tokenNames[token.type] || `UNKNOWN_${token.type}`;
      console.log(`Token: type=${token.type}, symbolic="${symbolicName}", text=${JSON.stringify(token.text)}`);
      tokens.push({ type: token.type, symbolic: symbolicName, text: token.text });
    }
    
    expect(tokens.length).toBeGreaterThan(0);
  });
});
