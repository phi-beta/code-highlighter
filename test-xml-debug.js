const { execSync } = require('child_process');
const fs = require('fs');

// Write test XML
fs.writeFileSync('test-xml-debug.cjs', '<book id="123" category="fiction">\n  <title lang="en">Test</title>\n</book>');

// Try using direct node execution
try {
  const output = execSync('cd /home/pbeaucha/GitHub/code-highlighter/code-highlighter && node -e "const h = require(\'./dist-cjs/src/index.js\'); h.registerGeneratedAntlrLanguages(); console.log(h.highlight(\'<book id=\\\"test\\\">\', \'xml\', \'html\'));"', { encoding: 'utf-8' });
  console.log('=== XML Attribute Test ===');
  console.log(output);
} catch (error) {
  console.error('Error:', error.message);
}
