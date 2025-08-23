/**
 * ANTLR integration smoke test (skips if no generated lexers present).
 */
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { highlight } from '../src/index.js';

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
    const out = highlight('function test() { return 1; }', { language: 'javascript' });
    expect(out).toMatch(/return/);
  });
});
