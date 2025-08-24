/**
 * Static registration of ANTLR languages for pkg executables
 * This avoids runtime file discovery issues in packaged environments
 */

import { registerAntlrLanguage } from '../adapters/antlr.js';

// Import all the generated ANTLR lexers
async function registerAllAntlrLanguages() {
  try {
    // Try to import and register each language
    const languages = [
      { 
        name: 'bash', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/BashMini.js' : '../generated/antlr/BashMini.js',
        lexerName: 'BashMiniLexer',
        aliases: ['sh'] 
      },
      { 
        name: 'javascript', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/JavaScriptMini.js' : '../generated/antlr/JavaScriptMini.js',
        lexerName: 'JavaScriptMiniLexer',
        aliases: ['js'] 
      },
      { 
        name: 'json', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/JsonMini.js' : '../generated/antlr/JsonMini.js',
        lexerName: 'JsonMiniLexer',
        aliases: [] 
      },
      { 
        name: 'markdown', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/MarkdownMini.js' : '../generated/antlr/MarkdownMini.js',
        lexerName: 'MarkdownMiniLexer',
        aliases: ['md'] 
      },
      { 
        name: 'python', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/PythonMini.js' : '../generated/antlr/PythonMini.js',
        lexerName: 'PythonMiniLexer',
        aliases: ['py'] 
      },
      { 
        name: 'typescript', 
        module: (process as any).pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/TypeScriptMini.js' : '../generated/antlr/TypeScriptMini.js',
        lexerName: 'TypeScriptMiniLexer',
        aliases: ['ts'] 
      }
    ];

    for (const lang of languages) {
      try {
        const module = await import(lang.module);
        const LexerClass = module[lang.lexerName];
        
        if (LexerClass) {
          const createLexer = (code: string) => {
            const { CharStreams } = require('antlr4ts');
            const inputStream = CharStreams.fromString(code);
            return new LexerClass(inputStream);
          };
          
          await registerAntlrLanguage({ 
            name: lang.name, 
            createLexer,
            tokenMap: {}, // Use default token mapping
            defaultType: 'identifier'
          });
          
          // Register aliases
          for (const alias of lang.aliases) {
            await registerAntlrLanguage({ 
              name: alias, 
              createLexer,
              tokenMap: {},
              defaultType: 'identifier'
            });
          }
          
          console.log(`Registered ${lang.name}`);
        }
      } catch (e: any) {
        console.log(`Failed to register ${lang.name}:`, e?.message || e);
      }
    }
  } catch (error: any) {
    console.error('Failed to register ANTLR languages:', error?.message || error);
  }
}

export { registerAllAntlrLanguages };
