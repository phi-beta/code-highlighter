#!/usr/bin/env ts-node
/**
 * generate-samples.ts
 * Generates highlighted outputs (ANSI and HTML) for each sample input language
 * into samples/outputs. Assumes ANTLR lexers have been generated & registered.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

const INPUT_DIR = join(process.cwd(), 'samples', 'inputs');
const OUTPUT_DIR = join(process.cwd(), 'samples', 'outputs');

export async function generateAll() {
  // Register languages with explicit CSV token mappings
  const csvTokenMap: Record<string, string> = {
    QUOTED_FIELD: 'string',
    COMMA: 'punctuation',
    NUMBER: 'number',
    FIELD_TEXT: 'identifier',
    NEWLINE: 'whitespace',
  };
  
  console.log('Registering languages with CSV token mappings...');
  await registerGeneratedAntlrLanguages({ 
    verbose: true,
    dir: join(process.cwd(), 'src', 'generated', 'antlr'),
    tokenMaps: { csv: csvTokenMap }
  });
  
  // Check what languages are available
  const { listLanguages } = await import('../src/index.js');
  console.log('Available languages after registration:', listLanguages());
  const files = readdirSync(INPUT_DIR);
  for (const f of files) {
    const abs = join(INPUT_DIR, f);
    const code = readFileSync(abs, 'utf8');
    const ext = extname(f).toLowerCase();
    let lang = 'javascript';
    if (ext === '.py') lang = 'python';
    else if (ext === '.json') lang = 'json';
    else if (ext === '.sh') lang = 'bash';
    else if (ext === '.md') lang = 'markdown';
    else if (ext === '.csv') lang = 'csv';
    else if (ext === '.xml') lang = 'xml';
    else if (ext === '.yaml' || ext === '.yml') lang = 'yaml';
    else if (ext === '.js' || ext === '.mjs' || ext === '.cjs') lang = 'javascript';
    // ANSI output
    try {
      const ansi = highlight(code, { language: lang, output: 'ansi' });
      writeFileSync(join(OUTPUT_DIR, f + '.ansi.txt'), ansi, 'utf8');
    } catch (e) {
      writeFileSync(join(OUTPUT_DIR, f + '.ansi.error.txt'), String(e), 'utf8');
    }
    // HTML output
    try {
      const html = highlight(code, { language: lang, output: 'html', handlerConfig: { block: true } });
      writeFileSync(join(OUTPUT_DIR, f + '.html'), html, 'utf8');
    } catch (e) {
      writeFileSync(join(OUTPUT_DIR, f + '.html.error.txt'), String(e), 'utf8');
    }
  }
  console.log('Generated sample outputs for', files.length, 'files.');
}

async function main() { await generateAll(); }
main().catch(e => { console.error(e); process.exit(1); });
