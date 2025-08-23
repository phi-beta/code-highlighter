/** Stub BashMiniLexer (placeholder until real ANTLR generated). */
export class BashMiniLexer {
  static readonly KEYWORD=1; static readonly STRING=2; static readonly IDENTIFIER=3; static readonly NUMBER=4; static readonly PUNCT=5; static readonly WS=6; static readonly COMMENT=7;
  static readonly symbolicNames=['','KEYWORD','STRING','IDENTIFIER','NUMBER','PUNCT','WS','COMMENT'];
  private i=0; private parts:{type:number;text:string}[]=[];
  constructor(code:string){ this.lex(code); }
  private lex(code:string){
    const kw=/^(if|then|else|elif|fi|for|while|in|do|done|case|esac|function|select|time)\b/;
    while(code.length){
      if(/^#/.test(code)){ const m=code.match(/^#.*?(\r?\n|$)/)!; this.parts.push({type:7,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^"/.test(code)||/^'/.test(code)){ const m=code.match(/^'(?:[^']*)'|"(?:\\.|[^"\\])*"/)!; this.parts.push({type:2,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(kw.test(code)){ const m=code.match(kw)!; this.parts.push({type:1,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^[A-Za-z_]/.test(code)){ const m=code.match(/^[A-Za-z_][A-Za-z0-9_]*/)!; this.parts.push({type:3,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^[0-9]/.test(code)){ const m=code.match(/^\d+/)!; this.parts.push({type:4,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^\s/.test(code)){ const m=code.match(/^\s+/)!; this.parts.push({type:6,text:m[0]}); code=code.slice(m[0].length); continue; }
      const ch=code[0]; this.parts.push({type:5,text:ch}); code=code.slice(1);
    }
  }
  nextToken(){ if(this.i>=this.parts.length) return { type:-1, text: undefined }; return this.parts[this.i++]; }
}
