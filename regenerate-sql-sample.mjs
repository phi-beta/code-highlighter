import { highlight, listLanguages } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';
import { readFileSync, writeFileSync } from 'fs';

// Register languages
console.log('Registering languages...');
await registerGeneratedAntlrLanguages({ 
  verbose: true,
  dir: './dist/src/generated/antlr'
});

// Check what languages are available
const languages = listLanguages();
console.log('Available languages:', languages);

// Read SQL input
const sqlInput = readFileSync('samples/inputs/sql.sql', 'utf8');

// Generate highlighted output
console.log('Generating highlighted SQL...');
const result = highlight(sqlInput, { 
    language: 'sql', 
    html: true 
});

// Write to file
writeFileSync('sql-updated.html', result);
console.log('Updated SQL sample written to sql-updated.html');

// Also show a preview of key lines
const lines = result.split('\n');
const showLines = lines.filter(line => 
  line.includes('SHOW') || 
  line.includes('DESCRIBE') || 
  line.includes('TABLES') ||
  line.includes('DATABASES') ||
  line.includes('COLUMN')
);

console.log('\nKey updated lines:');
showLines.forEach(line => console.log(line));
