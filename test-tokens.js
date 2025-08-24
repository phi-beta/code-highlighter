// Simple test to check ANTLR token generation
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

await registerGeneratedAntlrLanguages({ verbose: true });

// Test different patterns
const samples = [
  '- [x] Task\n',          // with newline
  '- [x] Task',            // without newline  
  '- [x] Task\n- [ ] Task2\n',  // multiple with newlines
  '- [ ] Task\n',          // unchecked task
  '- Task\n',              // regular bullet
];

const { highlight } = await import('./dist/src/index.js');

for (const sample of samples) {
  console.log(`\nSample: ${JSON.stringify(sample)}`);
  try {
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    const hasTaskList = /tok-task-list/.test(html);
    const hasBulletList = /tok-list-bullet/.test(html);
    console.log(`  Task list: ${hasTaskList}, Bullet list: ${hasBulletList}`);
    if (sample.length < 50) {
      console.log(`  HTML: ${html}`);
    }
  } catch (err) {
    console.log(`  Error: ${err.message}`);
  }
}
