#!/usr/bin/env node
import { exportTokensAsJson } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';
import fs from 'node:fs';

async function generateCSSJson() {
  console.log('Generating CSS JSON export...');
  
  // Register languages
  await registerGeneratedAntlrLanguages({ verbose: false });
  
  // Read CSS sample input
  const cssInput = fs.readFileSync('./samples/inputs/css.css', 'utf-8');
  
  try {
    // Generate JSON export
    const jsonOutput = exportTokensAsJson(cssInput, { language: 'css' });
    fs.writeFileSync('./samples/css.json', jsonOutput);
    console.log('✅ Generated css.json');
    
  } catch (error) {
    console.error('❌ Error generating CSS JSON:', error.message);
  }
}

generateCSSJson();
