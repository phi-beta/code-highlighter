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
npm run generate:antlr -- --jar /path/to/antlr.jar
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

## Roadmap
- More grammars via community ANTLR contributions
- Potential TextMate grammar adapter
- Streaming API
- Theme packs (dark/light) & preset exports
- Performance benchmarks

## ANTLR Workflow
Mini lexer grammars included (simplified): JavaScriptMini, PythonMini, JsonMini, BashMini, MarkdownMini.

Generate real TypeScript lexers with antlr4ts:
1. Ensure Java is installed and download `antlr-4.13.1-complete.jar` (or set `ANTLR_JAR` env var).
2. Run generation:
```bash
npm run generate:antlr -- --jar /path/to/antlr-4.13.1-complete.jar
```
3. Import and register a lexer (or use auto-registration utility):
```ts
import { registerAntlrLanguage } from 'code-highlighter/adapters/antlr';
import { JavaScriptMiniLexer } from './generated/antlr/JavaScriptMiniLexer';
import { CharStreams } from 'antlr4ts';
registerAntlrLanguage({
	name: 'javascript',
	createLexer: (code) => new JavaScriptMiniLexer(CharStreams.fromString(code)),
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
This scans `dist/generated/antlr/*Lexer.js` and applies heuristic token mapping.
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

### Ad‑hoc tokenizers
For quick experiments you can still manually register a simple tokenizer instead of a grammar.

## License
MIT
