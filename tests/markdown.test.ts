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

  it('classifies setext headers', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      'Level 1 Header',
      '==============',
      '',
      'Level 2 Header',
      '--------------'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-heading-setext/);
  });

  it('classifies task lists', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      '- [x] Completed task',
      '- [ ] Incomplete task',
      '- [X] Another completed task'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-task-list/);
  });

  it('classifies tables', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      '| Column 1 | Column 2 |',
      '|----------|----------|',
      '| Data     | More     |'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-table/);
  });

  it('classifies reference links', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      'This is a [reference link][ref1].',
      '',
      '[ref1]: https://example.com "Title"'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-link-reference/);
    expect(html).toMatch(/tok-link-definition/);
  });

  it('classifies autolinks and emails', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = 'Visit <https://example.com> or email <user@example.com>.';
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-autolink/);
  });

  it('classifies footnotes', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      'Text with footnote[^1].',
      '',
      '[^1]: This is a footnote.'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-footnote/);
  });

  it('classifies indented code blocks', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = [
      'Normal text',
      '',
      '    // This is code',
      '    function test() {'
    ].join('\n');
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-code-block/);
  });

  it('classifies hard line breaks', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    const sample = 'Line one  \nLine two';
    const html = highlight(sample, { language: 'markdown', output: 'html' });
    expect(html).toMatch(/tok-line-break/);
  });
});
