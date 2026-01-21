#!/bin/bash
# Quick CLI wrapper for code-highlighter
# Usage: ./highlight.sh [file] [language]

FILE="${1:-samples/inputs/mermaid.mmd}"
LANG="${2:-mermaid}"

echo "════════════════════════════════════════════════════"
echo "  Highlighting: $FILE"
echo "  Language: $LANG"
echo "════════════════════════════════════════════════════"
echo ""

# Note: The CLI auto-registration has path issues, so we use the programmatic API
node -e "
import { readFileSync } from 'fs';
import { registerLanguage } from './dist/src/index.js';

// Manually register languages from the generated files
import { BashMini } from './src/generated/antlr/BashMini.js';
import { CSSMini } from './src/generated/antlr/CSSMini.js';
import { MermaidMini } from './src/generated/antlr/MermaidMini.js';
import { PlantUMLMini } from './src/generated/antlr/PlantUMLMini.js';
import { CharStreams } from 'antlr4ts';

// Register a few key languages
registerLanguage('mermaid', (code) => {
  const lexer = new MermaidMini(CharStreams.fromString(code));
  const tokens = [];
  let token;
  while ((token = lexer.nextToken()) && token.type >= 0) {
    tokens.push({ type: lexer.vocabulary.getSymbolicName(token.type) || 'UNKNOWN', value: token.text || '' });
  }
  return tokens;
});

const { highlight } = await import('./dist/src/index.js');
const code = readFileSync('$FILE', 'utf8');
const output = highlight(code, { language: '$LANG' });
console.log(output);
" 2>&1 || echo "Error: Make sure to run 'npm run build' first"
