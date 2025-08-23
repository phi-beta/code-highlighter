/**
 * register-antlr.ts
 * Dynamically discovers and registers antlr4ts-generated lexer classes located in
 * ./generated/antlr (produced via `npm run generate:antlr`). Each *Lexer file is
 * loaded and wrapped with the ANTLR adapter.
 */
import fs from 'node:fs';
import path from 'node:path';
import { CharStreams } from 'antlr4ts';
import { registerAntlrLanguage } from './adapters/antlr.js';

// Basic heuristic mapping from token symbolic names to highlight categories.
function mapSymbolicToType(symbolic: string): string | undefined {
  const s = symbolic.toLowerCase();
  if (s.includes('comment')) return 'comment';
  if (s.includes('string') || s.includes('template')) return 'string';
  if (s === 'number' || /num|int|float|double|digit/.test(s)) return 'number';
  if (/kw|keyword|class|return|if|for|while|else|import|from|def/.test(s)) return 'keyword';
  if (/punct|brace|brack|paren|colon|comma|semi|operator/.test(s)) return 'punctuation';
  if (s === 'ws' || s === 'whitespace') return 'whitespace';
  if (/identifier|id|name/.test(s)) return 'identifier';
  return undefined;
}

export interface AutoRegisterOptions {
  /** If true, logs each language registration */
  verbose?: boolean;
  /** Explicit directory override (defaults to ./generated/antlr relative to this file) */
  dir?: string;
  /** Provide an explicit token map override per language */
  tokenMaps?: Record<string, Record<string,string>>;
}

export async function registerGeneratedAntlrLanguages(opts: AutoRegisterOptions = {}) {
  const baseDir = opts.dir || path.join(path.dirname(new URL(import.meta.url).pathname), 'generated', 'antlr');
  if (!fs.existsSync(baseDir)) {
    if (opts.verbose) console.warn('[register-antlr] No generated ANTLR directory found at', baseDir);
    return;
  }
  const files = fs.readdirSync(baseDir).filter(f => /Lexer\.js$/.test(f));
  for (const file of files) {
    const langBase = file.replace(/Lexer\.js$/, '');
    const langName = langBase.replace(/Mini$/,'').toLowerCase();
    try {
      const mod = await import(path.join(baseDir, file));
      const LexerClass = (mod as any)[langBase + 'Lexer'] || (mod as any)[langBase];
      if (!LexerClass) continue;
      const explicitMap = opts.tokenMaps?.[langName];
      const tokenMap: Record<string,string> = explicitMap || {};
      if (!explicitMap && Array.isArray(LexerClass.symbolicNames)) {
        for (const name of LexerClass.symbolicNames) {
          if (!name) continue;
            const mapped = mapSymbolicToType(name);
            if (mapped) tokenMap[name] = mapped;
        }
      }
      await registerAntlrLanguage({
        name: langName,
        createLexer: (code: string) => new LexerClass(CharStreams.fromString(code)),
        tokenMap,
        defaultType: 'identifier'
      });
      if (langName === 'javascript') await registerAntlrLanguage({ name: 'js', createLexer: (c)=> new LexerClass(CharStreams.fromString(c)), tokenMap });
      if (langName === 'python') await registerAntlrLanguage({ name: 'py', createLexer: (c)=> new LexerClass(CharStreams.fromString(c)), tokenMap });
      if (langName === 'bash') await registerAntlrLanguage({ name: 'sh', createLexer: (c)=> new LexerClass(CharStreams.fromString(c)), tokenMap });
      if (langName === 'markdown') await registerAntlrLanguage({ name: 'md', createLexer: (c)=> new LexerClass(CharStreams.fromString(c)), tokenMap });
      if (opts.verbose) console.log(`[register-antlr] Registered ${langName}`);
    } catch (e) {
      if (opts.verbose) console.warn('[register-antlr] Failed for', file, e);
    }
  }
}

/**
 * Attempts to auto-register generated lexers but never throws; returns the list
 * of languages registered before & after for diagnostic use.
 */
export async function attemptAutoRegisterGeneratedAntlrLanguages(opts: AutoRegisterOptions = {}) {
  const before = (await import('./index.js')).listLanguages();
  try { await registerGeneratedAntlrLanguages(opts); } catch { /* swallow */ }
  const after = (await import('./index.js')).listLanguages();
  return { before, after };
}

export default { registerGeneratedAntlrLanguages };
