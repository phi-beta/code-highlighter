import { describe, it, expect } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('json key classification', () => {
  it('classifies object keys as property distinct from value strings', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const src = '{ "a": 1, "b": "text" }';
    const html = highlight(src, { language: 'json', output: 'html' });
    expect(html).toMatch(/tok-property/);
    // Ensure value string still a string token
    expect(html).toMatch(/tok-string/);
  });
});