#!/usr/bin/env node
/**
 * Interactive CLI demo for code-highlighter
 * This wrapper demonstrates all available features
 */

console.log(`
╔══════════════════════════════════════════════════════════════════╗
║          Code Highlighter - Interactive CLI Tool                ║
╚══════════════════════════════════════════════════════════════════╝

Yes! The code-highlighter has a comprehensive CLI tool called:
    
    📦 code-highlight

AVAILABLE COMMANDS:
═══════════════════════════════════════════════════════════════════

1. List all supported languages:
   $ node dist/src/cli.js --list-languages
   $ npm run code-highlight -- --list-languages

2. Highlight a file (ANSI terminal output - default):
   $ node dist/src/cli.js --lang javascript examples/example.js
   $ node dist/src/cli.js --lang mermaid samples/inputs/mermaid.mmd

3. Generate HTML output:
   $ node dist/src/cli.js --output html --lang python test.py
   $ node dist/src/cli.js --html --lang plantuml samples/inputs/plantuml.puml

4. Generate full HTML document:
   $ node dist/src/cli.js --output html --full --lang mermaid samples/inputs/mermaid.mmd > output.html

5. Use custom theme:
   $ node dist/src/cli.js --theme my-theme.json --lang javascript file.js

6. Export tokens as JSON (for analysis/debugging):
   $ node dist/src/cli.js --export-json --lang typescript src/index.ts
   $ node dist/src/cli.js --export-json --compact --lang python test.py

7. Generate inline HTML (without <pre><code> wrapper):
   $ node dist/src/cli.js --output html --no-block --lang css styles.css


SUPPORTED LANGUAGES (14):
═══════════════════════════════════════════════════════════════════
  • bash         - Shell scripts
  • css          - Cascading Style Sheets (with color visualization!)
  • csv          - Comma-separated values  
  • html         - HTML with embedded CSS/JS delegation
  • javascript   - Modern JavaScript (ES6+)
  • json         - JSON data format
  • markdown     - CommonMark with tables, tasks, footnotes
  • mermaid      - Diagram-as-code (flowcharts, sequence, class, etc.) ✨NEW✨
  • plantuml     - UML diagrams (sequence, class, component, etc.) ✨NEW✨
  • python       - Python 3.x with decorators, f-strings
  • sql          - SQL queries (DDL, DML)
  • typescript   - TypeScript with type annotations
  • xml          - XML documents
  • yaml         - YAML configuration files


QUICK EXAMPLES:
═══════════════════════════════════════════════════════════════════

Try highlighting the new Mermaid diagram:
$ node dist/src/cli.js --lang mermaid samples/inputs/mermaid.mmd

Or generate a full HTML page for a PlantUML diagram:
$ node dist/src/cli.js --output html --full --title "My Diagram" \\
    --lang plantuml samples/inputs/plantuml.puml > diagram.html


PROGRAMMATIC API:
═══════════════════════════════════════════════════════════════════

import { highlight, listLanguages } from 'code-highlighter';

// Highlight code
const html = highlight(code, { 
  language: 'mermaid', 
  output: 'html',
  fullDocument: true 
});

// List available languages
const langs = listLanguages(); // ['bash', 'css', 'mermaid', ...]


FEATURES:
═══════════════════════════════════════════════════════════════════
  ✓ ANSI terminal colors
  ✓ HTML with inline CSS
  ✓ Rainbow bracket matching
  ✓ Custom themes (JSON)
  ✓ Color visualization (hex colors shown in their actual color!)
  ✓ JSON token export for analysis
  ✓ Multi-pass tokenization (HTML delegates to CSS/JS)


For more information, see README.md
`);
