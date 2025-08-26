#!/usr/bin/env node

import { test } from 'vitest';

test('Debug SQL token mapping', async () => {
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  
  console.log('\n=== Debugging SQL token mapping ===');
  
  // Register languages
  await registerGeneratedAntlrLanguages({ verbose: true });
  
  const sqlCode = `SELECT name FROM users;`;
  console.log('Input:', sqlCode);
  
  const htmlResult = highlight(sqlCode, { language: 'sql', output: 'html' });
  console.log('\nHTML result:');
  console.log(htmlResult);
  
  // Check what language is being detected
  const langMatch = htmlResult.match(/lang-(\w+)/);
  console.log('\nDetected language:', langMatch ? langMatch[1] : 'unknown');
  
  // Check if any keywords are properly highlighted
  const hasKeywords = htmlResult.includes('tok-keyword');
  const hasIdentifiers = htmlResult.includes('tok-identifier');
  
  console.log('Keywords found:', hasKeywords);
  console.log('Identifiers found:', hasIdentifiers);
  
  // Extract specific tokens for analysis
  const tokens = htmlResult.match(/<span class="(tok-[^"]+)"[^>]*>([^<]*)<\/span>/g) || [];
  console.log('\nToken analysis:');
  tokens.forEach((token, i) => {
    const [, tokenType] = token.match(/<span class="(tok-[^"]+)"/) || [];
    const [, text] = token.match(/>([^<]*)</) || [];
    console.log(`  ${i}: "${text}" -> ${tokenType}`);
  });
});
