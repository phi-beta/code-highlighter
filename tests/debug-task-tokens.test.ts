import { describe, test, expect } from 'vitest';
import { highlight } from '../src/index.js';
import { attemptAutoRegisterGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('debug task list tokens', () => {
  test('shows raw token classification', async () => {
    await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
    
    const samples = [
      '# Heading',
      '**bold**',
      '*italic*', 
      '`code`',
      '- [x] Completed task',
      '- [ ] Incomplete task', 
      '- normal bullet item'
    ];

    for (const sample of samples) {
      console.log('\nInput:', JSON.stringify(sample));
      const html = highlight(sample, { language: 'markdown', output: 'html' });
      
      // Extract ALL token classes to see what's working
      const tokens = [...html.matchAll(/tok-([a-z-]+)/g)].map(m => m[1]);
      console.log('Token classes:', tokens);
      
      // Show the full HTML for debugging if it's a list item
      if (sample.startsWith('- ')) {
        console.log('Full HTML:', html);
      }
    }
    
    // Ensure test passes
    expect(true).toBe(true);
  });
});
