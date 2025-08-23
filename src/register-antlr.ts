/**
 * register-antlr.ts
 * Dynamically discovers and registers antlr4ts-generated lexer classes located in
 * ./generated/antlr (produced via `npm run generate:antlr`). Each *Lexer file is
 * loaded and wrapped with the ANTLR adapter.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
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
  const here = path.dirname(fileURLToPath(import.meta.url));
  const baseDir = opts.dir || path.join(here, 'generated', 'antlr');
  if (!fs.existsSync(baseDir)) {
    if (opts.verbose) console.warn('[register-antlr] No generated ANTLR directory found at', baseDir);
    return;
  }
  // Accept either .js (built) or .ts (stub/ts-node) files
  const files = fs.readdirSync(baseDir).filter(f => /Lexer\.(js|ts)$/.test(f));
  if (opts.verbose) console.log('[register-antlr] Found lexer candidates:', files);
  for (const file of files) {
    const langBase = file.replace(/Lexer\.(js|ts)$/, '');
    const langName = langBase.replace(/Mini$/,'').toLowerCase();
    try {
      const filePath = path.join(baseDir, file);
      // Use file URL to ensure Windows path compatibility for dynamic import of .ts during tests.
      const mod = await import(pathToFileURL(filePath).href);
      const LexerClass = (mod as any)[langBase + 'Lexer'] || (mod as any)[langBase];
      if (!LexerClass) continue;
      const explicitMap = opts.tokenMaps?.[langName];
      const tokenMap: Record<string,string> = explicitMap || {};
      const symNames = LexerClass.symbolicNames || [];
      if (!explicitMap && Array.isArray(symNames)) {
        for (const name of symNames) {
          if (!name) continue;
            const mapped = mapSymbolicToType(name);
            if (mapped) tokenMap[name] = mapped;
        }
      }
      const makeCreator = () => (code: string) => {
        // Try stub style (string ctor) first; fall back to CharStreams for real ANTLR lexers.
        try { return new LexerClass(code); } catch { return new LexerClass(CharStreams.fromString(code)); }
      };
      await registerAntlrLanguage({
        name: langName,
        createLexer: makeCreator(),
        tokenMap,
        defaultType: 'identifier'
      });
      if (langName === 'javascript') await registerAntlrLanguage({ name: 'js', createLexer: makeCreator(), tokenMap });
      if (langName === 'python') await registerAntlrLanguage({ name: 'py', createLexer: makeCreator(), tokenMap });
      if (langName === 'bash') await registerAntlrLanguage({ name: 'sh', createLexer: makeCreator(), tokenMap });
      if (langName === 'markdown') await registerAntlrLanguage({ name: 'md', createLexer: makeCreator(), tokenMap });
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
