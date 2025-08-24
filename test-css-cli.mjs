#!/usr/bin/env node
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

async function test() {
  console.log('Testing CSS highlighting...');
  
  // Register languages
  await registerGeneratedAntlrLanguages({ verbose: true });
  
  const cssCode = `/* CSS Test */
.container {
  background-color: #3b82f6;
  padding: 1rem;
}`;

  try {
    const result = highlight(cssCode, { language: 'css', html: true });
    console.log('Success! CSS highlighting works:');
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
