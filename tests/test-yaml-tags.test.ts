#!/usr/bin/env node

import { test } from 'vitest';

test('Test YAML tag highlighting as type annotations', async () => {
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  
  // Register languages
  await registerGeneratedAntlrLanguages();
  
  const yamlCode = `version: !!str 2.1
timestamp: !!timestamp 2023-01-01T00:00:00Z`;
  
  console.log('\n=== Testing YAML tag highlighting ===');
  console.log('Input:', yamlCode);
  
  const htmlResult = highlight(yamlCode, { language: 'yaml', output: 'html' });
  console.log('\nHTML result:');
  console.log(htmlResult);
  
  // Check if tags are highlighted as types
  const hasTypeHighlighting = htmlResult.includes('tok-type');
  console.log('\nYAML tags highlighted as types:', hasTypeHighlighting);
  
  // Extract tag tokens specifically
  const tagMatches = htmlResult.match(/<span class="(tok-[^"]+)"[^>]*>!![^<]*<\/span>/g) || [];
  console.log('\nTag tokens found:');
  tagMatches.forEach((match, i) => {
    const [, tokenType] = match.match(/<span class="(tok-[^"]+)"/) || [];
    const [, text] = match.match(/>([^<]*)</) || [];
    console.log(`  ${i}: type="${tokenType}" text="${text}"`);
  });
});
