/**
 * Unit tests for core highlighting functionality.
 * Validates tokenization, ANSI/HTML output, multi-language (Python), and theme overrides.
 */
import { describe, it, expect } from 'vitest';
import { highlight, tokenizeJavaScript } from '../src/index.js';

describe('tokenizeJavaScript', () => {
  it('basic tokens', () => {
    const tokens = tokenizeJavaScript('const x = 42;');
    expect(tokens.map(t => t.type)).toContain('keyword');
    expect(tokens.find(t => t.value === '42')?.type).toBe('number');
  });
});

describe('highlight', () => {
  it('ansi output', () => {
    const out = highlight('const x = 42;');
    expect(out).toMatch(/\u001b\[/);
  });
  it('html output', () => {
    const out = highlight('const x = 42;', { html: true });
    expect(out).toMatch(/<span/);
  });
  it('explicit html output handler', () => {
    const out = highlight('const x = 42;', { output: 'html' });
    expect(out).toMatch(/<pre/);
  });
  it('python language selection', () => {
    const out = highlight('def foo():\n    return 1', { language: 'python', html: true });
    expect(out).toMatch(/tok-keyword/);
  });
  it('custom theme override', () => {
    const out = highlight('const x = 42;', { html: true, theme: { keyword: { color: '#ff00aa' } } });
    expect(out).toMatch(/ff00aa/);
  });
});
