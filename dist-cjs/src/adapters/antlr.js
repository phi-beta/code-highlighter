"use strict";
/**
 * ANTLR adapter for both lexer-only and full parser grammars.
 * Provides helpers to adapt ANTLR-generated lexers/parsers to the generic tokenizer interface
 * so languages defined via .g4 grammars (converted with antlr4ts) can supply tokens.
 * Supports both lexer-only mode (for simple tokenization) and parser mode (for context-aware parsing).
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
exports.tokenizeWithAntlr = tokenizeWithAntlr;
exports.registerAntlrLanguage = registerAntlrLanguage;
function tokenizeWithAntlr(createLexer, code, opts = {}) {
    const lexer = createLexer(code);
    const tokens = [];
    const map = opts.tokenMap || {};
    const hidden = new Set(opts.hiddenChannels || ['HIDDEN']);
    // Support both actual ANTLR lexers (symbolicNames on instance) and our stub lexers (static property only)
    // Try various locations for symbolic names depending on generator/runtime version.
    let symbolic = lexer.symbolicNames || lexer.constructor?.symbolicNames || [];
    if ((!symbolic || symbolic.length === 0) && lexer.constructor?._SYMBOLIC_NAMES) {
        symbolic = lexer.constructor._SYMBOLIC_NAMES;
    }
    const vocabulary = lexer.vocabulary || lexer.constructor?.VOCABULARY;
    const max = opts.maxTokens || 200000;
    for (let i = 0; i < max; i++) {
        const t = lexer.nextToken();
        if (!t || t.type <= 0)
            break; // EOF
        let name = symbolic[t.type] || '';
        if (!name && vocabulary && typeof vocabulary.getSymbolicName === 'function') {
            name = vocabulary.getSymbolicName(t.type) || '';
        }
        if (name && hidden.has(name))
            continue;
        const value = t.text ?? '';
        const hlType = map[name] || guessTokenType(name, value) || opts.defaultType || 'identifier';
        tokens.push({ type: hlType, value });
    }
    return tokens;
}
function guessTokenType(name, value) {
    const lower = name.toLowerCase();
    if (/(comment)/i.test(lower))
        return 'comment';
    if (/string|char/i.test(lower))
        return 'string';
    if (/number|int|float|double|numeric|digit/i.test(lower))
        return 'number';
    if (/bool|true|false|null|undefined/i.test(lower))
        return 'keyword';
    if (/kw|keyword|if|for|while|return|class/i.test(lower))
        return 'keyword';
    if (/punct|brace|bracket|paren|operator/i.test(lower))
        return 'punctuation';
    if (/identifier|id|name/i.test(lower))
        return 'identifier';
    if (/whitespace|ws/i.test(lower))
        return 'whitespace';
    return undefined;
}
// Dynamically require registerLanguage to avoid circular ESM import cost.
async function registerAntlrLanguage(opts) {
    const mod = await Promise.resolve().then(() => __importStar(require('../index.js')));
    mod.registerLanguage(opts.name, (code) => tokenizeWithAntlr(opts.createLexer, code, opts));
}
