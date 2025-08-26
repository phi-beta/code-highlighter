#!/usr/bin/env node

import { registerGeneratedAntlrLanguages } from './dist/register-antlr.js';
import { highlight } from './dist/index.js';

console.log('Testing SQL token mapping...');

await registerGeneratedAntlrLanguages({ verbose: true });

const sqlCode = `-- Test comment
SELECT * FROM users;`;

const result = highlight(sqlCode, { language: 'sql', output: 'html' });
console.log('\nSQL highlighting result:');
console.log(result);

// Check for specific token types
console.log('\nToken analysis:');
console.log('Has keyword tokens:', result.includes('tok-keyword'));
console.log('Has comment tokens:', result.includes('tok-comment'));
console.log('Has identifier tokens:', result.includes('tok-identifier'));
console.log('Language detected as:', result.match(/lang-(\w+)/)?.[1] || 'unknown');
