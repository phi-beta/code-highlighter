// Test Python function highlighting
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

console.log('Registering languages...');
await registerGeneratedAntlrLanguages({ 
  verbose: true,
  dir: './dist/src/generated/antlr'
});

const testPython = `print("Hello")
range(10)
dict()
list()
len("test")`;

console.log('Testing Python built-in functions:');
try {
  const result = highlight(testPython, { 
    language: 'python', 
    html: true 
  });
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
}
