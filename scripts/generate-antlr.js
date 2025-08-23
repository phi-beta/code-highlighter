// Script: generate ANTLR TypeScript lexer/parser for included grammars.
// Requires: Java + antlr-4.x-complete.jar in path or ANT L R_JAR env var.
// For now this is a placeholder documenting steps.

console.log('[generate-antlr] Placeholder script. To fully implement, download ANTLR jar and run:');
console.log('  java -jar antlr-4.13.1-complete.jar -Dlanguage=TypeScript -o src/grammars grammars/Example.g4');
console.log('Then import generated ExampleLexer in a registration step.');
