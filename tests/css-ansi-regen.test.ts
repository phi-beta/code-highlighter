import { describe, it, beforeAll } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSS ANSI Sample Regeneration', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  it('should regenerate CSS sample with fixed ANSI', () => {
    // Read the CSS input file
    const cssContent = readFileSync('samples/inputs/css.css', 'utf8');
    
    // Generate HTML output
    const html = highlight(cssContent, { language: 'css', output: 'html' });
    writeFileSync('samples/outputs/css.css.html', html, 'utf8');
    console.log('✅ Regenerated CSS HTML sample');
    
    // Generate ANSI output with fixed escape codes
    const ansi = highlight(cssContent, { language: 'css', output: 'ansi' });
    writeFileSync('samples/outputs/css.css.ansi.txt', ansi, 'utf8');
    console.log('✅ Regenerated CSS ANSI sample with proper escape codes');
    
    // Check first few lines for proper encoding
    const lines = ansi.split('\n').slice(0, 3);
    console.log('First 3 lines of ANSI:');
    lines.forEach((line, i) => {
      console.log(`Line ${i + 1} (JSON):`, JSON.stringify(line));
    });
    
    // Verify no color names appear
    const hasColorNames = /\b(red|green|blue|black|gray|magenta)\b/.test(ansi);
    console.log('Contains color names instead of escape codes:', hasColorNames);
    
    // Count escape sequences
    const escapeCount = (ansi.match(/\u001b\[\d+m/g) || []).length;
    console.log(`Found ${escapeCount} proper ANSI escape sequences`);
  });
});
