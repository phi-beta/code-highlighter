/** Stub MarkdownMiniLexer (placeholder until real ANTLR generated). */
export class MarkdownMiniLexer {
  static readonly HEADING=1; static readonly INLINE_CODE=2; static readonly COMMENT=3; static readonly TEXT=4; static readonly WS=5; static readonly PUNCT=6; static readonly STRING=7; static readonly NUMBER=8; static readonly KEYWORD=9; 
  static readonly symbolicNames=['','HEADING','INLINE_CODE','COMMENT','TEXT','WS','PUNCT','STRING','NUMBER','KEYWORD'];
  private idx=0; private parts:{type:number;text:string}[]=[];
  constructor(code:string){ this.lex(code); }
  private lex(code:string){
    while(code.length){
      if(/^<!--/.test(code)){ const i=code.indexOf('-->'); const seg=i>=0?code.slice(0,i+3):code; this.parts.push({type:3,text:seg}); code=code.slice(seg.length); continue; }
      if(/^`[^`]+`/.test(code)){ const m=code.match(/^`[^`]+`/)!; this.parts.push({type:2,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^#+/.test(code)){ const m=code.match(/^#+.*?(\r?\n|$)/)!; this.parts.push({type:1,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^\s/.test(code)){ const m=code.match(/^\s+/)!; this.parts.push({type:5,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^[0-9]+/.test(code)){ const m=code.match(/^\d+/)!; this.parts.push({type:8,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^[>*_\-`#]/.test(code)){ const m=code[0]; this.parts.push({type:6,text:m}); code=code.slice(1); continue; }
      // plain text run
      const m=code.match(/^[^\s>*_`#]+/)!; this.parts.push({type:4,text:m[0]}); code=code.slice(m[0].length);
    }
  }
  nextToken(){ if(this.idx>=this.parts.length) return {type:-1,text:undefined}; return this.parts[this.idx++]; }
}
