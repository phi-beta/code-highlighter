#!/usr/bin/env node

// CommonJS wrapper for the ES module CLI
const { createRequire } = require('module');
const path = require('path');
const fs = require('fs');

// Create require function to load the ES module
const require = createRequire(import.meta.url);

async function main() {
  try {
    // Dynamically import the ES module CLI
    const cliModule = await import('./cli.js');
    // The main function should be automatically executed by the ES module
  } catch (error) {
    console.error('Error loading CLI:', error);
    process.exit(1);
  }
}

main().catch(console.error);
