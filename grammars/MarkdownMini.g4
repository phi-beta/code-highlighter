// Minimal Markdown lexer grammar (very rough)
lexer grammar MarkdownMini;

HEADING: '#'+' '+ ~[\r\n]*;
CODE_FENCE: '```' ~[\r\n]* ('\r'? '\n')? ('```');
INLINE_CODE: '`' (~[`\r\n])+ '`';
BOLD: '**' (~[*\r\n] | '*' ~'*')+ '**';
ITALIC: '*' (~[*\r\n])+ '*';
LINK: '[' (~[\]\r\n])+ ']' '(' (~[)\r\n])+ ')';
COMMENT: '<!--' .*? '-->';
TEXT: ~[\r\n]+;
NEWLINE: ('\r'? '\n');
WS: [ \t]+;
