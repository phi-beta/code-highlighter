"use strict";
/**
 * Static registration of ANTLR languages for pkg executables
 * This avoids runtime file discovery issues in packaged environments
 */
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
exports.registerAllAntlrLanguages = registerAllAntlrLanguages;
const antlr_js_1 = require("../adapters/antlr.js");
// Import all the generated ANTLR lexers
async function registerAllAntlrLanguages() {
    try {
        // Try to import and register each language
        const languages = [
            {
                name: 'bash',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/BashMini.js' : '../generated/antlr/BashMini.js',
                lexerName: 'BashMiniLexer',
                aliases: ['sh']
            },
            {
                name: 'javascript',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/JavaScriptMini.js' : '../generated/antlr/JavaScriptMini.js',
                lexerName: 'JavaScriptMiniLexer',
                aliases: ['js']
            },
            {
                name: 'json',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/JsonMini.js' : '../generated/antlr/JsonMini.js',
                lexerName: 'JsonMiniLexer',
                aliases: []
            },
            {
                name: 'markdown',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/MarkdownMini.js' : '../generated/antlr/MarkdownMini.js',
                lexerName: 'MarkdownMiniLexer',
                aliases: ['md']
            },
            {
                name: 'python',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/PythonMini.js' : '../generated/antlr/PythonMini.js',
                lexerName: 'PythonMiniLexer',
                aliases: ['py']
            },
            {
                name: 'typescript',
                module: process.pkg ? '/snapshot/code-highlight-linux/dist-cjs/src/generated/antlr/TypeScriptMini.js' : '../generated/antlr/TypeScriptMini.js',
                lexerName: 'TypeScriptMiniLexer',
                aliases: ['ts']
            }
        ];
        for (const lang of languages) {
            try {
                const module = await Promise.resolve(`${lang.module}`).then(s => __importStar(require(s)));
                const LexerClass = module[lang.lexerName];
                if (LexerClass) {
                    const createLexer = (code) => {
                        const { CharStreams } = require('antlr4ts');
                        const inputStream = CharStreams.fromString(code);
                        return new LexerClass(inputStream);
                    };
                    await (0, antlr_js_1.registerAntlrLanguage)({
                        name: lang.name,
                        createLexer,
                        tokenMap: {}, // Use default token mapping
                        defaultType: 'identifier'
                    });
                    // Register aliases
                    for (const alias of lang.aliases) {
                        await (0, antlr_js_1.registerAntlrLanguage)({
                            name: alias,
                            createLexer,
                            tokenMap: {},
                            defaultType: 'identifier'
                        });
                    }
                    console.log(`Registered ${lang.name}`);
                }
            }
            catch (e) {
                console.log(`Failed to register ${lang.name}:`, e?.message || e);
            }
        }
    }
    catch (error) {
        console.error('Failed to register ANTLR languages:', error?.message || error);
    }
}
