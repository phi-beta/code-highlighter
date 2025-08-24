#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAll = generateAll;
/**
 * generate-samples.ts
 * Generates highlighted outputs (ANSI and HTML) for each sample input language
 * into samples/outputs. Assumes ANTLR lexers have been generated & registered.
 */
const fs_1 = require("fs");
const path_1 = require("path");
const index_js_1 = require("../src/index.js");
const register_antlr_js_1 = require("../src/register-antlr.js");
const INPUT_DIR = (0, path_1.join)(process.cwd(), 'samples', 'inputs');
const OUTPUT_DIR = (0, path_1.join)(process.cwd(), 'samples', 'outputs');
async function generateAll() {
    await (0, register_antlr_js_1.attemptAutoRegisterGeneratedAntlrLanguages)({ verbose: false });
    const files = (0, fs_1.readdirSync)(INPUT_DIR);
    for (const f of files) {
        const abs = (0, path_1.join)(INPUT_DIR, f);
        const code = (0, fs_1.readFileSync)(abs, 'utf8');
        const ext = (0, path_1.extname)(f).toLowerCase();
        let lang = 'javascript';
        if (ext === '.py')
            lang = 'python';
        else if (ext === '.json')
            lang = 'json';
        else if (ext === '.sh')
            lang = 'bash';
        else if (ext === '.md')
            lang = 'markdown';
        else if (ext === '.js' || ext === '.mjs' || ext === '.cjs')
            lang = 'javascript';
        // ANSI output
        try {
            const ansi = (0, index_js_1.highlight)(code, { language: lang, output: 'ansi' });
            (0, fs_1.writeFileSync)((0, path_1.join)(OUTPUT_DIR, f + '.ansi.txt'), ansi, 'utf8');
        }
        catch (e) {
            (0, fs_1.writeFileSync)((0, path_1.join)(OUTPUT_DIR, f + '.ansi.error.txt'), String(e), 'utf8');
        }
        // HTML output
        try {
            const html = (0, index_js_1.highlight)(code, { language: lang, output: 'html', handlerConfig: { block: true } });
            (0, fs_1.writeFileSync)((0, path_1.join)(OUTPUT_DIR, f + '.html'), html, 'utf8');
        }
        catch (e) {
            (0, fs_1.writeFileSync)((0, path_1.join)(OUTPUT_DIR, f + '.html.error.txt'), String(e), 'utf8');
        }
    }
    console.log('Generated sample outputs for', files.length, 'files.');
}
async function main() { await generateAll(); }
main().catch(e => { console.error(e); process.exit(1); });
