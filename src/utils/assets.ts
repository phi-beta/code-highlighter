/**
 * Utility for handling file paths in both normal and pkg-bundled environments
 */

import path from 'node:path';
import { getDirname } from './dirname.js';

/**
 * Get the correct path for an asset file, handling pkg bundling
 */
export function getAssetPath(relativePath: string): string {
  // Check if we're running in a pkg bundle
  if ((process as any).pkg) {
    // In pkg, assets are bundled in the snapshot filesystem
    // Since we bundled them from dist-cjs/src/, they should be accessible at the snapshot root
    return `/snapshot/${path.basename(process.execPath, path.extname(process.execPath))}/dist-cjs/src/${relativePath}`;
  } else {
    // Normal execution - use dirname relative to this file
    const currentDir = typeof __dirname !== 'undefined' ? __dirname : getDirname();
    return path.join(currentDir, relativePath);
  }
}
