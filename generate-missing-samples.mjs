#!/usr/bin/env node
// Quick script to generate missing XML and YAML sample outputs
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { highlight } from './dist/src/index.js';
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

async function generateMissingSamples() {
  console.log('Registering languages...');
  await registerGeneratedAntlrLanguages();
  
  // XML outputs
  console.log('Generating XML samples...');
  const xmlCode = readFileSync('samples/inputs/xml.xml', 'utf8');
  
  try {
    const xmlHtml = highlight(xmlCode, { language: 'xml', output: 'html' });
    writeFileSync('samples/outputs/xml.xml.html', xmlHtml, 'utf8');
    console.log('✅ Generated xml.xml.html');
  } catch (e) {
    console.log('❌ XML HTML failed:', e.message);
  }
  
  try {
    const xmlAnsi = highlight(xmlCode, { language: 'xml', output: 'ansi' });
    writeFileSync('samples/outputs/xml.xml.ansi.txt', xmlAnsi, 'utf8');
    console.log('✅ Generated xml.xml.ansi.txt');
  } catch (e) {
    console.log('❌ XML ANSI failed:', e.message);
  }
  
  // YAML outputs
  console.log('Generating YAML samples...');
  const yamlCode = readFileSync('samples/inputs/yaml.yaml', 'utf8');
  
  try {
    const yamlHtml = highlight(yamlCode, { language: 'yaml', output: 'html' });
    writeFileSync('samples/outputs/yaml.yaml.html', yamlHtml, 'utf8');
    console.log('✅ Generated yaml.yaml.html');
  } catch (e) {
    console.log('❌ YAML HTML failed:', e.message);
  }
  
  try {
    const yamlAnsi = highlight(yamlCode, { language: 'yaml', output: 'ansi' });
    writeFileSync('samples/outputs/yaml.yaml.ansi.txt', yamlAnsi, 'utf8');
    console.log('✅ Generated yaml.yaml.ansi.txt');
  } catch (e) {
    console.log('❌ YAML ANSI failed:', e.message);
  }
}

generateMissingSamples().catch(console.error);
