import { describe, it, expect, beforeAll } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('Rust Highlighting', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
  });

  it('should highlight Rust keywords', () => {
    const code = 'fn main() { let mut x = 5; }';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('fn');
    expect(result).toContain('let');
    expect(result).toContain('mut');
  });

  it('should highlight Rust types', () => {
    const code = 'let x: i32 = 42; let y: f64 = 3.14; let z: bool = true;';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-type');
    expect(result).toContain('i32');
    expect(result).toContain('f64');
    expect(result).toContain('bool');
  });

  it('should highlight Rust lifetimes', () => {
    const code = "struct Foo<'a> { x: &'a str }";
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-type');
    // Check for HTML-encoded lifetime
    expect(result).toContain("&#39;a");
  });

  it('should highlight Rust operators', () => {
    const code = 'let result = x => y; use std::io::Result;';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-operator');
  });

  it('should highlight Rust strings', () => {
    const code = 'let s = "hello"; let r = r"raw string";';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-string');
  });

  it('should highlight Rust numbers', () => {
    const code = 'let hex = 0xFF; let bin = 0b1010; let oct = 0o777; let float = 3.14;';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-number');
    expect(result).toContain('0xFF');
    expect(result).toContain('0b1010');
    expect(result).toContain('0o777');
  });

  it('should highlight Rust attributes', () => {
    const code = '#[derive(Debug)] struct Foo {}';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-decorator');
  });

  it('should highlight Rust macros', () => {
    const code = 'println!("Hello"); vec![1, 2, 3];';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-function');
    expect(result).toContain('println!');
    expect(result).toContain('vec!');
  });

  it('should highlight Rust comments', () => {
    const code = '// Line comment\n/* Block comment */ /// Doc comment';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-comment');
  });

  it('should highlight async/await keywords', () => {
    const code = 'async fn fetch() -> Result<String, Error> { Ok("data".to_string()) }';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('async');
    expect(result).toContain('fn');
  });

  it('should highlight pattern matching', () => {
    const code = 'match x { Some(v) => v, None => 0 }';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('tok-keyword');
    expect(result).toContain('match');
  });

  it('should highlight ownership keywords', () => {
    const code = 'let mut x = 5; let y = &mut x; unsafe { *y = 10; }';
    const result = highlight(code, { language: 'rust', output: 'html' });
    expect(result).toContain('mut');
    expect(result).toContain('unsafe');
  });
});
