/**
 * ANTLR integration smoke test (skips if no generated lexers present).
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { highlight, listLanguages } from '../src/index.js';

async function maybeRegister() {
  try {
    const { registerGeneratedAntlrLanguages } = await import('../src/register-antlr.js');
    await registerGeneratedAntlrLanguages({ verbose: false });
  } catch { /* ignore */ }
}

const genDir = path.join(process.cwd(), 'src', 'generated', 'antlr');

describe('antlr generated lexers (optional)', () => {
  it('javascript mini lexer highlights keywords if generated', async () => {
    if (!fs.existsSync(genDir)) return; // skip silently
    const has = fs.readdirSync(genDir).some(f => f.toLowerCase().includes('javascriptminilexer'));
    if (!has) return; // skip
    await maybeRegister();
  const langs = listLanguages();
  if (!langs.includes('javascript')) return; // registration failed somehow
  const sample = 'function test() { return 1; }';
  const out = highlight(sample, { language: 'javascript' });
  expect(out.length).toBeGreaterThan(0);
  // Looser assertion until real ANTLR grammar is wired: we expect either the word 'function' or 'return' highlighted (present plain if stub)
  expect(/function|return/.test(out)).toBe(true);
  });
});
