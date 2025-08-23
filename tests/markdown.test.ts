import { describe, it, expect } from 'vitest';
import { highlight } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('markdown highlighting', () => {
  it('classifies basic constructs', async () => {
  await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = '# Title\n\nThis is *em* **strong** with `code` and a [link](url).';
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-heading/);
    expect(html).toMatch(/tok-emphasis/);
    expect(html).toMatch(/tok-strong/);
    expect(html).toMatch(/tok-code-inline/);
    expect(html).toMatch(/tok-link/);
  });
  it('classifies structural & extended constructs', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      '# H1',
      '',
      '---', // hr
      '',
      '> quote line',
      '',
      '- bullet item',
      '1. enum item',
      '',
      '~~strike~~',
      '![alt](img.png)',
      '',
      '```javascript',
      'function demo() { return 1; }',
      '```'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-heading/);
    expect(html).toMatch(/tok-rule/);
    expect(html).toMatch(/tok-blockquote/);
    expect(html).toMatch(/tok-list-bullet/);
    expect(html).toMatch(/tok-list-enum/);
    expect(html).toMatch(/tok-strike/);
    expect(html).toMatch(/tok-image/);
    // Fenced code start & nested javascript keywords
    expect(html).toMatch(/tok-code-fence-start/);
    // Nested javascript highlighting (keyword span)
    expect(/tok-keyword/.test(html)).toBe(true);
  });
});
