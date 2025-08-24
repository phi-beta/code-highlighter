#!/usr/bin/env node
/**
 * Simple script to generate CSV sample output
 */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

async function generateCSVSample() {
  // Register CSV with explicit token mappings
  const csvTokenMap = {
    QUOTED_FIELD: 'string',
    COMMA: 'punctuation',
    NUMBER: 'number',
    FIELD_TEXT: 'identifier',
    NEWLINE: 'whitespace',
  };
  
  console.log('Registering CSV...');
  await registerGeneratedAntlrLanguages({ 
    verbose: true,
    tokenMaps: { csv: csvTokenMap }
  });
  
  // Read CSV input
  const csvContent = readFileSync('samples/inputs/csv.csv', 'utf8');
  console.log('CSV content:', csvContent);
  
  try {
    // Generate HTML output
    const html = highlight(csvContent, 'csv', 'html');
    writeFileSync('samples/outputs/csv.csv.html', html, 'utf8');
    console.log('✅ Generated CSV HTML sample');
    
    // Generate ANSI output
    const ansi = highlight(csvContent, 'csv', 'ansi');
    writeFileSync('samples/outputs/csv.csv.ansi.txt', ansi, 'utf8');
    console.log('✅ Generated CSV ANSI sample');
    
  } catch (error) {
    console.error('❌ Error generating CSV sample:', error);
    writeFileSync('samples/outputs/csv.csv.error.txt', String(error), 'utf8');
  }
}

generateCSVSample().catch(console.error);
