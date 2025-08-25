#!/usr/bin/env node

import { test } from 'vitest';

test('Debug YAML timestamp pattern detection', async () => {
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  
  // Register languages
  await registerGeneratedAntlrLanguages();
  
  const timestampLine = `timestamp: !!timestamp 2023-01-01T00:00:00Z`;
  
  console.log('\n=== Testing timestamp pattern detection ===');
  console.log('Input:', timestampLine);
  
  const htmlResult = highlight(timestampLine, { language: 'yaml', output: 'html' });
  console.log('\nHTML result:');
  console.log(htmlResult);
  
  // Extract detailed token info
  const tokenRegex = /<span class="(tok-[^"]+)"[^>]*>([^<]*)<\/span>/g;
  const tokens: { type: string; text: string }[] = [];
  let match;
  
  while ((match = tokenRegex.exec(htmlResult)) !== null) {
    if (match[2].trim()) {
      tokens.push({ type: match[1], text: match[2] });
    }
  }
  
  console.log('\nDetailed tokens:');
  tokens.forEach((token, i) => {
    console.log(`  ${i}: type="${token.type}" text="${token.text}"`);
  });
  
  // Check specifically for timestamp parts
  const timestampParts = tokens.filter(t => 
    t.text.includes('2023') || 
    t.text.includes('01T00') || 
    t.text === '00' || 
    t.text.includes('00Z')
  );
  
  console.log('\nTimestamp-related tokens:');
  timestampParts.forEach((token, i) => {
    console.log(`  ${i}: type="${token.type}" text="${token.text}"`);
    if (token.type === 'tok-property') {
      console.log(`    ❌ PROBLEM: "${token.text}" is highlighted as property (purple)`);
    }
  });
});
