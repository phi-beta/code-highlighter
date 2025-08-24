"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirname = getDirname;
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = require("node:url");
/**
 * Get __dirname equivalent that works in both ES modules and CommonJS
 */
function getDirname(metaUrl) {
    // If explicitly passed, use it (ES modules)
    if (metaUrl) {
        return node_path_1.default.dirname((0, node_url_1.fileURLToPath)(metaUrl));
    }
    // Try to use import.meta.url if available (ES modules)
    try {
        // This will work in ES modules
        const url = eval('import.meta.url');
        if (url) {
            return node_path_1.default.dirname((0, node_url_1.fileURLToPath)(url));
        }
    }
    catch {
        // Not in ES module context
    }
    // CommonJS fallback
    try {
        // This will work in CommonJS
        const dirname = eval('__dirname');
        if (dirname) {
            return dirname;
        }
    }
    catch {
        // Not in CommonJS context
    }
    // Last resort
    return process.cwd();
}
