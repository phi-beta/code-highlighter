#!/usr/bin/env node
/**
 * Compile ANTLR-generated TypeScript lexers to JavaScript in dist/
 * This ensures the CLI can dynamically import them at runtime.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, '../src/generated/antlr');
const distDir = path.join(__dirname, '../dist/src/generated/antlr');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Get all *Mini*.ts files (excluding .d.ts)
const files = fs.readdirSync(srcDir)
  .filter(f => /Mini.*\.ts$/.test(f) && !f.endsWith('.d.ts'))
  .filter(f => f !== 'CsvMini.ts'); // Exclude duplicate (keep CSVMini.ts)

console.log(`[build-antlr-lexers] Compiling ${files.length} ANTLR lexer files...`);

// Compile each file individually to avoid case-sensitivity issues
for (const file of files) {
  const filePath = path.join(srcDir, file);
  try {
    execSync(
      `tsc "${filePath}" --outDir "${distDir}" --module esnext --target es2020 --moduleResolution node --esModuleInterop --skipLibCheck --declaration`,
      { stdio: 'pipe' }
    );
    
    // Fix imports in the compiled .js file to add .js extensions
    const outFile = path.join(distDir, file.replace('.ts', '.js'));
    if (fs.existsSync(outFile)) {
      let content = fs.readFileSync(outFile, 'utf-8');
      // Fix antlr4ts imports to include .js extension
      content = content.replace(/from ["']antlr4ts([^"']*)["']/g, 'from "antlr4ts$1.js"');
      fs.writeFileSync(outFile, content);
    }
  } catch (err) {
    console.warn(`[build-antlr-lexers] Warning: Failed to compile ${file}`);
  }
}

console.log(`[build-antlr-lexers] Done! Compiled to ${distDir}`);
