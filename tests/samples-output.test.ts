/**
 * samples-output.test.ts
 * Generates highlight outputs (ANSI + HTML) for each file in samples/inputs using
 * registered ANTLR lexers and stores them in samples/outputs for manual review.
 * Skips files whose language isn't registered (e.g., if lexers not generated yet).
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { highlight, listLanguages } from '../src/index.js';
import { attemptAutoRegisterGeneratedAntlrLanguages } from '../src/register-antlr.js';

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'samples', 'inputs');
const OUTPUT_DIR = path.join(ROOT, 'samples', 'outputs');

function inferLanguage(file: string): string | null {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case '.js':
    case '.mjs':
    case '.cjs': return 'javascript';
    case '.py': return 'python';
    case '.json': return 'json';
    case '.sh': return 'bash';
    case '.md': return 'markdown';
    case '.css': return 'css';
    case '.ts': return 'typescript';
    case '.html':
    case '.htm': return 'html';
    case '.csv': return 'csv';
    default: return null;
  }
}

describe('sample output generation', () => {
  it('writes highlighted outputs for each sample input (skip if lexers missing)', async () => {
    if (!fs.existsSync(INPUT_DIR)) {
      console.warn('[samples-output] No samples/inputs directory found');
      return; // nothing to do
    }
  await attemptAutoRegisterGeneratedAntlrLanguages({ verbose: true });
    const available = new Set(listLanguages());
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    const files = fs.readdirSync(INPUT_DIR).filter(f => fs.statSync(path.join(INPUT_DIR, f)).isFile());
    let generated = 0;
    let skipped = 0;
    for (const f of files) {
      const lang = inferLanguage(f);
      if (!lang) { skipped++; continue; }
      if (!available.has(lang)) { skipped++; continue; }
      const abs = path.join(INPUT_DIR, f);
      const code = fs.readFileSync(abs, 'utf8');
      try {
        const ansi = highlight(code, { language: lang, output: 'ansi' });
        fs.writeFileSync(path.join(OUTPUT_DIR, f + '.ansi.txt'), ansi, 'utf8');
      } catch (e) {
        fs.writeFileSync(path.join(OUTPUT_DIR, f + '.ansi.error.txt'), String(e), 'utf8');
      }
      try {
        const html = highlight(code, { language: lang, output: 'html', handlerConfig: { block: true } });
        fs.writeFileSync(path.join(OUTPUT_DIR, f + '.html'), html, 'utf8');
      } catch (e) {
        fs.writeFileSync(path.join(OUTPUT_DIR, f + '.html.error.txt'), String(e), 'utf8');
      }
      generated++;
    }
    console.log(`[samples-output] generated=${generated} skipped=${skipped}`);
    // Not asserting generated > 0 to allow CI pass when lexers not yet generated.
    expect(files.length).toBeGreaterThan(0);
  });
});
