#!/usr/bin/env node
import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';

async function test() {
  console.log('Testing with explicit path...');
  
  // Register languages with explicit path
  await registerGeneratedAntlrLanguages({ 
    verbose: true,
    dir: '/home/pbeaucha/GitHub/code-highlighter/code-highlighter/dist/src/generated/antlr'
  });
}

test();
