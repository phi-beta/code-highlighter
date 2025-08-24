import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

// Register languages
await registerGeneratedAntlrLanguages();

const samples = [
  '- [x] Completed task',
  '- [ ] Incomplete task', 
  '- normal bullet item'
];

for (const sample of samples) {
  console.log('\nInput:', JSON.stringify(sample));
  const html = highlight(sample, { language: 'markdown', output: 'html' });
  
  // Extract the token classes
  const tokens = html.match(/tok-[a-z-]+/g) || [];
  console.log('Token classes:', tokens);
  
  // Check specific patterns
  console.log('Contains tok-task-list:', html.includes('tok-task-list'));
  console.log('Contains tok-list-bullet:', html.includes('tok-list-bullet'));
}
