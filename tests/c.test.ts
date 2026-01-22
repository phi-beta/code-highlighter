import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('C Syntax Highlighting', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  const cFile = join(__dirname, '../samples/inputs/c.c');
  const cCode = readFileSync(cFile, 'utf-8');

  it('should highlight C control flow keywords', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/if/);
    expect(result).toMatch(/else/);
    expect(result).toMatch(/for/);
    expect(result).toMatch(/while/);
    expect(result).toMatch(/do/);
    expect(result).toMatch(/switch/);
    expect(result).toMatch(/case/);
    expect(result).toMatch(/return/);
    expect(result).toMatch(/break/);
  });

  it('should highlight C type keywords', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-type');
    expect(result).toMatch(/int/);
    expect(result).toMatch(/void/);
    expect(result).toMatch(/char/);
    expect(result).toMatch(/float/);
    expect(result).toMatch(/double/);
    expect(result).toMatch(/struct/);
    expect(result).toMatch(/enum/);
    expect(result).toMatch(/typedef/);
  });

  it('should highlight C modifiers', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/static/);
    expect(result).toMatch(/const/);
    expect(result).toMatch(/unsigned/);
  });

  it('should highlight preprocessor directives', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-preprocessor');
    expect(result).toMatch(/#include/);
    expect(result).toMatch(/#define/);
  });

  it('should highlight C comments', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-comment');
    expect(result).toMatch(/C sample code/);
    expect(result).toMatch(/Forward declarations/);
  });

  it('should highlight strings', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-string');
    expect(result).toMatch(/Hello, World!/);
    expect(result).toMatch(/stdio\.h/);
  });

  it('should highlight character literals', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-string');
  });

  it('should highlight decimal numbers', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-number');
    expect(result).toMatch(/10/);
    expect(result).toMatch(/42/);
    expect(result).toMatch(/100/);
  });

  it('should highlight hex numbers', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-number');
    expect(result).toMatch(/0xFFFFFFFF/);
  });

  it('should highlight float numbers', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-number');
    expect(result).toMatch(/3\.14/);
  });

  it('should highlight operators', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-operator');
    expect(result).toMatch(/-&gt;/);  // -> becomes -&gt; in HTML
  });

  it('should highlight pointers and addresses', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-operator');
    expect(result).toMatch(/\*/);  // Pointer asterisk
    expect(result).toMatch(/&amp;/);  // Address-of operator
  });

  it('should highlight sizeof operator', () => {
    const result = highlight(cCode, { language: 'c', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/sizeof/);
  });
});
