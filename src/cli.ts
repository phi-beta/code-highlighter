#!/usr/bin/env node
/**
 * CLI entry point for code-highlighter.
 * Supports:
 *  - ANSI or HTML output
 *  - Language selection & listing
 *  - Theme JSON loading
 *  - Block (<pre><code>) or inline HTML; full HTML document generation
 */
import { readFileSync } from 'fs';
import { highlight, listLanguages, exportTokensAsJson } from './index.js';

async function autoRegister() {
  try { await (await import('./register-antlr.js')).attemptAutoRegisterGeneratedAntlrLanguages?.({ verbose: false }); } catch { /* ignore */ }
}

function parseArgs(argv: string[]) {
  const opts: { file?: string; html?: boolean; lang?: string; themePath?: string; list?: boolean; noBlock?: boolean; full?: boolean; title?: string; output?: string; handlerConfigPath?: string; generateSamples?: boolean; exportJson?: boolean; compact?: boolean } = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--html') opts.html = true;
    else if (a === '--list-languages') opts.list = true;
    else if (a === '--lang') opts.lang = argv[++i];
    else if (a === '--theme') opts.themePath = argv[++i];
    else if (a === '--no-block') opts.noBlock = true;
    else if (a === '--full') opts.full = true;
    else if (a === '--title') opts.title = argv[++i];
    else if (a === '--output') opts.output = argv[++i];
    else if (a === '--handler-config') opts.handlerConfigPath = argv[++i];
    else if (a === '--generate-samples') opts.generateSamples = true;
    else if (a === '--export-json') opts.exportJson = true;
    else if (a === '--compact') opts.compact = true;
    else if (!opts.file) opts.file = a;
  }
  return opts;
}

async function main() {
  const args = parseArgs(process.argv);
  await autoRegister();
  if (args.generateSamples) {
    try {
      const mod = await import('../samples/generate-samples.js');
      if (typeof (mod as any).generateAll === 'function') {
        await (mod as any).generateAll();
      } else if (typeof (mod as any).default === 'function') {
        await (mod as any).default();
      } else if (typeof (mod as any).main === 'function') {
        await (mod as any).main();
      }
    } catch (e) {
      console.error('Failed to generate samples:', e);
      process.exit(1);
    }
    return;
  }
  if (args.list) {
    const langs = listLanguages();
    if (!langs.length) {
      console.error('No languages registered. Generate lexers (npm run generate:antlr) then rerun, or manually register a tokenizer.');
      process.exit(2);
    }
    console.log(langs.join('\n'));
    return;
  }
  if (!args.file) {
    console.error('Usage: code-highlight [--output ansi|html] [--html] [--lang <name>] [--theme theme.json] [--handler-config cfg.json] [--no-block] [--full] [--title Title] [--export-json] [--compact] [--list-languages] <file>');
    process.exit(1);
  }
  const code = readFileSync(args.file, 'utf8');
  
  // Handle JSON export
  if (args.exportJson) {
    const jsonOutput = exportTokensAsJson(code, args.lang || 'javascript', !args.compact);
    process.stdout.write(jsonOutput + '\n');
    return;
  }
  
  let theme;
  if (args.themePath) {
    try { theme = JSON.parse(readFileSync(args.themePath, 'utf8')); } catch { console.error('Invalid theme file'); }
  }
  let handlerConfig;
  if (args.handlerConfigPath) {
    try { handlerConfig = JSON.parse(readFileSync(args.handlerConfigPath, 'utf8')); } catch { console.error('Invalid handler config file'); }
  }
  const out = highlight(code, { output: args.output, html: args.html, language: args.lang, theme, block: !args.noBlock, fullDocument: args.full, title: args.title, handlerConfig });
  process.stdout.write(out + (args.html ? '' : '\n'));
}

main().catch(e => { console.error(e); process.exit(1); });
