import { readFileSync, writeFileSync } from 'fs';
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

console.log('Starting SQL sample regeneration...');

// Register ANTLR languages first
await registerGeneratedAntlrLanguages();

// Read the SQL input
const sqlInput = readFileSync('./samples/inputs/sql.sql', 'utf-8');
console.log('SQL input preview:', sqlInput.substring(0, 100) + '...');

// Generate HTML output
console.log('Generating HTML output...');
const htmlOutput = highlight(sqlInput, { language: 'sql', output: 'html' });

// Generate ANSI output  
console.log('Generating ANSI output...');
const ansiOutput = highlight(sqlInput, { language: 'sql', output: 'ansi' });

// Write outputs
writeFileSync('./samples/outputs/sql.sql.html', htmlOutput);
writeFileSync('./samples/outputs/sql.sql.ansi.txt', ansiOutput);

console.log('✅ SQL sample outputs regenerated successfully!');
console.log('HTML preview (first 200 chars):', htmlOutput.substring(0, 200) + '...');
