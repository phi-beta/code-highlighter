import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

// Register ANTLR languages first
console.log('Registering ANTLR languages...');
await registerGeneratedAntlrLanguages({ 
  verbose: true,
  dir: './dist/src/generated/antlr'
});

// Test XML with simple opening tag
const testXml = '<book id="1">';

try {
  console.log('Testing XML highlighting...');
  const result = highlight(testXml, 'xml', { format: 'html' });
  console.log('XML highlight result:');
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}
