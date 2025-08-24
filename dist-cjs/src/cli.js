#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CLI entry point for code-highlighter.
 * Supports:
 *  - ANSI or HTML output
 *  - Language selection & listing
 *  - Theme JSON loading
 *  - Block (<pre><code>) or inline HTML; full HTML document generation
 */
const fs_1 = require("fs");
const index_js_1 = require("./index.js");
async function autoRegister() {
    try {
        await (await Promise.resolve().then(() => __importStar(require('./register-antlr.js')))).attemptAutoRegisterGeneratedAntlrLanguages?.({ verbose: false });
    }
    catch { /* ignore */ }
}
function parseArgs(argv) {
    const opts = {};
    for (let i = 2; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--html')
            opts.html = true;
        else if (a === '--list-languages')
            opts.list = true;
        else if (a === '--lang')
            opts.lang = argv[++i];
        else if (a === '--theme')
            opts.themePath = argv[++i];
        else if (a === '--no-block')
            opts.noBlock = true;
        else if (a === '--full')
            opts.full = true;
        else if (a === '--title')
            opts.title = argv[++i];
        else if (a === '--output')
            opts.output = argv[++i];
        else if (a === '--handler-config')
            opts.handlerConfigPath = argv[++i];
        else if (a === '--generate-samples')
            opts.generateSamples = true;
        else if (a === '--export-json')
            opts.exportJson = true;
        else if (a === '--compact')
            opts.compact = true;
        else if (!opts.file)
            opts.file = a;
    }
    return opts;
}
async function main() {
    const args = parseArgs(process.argv);
    await autoRegister();
    if (args.generateSamples) {
        try {
            const mod = await Promise.resolve().then(() => __importStar(require('../samples/generate-samples.js')));
            if (typeof mod.generateAll === 'function') {
                await mod.generateAll();
            }
            else if (typeof mod.default === 'function') {
                await mod.default();
            }
            else if (typeof mod.main === 'function') {
                await mod.main();
            }
        }
        catch (e) {
            console.error('Failed to generate samples:', e);
            process.exit(1);
        }
        return;
    }
    if (args.list) {
        const langs = (0, index_js_1.listLanguages)();
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
    const code = (0, fs_1.readFileSync)(args.file, 'utf8');
    // Handle JSON export
    if (args.exportJson) {
        const jsonOutput = (0, index_js_1.exportTokensAsJson)(code, args.lang || 'javascript', !args.compact);
        process.stdout.write(jsonOutput + '\n');
        return;
    }
    let theme;
    if (args.themePath) {
        try {
            theme = JSON.parse((0, fs_1.readFileSync)(args.themePath, 'utf8'));
        }
        catch {
            console.error('Invalid theme file');
        }
    }
    let handlerConfig;
    if (args.handlerConfigPath) {
        try {
            handlerConfig = JSON.parse((0, fs_1.readFileSync)(args.handlerConfigPath, 'utf8'));
        }
        catch {
            console.error('Invalid handler config file');
        }
    }
    const out = (0, index_js_1.highlight)(code, { output: args.output, html: args.html, language: args.lang, theme, block: !args.noBlock, fullDocument: args.full, title: args.title, handlerConfig });
    process.stdout.write(out + (args.html ? '' : '\n'));
}
main().catch(e => { console.error(e); process.exit(1); });
