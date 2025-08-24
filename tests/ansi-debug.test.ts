import { describe, it, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('ANSI Debug', () => {
  beforeAll(async () => {
    const csvTokenMap = {
      QUOTED_FIELD: 'string',
      COMMA: 'punctuation',
      NUMBER: 'number',
      FIELD_TEXT: 'identifier',
    };
    
    await registerGeneratedAntlrLanguages({ 
      tokenMaps: { csv: csvTokenMap }
    });
  });

  it('should debug ANSI output format', () => {
    const simple = 'test,123,"quoted"';
    
    const ansiResult = highlight(simple, { language: 'csv', output: 'ansi' });
    console.log('ANSI output:', JSON.stringify(ansiResult));
    console.log('ANSI output raw:', ansiResult);
    
    // Also check HTML for comparison
    const htmlResult = highlight(simple, { language: 'csv', output: 'html' });
    console.log('HTML output:', htmlResult);
  });
});
