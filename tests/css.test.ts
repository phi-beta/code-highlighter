import { describe, test, expect, beforeAll } from 'vitest';
import { highlight, exportTokensAsJson } from '../src/index.js';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';

describe('CSS Highlighting', () => {
  beforeAll(async () => {
    await registerGeneratedAntlrLanguages();
  });

  test('should highlight CSS basic syntax', async () => {
    const cssCode = `/* CSS comment */
.container {
  background-color: #3b82f6;
  margin: 1rem auto;
  padding: 0.5rem;
}

#header {
  font-size: 2rem;
  color: rgb(255, 255, 255);
}

@media (max-width: 768px) {
  .container {
    margin: 0;
  }
}`;

    const result = await highlight(cssCode, { language: 'css', html: true });
    
    // Check for basic CSS token highlighting
    expect(result).toContain('comment'); // Comments
    expect(result).toContain('selector'); // .container, #header
    expect(result).toContain('property'); // background-color, margin, etc.
    expect(result).toContain('color'); // #3b82f6, rgb values
    expect(result).toContain('number'); // 1rem, 0.5rem, 2rem
    expect(result).toContain('at-rule'); // @media
    expect(result).toContain('function'); // rgb function
  });

  test('should highlight CSS selectors correctly', async () => {
    const cssCode = `.class-name { color: red; }
#id-name { color: blue; }
element { color: green; }
:hover { color: yellow; }
::before { content: ""; }`;

    const result = await highlight(cssCode, { language: 'css', html: true });
    
    expect(result).toContain('selector'); // Should highlight selectors
    expect(result).toContain('property'); // Should highlight properties
    expect(result).toContain('color'); // Should highlight color names
  });

  test('should highlight CSS functions and units', async () => {
    const cssCode = `div {
  transform: translate(50px, 100px);
  background: linear-gradient(45deg, red, blue);
  width: calc(100% - 20px);
  font-size: 1.5rem;
  margin: 10px 5% 2em;
}`;

    const result = await highlight(cssCode, { language: 'css', html: true });
    
    expect(result).toContain('function'); // translate, linear-gradient, calc
    expect(result).toContain('number'); // Numbers with units
    expect(result).toContain('color'); // red, blue
  });

  test('should highlight CSS at-rules', async () => {
    const cssCode = `@import url('styles.css');
@media screen and (min-width: 768px) {
  body { font-size: 16px; }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`;

    const result = await highlight(cssCode, { language: 'css', html: true });
    
    expect(result).toContain('at-rule'); // @import, @media, @keyframes
    expect(result).toContain('string'); // URL string
    expect(result).toContain('identifier'); // from, to (mapped as identifiers in keyframes)
  });

  test('should handle CSS colors and variables', async () => {
    const cssCode = `:root {
  --primary: #3b82f6;
  --secondary: hsl(210, 100%, 50%);
  --bg: rgba(255, 255, 255, 0.9);
}

.element {
  color: var(--primary);
  background: var(--bg);
  border: 1px solid transparent;
}`;

    const result = await highlight(cssCode, { language: 'css', html: true });
    
    expect(result).toContain('color'); // Hex colors and named colors
    expect(result).toContain('function'); // hsl, rgba, var functions
    expect(result).toContain('selector'); // :root, .element
    expect(result).toContain('property'); // CSS properties
  });

  test('should export CSS token analysis as JSON', async () => {
    const cssCode = `/* Simple CSS */
.test { color: #ff0000; }`;

    const result = exportTokensAsJson(cssCode, 'css');
    
    const parsed = JSON.parse(result);
    expect(parsed).toHaveProperty('metadata');
    expect(parsed).toHaveProperty('tokens');
    expect(parsed).toHaveProperty('statistics');
    expect(parsed.metadata.language).toBe('css');
    expect(parsed.tokens.length).toBeGreaterThan(0);
    
    // Should have various CSS token types
    const tokenTypes = parsed.tokens.map((t: any) => t.type);
    expect(tokenTypes).toContain('comment');
    expect(tokenTypes).toContain('selector');
    expect(tokenTypes).toContain('property');
    expect(tokenTypes).toContain('color');
  });
});
