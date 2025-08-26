#!/usr/bin/env node

import { test } from 'vitest';

test('Test SQL highlighting with comprehensive features', async () => {
  const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
  const { highlight } = await import('../src/index.js');
  
  // Register languages
  await registerGeneratedAntlrLanguages();
  
  const sqlCode = `-- SQL test query
SELECT first_name, last_name, salary 
FROM employees 
WHERE salary > 50000 
  AND department_id = 1;`;
  
  console.log('\n=== Testing SQL highlighting ===');
  console.log('Input:', sqlCode);
  
  const htmlResult = highlight(sqlCode, { language: 'sql', output: 'html' });
  console.log('\nHTML result:');
  console.log(htmlResult);
  
  // Check for key SQL features
  const hasKeywords = htmlResult.includes('tok-keyword');
  const hasIdentifiers = htmlResult.includes('tok-identifier');
  const hasNumbers = htmlResult.includes('tok-number');
  const hasComments = htmlResult.includes('tok-comment');
  
  console.log('\nSQL highlighting features:');
  console.log('  Keywords:', hasKeywords);
  console.log('  Identifiers:', hasIdentifiers);
  console.log('  Numbers:', hasNumbers);
  console.log('  Comments:', hasComments);
});
