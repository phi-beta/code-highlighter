/** Stub JsonMiniLexer (placeholder until real ANTLR generated). */
export class JsonMiniLexer {
  static readonly STRING=1; static readonly NUMBER=2; static readonly KEYWORD=3; static readonly PUNCT=4; static readonly WS=5;
  static readonly symbolicNames=['','STRING','NUMBER','KEYWORD','PUNCT','WS'];
  private idx=0; private parts:{type:number;text:string}[]=[];
  constructor(code:string){ this.lex(code); }
  private lex(code:string){
    while(code.length){
      if(/^\s/.test(code)){ const m=code.match(/^\s+/)!; this.parts.push({type:5,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^"/.test(code)){ const m=code.match(/^"(?:\\.|[^"\\])*"/)!; this.parts.push({type:1,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^(true|false|null)\b/.test(code)){ const m=code.match(/^(true|false|null)\b/)!; this.parts.push({type:3,text:m[0]}); code=code.slice(m[0].length); continue; }
      if(/^[0-9-]/.test(code)){ const m=code.match(/^-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/)!; this.parts.push({type:2,text:m[0]}); code=code.slice(m[0].length); continue; }
      const ch=code[0]; if(/[{}\[\]:,]/.test(ch)) { this.parts.push({type:4,text:ch}); code=code.slice(1); continue; }
      // fallback
      this.parts.push({type:4,text:code[0]}); code=code.slice(1);
    }
  }
  nextToken(){ if(this.idx>=this.parts.length) return { type:-1, text: undefined }; return this.parts[this.idx++]; }
}
