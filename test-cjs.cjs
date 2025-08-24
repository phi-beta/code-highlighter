const { registerGeneratedAntlrLanguages } = require('./dist-cjs/src/register-antlr.js');

async function testCJS() {
  console.log('Testing CommonJS CSS registration...');
  try {
    await registerGeneratedAntlrLanguages({ verbose: true });
    console.log('Registration successful!');
  } catch (e) {
    console.error('Registration failed:', e);
  }
}

testCJS().catch(console.error);
