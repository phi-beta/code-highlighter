#!/usr/bin/env node
/**
 * fetch-antlr.js
 * Downloads the ANTLR complete jar into vendor/antlr if not already present.
 * Usage: npm run setup:antlr
 * Environment overrides:
 *   ANTLR_VERSION (default 4.13.1)
 *   ANTLR_BASE_URL (default https://www.antlr.org/download)
 */
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

// Normalize Windows file URL path (strip leading slash before drive letter if present)
let scriptPath = new URL(import.meta.url).pathname;
if (/^\/[A-Za-z]:/.test(scriptPath)) scriptPath = scriptPath.slice(1);
const ROOT = path.resolve(path.dirname(scriptPath), '..');
const VERSION = process.env.ANTLR_VERSION || '4.13.1';
const BASE_URL = process.env.ANTLR_BASE_URL || 'https://www.antlr.org/download';
const JAR_NAME = `antlr-${VERSION}-complete.jar`;
const DEST_DIR = path.join(ROOT, 'vendor', 'antlr');
const DEST_PATH = path.join(DEST_DIR, JAR_NAME);
try { fs.mkdirSync(DEST_DIR, { recursive: true }); } catch (e) {
  if (!fs.existsSync(DEST_DIR)) {
    console.error('[fetch-antlr] Failed to create directory', DEST_DIR, e);
    process.exit(1);
  }
}

function alreadyPresent() {
  if (fs.existsSync(DEST_PATH)) {
    console.log(`[fetch-antlr] Found existing ${DEST_PATH}`);
    return true;
  }
  return false;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`[fetch-antlr] Downloading ${url}`);
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode && res.statusCode >= 400) {
        file.close();
        fs.rmSync(dest, { force: true });
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(undefined)));
    }).on('error', err => {
      file.close();
      fs.rmSync(dest, { force: true });
      reject(err);
    });
  });
}

async function main() {
  if (alreadyPresent()) return;
  const primary = `${BASE_URL}/${JAR_NAME}`;
  try {
    await download(primary, DEST_PATH);
    console.log('[fetch-antlr] Download complete ->', DEST_PATH);
    console.log('[fetch-antlr] Set ANTLR_JAR=' + DEST_PATH + ' or rely on generate script auto-detection.');
  } catch (e) {
    console.error('[fetch-antlr] Failed to download jar:', e.message || e);
    process.exit(1);
  }
}

main();