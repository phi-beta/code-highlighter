# Standalone Executables

This directory contains standalone executables for the code-highlighter CLI:

- `code-highlight-linux` - Linux x64 executable  
- `code-highlight-win.exe` - Windows x64 executable

## Current Status

⚠️ **Known Issue**: The executables currently have ES module compatibility issues due to the project's use of ES modules and `import.meta.url`. They may not work correctly.

## Alternative Installation Methods

For now, please use one of these alternative methods:

### Global NPM Installation (Recommended)
```bash
npm install -g code-highlighter
code-highlight --help
```

### Direct Node.js Usage
```bash
npm install
npm run build
node dist/src/cli.js --help
```

### Using npx
```bash
npx code-highlighter --help
```

## Build Process

The executables are built using `pkg` and can be regenerated with:

```bash
npm run build:executables
```

## Future Improvements

- Convert to CommonJS or find pkg-compatible ES module solution
- Add proper asset bundling for themes and configurations
- Test cross-platform compatibility
- Reduce executable size through optimization
