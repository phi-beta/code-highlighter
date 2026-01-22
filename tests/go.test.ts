import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Go Highlighting', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  it('should highlight Go keywords', () => {
    const code = 'func main() { var x int = 42 }';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('func');
    expect(result).toContain('var');
  });

  it('should highlight Go types', () => {
    const code = 'var x int32 = 42; var y float64 = 3.14; var z bool = true;';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-type');
    expect(result).toContain('int32');
    expect(result).toContain('float64');
    expect(result).toContain('bool');
  });

  it('should highlight Go operators', () => {
    const code = 'x := 5; y <- ch; z := a...';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-operator');
  });

  it('should highlight Go strings', () => {
    const code = 's := "hello"; r := `raw string`;';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-string');
  });

  it('should highlight Go numbers', () => {
    const code = 'hex := 0xFF; bin := 0b1010; oct := 0o777; float := 3.14;';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-number');
    expect(result).toContain('0xFF');
    expect(result).toContain('0b1010');
    expect(result).toContain('0o777');
  });

  it('should highlight Go built-in functions', () => {
    const code = 'x := make([]int, 5); y := len(x); append(x, 1);';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-function');
    expect(result).toContain('make');
    expect(result).toContain('len');
    expect(result).toContain('append');
  });

  it('should highlight Go comments', () => {
    const code = '// Line comment\n/* Block comment */';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-comment');
  });

  it('should highlight goroutine and defer keywords', () => {
    const code = 'go doWork(); defer cleanup();';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('go');
    expect(result).toContain('defer');
  });

  it('should highlight struct and interface keywords', () => {
    const code = 'type User struct { Name string }; type Reader interface { Read() }';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('struct');
    expect(result).toContain('interface');
  });

  it('should highlight channel operations', () => {
    const code = 'ch := make(chan int); ch <- 5; x := <-ch;';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('chan');
    expect(result).toContain('tok-operator');
  });

  it('should highlight imaginary numbers', () => {
    const code = 'c := 1 + 2i; d := 3.14i;';
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-number');
    expect(result).toContain('2i');
    expect(result).toContain('3.14i');
  });

  it('should highlight rune literals', () => {
    const code = "ch := 'A'; newline := '\\n';";
    const result = highlight(code, { language: 'go', output: 'html' });
    expect(result).toContain('tok-string');
  });
});
