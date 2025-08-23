# code-highlighter

Lightweight TypeScript syntax highlighting library + CLI.

## Features
- Pluggable multi-language tokenizers (built-in: JavaScript, Python)
- Simple language registry `registerLanguage()`
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
// highlight JS
const ansi = highlight('const x = 42;');
// highlight Python as HTML
const pyHtml = highlight('def foo():\n    return 1', { html: true, language: 'python' });

// Add a custom language (trivial example)
registerLanguage('dum', code => [{ type: 'keyword', value: code }]);
const custom = highlight('HELLO', { language: 'dum' });
```

## Usage (CLI)
```
code-highlight file.js                         # ANSI (auto js)
code-highlight --html file.js                  # HTML (legacy flag)
code-highlight --output html file.js           # HTML via handler
code-highlight --output html --full file.js    # Full HTML document
code-highlight --output html --no-block file.js# Inline spans only
code-highlight --lang python script.py         # Python
code-highlight --theme my-theme.json file.js   # Custom theme
code-highlight --handler-config html.json file.js # Provide handler config JSON
code-highlight --list-languages                # List registered languages
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
- More languages via community grammar contributions
- Config-driven grammar (e.g., TextMate scope mapping)
- Streaming API
- Theme packs & preset exports (e.g., dark/light)
- Performance benchmarks

## ANTLR (Experimental)
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

1. Add a `.g4` grammar in `grammars/`.
2. Generate TypeScript sources:
	```
	java -jar antlr-4.13.1-complete.jar -Dlanguage=TypeScript -o src/grammars grammars/Example.g4
	```
3. Register the produced lexer:
	```ts
	import { registerAntlrLanguage } from 'code-highlighter/adapters/antlr';
	import { ExampleLexer } from './grammars/ExampleLexer';
	registerAntlrLanguage({
	  name: 'example',
	  createLexer: (code) => new ExampleLexer(CharStreams.fromString(code)),
	  tokenMap: { KW_RETURN: 'keyword', INT: 'number', STRING: 'string', COMMENT: 'comment' }
	});
	```
4. Highlight with `language: 'example'`.

If ANTLR proves too heavy, a TextMate or custom JSON grammar loader can be substituted later.

## License
MIT
