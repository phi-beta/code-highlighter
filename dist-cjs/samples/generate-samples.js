#!/usr/bin/env ts-node
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
    // Register languages with explicit CSV token mappings
    const csvTokenMap = {
        QUOTED_FIELD: 'string',
        COMMA: 'punctuation',
        NUMBER: 'number',
        FIELD_TEXT: 'identifier',
        NEWLINE: 'whitespace',
    };
    console.log('Registering languages with CSV token mappings...');
    await (0, register_antlr_js_1.registerGeneratedAntlrLanguages)({
        verbose: true,
        dir: (0, path_1.join)(process.cwd(), 'src', 'generated', 'antlr'),
        tokenMaps: { csv: csvTokenMap }
    });
    // Check what languages are available
    const { listLanguages } = await Promise.resolve().then(() => __importStar(require('../src/index.js')));
    console.log('Available languages after registration:', listLanguages());
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
        else if (ext === '.csv')
            lang = 'csv';
        else if (ext === '.xml')
            lang = 'xml';
        else if (ext === '.yaml' || ext === '.yml')
            lang = 'yaml';
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
