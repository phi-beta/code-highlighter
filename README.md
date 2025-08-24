# code-highlighter

Lightweight TypeScript syntax highlighting library + CLI.

## Features
- Pluggable language registry (populate via generated ANTLR lexers)
- Simple language registry `registerLanguage()` (for ad‑hoc / experimental use)
- ANSI terminal highlighting
- HTML inline span output
- Pluggable output handlers (ansi, html) with extensibility
- Theme JSON file loading & programmatic theming
- ESM build + type declarations
- Vitest unit tests
- CLI `code-highlight` with language + theme selection
- Rainbow bracket/brace/paren depth coloring (enabled by default, configurable)

## Install
```
npm install code-highlighter
```

## Usage (Library)
```ts
import { highlight, registerLanguage } from 'code-highlighter';
// After generating & registering ANTLR lexers (see ANTLR Workflow) you can highlight:
const jsAnsi = highlight('const x = 42;', { language: 'javascript' });

// Ad-hoc demo language (manual registration)
registerLanguage('dum', code => [{ type: 'keyword', value: code }]);
const custom = highlight('HELLO', { language: 'dum', output: 'html' });
```

## Usage (CLI)
Before using the CLI you must have generated (and thus auto-registrable) lexers.

```
npm run setup:antlr            # downloads jar to vendor/antlr
npm run generate:antlr         # generates lexers (auto-detects jar)
code-highlight --list-languages                 # Show available languages
code-highlight --lang javascript file.js        # ANSI (javascript)
code-highlight --output html file.js            # HTML block
code-highlight --output html --full file.js     # Full HTML document
code-highlight --output html --no-block file.js # Inline spans only
code-highlight --theme my-theme.json file.js    # Custom theme
code-highlight --handler-config html.json file.js # Provide handler config JSON
```

## Theming
```ts
import { highlight } from 'code-highlighter';
const custom = highlight(source, { theme: { keyword: { color: '#ff00aa', fontStyle: 'bold' } } });
```

Theme JSON file example (pass with `--theme theme.json`):
```json
{
	"keyword": { "color": "#ff00aa", "fontStyle": "bold" },
	"string": { "color": "#00aa55" }
}
```

### Rainbow Brackets
By default bracket/brace/parenthesis tokens are re-labeled with depth token types like `bracket-depth-0`, `bracket-depth-1`, cycling colors. Unmatched closers use `bracket-unmatched`.

Disable or customize palettes:
```ts
highlight(code, { bracketNesting: false });
highlight(code, { bracketPaletteHtml: ['#ff5555', '#50fa7b'], bracketPaletteAnsi: ['\u001b[91m','\u001b[92m'] });
highlight(code, { theme: { 'bracket-depth-0': { color: '#ff6b6b' }, 'bracket-unmatched': { color: '#ff0000', fontStyle: 'bold' } } });
```

## Roadmap
- More grammars via community ANTLR contributions
- Potential TextMate grammar adapter
- Streaming API
- Theme packs (dark/light) & preset exports
- Performance benchmarks

## ANTLR Workflow
Mini lexer grammars included (simplified): JavaScriptMini, PythonMini, JsonMini, BashMini, MarkdownMini.

Generate real TypeScript lexers with the antlr4ts CLI (no Java jar step required):
```bash
npm run generate:antlr
```
This outputs TypeScript lexers under `src/generated/antlr/src/grammars/antlr`. Auto-registration handles the nested path.

Import and register a lexer manually (optional) or rely on auto-registration:
```ts
import { registerAntlrLanguage } from 'code-highlighter/adapters/antlr';
import { JavaScriptMini } from './generated/antlr/src/grammars/antlr/JavaScriptMini';
import { CharStreams } from 'antlr4ts';
registerAntlrLanguage({
	name: 'javascript',
	createLexer: (code) => new JavaScriptMini(CharStreams.fromString(code)),
	tokenMap: { KEYWORD: 'keyword', STRING_DOUBLE: 'string', STRING_SINGLE: 'string', TEMPLATE: 'string', NUMBER: 'number', COMMENT_LINE: 'comment', COMMENT_BLOCK: 'comment', WS: 'whitespace', PUNCT: 'punctuation', IDENTIFIER: 'identifier' }
});
```
4. Highlight normally with `language: 'javascript'`.

Legacy inline regex tokenizers & JSON grammar loader have been removed to focus on a single high‑fidelity path (ANTLR).

### Auto-registration Utility
If you generate multiple lexers you can auto-register all of them:
```ts
import { registerGeneratedAntlrLanguages } from 'code-highlighter/register-antlr';
await registerGeneratedAntlrLanguages({ verbose: true });
```
This scans the generated output directory (including nested antlr4ts layout) and applies heuristic token mapping.
## Output Handlers
Two built-in handlers are registered by default: `ansi` and `html`.

Register a custom handler:
```ts
import { registerOutputHandler, highlight } from 'code-highlighter';
registerOutputHandler({
	id: 'markdown',
	defaultConfig: { fenced: true },
	render(tokens, theme, { language, config }) {
		const body = tokens.map(t => t.value).join('');
		return config.fenced ? `\n\n\
\`\`\`${language}\n${body}\n\`\`\`\n` : body;
	}
});
const md = highlight('const x=1;', { output: 'markdown', language: 'javascript', handlerConfig: { fenced: false } });
```
You can integrate ANTLR grammars (using `antlr4ts`) for precise lexing/parsing.

## JSON Export & Token Analysis

The library provides comprehensive JSON export functionality for token analysis, debugging, and integration with other tools.

### Basic JSON Export
```ts
import { exportTokensAsJson } from 'code-highlighter';

const code = 'const greeting = "Hello, World!";';
const jsonOutput = exportTokensAsJson(code, 'javascript');
console.log(jsonOutput); // Pretty-printed JSON string

// For compact output
const compactJson = exportTokensAsJson(code, 'javascript', { compact: true });
```

### Programmatic Token Analysis
```ts
import { exportTokens } from 'code-highlighter';

const analysis = exportTokens(code, 'javascript');
// Returns TokenAnalysis object with metadata, tokens, and statistics
```

### CLI JSON Export
```bash
# Export to JSON file
code-highlight --lang javascript --export-json input.js > analysis.json

# Compact JSON output
code-highlight --lang javascript --export-json --compact input.js

# Combine with highlighting
code-highlight --lang javascript --export-json --html input.js > output.html
```

### JSON Schema & TypeScript Types

The JSON export format follows a well-defined schema:

- **Schema**: `schemas/token-analysis.json` - JSON Schema for validation
- **Types**: `src/types/token-analysis.d.ts` - TypeScript type definitions

### JSON Output Structure

```ts
interface TokenAnalysis {
  metadata: {
    language: string;           // e.g., "javascript"
    timestamp: string;          // ISO 8601 timestamp
    version: string;            // Library version
    inputSize: number;          // Character count
    outputFormat?: string;      // "html" | "ansi"
    theme?: string;             // Theme name/path
  };
  tokens: Array<{
    type: string;               // Token type (e.g., "keyword", "string")
    value: string;              // Actual token text
    position: {
      start: number;            // Start character index (0-based)
      end: number;              // End character index (0-based)
      line: number;             // Line number (1-based)
      column: number;           // Column number (1-based)
    };
  }>;
  statistics: {
    totalTokens: number;        // Total token count
    tokenTypes: Record<string, number>; // Count by token type
    coverage: {
      charactersAnalyzed: number;
      percentage: number;       // Coverage percentage
    };
    lineCount?: number;         // Total lines
    averageTokensPerLine?: number;
  };
}
```

### Use Cases

- **Debugging**: Analyze tokenization accuracy and coverage
- **Integration**: Feed token data to other syntax highlighting systems
- **Analysis**: Study code structure and token distribution
- **Testing**: Validate grammar rules and token mappings
- **Tooling**: Build custom syntax analysis tools

### Ad‑hoc tokenizers
For quick experiments you can still manually register a simple tokenizer instead of a grammar.

## Sample Inputs & Generated Outputs
Sample source files live in `samples/inputs` (one per supported grammar). After generating and registering lexers you can produce HTML + ANSI outputs:

```
npm run generate:samples
```

Outputs are written to `samples/outputs` (gitignored) with extensions `.ansi.txt` and `.html`.

## License
MIT
