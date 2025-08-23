#!/usr/bin/env node
/*
 * generate-antlr.js
 * Generates TypeScript lexers from .g4 lexer grammars using antlr4ts (requires Java + ANTLR jar).
 * Usage: npm run generate:antlr [--jar /path/to/antlr.jar]
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const GRAMMAR_SRC = path.join(ROOT, 'src', 'grammars', 'antlr');
const OUT_DIR = path.join(ROOT, 'src', 'generated', 'antlr');
fs.mkdirSync(OUT_DIR, { recursive: true });

const args = process.argv.slice(2);
const jarFlagIndex = args.indexOf('--jar');
let JAR = process.env.ANTLR_JAR || 'antlr-4.13.1-complete.jar';
if (jarFlagIndex >= 0 && args[jarFlagIndex + 1]) JAR = args[jarFlagIndex + 1];

function run(cmd) {
	console.log(`[generate-antlr] ${cmd}`);
	execSync(cmd, { stdio: 'inherit' });
}

function generate() {
	const files = fs.readdirSync(GRAMMAR_SRC).filter(f => f.endsWith('.g4'));
	if (!files.length) {
		console.log('[generate-antlr] No grammar files found.');
		return;
	}
	for (const file of files) {
		const full = path.join(GRAMMAR_SRC, file);
		run(`java -jar "${JAR}" -Dlanguage=TypeScript -listener -no-visitor -o "${OUT_DIR}" "${full}"`);
	}
	// Clean up potential duplicate tsconfig or package artifacts if any (none by default)
	console.log('[generate-antlr] Generation complete. Generated files in', OUT_DIR);
	console.log('[generate-antlr] Remember to import and register lexers, e.g.:');
	console.log("import { JavaScriptMiniLexer } from './generated/antlr/JavaScriptMiniLexer';");
}

try {
	generate();
} catch (e) {
	console.error('[generate-antlr] Failed:', e.message || e);
	process.exit(1);
}
