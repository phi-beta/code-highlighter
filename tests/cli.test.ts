import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

describe('CLI (dist/src/cli.js)', () => {
  const cliPath = join(process.cwd(), 'dist/src/cli.js');
  const tempFile = join(process.cwd(), '.test-cli-temp.txt');

  beforeAll(() => {
    // Verify CLI exists
    if (!existsSync(cliPath)) {
      throw new Error(`CLI not built: ${cliPath} does not exist. Run 'npm run build' first.`);
    }
  });

  afterEach(() => {
    // Cleanup temp file
    if (existsSync(tempFile)) {
      unlinkSync(tempFile);
    }
  });

  it('should exist and be executable', () => {
    expect(existsSync(cliPath)).toBe(true);
  });

  it('should show help message with --help', () => {
    const output = execSync(`node "${cliPath}" --help`, { encoding: 'utf-8' });
    
    expect(output).toContain('USAGE:');
    expect(output).toContain('code-highlight');
    expect(output).toContain('--lang');
    expect(output).toContain('--output');
    expect(output).toContain('--theme');
  });

  it('should list languages with --list-languages', () => {
    const output = execSync(`node "${cliPath}" --list-languages`, { encoding: 'utf-8' });
    
    expect(output).toContain('bash');
    expect(output).toContain('javascript');
    expect(output).toContain('python');
    expect(output).toContain('c');
    expect(output).toContain('go');
    expect(output).toContain('rust');
  });

  it('should highlight JavaScript code to HTML', () => {
    writeFileSync(tempFile, 'const x = 42;');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang javascript --output html`, { encoding: 'utf-8' });
    
    expect(output).toContain('<pre class="ch-pre">');
    expect(output).toContain('<code class="ch-code lang-javascript">');
    expect(output).toContain('tok-keyword');
    expect(output).toContain('const');
    expect(output).toContain('tok-number');
    expect(output).toContain('42');
  });

  it('should highlight C code to HTML', () => {
    writeFileSync(tempFile, 'int main() { return 0; }');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang c --output html`, { encoding: 'utf-8' });
    
    expect(output).toContain('<pre class="ch-pre">');
    expect(output).toContain('tok-type');
    expect(output).toContain('int');
    expect(output).toContain('tok-keyword');
    expect(output).toContain('return');
  });

  it('should highlight Python code to ANSI', () => {
    writeFileSync(tempFile, 'def hello():\n    print("world")');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang python --output ansi`, { encoding: 'utf-8' });
    
    expect(output).toContain('def');
    expect(output).toContain('hello');
    expect(output).toContain('print');
    // ANSI output should contain escape codes
    expect(output).toMatch(/\x1b\[\d+m/);
  });

  it('should explicitly specify language when file extension is ambiguous', () => {
    const jsFile = join(process.cwd(), '.test-cli-temp.js');
    writeFileSync(jsFile, 'const x = 42;');
    
    try {
      const output = execSync(`node "${cliPath}" "${jsFile}" --lang javascript --output html`, { encoding: 'utf-8' });
      
      expect(output).toContain('lang-javascript');
      expect(output).toContain('tok-keyword');
    } finally {
      if (existsSync(jsFile)) unlinkSync(jsFile);
    }
  });

  it('should apply custom theme', () => {
    writeFileSync(tempFile, 'const x = 42;');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang javascript --output html --theme github`, { encoding: 'utf-8' });
    
    expect(output).toContain('style="color:');
    expect(output).toContain('tok-keyword');
  });

  it('should error on missing file', () => {
    try {
      execSync(`node "${cliPath}" nonexistent-file.js`, { encoding: 'utf-8', stdio: 'pipe' });
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.status).toBe(1);
    }
  });

  it('should error on invalid language', () => {
    writeFileSync(tempFile, 'test');
    
    try {
      execSync(`node "${cliPath}" "${tempFile}" --lang invalid-lang`, { encoding: 'utf-8', stdio: 'pipe' });
      expect.fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.status).toBe(1);
      expect(error.stderr.toString()).toContain('invalid-lang');
    }
  });

  it('should handle empty file', () => {
    writeFileSync(tempFile, '');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang javascript --output html`, { encoding: 'utf-8' });
    
    expect(output).toContain('<pre class="ch-pre">');
    expect(output).toContain('<code class="ch-code');
  });

  it('should highlight multi-line code correctly', () => {
    writeFileSync(tempFile, 'function test() {\n  return 42;\n}\ntest();');
    
    const output = execSync(`node "${cliPath}" "${tempFile}" --lang javascript --output html`, { encoding: 'utf-8' });
    
    expect(output).toContain('function');
    expect(output).toContain('return');
    expect(output).toContain('42');
    expect(output).toContain('test');
  });
});
