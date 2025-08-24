import { describe, it, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('ANSI Encoding Debug', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  it('should debug actual ANSI escape sequence encoding', () => {
    const simple = '.test { color: red; }';
    
    const ansiResult = highlight(simple, { language: 'css', output: 'ansi' });
    console.log('ANSI result (JSON):', JSON.stringify(ansiResult));
    console.log('ANSI result (raw):', ansiResult);
    
    // Check for proper escape sequences
    const hasEscapes = ansiResult.includes('\u001b[');
    const hasColorNames = /\b(red|green|blue|black|gray|magenta)\b/.test(ansiResult);
    
    console.log('Has proper escape sequences (\\u001b[):', hasEscapes);
    console.log('Has color names instead of codes:', hasColorNames);
    
    // Test a simple number to see if it gets proper color
    const numberTest = highlight('123', { language: 'css', output: 'ansi' });
    console.log('Number test:', JSON.stringify(numberTest));
  });
});
