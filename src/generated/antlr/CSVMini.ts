// Generated from src/grammars/antlr/CSVMini.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class CSVMini extends Lexer {
	public static readonly LPAREN = 1;
	public static readonly RPAREN = 2;
	public static readonly LBRACE = 3;
	public static readonly RBRACE = 4;
	public static readonly LBRACKET = 5;
	public static readonly RBRACKET = 6;
	public static readonly QUOTED_FIELD = 7;
	public static readonly COMMA = 8;
	public static readonly NEWLINE = 9;
	public static readonly NUMBER = 10;
	public static readonly FIELD_TEXT = 11;
	public static readonly WS = 12;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", "QUOTED_FIELD", 
		"COMMA", "NEWLINE", "NUMBER", "FIELD_TEXT", "WS", "ESC_QUOTE",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", undefined, "','",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", 
		"QUOTED_FIELD", "COMMA", "NEWLINE", "NUMBER", "FIELD_TEXT", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(CSVMini._LITERAL_NAMES, CSVMini._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return CSVMini.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(CSVMini._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "CSVMini.g4"; }

	// @Override
	public get ruleNames(): string[] { return CSVMini.ruleNames; }

	// @Override
	public get serializedATN(): string { return CSVMini._serializedATN; }

	// @Override
	public get channelNames(): string[] { return CSVMini.channelNames; }

	// @Override
	public get modeNames(): string[] { return CSVMini.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x0EV\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05" +
		"\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\b\x07\b-\n\b" +
		"\f\b\x0E\b0\v\b\x03\b\x03\b\x03\t\x03\t\x03\n\x05\n7\n\n\x03\n\x03\n\x03" +
		"\v\x06\v<\n\v\r\v\x0E\v=\x03\v\x03\v\x06\vB\n\v\r\v\x0E\vC\x05\vF\n\v" +
		"\x03\f\x06\fI\n\f\r\f\x0E\fJ\x03\r\x06\rN\n\r\r\r\x0E\rO\x03\r\x03\r\x03" +
		"\x0E\x03\x0E\x03\x0E\x02\x02\x02\x0F\x03\x02\x03\x05\x02\x04\x07\x02\x05" +
		"\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x17" +
		"\x02\r\x19\x02\x0E\x1B\x02\x02\x03\x02\x06\x03\x02$$\x03\x022;\x06\x02" +
		"\f\f\x0F\x0F$$..\x04\x02\v\v\"\"\x02\\\x02\x03\x03\x02\x02\x02\x02\x05" +
		"\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03" +
		"\x02\x02\x02\x02\r\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03" +
		"\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02\x15\x03\x02\x02\x02\x02\x17\x03" +
		"\x02\x02\x02\x02\x19\x03\x02\x02\x02\x03\x1D\x03\x02\x02\x02\x05\x1F\x03" +
		"\x02\x02\x02\x07!\x03\x02\x02\x02\t#\x03\x02\x02\x02\v%\x03\x02\x02\x02" +
		"\r\'\x03\x02\x02\x02\x0F)\x03\x02\x02\x02\x113\x03\x02\x02\x02\x136\x03" +
		"\x02\x02\x02\x15;\x03\x02\x02\x02\x17H\x03\x02\x02\x02\x19M\x03\x02\x02" +
		"\x02\x1BS\x03\x02\x02\x02\x1D\x1E\x07*\x02\x02\x1E\x04\x03\x02\x02\x02" +
		"\x1F \x07+\x02\x02 \x06\x03\x02\x02\x02!\"\x07}\x02\x02\"\b\x03\x02\x02" +
		"\x02#$\x07\x7F\x02\x02$\n\x03\x02\x02\x02%&\x07]\x02\x02&\f\x03\x02\x02" +
		"\x02\'(\x07_\x02\x02(\x0E\x03\x02\x02\x02).\x07$\x02\x02*-\x05\x1B\x0E" +
		"\x02+-\n\x02\x02\x02,*\x03\x02\x02\x02,+\x03\x02\x02\x02-0\x03\x02\x02" +
		"\x02.,\x03\x02\x02\x02./\x03\x02\x02\x02/1\x03\x02\x02\x020.\x03\x02\x02" +
		"\x0212\x07$\x02\x022\x10\x03\x02\x02\x0234\x07.\x02\x024\x12\x03\x02\x02" +
		"\x0257\x07\x0F\x02\x0265\x03\x02\x02\x0267\x03\x02\x02\x0278\x03\x02\x02" +
		"\x0289\x07\f\x02\x029\x14\x03\x02\x02\x02:<\t\x03\x02\x02;:\x03\x02\x02" +
		"\x02<=\x03\x02\x02\x02=;\x03\x02\x02\x02=>\x03\x02\x02\x02>E\x03\x02\x02" +
		"\x02?A\x070\x02\x02@B\t\x03\x02\x02A@\x03\x02\x02\x02BC\x03\x02\x02\x02" +
		"CA\x03\x02\x02\x02CD\x03\x02\x02\x02DF\x03\x02\x02\x02E?\x03\x02\x02\x02" +
		"EF\x03\x02\x02\x02F\x16\x03\x02\x02\x02GI\n\x04\x02\x02HG\x03\x02\x02" +
		"\x02IJ\x03\x02\x02\x02JH\x03\x02\x02\x02JK\x03\x02\x02\x02K\x18\x03\x02" +
		"\x02\x02LN\t\x05\x02\x02ML\x03\x02\x02\x02NO\x03\x02\x02\x02OM\x03\x02" +
		"\x02\x02OP\x03\x02\x02\x02PQ\x03\x02\x02\x02QR\b\r\x02\x02R\x1A\x03\x02" +
		"\x02\x02ST\x07$\x02\x02TU\x07$\x02\x02U\x1C\x03\x02\x02\x02\v\x02,.6=" +
		"CEJO\x03\b\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!CSVMini.__ATN) {
			CSVMini.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(CSVMini._serializedATN));
		}

		return CSVMini.__ATN;
	}

}

