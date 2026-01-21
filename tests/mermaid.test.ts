import { describe, test, expect } from 'vitest';
import { registerGeneratedAntlrLanguages } from '../src/register-antlr.js';
import { highlight, listLanguages } from '../src/index.js';

describe('Mermaid Syntax Highlighting', () => {
  test('should register mermaid language', async () => {
    await registerGeneratedAntlrLanguages({ verbose: true });
    const languages = listLanguages();
    expect(languages).toContain('mermaid');
  });

  test('should highlight Mermaid flowchart', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[End]
    B -->|No| D[Loop]`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for graph keyword
    expect(html).toContain('tok-keyword');
    expect(html).toContain('graph');
    
    // Check for direction
    expect(html).toContain('TD');
    
    // Check for arrows - HTML escaped
    expect(html).toContain('--&gt;');
  });

  test('should highlight Mermaid sequence diagram', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `sequenceDiagram
    participant User
    participant Server
    User->>Server: Request
    Server-->>User: Response`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for sequenceDiagram keyword
    expect(html).toContain('sequenceDiagram');
    
    // Check for participant
    expect(html).toContain('participant');
    
    // Check that the code is being highlighted (has tok classes)
    expect(html).toMatch(/tok-[a-z]+/);
  });

  test('should highlight Mermaid with alt/else', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `sequenceDiagram
    alt success
        Server-->>User: OK
    else failure
        Server-->>User: Error
    end`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for alt/else/end keywords
    expect(html).toContain('alt');
    expect(html).toContain('else');
    expect(html).toContain('end');
  });

  test('should highlight Mermaid class diagram', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `classDiagram
    class Animal {
        +int age
        +String name
    }
    Animal <|-- Dog`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for classDiagram keyword
    expect(html).toContain('classDiagram');
    
    // Check for class keyword
    expect(html).toContain('class');
    
    // Check for inheritance arrow
    expect(html).toContain('&lt;|--');
  });

  test('should highlight Mermaid comments', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `graph TD
    %% This is a comment
    A --> B`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for comment highlighting
    expect(html).toContain('tok-comment');
    expect(html).toContain('This is a comment');
  });

  test('should highlight Mermaid with colors', async () => {
    await registerGeneratedAntlrLanguages({ verbose: false });
    
    const code = `graph TD
    A[Node]
    style A fill:#90EE90,stroke:#333`;

    const html = highlight(code, { language: 'mermaid', output: 'html' });
    
    // Check for style keyword
    expect(html).toContain('style');
    
    // Check for hex colors (tokenized as tok-color)
    expect(html).toContain('tok-color');
  });
});
