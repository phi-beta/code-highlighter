const { highlight } = require('./dist-cjs/src/index.js');
const { registerGeneratedAntlrLanguages } = require('./dist-cjs/src/register-antlr.js');

async function debugCssTokens() {
  console.log('Registering ANTLR languages...');
  await registerGeneratedAntlrLanguages({ verbose: true });
  
  const testCode = 'var(--test)';
  console.log(`\nTesting: ${testCode}`);
  
  const tokens = highlight(testCode, { output: 'tokens', language: 'css' });
  console.log('Tokens:', JSON.stringify(tokens, null, 2));
  
  const html = highlight(testCode, { output: 'html', language: 'css' });
  console.log('\nHTML:', html);
}

debugCssTokens().catch(console.error);
