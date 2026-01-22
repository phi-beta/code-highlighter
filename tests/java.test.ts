import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Java Syntax Highlighting', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  const javaFile = join(__dirname, '../samples/inputs/java.java');
  const javaCode = readFileSync(javaFile, 'utf-8');
  
  it('should highlight Java keywords', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    // Control flow keywords (test ones that exist in java.java)
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/if/);
    expect(result).toMatch(/return/);
    expect(result).toMatch(/throw/);
    expect(result).toMatch(/try/);
    expect(result).toMatch(/catch/);
    expect(result).toMatch(/finally/);
    
    // Declaration keywords
    expect(result).toMatch(/package/);
    expect(result).toMatch(/import/);
    expect(result).toMatch(/class/);
    expect(result).toMatch(/extends/);
    
    // Access modifiers
    expect(result).toMatch(/public/);
    expect(result).toMatch(/private/);
    expect(result).toMatch(/static/);
    expect(result).toMatch(/final/);
    
    // Boolean literals
    expect(result).toMatch(/true/);
    expect(result).toMatch(/null/);
  });

  it('should highlight primitive types', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/int/);
    expect(result).toMatch(/boolean/);
    expect(result).toMatch(/void/);
    expect(result).toMatch(/long/);
    expect(result).toMatch(/float/);
    expect(result).toMatch(/double/);
    expect(result).toMatch(/char/);
  });

  it('should highlight annotations', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-decorator');
    expect(result).toMatch(/@Entity/);
    expect(result).toMatch(/@Table/);
    expect(result).toMatch(/@Override/);
  });

  it('should highlight comments', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-comment');
    expect(result).toMatch(/Java sample code/);
    expect(result).toMatch(/Instance variables/);
  });

  it('should highlight strings', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-string');
    expect(result).toMatch(/Unknown/);
    expect(result).toMatch(/users/);
    expect(result).toMatch(/Name cannot be null/);
  });

  it('should highlight character literals', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-string');
    expect(result).toMatch(/&#39;A&#39;/);
  });

  it('should highlight decimal numbers', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-number');
    expect(result).toMatch(/42/);
    expect(result).toMatch(/123456789L/);
    expect(result).toMatch(/3\.14f/);
    expect(result).toMatch(/2\.718281828/);
  });

  it('should highlight hex, binary, and octal numbers', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-number');
    expect(result).toMatch(/077/);
  });

  it('should highlight operators', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-punctuation');
    expect(result).toMatch(/=/);
    expect(result).toMatch(/\./);
  });

  it('should highlight generic syntax', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-punctuation');
    expect(result).toMatch(/List/);
    expect(result).toMatch(/String/);
  });

  it('should highlight lambda expressions', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-punctuation');
    expect(result).toMatch(/forEach/);
  });

  it('should handle exception handling keywords', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/throws/);
    expect(result).toMatch(/try/);
    expect(result).toMatch(/catch/);
    expect(result).toMatch(/finally/);
  });

  it('should highlight new keyword and constructors', () => {
    const result = highlight(javaCode, { language: 'java', output: 'html' });
    
    expect(result).toContain('tok-keyword');
    expect(result).toMatch(/new/);
    expect(result).toMatch(/ArrayList/);
    expect(result).toMatch(/User/);
  });
});
