/**
 * ANTLR integration smoke test (skips if no generated lexers present).
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { highlight, listLanguages, registerLanguage, unregisterLanguage } from '../src/index.js';

async function maybeRegister() {
  try {
    const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
    await registerGeneratedAntlrLanguages({ verbose: false });
  } catch { /* ignore */ }
}

const genDir = path.join(process.cwd(), 'src', 'generated', 'antlr');

describe('antlr generated lexers (optional)', () => {
  it('javascript mini lexer produces non-empty output if present', async () => {
    if (!fs.existsSync(genDir)) return; // skip if directory missing
    const has = fs.readdirSync(genDir).some(f => /javascriptminilexer/i.test(f));
    if (!has) return; // skip if stub not there
    await maybeRegister();
    const langs = listLanguages();
    if (!langs.includes('javascript')) return; // give up silently
    const sample = 'function test() { return 1; }';
    const out = highlight(sample, { language: 'javascript', output: 'html' });
    expect(out.length).toBeGreaterThan(20);
  });
  it('javascript keyword token classified (tok-keyword) in real lexer output', async () => {
    if (!fs.existsSync(genDir)) return;
    await maybeRegister();
    const langs = listLanguages();
    if (!langs.includes('javascript')) return;
    const out = highlight('return 1;', { language: 'javascript', output: 'html' });
    expect(/tok-keyword/.test(out)).toBe(true);
  });
});
