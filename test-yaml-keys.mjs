#!/usr/bin/env node

import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

console.log('Registering ANTLR languages...');
await registerGeneratedAntlrLanguages({ 
  verbose: true,
  dir: './src/generated/antlr'
});

const yamlCode = `name: "John Doe"
age: 30
fruits:
  - apple
  - banana`;

console.log('\n=== Testing YAML key highlighting ===');
console.log('Input:', yamlCode);

const htmlResult = highlight(yamlCode, { language: 'yaml', output: 'html' });
console.log('\nHTML result:');
console.log(htmlResult);

// Check if keys are highlighted as properties
const hasPropertyHighlighting = htmlResult.includes('tok-property');
console.log('\nHas property highlighting:', hasPropertyHighlighting);

// Extract all token types
const tokenMatches = htmlResult.match(/class="(tok-[^"]+)"/g) || [];
const tokenTypes = tokenMatches.map(match => match.match(/tok-[^"]+/)[0]);
console.log('Token types found:', [...new Set(tokenTypes)]);
