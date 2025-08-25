"use strict";
// Generated from src/grammars/antlr/CsvMini.g4 by ANTLR 4.9.0-SNAPSHOT
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvMini = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class CsvMini extends Lexer_1.Lexer {
    static LPAREN = 1;
    static RPAREN = 2;
    static LBRACE = 3;
    static RBRACE = 4;
    static LBRACKET = 5;
    static RBRACKET = 6;
    static COMMA = 7;
    static SEMICOLON = 8;
    static TAB = 9;
    static PIPE = 10;
    static QUOTED_FIELD = 11;
    static NUMBER = 12;
    static BOOLEAN = 13;
    static EMPTY_FIELD = 14;
    static UNQUOTED_FIELD = 15;
    static NEWLINE = 16;
    static WHITESPACE = 17;
    // tslint:disable:no-trailing-whitespace
    static channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN",
    ];
    // tslint:disable:no-trailing-whitespace
    static modeNames = [
        "DEFAULT_MODE",
    ];
    static ruleNames = [
        "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", "COMMA",
        "SEMICOLON", "TAB", "PIPE", "QUOTED_FIELD", "NUMBER", "BOOLEAN", "EMPTY_FIELD",
        "UNQUOTED_FIELD", "NEWLINE", "WHITESPACE",
    ];
    static _LITERAL_NAMES = [
        undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", "','", "';'", "'\t'",
        "'|'", undefined, undefined, undefined, "'\"\"'",
    ];
    static _SYMBOLIC_NAMES = [
        undefined, "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET",
        "COMMA", "SEMICOLON", "TAB", "PIPE", "QUOTED_FIELD", "NUMBER", "BOOLEAN",
        "EMPTY_FIELD", "UNQUOTED_FIELD", "NEWLINE", "WHITESPACE",
    ];
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(CsvMini._LITERAL_NAMES, CsvMini._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return CsvMini.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(CsvMini._ATN, this);
    }
    // @Override
    get grammarFileName() { return "CsvMini.g4"; }
    // @Override
    get ruleNames() { return CsvMini.ruleNames; }
    // @Override
    get serializedATN() { return CsvMini._serializedATN; }
    // @Override
    get channelNames() { return CsvMini.channelNames; }
    // @Override
    get modeNames() { return CsvMini.modeNames; }
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x13\x8E\b\x01" +
        "\x04\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06" +
        "\x04\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r" +
        "\t\r\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t" +
        "\x12\x03\x02\x03\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03" +
        "\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\t\x03\t\x03\n\x03\n\x03\v" +
        "\x03\v\x03\f\x03\f\x03\f\x03\f\x07\f>\n\f\f\f\x0E\fA\v\f\x03\f\x03\f\x03" +
        "\r\x05\rF\n\r\x03\r\x06\rI\n\r\r\r\x0E\rJ\x03\r\x03\r\x06\rO\n\r\r\r\x0E" +
        "\rP\x05\rS\n\r\x03\r\x03\r\x05\rW\n\r\x03\r\x06\rZ\n\r\r\r\x0E\r[\x05" +
        "\r^\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
        "\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
        "\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E" +
        "\x03\x0E\x05\x0E{\n\x0E\x03\x0F\x03\x0F\x03\x0F\x03\x10\x06\x10\x81\n" +
        "\x10\r\x10\x0E\x10\x82\x03\x11\x06\x11\x86\n\x11\r\x11\x0E\x11\x87\x03" +
        "\x12\x06\x12\x8B\n\x12\r\x12\x0E\x12\x8C\x02\x02\x02\x13\x03\x02\x03\x05" +
        "\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13" +
        "\x02\v\x15\x02\f\x17\x02\r\x19\x02\x0E\x1B\x02\x0F\x1D\x02\x10\x1F\x02" +
        "\x11!\x02\x12#\x02\x13\x03\x02\t\x03\x02$$\x03\x022;\x04\x02GGgg\x04\x02" +
        "--//\b\x02\v\f\x0F\x0F$$..==~~\x04\x02\f\f\x0F\x0F\x03\x02\"\"\x02\x9E" +
        "\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07\x03\x02\x02\x02" +
        "\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03\x02\x02\x02\x02" +
        "\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03\x02\x02\x02\x02" +
        "\x15\x03\x02\x02\x02\x02\x17\x03\x02\x02\x02\x02\x19\x03\x02\x02\x02\x02" +
        "\x1B\x03\x02\x02\x02\x02\x1D\x03\x02\x02\x02\x02\x1F\x03\x02\x02\x02\x02" +
        "!\x03\x02\x02\x02\x02#\x03\x02\x02\x02\x03%\x03\x02\x02\x02\x05\'\x03" +
        "\x02\x02\x02\x07)\x03\x02\x02\x02\t+\x03\x02\x02\x02\v-\x03\x02\x02\x02" +
        "\r/\x03\x02\x02\x02\x0F1\x03\x02\x02\x02\x113\x03\x02\x02\x02\x135\x03" +
        "\x02\x02\x02\x157\x03\x02\x02\x02\x179\x03\x02\x02\x02\x19E\x03\x02\x02" +
        "\x02\x1Bz\x03\x02\x02\x02\x1D|\x03\x02\x02\x02\x1F\x80\x03\x02\x02\x02" +
        "!\x85\x03\x02\x02\x02#\x8A\x03\x02\x02\x02%&\x07*\x02\x02&\x04\x03\x02" +
        "\x02\x02\'(\x07+\x02\x02(\x06\x03\x02\x02\x02)*\x07}\x02\x02*\b\x03\x02" +
        "\x02\x02+,\x07\x7F\x02\x02,\n\x03\x02\x02\x02-.\x07]\x02\x02.\f\x03\x02" +
        "\x02\x02/0\x07_\x02\x020\x0E\x03\x02\x02\x0212\x07.\x02\x022\x10\x03\x02" +
        "\x02\x0234\x07=\x02\x024\x12\x03\x02\x02\x0256\x07\v\x02\x026\x14\x03" +
        "\x02\x02\x0278\x07~\x02\x028\x16\x03\x02\x02\x029?\x07$\x02\x02:;\x07" +
        "$\x02\x02;>\x07$\x02\x02<>\n\x02\x02\x02=:\x03\x02\x02\x02=<\x03\x02\x02" +
        "\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02?@\x03\x02\x02\x02@B\x03\x02\x02" +
        "\x02A?\x03\x02\x02\x02BC\x07$\x02\x02C\x18\x03\x02\x02\x02DF\x07/\x02" +
        "\x02ED\x03\x02\x02\x02EF\x03\x02\x02\x02FH\x03\x02\x02\x02GI\t\x03\x02" +
        "\x02HG\x03\x02\x02\x02IJ\x03\x02\x02\x02JH\x03\x02\x02\x02JK\x03\x02\x02" +
        "\x02KR\x03\x02\x02\x02LN\x070\x02\x02MO\t\x03\x02\x02NM\x03\x02\x02\x02" +
        "OP\x03\x02\x02\x02PN\x03\x02\x02\x02PQ\x03\x02\x02\x02QS\x03\x02\x02\x02" +
        "RL\x03\x02\x02\x02RS\x03\x02\x02\x02S]\x03\x02\x02\x02TV\t\x04\x02\x02" +
        "UW\t\x05\x02\x02VU\x03\x02\x02\x02VW\x03\x02\x02\x02WY\x03\x02\x02\x02" +
        "XZ\t\x03\x02\x02YX\x03\x02\x02\x02Z[\x03\x02\x02\x02[Y\x03\x02\x02\x02" +
        "[\\\x03\x02\x02\x02\\^\x03\x02\x02\x02]T\x03\x02\x02\x02]^\x03\x02\x02" +
        "\x02^\x1A\x03\x02\x02\x02_`\x07v\x02\x02`a\x07t\x02\x02ab\x07w\x02\x02" +
        "b{\x07g\x02\x02cd\x07h\x02\x02de\x07c\x02\x02ef\x07n\x02\x02fg\x07u\x02" +
        "\x02g{\x07g\x02\x02hi\x07V\x02\x02ij\x07T\x02\x02jk\x07W\x02\x02k{\x07" +
        "G\x02\x02lm\x07H\x02\x02mn\x07C\x02\x02no\x07N\x02\x02op\x07U\x02\x02" +
        "p{\x07G\x02\x02qr\x07V\x02\x02rs\x07t\x02\x02st\x07w\x02\x02t{\x07g\x02" +
        "\x02uv\x07H\x02\x02vw\x07c\x02\x02wx\x07n\x02\x02xy\x07u\x02\x02y{\x07" +
        "g\x02\x02z_\x03\x02\x02\x02zc\x03\x02\x02\x02zh\x03\x02\x02\x02zl\x03" +
        "\x02\x02\x02zq\x03\x02\x02\x02zu\x03\x02\x02\x02{\x1C\x03\x02\x02\x02" +
        "|}\x07$\x02\x02}~\x07$\x02\x02~\x1E\x03\x02\x02\x02\x7F\x81\n\x06\x02" +
        "\x02\x80\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x80\x03\x02\x02" +
        "\x02\x82\x83\x03\x02\x02\x02\x83 \x03\x02\x02\x02\x84\x86\t\x07\x02\x02" +
        "\x85\x84\x03\x02\x02\x02\x86\x87\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02" +
        "\x87\x88\x03\x02\x02\x02\x88\"\x03\x02\x02\x02\x89\x8B\t\b\x02\x02\x8A" +
        "\x89\x03\x02\x02\x02\x8B\x8C\x03\x02\x02\x02\x8C\x8A\x03\x02\x02\x02\x8C" +
        "\x8D\x03\x02\x02\x02\x8D$\x03\x02\x02\x02\x10\x02=?EJPRV[]z\x82\x87\x8C" +
        "\x02";
    static __ATN;
    static get _ATN() {
        if (!CsvMini.__ATN) {
            CsvMini.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(CsvMini._serializedATN));
        }
        return CsvMini.__ATN;
    }
}
exports.CsvMini = CsvMini;
