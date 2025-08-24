#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAssetPath } from './dist/src/utils/assets.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Current directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('Asset path for "../generated/antlr":', getAssetPath('../generated/antlr'));

// Try different paths
const paths = [
  'generated/antlr',
  'src/generated/antlr', 
  'dist/src/generated/antlr',
  '../generated/antlr'
];

for (const p of paths) {
  console.log(`Trying "${p}":`, getAssetPath(p));
}
