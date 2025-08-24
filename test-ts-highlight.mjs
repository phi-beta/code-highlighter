import { attemptAutoRegisterGeneratedAntlrLanguages } from './src/register-antlr.js';
import { highlight } from './src/index.js';

async function testTypeScriptHighlighting() {
  console.log('Registering languages...');
  await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
  
  const code = `interface User {
  id: number;
  name: string;
}`;
  
  console.log('\nTesting TypeScript highlighting...');
  try {
    const result = highlight(code, 'typescript', 'html');
    console.log('Success! HTML output:');
    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testTypeScriptHighlighting();
