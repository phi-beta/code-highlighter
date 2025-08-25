"use strict";
/**
 * Embedded configuration for standalone executables
 * This avoids the need for external JSON files in pkg bundles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANSI_THEME = exports.HTML_THEME = exports.HTML_DEFAULT_CONFIG = exports.ANSI_DEFAULT_CONFIG = void 0;
exports.ANSI_DEFAULT_CONFIG = {
    useStyles: true
};
exports.HTML_DEFAULT_CONFIG = {
    block: true,
    fullDocument: false,
    title: null
};
exports.HTML_THEME = {
    "keyword": { "color": "#d73a49", "fontStyle": "bold" },
    "string": { "color": "#032f62" },
    "number": { "color": "#005cc5" },
    "punctuation": { "color": "#24292e" },
    "comment": { "color": "#6a737d", "fontStyle": "italic" },
    "identifier": { "color": "#24292e" },
    "bracket-depth-0": { "color": "#d73a49" },
    "bracket-depth-1": { "color": "#22863a" },
    "bracket-depth-2": { "color": "#6f42c1" },
    "bracket-depth-3": { "color": "#005cc5" },
    "bracket-depth-4": { "color": "#e36209" },
    "bracket-depth-5": { "color": "#0366d6" },
    "bracket-unmatched": { "color": "#ff0000", "fontStyle": "bold" },
    "property": { "color": "#6f42c1", "fontStyle": "bold" },
    "heading": { "color": "#005cc5", "fontStyle": "bold" },
    "strong": { "color": "#d73a49", "fontStyle": "bold" },
    "emphasis": { "color": "#e36209", "fontStyle": "italic" },
    "code-inline": { "color": "#6f42c1" },
    "code-block": { "color": "#6f42c1" },
    "link": { "color": "#22863a", "fontStyle": "underline" },
    "image": { "color": "#22863a" },
    "blockquote": { "color": "#6a737d", "fontStyle": "italic" },
    "list-bullet": { "color": "#005cc5" },
    "list-enum": { "color": "#005cc5" },
    "rule": { "color": "#d73a49" },
    "strike": { "color": "#6a737d" },
    "code-fence-start": { "color": "#6f42c1" },
    "code-fence-end": { "color": "#6f42c1" },
    "code-fence-content": { "color": "#6f42c1" },
    "function": { "color": "#6f42c1", "fontStyle": "bold" },
    "variable": { "color": "#e36209" },
    "type": { "color": "#005cc5", "fontStyle": "bold" },
    "operator": { "color": "#d73a49", "fontStyle": "bold" },
    "class": { "color": "#6f42c1", "fontStyle": "bold" }
};
exports.ANSI_THEME = {
    "keyword": { "color": "\u001b[31m", "fontStyle": "bold" },
    "string": { "color": "\u001b[32m" },
    "number": { "color": "\u001b[34m" },
    "punctuation": { "color": "\u001b[37m" },
    "comment": { "color": "\u001b[90m", "fontStyle": "italic" },
    "identifier": { "color": "\u001b[37m" },
    "bracket-depth-0": { "color": "\u001b[31m" },
    "bracket-depth-1": { "color": "\u001b[32m" },
    "bracket-depth-2": { "color": "\u001b[35m" },
    "bracket-depth-3": { "color": "\u001b[34m" },
    "bracket-depth-4": { "color": "\u001b[33m" },
    "bracket-depth-5": { "color": "\u001b[36m" },
    "bracket-unmatched": { "color": "\u001b[31m", "fontStyle": "bold" },
    "property": { "color": "\u001b[35m", "fontStyle": "bold" },
    "heading": { "color": "\u001b[34m", "fontStyle": "bold" },
    "strong": { "color": "\u001b[31m", "fontStyle": "bold" },
    "emphasis": { "color": "\u001b[33m", "fontStyle": "italic" },
    "code-inline": { "color": "\u001b[35m" },
    "code-block": { "color": "\u001b[35m" },
    "link": { "color": "\u001b[32m", "fontStyle": "underline" },
    "image": { "color": "\u001b[32m" },
    "blockquote": { "color": "\u001b[90m", "fontStyle": "italic" },
    "list-bullet": { "color": "\u001b[34m" },
    "list-enum": { "color": "\u001b[34m" },
    "rule": { "color": "\u001b[31m" },
    "strike": { "color": "\u001b[90m" },
    "code-fence-start": { "color": "\u001b[35m" },
    "code-fence-end": { "color": "\u001b[35m" },
    "code-fence-content": { "color": "\u001b[35m" },
    "function": { "color": "\u001b[35m", "fontStyle": "bold" },
    "variable": { "color": "\u001b[33m" },
    "type": { "color": "\u001b[34m", "fontStyle": "bold" },
    "operator": { "color": "\u001b[31m", "fontStyle": "bold" },
    "class": { "color": "\u001b[35m", "fontStyle": "bold" }
};
