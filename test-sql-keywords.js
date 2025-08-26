// Test the new SQL keywords
import { highlight } from './dist/src/index.js';

const testSql = `
SHOW TABLES;
DESCRIBE employees; 
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);
COLUMN test;
`;

console.log('Testing SQL keywords:');
try {
  const result = highlight(testSql, 'sql', 'html');
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}
