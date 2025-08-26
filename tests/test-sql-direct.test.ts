#!/usr/bin/env node

import { test } from 'vitest';

test('Direct SQL lexer test', async () => {
  const { CharStreams } = await import('antlr4ts');
  
  try {
    const { SqlMiniLexer } = await import('../src/generated/antlr/SqlMiniLexer.js');
    
    console.log('\n=== Direct SQL lexer test ===');
    
    const code = 'SELECT * FROM users';
    console.log('Input:', code);
    
    const charStream = CharStreams.fromString(code);
    const lexer = new SqlMiniLexer(charStream);
    
    console.log('Lexer created successfully');
    console.log('Lexer class has symbolicNames:', 'symbolicNames' in SqlMiniLexer);
    console.log('Lexer instance has symbolicNames:', 'symbolicNames' in lexer);
    console.log('Lexer static symbolicNames:', (SqlMiniLexer as any).symbolicNames?.slice(0, 10));
    
    // Try to get tokens
    const tokens: any[] = [];
    let token;
    while ((token = lexer.nextToken()) && token.type > 0) {
      tokens.push({
        type: token.type,
        text: token.text,
        symbolicName: (SqlMiniLexer as any).symbolicNames?.[token.type] || 'UNKNOWN'
      });
      if (tokens.length > 10) break; // Safety limit
    }
    
    console.log('Tokens:', tokens);
    
  } catch (error) {
    console.error('Error:', error);
  }
});
