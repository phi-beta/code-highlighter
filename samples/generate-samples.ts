#!/usr/bin/env ts-node
/**
 * generate-samples.ts
 * Generates highlighted outputs (ANSI and HTML) for each sample input language
 * into samples/outputs. Assumes ANTLR lexers have been generated & registered.
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { highlight } from '../src/index.js';
import { attemptAutoRegisterGeneratedAntlrLanguages } from '../src/register-antlr.js';

const INPUT_DIR = join(process.cwd(), 'samples', 'inputs');
const OUTPUT_DIR = join(process.cwd(), 'samples', 'outputs');

export async function generateAll() {
  await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: false });
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
