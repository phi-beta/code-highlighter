#!/usr/bin/env node
/**
 * CommonJS-compatible CLI wrapper for standalone executables
 */
const fs = require('fs');
const path = require('path');

// CommonJS already provides __filename and __dirname
// const __filename = require.main?.filename || __filename;
// const __dirname = path.dirname(__filename);

// Load the main modules
let highlightModule, registerModule;

async function loadModules() {
  try {
    highlightModule = require('./index.js');
    try {
      registerModule = require('./register-antlr.js');
    } catch (e) {
      // ANTLR registration is optional
    }
  } catch (error) {
    console.error('Failed to load highlight modules:', error.message);
    process.exit(1);
  }
}

async function autoRegister() {
  if (process.pkg) {
    // In pkg environment, use static registration to avoid file discovery issues
    try {
      const staticReg = require('./config/static-registration.js');
      await staticReg.registerAllAntlrLanguages();
    } catch (e) {
      console.error('Failed to register ANTLR languages statically:', e.message);
    }
  } else if (registerModule?.attemptAutoRegisterGeneratedAntlrLanguages) {
    try {
      await registerModule.attemptAutoRegisterGeneratedAntlrLanguages({ verbose: false });
    } catch (e) {
      // In non-pkg environment, be more aggressive about trying registration
      if (registerModule?.registerGeneratedAntlrLanguages) {
        try {
          await registerModule.registerGeneratedAntlrLanguages();
        } catch (e2) {
          console.error('Failed to register ANTLR languages:', e2.message);
        }
      }
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
  
  const code = fs.readFileSync(args.file, 'utf8');
  
  // Handle JSON export
  if (args.exportJson) {
    const jsonOutput = highlightModule.exportTokensAsJson(code, args.lang || 'javascript', !args.compact);
    process.stdout.write(jsonOutput + '\n');
    return;
  }
  
  let theme, handlerConfig;
  if (args.themePath) {
    try { 
      theme = JSON.parse(fs.readFileSync(args.themePath, 'utf8')); 
    } catch { 
      console.error('Invalid theme file'); 
    }
  }
  if (args.handlerConfigPath) {
    try { 
      handlerConfig = JSON.parse(fs.readFileSync(args.handlerConfigPath, 'utf8')); 
    } catch { 
      console.error('Invalid handler config file'); 
    }
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
