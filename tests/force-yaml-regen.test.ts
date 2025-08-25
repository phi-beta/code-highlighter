#!/usr/bin/env node

import { test } from 'vitest';

test('Force regenerate YAML sample with timestamp fix', async () => {
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  const fs = await import('fs');
  
  // Register languages
  await registerGeneratedAntlrLanguages();
  
  // Read the YAML input
  const yamlInput = fs.readFileSync('samples/inputs/yaml.yaml', 'utf8');
  
  console.log('\n=== Regenerating YAML sample with timestamp fix ===');
  
  // Generate HTML output
  const htmlResult = highlight(yamlInput, { language: 'yaml', output: 'html' });
  
  // Write to output file
  fs.writeFileSync('samples/outputs/yaml.yaml.html', htmlResult);
  
  console.log('✅ Regenerated YAML HTML sample');
  
  // Also generate ANSI output
  const ansiResult = highlight(yamlInput, { language: 'yaml', output: 'ansi' });
  fs.writeFileSync('samples/outputs/yaml.yaml.ansi', ansiResult);
  
  console.log('✅ Regenerated YAML ANSI sample');
  
  // Check if the timestamp line is fixed
  const timestampMatch = htmlResult.match(/timestamp.*2023-01-01T00.*00.*00Z/);
  console.log('Contains timestamp pattern:', !!timestampMatch);
  
  // Check for property highlighting in timestamp
  const hasPropertyInTimestamp = htmlResult.includes('2023-01-01T00</span>') && 
                                 htmlResult.includes('tok-property');
  console.log('Timestamp still has property highlighting:', hasPropertyInTimestamp);
});
