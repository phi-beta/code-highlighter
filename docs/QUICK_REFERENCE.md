# Language Implementation Quick Reference

## 🚨 Critical Rule #1: Token Separation
```antlr
❌ FUNCTION: 'var' '(';     // Breaks bracket matching
✅ FUNCTION: 'var';         // Separate tokens
✅ LPAREN: '(';
```

## 📋 30-Second Checklist
- [ ] Copy grammar template from `docs/IMPLEMENTATION_GUIDE.md`
- [ ] Test bracket matching FIRST with debug test
- [ ] Add token mappings in `register-antlr.ts`
- [ ] Verify no "tok-bracket-unmatched" in output
- [ ] Add language features incrementally

## 🔧 Essential Commands
```bash
npm run generate:antlr                    # Regenerate grammar
npm test tests/[lang]-debug.test.ts       # Test bracket matching
npm run samples:generate                  # Generate sample output
```

## 📁 Files to Create/Update
1. `src/grammars/antlr/[Lang]Mini.g4` - Grammar
2. `src/register-antlr.ts` - Token mappings
3. `tests/[lang]-debug.test.ts` - Debug test
4. `samples/inputs/[lang].[ext]` - Sample file

## 🎯 Success Criteria
- No "unmatched brackets" in function calls
- Basic syntax highlighting works
- Debug test passes

## ⏱️ Time Estimate
- With guide: 1-2 hours
- Without guide: 8+ hours (like CSS)

See `docs/IMPLEMENTATION_GUIDE.md` for full details.
