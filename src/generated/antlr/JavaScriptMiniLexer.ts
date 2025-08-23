/** Stub JavaScriptMiniLexer (placeholder until real ANTLR generated). */
export class JavaScriptMiniLexer {
  static readonly KEYWORD = 1; static readonly STRING = 2; static readonly NUMBER = 3; static readonly IDENTIFIER = 4; static readonly PUNCT = 5; static readonly WS = 6; static readonly COMMENT = 7; 
  static readonly symbolicNames = [ '', 'KEYWORD','STRING','NUMBER','IDENTIFIER','PUNCT','WS','COMMENT' ];
  private index = 0; private parts: { type: number; text: string }[] = [];
  constructor(code: string) { this.lex(code); }
  private lex(code: string) {
    const kw = /^(break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|function|if|import|in|instanceof|let|new|return|super|switch|this|throw|try|typeof|var|void|while|with|yield|enum|await|implements|package|protected|static|interface|private|public)\b/;
    while (code.length) {
      if (/^\/\//.test(code)) { const m = code.match(/^\/\/.*?(\r?\n|$)/)!; this.parts.push({ type:7, text:m[0]}); code = code.slice(m[0].length); continue; }
      if (/^\/\*/.test(code)) { const i = code.indexOf('*/'); const seg = i>=0? code.slice(0,i+2): code; this.parts.push({ type:7, text:seg}); code = code.slice(seg.length); continue; }
      if (/^`/.test(code)) { const m = code.match(/^`(?:\\.|[^`\\])*`/); if(m){ this.parts.push({type:2,text:m[0]}); code=code.slice(m[0].length); continue;} }
      if (/^"/.test(code)||/^'/.test(code)) { const m = code.match(/^"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/); if(m){ this.parts.push({type:2,text:m[0]}); code=code.slice(m[0].length); continue;} }
      if (/^[0-9]/.test(code)) { const m = code.match(/^\d+(?:\.\d+)?/)!; this.parts.push({type:3,text:m[0]}); code=code.slice(m[0].length); continue; }
      if (kw.test(code)) { const m = code.match(kw)!; this.parts.push({type:1,text:m[0]}); code=code.slice(m[0].length); continue; }
      if (/^[A-Za-z_$]/.test(code)) { const m = code.match(/^[A-Za-z_$][A-Za-z0-9_$]*/)!; this.parts.push({type:4,text:m[0]}); code=code.slice(m[0].length); continue; }
      if (/^\s/.test(code)) { const m = code.match(/^\s+/)!; this.parts.push({type:6,text:m[0]}); code=code.slice(m[0].length); continue; }
      const m = code[0]; this.parts.push({ type:5, text:m }); code = code.slice(1);
    }
  }
  nextToken() { if (this.index >= this.parts.length) return { type: -1, text: undefined }; return this.parts[this.index++]; }
}
