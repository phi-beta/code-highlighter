// Test the new SQL keywords
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

console.log('Registering languages...');
await registerGeneratedAntlrLanguages({ 
  verbose: true,
  dir: './dist/src/generated/antlr'
});

const testSql = `SHOW TABLES;
DESCRIBE employees; 
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);`;

console.log('Testing SQL keywords:');
try {
  const result = highlight(testSql, { 
    language: 'sql', 
    html: true 
  });
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
}
