import { test } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

test('debug CSS registration', async () => {
  console.log('Attempting to register CSS...');
  await registerGeneratedAntlrLanguages({ verbose: true });
  
  // Try to list available languages
  const { listLanguages } = await import('../src/index.js');
  const languages = listLanguages();
  console.log('Available languages:', languages);
});
