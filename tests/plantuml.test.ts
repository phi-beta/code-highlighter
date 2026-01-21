import { describe, test, expect } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight, listLanguages } from '../src/index.js';

describe('PlantUML Syntax Highlighting', () => {
  test('should register plantuml language', async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
    const languages = listLanguages();
    expect(languages).toContain('plantuml');
  });

  test('should highlight PlantUML sequence diagram', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `@startuml
participant User
participant System
User -> System: Request
System --> User: Response
@enduml`;

    const html = highlight(code, { language: 'plantuml', output: 'html' });
    
    // Check for start/end directives
    expect(html).toContain('tok-keyword');
    expect(html).toContain('@startuml');
    expect(html).toContain('@enduml');
    
    // Check for participant keywords
    expect(html).toContain('participant');
    
    // Check for arrows (operators) - HTML escaped
    expect(html).toContain('-&gt;');
    expect(html).toContain('--&gt;');
  });

  test('should highlight PlantUML class diagram', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `@startuml
class Product {
  - id: int
  + getPrice(): decimal
}
interface PaymentMethod
Product *-- PaymentMethod
@enduml`;

    const html = highlight(code, { language: 'plantuml', output: 'html' });
    
    // Check for class keywords
    expect(html).toContain('class');
    expect(html).toContain('interface');
    
    // Check for relationships
    expect(html).toContain('*--');
  });

  test('should highlight PlantUML with colors', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `@startuml
skinparam backgroundColor #FEFECE
class MyClass
@enduml`;

    const html = highlight(code, { language: 'plantuml', output: 'html' });
    
    // Check for skinparam keyword
    expect(html).toContain('skinparam');
    
    // Check for hex color (may be tokenized as tok-color)
    expect(html).toContain('tok-color');
  });

  test('should highlight PlantUML comments', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `@startuml
' This is a comment
participant User
@enduml`;

    const html = highlight(code, { language: 'plantuml', output: 'html' });
    
    // Check for comment highlighting
    expect(html).toContain('tok-comment');
  });
});
