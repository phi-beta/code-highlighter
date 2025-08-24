import { getDirname } from './dist/src/utils/dirname.js';
import path from 'node:path';

console.log('import.meta.url:', import.meta.url);
console.log('getDirname():', getDirname());
console.log('getDirname(import.meta.url):', getDirname(import.meta.url));

// Check if we're in the test script context
const currentDir = getDirname(import.meta.url);
console.log('Current dir of this script:', currentDir);

// Let's see where the generated files should be in relation to register-antlr.js
const registerPath = './dist/src/register-antlr.js';
const registerDir = path.dirname(path.resolve(registerPath));
console.log('register-antlr.js dir:', registerDir);
console.log('Expected generated/antlr path:', path.join(registerDir, 'generated/antlr'));

import fs from 'node:fs';
console.log('Files in dist/src:', fs.readdirSync('./dist/src'));
console.log('Files in dist/src/generated:', fs.readdirSync('./dist/src/generated'));
console.log('Files in dist/src/generated/antlr:', fs.readdirSync('./dist/src/generated/antlr'));
