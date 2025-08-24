import { getDirname } from './dist/src/utils/dirname.js';
import { getAssetPath } from './dist/src/utils/assets.js';
import path from 'node:path';

console.log('Current working directory:', process.cwd());
console.log('getDirname():', getDirname());
console.log('getAssetPath("generated/antlr"):', getAssetPath('generated/antlr'));

// Let's see what files exist
import fs from 'node:fs';
const assetPath = getAssetPath('generated/antlr');
console.log('Directory exists?', fs.existsSync(assetPath));
if (fs.existsSync(assetPath)) {
  console.log('Files in directory:', fs.readdirSync(assetPath));
} else {
  console.log('Looking for directory at:', assetPath);
  // Try to find where it actually is
  const alternatives = [
    'dist/src/generated/antlr',
    './dist/src/generated/antlr',
    path.join(process.cwd(), 'dist/src/generated/antlr')
  ];
  
  for (const alt of alternatives) {
    if (fs.existsSync(alt)) {
      console.log('Found at:', alt);
      console.log('Files:', fs.readdirSync(alt));
      break;
    }
  }
}
