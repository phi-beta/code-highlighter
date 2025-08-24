#!/usr/bin/env node
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';
import fs from 'node:fs';

async function generateCSSOutput() {
  console.log('Generating CSS sample output...');
  
  // Register languages
  await registerGeneratedAntlrLanguages({ verbose: false });
  
  // Read CSS sample input
  const cssInput = fs.readFileSync('./samples/inputs/css.css', 'utf-8');
  
  try {
    // Generate HTML output
    const htmlOutput = highlight(cssInput, { language: 'css', html: true, block: true });
    fs.writeFileSync('./samples/outputs/css.css.html', htmlOutput);
    console.log('✅ Generated css.css.html');
    
    // Generate ANSI output
    const ansiOutput = highlight(cssInput, { language: 'css', html: false });
    fs.writeFileSync('./samples/outputs/css.css.ansi.txt', ansiOutput);
    console.log('✅ Generated css.css.ansi.txt');
    
  } catch (error) {
    console.error('❌ Error generating CSS output:', error.message);
  }
}

generateCSSOutput();
