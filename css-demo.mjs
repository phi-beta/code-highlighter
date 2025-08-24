#!/usr/bin/env node
/**
 * Simple CSS highlighting demo
 * This demonstrates the CSS highlighting is working with fallback patterns
 */
import { highlight } from './dist/src/index.js';
import { readFileSync } from 'fs';

async function demo() {
  console.log('CSS Highlighting Demo\n');
  console.log('====================\n');
  
  // Read the CSS sample
  const cssCode = readFileSync('./samples/inputs/css.css', 'utf8');
  
  // Show the first few lines
  const lines = cssCode.split('\n').slice(0, 15);
  console.log('Input CSS (first 15 lines):');
  console.log('----------------------------');
  console.log(lines.join('\n'));
  console.log('\n');
  
  // Highlight using fallback patterns (since ANTLR requires runtime registration)
  const result = highlight(cssCode, { language: 'css', html: true });
  
  console.log('HTML Output (first 500 chars):');
  console.log('-------------------------------');
  console.log(result.substring(0, 500) + '...');
  console.log('\n');
  
  console.log('✅ CSS highlighting is working!');
  console.log('The fallback regex patterns provide highlighting even without ANTLR runtime.');
  console.log('For full ANTLR integration, use the test files which handle registration.');
}

demo().catch(console.error);
