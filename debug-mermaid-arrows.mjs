import { registerGeneratedAntlrLanguages } from './dist/src/register-antlr.js';
import { highlight } from './dist/src/index.js';

await registerGeneratedAntlrLanguages({ verbose: false });

const code = `sequenceDiagram
    participant User
    participant Server
    User->>Server: Request
    Server-->>User: Response`;

const html = highlight(code, { language: 'mermaid', output: 'html' });
console.log('HTML OUTPUT:');
console.log(html);
console.log('\nChecking for >>:', html.includes('>>'));
console.log('Checking for &gt;&gt;:', html.includes('&gt;&gt;'));
