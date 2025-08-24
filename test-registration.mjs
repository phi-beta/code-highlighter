import { registerGeneratedAntlrLanguages, attemptAutoRegisterGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

async function testRegistration() {
  console.log('Attempting auto-registration...');
  const result = await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
  console.log('Before:', result.before);
  console.log('After:', result.after);
}

testRegistration().catch(console.error);
