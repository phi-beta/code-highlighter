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
    "keyword": { "color": "red", "fontStyle": "bold" },
    "string": { "color": "green" },
    "number": { "color": "blue" },
    "punctuation": { "color": "black" },
    "comment": { "color": "gray", "fontStyle": "italic" },
    "identifier": { "color": "black" },
    "bracket-depth-0": { "color": "red" },
    "bracket-depth-1": { "color": "green" },
    "bracket-depth-2": { "color": "magenta" },
    "bracket-depth-3": { "color": "blue" },
    "bracket-depth-4": { "color": "yellow" },
    "bracket-depth-5": { "color": "cyan" },
    "bracket-unmatched": { "color": "red", "fontStyle": "bold" },
    "property": { "color": "magenta", "fontStyle": "bold" },
    "heading": { "color": "blue", "fontStyle": "bold" },
    "strong": { "color": "red", "fontStyle": "bold" },
    "emphasis": { "color": "yellow", "fontStyle": "italic" },
    "code-inline": { "color": "magenta" },
    "code-block": { "color": "magenta" },
    "link": { "color": "green", "fontStyle": "underline" },
    "image": { "color": "green" },
    "blockquote": { "color": "gray", "fontStyle": "italic" },
    "list-bullet": { "color": "blue" },
    "list-enum": { "color": "blue" },
    "rule": { "color": "red" },
    "strike": { "color": "gray" },
    "code-fence-start": { "color": "magenta" },
    "code-fence-end": { "color": "magenta" },
    "code-fence-content": { "color": "magenta" },
    "function": { "color": "magenta", "fontStyle": "bold" },
    "variable": { "color": "yellow" },
    "type": { "color": "blue", "fontStyle": "bold" },
    "operator": { "color": "red", "fontStyle": "bold" },
    "class": { "color": "magenta", "fontStyle": "bold" }
};
