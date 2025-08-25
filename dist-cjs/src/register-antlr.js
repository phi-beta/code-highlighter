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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGeneratedAntlrLanguages = registerGeneratedAntlrLanguages;
exports.attemptAutoRegisterGeneratedAntlrLanguages = attemptAutoRegisterGeneratedAntlrLanguages;
/**
 * register-antlr.ts
 * Dynamically discovers and registers antlr4ts-generated lexer classes located in
 * ./generated/antlr (produced via `npm run generate:antlr`). Each *Lexer file is
 * loaded and wrapped with the ANTLR adapter.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
const antlr4ts_1 = require("antlr4ts");
const dirname_js_1 = require("./utils/dirname.js");
const antlr_js_1 = require("./adapters/antlr.js");
// Basic heuristic mapping from token symbolic names to highlight categories.
function mapSymbolicToType(symbolic) {
    const raw = symbolic;
    const s = symbolic.toLowerCase();
    // Markdown tokens
    // Direct exact name handling for stub & generated lexers
    if (s === 'keyword')
        return 'keyword';
    if (s === 'string')
        return 'string';
    if (s === 'number')
        return 'number';
    if (s === 'comment')
        return 'comment';
    if (s === 'punct' || s === 'punctuation')
        return 'punctuation';
    if (s === 'identifier' || s === 'id')
        return 'identifier';
    if (s === 'ws' || s === 'whitespace')
        return 'whitespace';
    if (s.includes('comment'))
        return 'comment';
    if (s.includes('string') || s.includes('template'))
        return 'string';
    if (s === 'number' || /^(num|int|float|double|digit)$/.test(s))
        return 'number';
    if (/^(kw|keyword)$|^(class|return|if|for|while|else|import|from|def)$/.test(s))
        return 'keyword';
    if (/^(punct|punctuation)$|^(brace|brack|paren|colon|comma|semi|operator|curly)$/.test(s))
        return 'punctuation';
    // Markdown symbolic token names – map to temporary raw types we post-process later
    // ANTLR symbolic names are uppercase (e.g., HEADING); map them case-insensitively
    if (raw === 'HEADING')
        return 'md-raw-heading';
    if (raw === 'HEADING_ATX')
        return 'md-raw-heading';
    if (raw === 'SETEXT_UNDERLINE_1')
        return 'md-raw-heading-setext';
    if (raw === 'SETEXT_UNDERLINE_2')
        return 'md-raw-heading-setext';
    if (raw === 'HR')
        return 'md-raw-hr';
    if (raw === 'BLOCKQUOTE')
        return 'md-raw-blockquote';
    if (raw === 'LIST_BULLET')
        return 'md-raw-list-bullet';
    if (raw === 'LIST_ENUM')
        return 'md-raw-list-enum';
    if (raw === 'TASK_LIST_ITEM')
        return 'md-raw-task-list';
    if (raw === 'CODE_FENCE_START')
        return 'md-raw-code-fence-start';
    if (raw === 'CODE_FENCE_END')
        return 'md-raw-code-fence-end';
    if (raw === 'CODE_TEXT')
        return 'md-raw-code-text';
    if (raw === 'CODE_BLOCK_INDENTED')
        return 'md-raw-code-block';
    if (raw === 'TABLE_ROW')
        return 'md-raw-table';
    if (raw === 'TABLE_SEPARATOR')
        return 'md-raw-table';
    if (raw === 'IMAGE')
        return 'md-raw-image';
    if (raw === 'LINK_REFERENCE')
        return 'md-raw-link-reference';
    if (raw === 'LINK_DEFINITION')
        return 'md-raw-link-definition';
    if (raw === 'AUTOLINK')
        return 'md-raw-autolink';
    if (raw === 'FOOTNOTE_REF')
        return 'md-raw-footnote';
    if (raw === 'FOOTNOTE_DEF')
        return 'md-raw-footnote';
    if (raw === 'HARD_LINE_BREAK')
        return 'md-raw-line-break';
    // Existing inline constructs
    if (raw === 'BOLD')
        return 'md-raw-bold';
    if (raw === 'ITALIC')
        return 'md-raw-italic';
    if (raw === 'BOLDITALIC')
        return 'md-raw-bolditalic';
    if (raw === 'STRIKETHROUGH')
        return 'md-raw-strike';
    if (raw === 'INLINE_CODE')
        return 'md-raw-inline-code';
    if (raw === 'CODE_FENCE')
        return 'md-raw-code-fence';
    if (raw === 'LINK')
        return 'md-raw-link';
    // Bash shell token mappings
    if (raw === 'ARITHMETIC_EXPANSION')
        return 'arithmetic-expansion';
    if (raw === 'COMMAND_SUBSTITUTION')
        return 'command-substitution';
    if (raw === 'COMMAND_SUBSTITUTION_BACKTICK')
        return 'command-substitution';
    if (raw === 'PARAMETER_EXPANSION')
        return 'parameter-expansion';
    if (raw === 'VAR_POSITIONAL')
        return 'variable';
    if (raw === 'VAR_SPECIAL')
        return 'variable';
    if (raw === 'TEST_OP')
        return 'operator';
    if (raw === 'REDIRECT')
        return 'operator';
    if (raw === 'PIPE')
        return 'operator';
    if (raw === 'LOGICAL')
        return 'operator';
    // General fallback patterns
    if (s === 'comment')
        return 'comment';
    if (s === 'ws' || s === 'whitespace')
        return 'whitespace';
    if (/identifier|id|name/.test(s))
        return 'identifier';
    // Python token mappings
    if (raw === 'BOOLEAN')
        return 'keyword';
    if (raw === 'NONE')
        return 'keyword';
    if (raw === 'F_STRING')
        return 'string';
    if (raw === 'RAW_STRING')
        return 'string';
    if (raw === 'TRIPLE_STRING')
        return 'string';
    if (raw === 'STRING_DOUBLE')
        return 'string';
    if (raw === 'STRING_SINGLE')
        return 'string';
    if (raw === 'HEX_NUMBER')
        return 'number';
    if (raw === 'BIN_NUMBER')
        return 'number';
    if (raw === 'OCT_NUMBER')
        return 'number';
    if (raw === 'FLOAT_NUMBER')
        return 'number';
    if (raw === 'INT_NUMBER')
        return 'number';
    if (raw === 'OPERATOR')
        return 'operator';
    if (raw === 'DECORATOR')
        return 'decorator';
    // TypeScript token mappings
    if (raw === 'TYPE_ANNOTATION')
        return 'type';
    if (raw === 'GENERIC_TYPE')
        return 'type';
    if (raw === 'STRING_TEMPLATE')
        return 'string';
    if (raw === 'OPERATOR_TS')
        return 'operator';
    if (raw === 'REGEX')
        return 'string';
    // CSS token mappings
    if (raw === 'HEX_COLOR')
        return 'color';
    if (raw === 'NAMED_COLOR')
        return 'color';
    if (raw === 'FUNCTION')
        return 'function';
    if (raw === 'UNIT')
        return 'number';
    if (raw === 'PERCENTAGE')
        return 'number';
    if (raw === 'AT_RULE')
        return 'at-rule';
    if (raw === 'CLASS_SELECTOR')
        return 'selector';
    if (raw === 'ID_SELECTOR')
        return 'selector';
    if (raw === 'PSEUDO_CLASS')
        return 'selector';
    if (raw === 'PSEUDO_ELEMENT')
        return 'selector';
    if (raw === 'PROPERTY')
        return 'property';
    if (raw === 'CUSTOM_PROPERTY')
        return 'property';
    if (raw === 'IMPORTANT')
        return 'keyword';
    if (raw === 'URL')
        return 'string';
    if (raw === 'COMMENT_BLOCK')
        return 'comment';
    if (raw === 'ELEMENT')
        return 'identifier';
    if (raw === 'LPAREN')
        return 'punctuation';
    if (raw === 'RPAREN')
        return 'punctuation';
    // HTML token mappings
    if (raw === 'HTML_COMMENT')
        return 'comment';
    if (raw === 'DOCTYPE')
        return 'keyword';
    if (raw === 'CLOSING_TAG')
        return 'keyword'; // Closing tags same as opening tags
    if (raw === 'ATTRIBUTE_PATTERN')
        return 'property'; // Attribute name=value pairs
    if (raw === 'DOUBLE_QUOTED_STRING')
        return 'string';
    if (raw === 'SINGLE_QUOTED_STRING')
        return 'string';
    if (raw === 'CSS_SELECTOR')
        return 'function'; // CSS class/id selectors
    if (raw === 'CSS_PROPERTY')
        return 'property'; // CSS property: value pairs
    if (raw === 'HTML_ENTITY')
        return 'string';
    if (raw === 'TEXT_CONTENT')
        return 'text'; // Change from identifier to text for better contrast
    if (raw === 'LT')
        return 'punctuation';
    if (raw === 'GT')
        return 'punctuation';
    if (raw === 'SLASH')
        return 'punctuation';
    if (raw === 'EQUALS')
        return 'punctuation';
    if (raw === 'NEWLINE')
        return 'whitespace';
    if (raw === 'WHITESPACE')
        return 'whitespace';
    // XML token mappings
    if (raw === 'XML_COMMENT')
        return 'comment';
    if (raw === 'XML_DECLARATION')
        return 'keyword';
    if (raw === 'PROCESSING_INSTRUCTION')
        return 'keyword';
    if (raw === 'CDATA_SECTION')
        return 'string';
    if (raw === 'XML_ENTITY')
        return 'string';
    if (raw === 'ATTRIBUTE_NAME')
        return 'property';
    if (raw === 'NAMESPACE_PREFIX')
        return 'type'; // Use type for namespace prefixes
    if (raw === 'QUESTION')
        return 'punctuation';
    // CSV token mappings
    if (raw === 'QUOTED_FIELD')
        return 'string';
    if (raw === 'UNQUOTED_FIELD')
        return 'text';
    if (raw === 'BOOLEAN')
        return 'keyword';
    if (raw === 'EMPTY_FIELD')
        return 'string';
    if (raw === 'COMMA')
        return 'punctuation';
    if (raw === 'SEMICOLON')
        return 'punctuation';
    if (raw === 'TAB')
        return 'punctuation';
    if (raw === 'PIPE')
        return 'punctuation';
    // YAML token mappings
    if (raw === 'DOCUMENT_START')
        return 'keyword';
    if (raw === 'DOCUMENT_END')
        return 'keyword';
    if (raw === 'DOUBLE_QUOTED_STRING')
        return 'string';
    if (raw === 'SINGLE_QUOTED_STRING')
        return 'string';
    if (raw === 'YAML_NUMBER')
        return 'number';
    if (raw === 'YAML_FLOAT')
        return 'number';
    if (raw === 'YAML_SPECIAL_FLOAT')
        return 'number';
    if (raw === 'YAML_BOOLEAN')
        return 'keyword';
    if (raw === 'YAML_NULL')
        return 'keyword';
    if (raw === 'ANCHOR')
        return 'type'; // & anchors as types
    if (raw === 'ALIAS')
        return 'type'; // * aliases as types  
    if (raw === 'TAG')
        return 'function'; // ! tags as functions
    if (raw === 'PLAIN_SCALAR')
        return 'text';
    if (raw === 'COLON')
        return 'punctuation';
    if (raw === 'DASH')
        return 'punctuation';
    if (raw === 'QUESTION')
        return 'punctuation';
    if (raw === 'GT')
        return 'punctuation';
    if (raw === 'AMPERSAND')
        return 'punctuation';
    if (raw === 'ASTERISK')
        return 'punctuation';
    return undefined;
}
/**
 * Post-process HTML tokens to fix opening tag recognition.
 * Converts 'identifier' tokens to 'keyword' when they appear in tag contexts.
 */
function postProcessHtmlTokens(tokens) {
    const result = [...tokens];
    for (let i = 0; i < result.length; i++) {
        const token = result[i];
        const prevToken = i > 0 ? result[i - 1] : null;
        // If this is an identifier token that follows a '<' punctuation, 
        // it's likely an opening tag name that should be a keyword
        if (token.type === 'identifier' &&
            prevToken &&
            prevToken.type === 'punctuation' &&
            prevToken.value === '<') {
            result[i] = { ...token, type: 'keyword' };
        }
    }
    return result;
}
async function registerGeneratedAntlrLanguages(opts = {}) {
    // Use explicit path relative to this module's directory
    const currentDir = (0, dirname_js_1.getDirname)();
    let baseDir = opts.dir || node_path_1.default.join(currentDir, 'generated/antlr');
    // If the compiled version doesn't exist, try the source version
    if (!node_fs_1.default.existsSync(baseDir)) {
        // We're probably in a built environment; try the source directory
        baseDir = node_path_1.default.join(currentDir, '../../src/generated/antlr');
    }
    // In pkg, also try the snapshot path directly
    if (process.pkg && !opts.dir) {
        const pkgPath = `/snapshot/${node_path_1.default.basename(process.execPath, node_path_1.default.extname(process.execPath))}/dist-cjs/src/generated/antlr`;
        if (node_fs_1.default.existsSync(pkgPath)) {
            baseDir = pkgPath;
        }
    }
    // If antlr4ts CLI nested structure is present, descend into it
    const nested = node_path_1.default.join(baseDir, 'src', 'grammars', 'antlr');
    if (node_fs_1.default.existsSync(nested))
        baseDir = nested;
    if (!node_fs_1.default.existsSync(baseDir)) {
        if (opts.verbose)
            console.warn('[register-antlr] No generated ANTLR directory found at', baseDir);
        return;
    }
    // Accept either .js (built) or .ts (stub/ts-node) files
    const all = node_fs_1.default.readdirSync(baseDir).filter(f => /\.(js|ts)$/.test(f) && !/\.d\.ts$/.test(f));
    // Prioritize .ts files over .js files for each base name
    const filesMap = new Map();
    for (const file of all) {
        const base = file.replace(/\.(js|ts)$/, '');
        const isTs = file.endsWith('.ts');
        if (!filesMap.has(base) || isTs) {
            filesMap.set(base, file);
        }
    }
    const prioritizedFiles = Array.from(filesMap.values());
    // Classify candidates - for parser grammars, we want *Lexer.ts files
    const stubLexerFiles = new Set(prioritizedFiles.filter(f => /Lexer\.(js|ts)$/.test(f) && /(Bash|CSS|CSV|Html|JavaScript|Json|Markdown|Python|TypeScript)MiniLexer/.test(f)));
    const realGeneratedFiles = new Set(prioritizedFiles.filter(f => /Mini\.(js|ts)$/.test(f) && !/Lexer\.(js|ts)$/.test(f)));
    // For parser grammars, also include the generated lexer files
    const parserLexerFiles = new Set(prioritizedFiles.filter(f => /MiniLexer\.(js|ts)$/.test(f)));
    // If both a real generated *Mini and a stub *MiniLexer exist, drop the stub.
    for (const real of realGeneratedFiles) {
        const base = real.replace(/\.(js|ts)$/, '');
        const stub = base + 'Lexer.ts';
        const stubJs = base + 'Lexer.js';
        stubLexerFiles.delete(stub);
        stubLexerFiles.delete(stubJs);
    }
    // Final list: parser lexers first, then real generated, then any remaining stubs.
    const files = [...Array.from(parserLexerFiles).sort(), ...Array.from(realGeneratedFiles).sort(), ...Array.from(stubLexerFiles).sort()];
    if (opts.verbose)
        console.log('[register-antlr] Found lexer candidates:', files);
    for (const file of files) {
        const isStub = /Lexer\.(js|ts)$/.test(file) && !/(Bash|CSS|CSV|Html|JavaScript|Json|Markdown|Python|TypeScript)MiniLexer/.test(file);
        const isParserLexer = /MiniLexer\.(js|ts)$/.test(file);
        let langBase;
        if (isParserLexer) {
            langBase = file.replace(/MiniLexer\.(js|ts)$/, '');
        }
        else if (isStub) {
            langBase = file.replace(/Lexer\.(js|ts)$/, '');
        }
        else {
            langBase = file.replace(/Mini\.(js|ts)$/, '');
        }
        const langName = langBase.replace(/Mini$/, '').toLowerCase();
        try {
            const filePath = node_path_1.default.join(baseDir, file);
            // Use file URL to ensure Windows path compatibility for dynamic import of .ts during tests.
            const mod = await Promise.resolve(`${(0, node_url_1.pathToFileURL)(filePath).href}`).then(s => __importStar(require(s)));
            let LexerClass;
            if (isParserLexer) {
                // For parser grammars, look for MarkdownMiniLexer class
                LexerClass = mod[langBase + 'MiniLexer'] || mod[langBase + 'Lexer'] || mod.default;
            }
            else if (isStub) {
                LexerClass = mod[langBase + 'Lexer'] || mod[langBase];
            }
            else {
                // For lexer-only grammars, try the full file base name first, then default
                LexerClass = mod[langBase + 'Mini'] || mod.default || mod[langBase];
            }
            if (!LexerClass)
                continue;
            const explicitMap = opts.tokenMaps?.[langName];
            const tokenMap = explicitMap || {};
            const symNames = LexerClass.symbolicNames || LexerClass._SYMBOLIC_NAMES || [];
            if (!explicitMap && Array.isArray(symNames)) {
                for (const name of symNames) {
                    if (!name)
                        continue;
                    const mapped = mapSymbolicToType(name);
                    if (mapped)
                        tokenMap[name] = mapped;
                }
            }
            // Distinguish between real antlr4ts generated lexers and stub "Mini" lexers.
            // Real generated lexers expose serializedATN/ruleNames and require a CharStream.
            // Stubs expect a plain source string; passing a CharStream caused empty token output intermittently.
            const isRealAntlr = !isStub && ('serializedATN' in LexerClass || 'ruleNames' in (LexerClass.prototype || {}));
            const createLexer = (code) => isRealAntlr
                ? new LexerClass(antlr4ts_1.CharStreams.fromString(code))
                : new LexerClass(code);
            await (0, antlr_js_1.registerAntlrLanguage)({
                name: langName,
                createLexer,
                tokenMap,
                defaultType: 'identifier'
            });
            // Special post-processing for HTML to fix opening tag recognition
            if (langName === 'html') {
                const { registerLanguage, getLanguage } = await Promise.resolve().then(() => __importStar(require('./index.js')));
                const { tokenizeWithAntlr } = await Promise.resolve().then(() => __importStar(require('./adapters/antlr.js')));
                const { createDelegatingHtmlTokenizer } = await Promise.resolve().then(() => __importStar(require('./utils/html-delegation.js')));
                // Create the base HTML tokenizer
                const baseHtmlTokenizer = (code) => {
                    const rawTokens = tokenizeWithAntlr(createLexer, code, { tokenMap, defaultType: 'identifier' });
                    return postProcessHtmlTokens(rawTokens);
                };
                // Register HTML with delegation to CSS/JS tokenizers
                registerLanguage('html', (code) => {
                    const cssTokenizer = getLanguage('css');
                    const jsTokenizer = getLanguage('javascript');
                    const delegatingTokenizer = createDelegatingHtmlTokenizer(baseHtmlTokenizer, cssTokenizer, jsTokenizer);
                    return delegatingTokenizer(code);
                });
            }
            if (langName === 'javascript')
                await (0, antlr_js_1.registerAntlrLanguage)({ name: 'js', createLexer, tokenMap });
            if (langName === 'python')
                await (0, antlr_js_1.registerAntlrLanguage)({ name: 'py', createLexer, tokenMap });
            if (langName === 'bash')
                await (0, antlr_js_1.registerAntlrLanguage)({ name: 'sh', createLexer, tokenMap });
            if (langName === 'markdown')
                await (0, antlr_js_1.registerAntlrLanguage)({ name: 'md', createLexer, tokenMap });
            if (langName === 'typescript')
                await (0, antlr_js_1.registerAntlrLanguage)({ name: 'ts', createLexer, tokenMap });
            // CSS has no common aliases but register main name
            if (opts.verbose)
                console.log(`[register-antlr] Registered ${langName}`);
        }
        catch (e) {
            if (opts.verbose)
                console.warn('[register-antlr] Failed for', file, e);
        }
    }
}
/**
 * Attempts to auto-register generated lexers but never throws; returns the list
 * of languages registered before & after for diagnostic use.
 */
async function attemptAutoRegisterGeneratedAntlrLanguages(opts = {}) {
    const before = (await Promise.resolve().then(() => __importStar(require('./index.js')))).listLanguages();
    try {
        await registerGeneratedAntlrLanguages(opts);
    }
    catch { /* swallow */ }
    const after = (await Promise.resolve().then(() => __importStar(require('./index.js')))).listLanguages();
    return { before, after };
}
exports.default = { registerGeneratedAntlrLanguages };
