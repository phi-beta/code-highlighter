#!/usr/bin/env node

import { test } from 'vitest';

test('Debug YAML timestamp tokenization', async () => {
  const yamlCode = `timestamp: !!timestamp 2023-01-01T00:00:00Z`;
  
  console.log('\n=== Testing YAML timestamp tokenization ===');
  console.log('Input:', yamlCode);
  
  // Test with the highlight function to see final result
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  
  await registerGeneratedAntlrLanguages();
  
  const htmlResult = highlight(yamlCode, { language: 'yaml', output: 'html' });
  console.log('\nFinal HTML result:');
  console.log(htmlResult);
  
  // Extract token information from HTML
  const tokenMatches = htmlResult.match(/<span class="(tok-[^"]+)"[^>]*>([^<]*)<\/span>/g) || [];
  console.log('\nTokens found:');
  tokenMatches.forEach((match, i) => {
    const [, tokenType, text] = match.match(/<span class="(tok-[^"]+)"[^>]*>([^<]*)<\/span>/) || [];
    if (text && text.trim()) {
      console.log(`  ${i}: type="${tokenType}" text="${text}"`);
    }
  });
});
