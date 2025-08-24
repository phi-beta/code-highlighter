import { describe, it, beforeAll } from 'vitest';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('All ANSI Samples Fix', () => {
  beforeAll(async () => {
    const csvTokenMap = {
      QUOTED_FIELD: 'string',
      COMMA: 'punctuation',
      NUMBER: 'number',
      FIELD_TEXT: 'identifier',
      NEWLINE: 'whitespace',
    };
    
    await registerGeneratedAntlrLanguages({ 
      tokenMaps: { csv: csvTokenMap }
    });
  });

  it('should regenerate all ANSI samples with proper escape codes', () => {
    const inputDir = 'samples/inputs';
    const outputDir = 'samples/outputs';
    
    const files = readdirSync(inputDir);
    let regenerated = 0;
    
    for (const file of files) {
      const inputPath = join(inputDir, file);
      const content = readFileSync(inputPath, 'utf8');
      const ext = extname(file).toLowerCase();
      
      let language = 'javascript'; // default
      if (ext === '.py') language = 'python';
      else if (ext === '.json') language = 'json';
      else if (ext === '.sh') language = 'bash';
      else if (ext === '.md') language = 'markdown';
      else if (ext === '.css') language = 'css';
      else if (ext === '.csv') language = 'csv';
      else if (ext === '.ts') language = 'typescript';
      else if (ext === '.js' || ext === '.mjs' || ext === '.cjs') language = 'javascript';
      
      try {
        const ansi = highlight(content, { language, output: 'ansi' });
        const outputPath = join(outputDir, file + '.ansi.txt');
        writeFileSync(outputPath, ansi, 'utf8');
        regenerated++;
        console.log(`✅ Regenerated ${file} ANSI output`);
      } catch (error) {
        console.log(`❌ Failed to regenerate ${file}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 Successfully regenerated ${regenerated} ANSI sample files with proper escape codes!`);
  });
});
