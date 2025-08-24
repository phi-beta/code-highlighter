"use strict";
/**
 * Utility for handling file paths in both normal and pkg-bundled environments
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetPath = getAssetPath;
const node_path_1 = __importDefault(require("node:path"));
const dirname_js_1 = require("./dirname.js");
/**
 * Get the correct path for an asset file, handling pkg bundling
 */
function getAssetPath(relativePath) {
    // Check if we're running in a pkg bundle
    if (process.pkg) {
        // In pkg, assets are bundled in the snapshot filesystem
        // Since we bundled them from dist-cjs/src/, they should be accessible at the snapshot root
        return `/snapshot/${node_path_1.default.basename(process.execPath, node_path_1.default.extname(process.execPath))}/dist-cjs/src/${relativePath}`;
    }
    else {
        // Normal execution - use dirname relative to this file
        const currentDir = typeof __dirname !== 'undefined' ? __dirname : (0, dirname_js_1.getDirname)();
        return node_path_1.default.join(currentDir, relativePath);
    }
}
