import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Get __dirname equivalent that works in both ES modules and CommonJS
 */
export function getDirname(metaUrl?: string): string {
  // If explicitly passed, use it (ES modules)
  if (metaUrl) {
    return path.dirname(fileURLToPath(metaUrl));
  }
  
  // Try to use import.meta.url if available (ES modules)
  try {
    // This will work in ES modules
    const url = eval('import.meta.url');
    if (url) {
      return path.dirname(fileURLToPath(url));
    }
  } catch {
    // Not in ES module context
  }
  
  // CommonJS fallback
  try {
    // This will work in CommonJS
    const dirname = eval('__dirname');
    if (dirname) {
      return dirname;
    }
  } catch {
    // Not in CommonJS context
  }
  
  // Last resort
  return process.cwd();
}
