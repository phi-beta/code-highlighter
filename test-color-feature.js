/**
 * Test script to showcase the new color rendering feature
 */
import { highlight } from './dist/src/index.js';

const testCss = `
.primary { color: #ff6b6b; background: #3b82f6; }
.secondary { color: #10b981; background: #ffffff; }
.dark { color: #ffffff; background: #1f2937; }
.light { color: #000000; background: #f8f9fa; }
`;

console.log('🎨 HTML Output with Color Rendering:');
console.log('=====================================');
const htmlOutput = highlight(testCss, { 
  language: 'css', 
  output: 'html', 
  handlerConfig: { block: false } 
});
console.log(htmlOutput);

console.log('\n🌈 ANSI Output with Closest Color Mapping:');
console.log('==========================================');
const ansiOutput = highlight(testCss, { 
  language: 'css', 
  output: 'ansi' 
});
console.log(ansiOutput);
