#!/usr/bin/env node
/**
 * Standalone CLI entry point for code-highlighter (CommonJS version for pkg)
 * Supports:
 *  - ANSI or HTML output
 *  - Language selection & listing
 *  - Theme JSON loading
 *  - Block (<pre><code>) or inline HTML; full HTML document generation
 */
const { readFileSync } = require('fs');
const path = require('path');

// Re-export the main functionality with CommonJS compatibility
let highlightModule;
let registerModule;

async function loadModules() {
  try {
    // Try different path approaches for pkg
    const possiblePaths = [
      path.join(__dirname, '../dist/src/index.js'),
      path.join(__dirname, 'dist/src/index.js'),
      path.join(process.cwd(), 'dist/src/index.js'),
      '/snapshot/dist/src/index.js'
    ];
    
    let indexPath, registerPath;
    for (const p of possiblePaths) {
      try {
        require.resolve(p);
        indexPath = p;
        registerPath = p.replace('index.js', 'register-antlr.js');
        break;
      } catch (e) {
        // try next path
      }
    }
    
    if (!indexPath) {
      throw new Error('Could not find index.js in any expected location');
    }
    
    highlightModule = require(indexPath);
    try {
      registerModule = require(registerPath);
    } catch (e) {
      // ignore if register module fails
    }
  } catch (error) {
    console.error('Failed to load modules:', error);
    process.exit(1);
  }
}

async function autoRegister() {
  if (registerModule && registerModule.attemptAutoRegisterGeneratedAntlrLanguages) {
    try { 
      await registerModule.attemptAutoRegisterGeneratedAntlrLanguages({ verbose: false }); 
    } catch { 
      /* ignore */ 
    }
  }
}

function parseArgs(argv) {
  const opts = {};
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
  await loadModules();
  
  const args = parseArgs(process.argv);
  await autoRegister();
  
  if (args.list) {
    const langs = highlightModule.listLanguages();
    if (langs.length === 0) {
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
    const jsonOutput = highlightModule.exportTokensAsJson(code, args.lang || 'javascript', !args.compact);
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
  
  const output = args.output || (args.html ? 'html' : 'ansi');
  const result = highlightModule.highlight(code, {
    language: args.lang,
    output,
    theme,
    handlerConfig,
    block: !args.noBlock,
    full: !!args.full,
    title: args.title
  });
  console.log(result);
}

main().catch(console.error);
