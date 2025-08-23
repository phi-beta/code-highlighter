- [x] Verify that the copilot-instructions.md file in the .github directory is created.
  - Created on initial scaffold.

- [x] Clarify Project Requirements
  - Goal: TypeScript library + CLI for syntax highlighting (initially JavaScript). Outputs HTML & ANSI, supports theming, provides ESM build + types, Vitest tests, bin `code-highlight`.

- [x] Scaffold the Project
  - Added package.json, tsconfig, src/index.ts, src/cli.ts, vitest config, test file, README, .gitignore.

- [x] Customize the Project
  - Implemented tokenizer, highlight function, CLI args, tests, theme support.
  - Expanded: language registry, Python tokenizer, CLI flags (--lang, --theme, --list-languages), theme JSON loading, README updated.
  - Added experimental ANTLR adapter scaffold (adapter file, example grammar, README section, dependency) for future precise tokenization.

- [x] Install Required Extensions
  - No specific extensions required beyond default TypeScript (none installed).
- [x] Compile the Project
  - Installed deps, fixed tsconfig, build succeeded, tests pass.
- [x] Create and Run Task
  - Added .vscode/tasks.json with build and test tasks.
- [x] Launch the Project
  - CLI executed successfully producing sample.html.
- [x] Ensure Documentation is Complete
  - README present; instructions reflect current functionality.
