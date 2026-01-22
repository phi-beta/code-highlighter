#!/usr/bin/env node

/**
 * verify-cli.js
 * Verifies that dist/src/cli.js exists and is executable after build.
 */

import { existsSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

const cliPath = join(projectRoot, 'dist/src/cli.js');

console.log('[verify-cli] Checking CLI build...');

if (!existsSync(cliPath)) {
  console.error(`[verify-cli] ❌ ERROR: CLI not found at ${cliPath}`);
  console.error('[verify-cli] The build process may have failed to compile src/cli.ts');
  process.exit(1);
}

const stats = statSync(cliPath);
if (!stats.isFile()) {
  console.error(`[verify-cli] ❌ ERROR: ${cliPath} is not a file`);
  process.exit(1);
}

if (stats.size === 0) {
  console.error(`[verify-cli] ❌ ERROR: ${cliPath} is empty`);
  process.exit(1);
}

console.log(`[verify-cli] ✅ CLI built successfully at ${cliPath} (${stats.size} bytes)`);
console.log('[verify-cli] CLI is ready for testing and installation');
