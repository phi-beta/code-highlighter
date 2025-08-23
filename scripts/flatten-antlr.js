#!/usr/bin/env node
/**
 * flatten-antlr.js
 * Post-process antlr4ts CLI output which nests generated files under
 *   src/generated/antlr/src/grammars/antlr
 * to copy .ts artifacts (except .interp/.tokens) up one level to
 *   src/generated/antlr
 * This keeps import paths shorter and matches auto-registration expectations.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const NESTED = path.join(ROOT, 'src', 'generated', 'antlr', 'src', 'grammars', 'antlr');
const TARGET = path.join(ROOT, 'src', 'generated', 'antlr');

if (!fs.existsSync(NESTED)) {
  process.exit(0); // nothing to do
}

const entries = fs.readdirSync(NESTED).filter(f => f.endsWith('.ts'));
for (const file of entries) {
  const src = path.join(NESTED, file);
  const dest = path.join(TARGET, file);
  try {
    fs.copyFileSync(src, dest);
  } catch (e) {
    console.error('[flatten-antlr] Failed to copy', file, e);
  }
}
console.log(`[flatten-antlr] Copied ${entries.length} lexer TS files to ${TARGET}`);
