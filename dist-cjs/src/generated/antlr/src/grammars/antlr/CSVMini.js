"use strict";
// Generated from src/grammars/antlr/CSVMini.g4 by ANTLR 4.9.0-SNAPSHOT
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
exports.CSVMini = void 0;
const ATNDeserializer_1 = require("antlr4ts/atn/ATNDeserializer");
const Lexer_1 = require("antlr4ts/Lexer");
const LexerATNSimulator_1 = require("antlr4ts/atn/LexerATNSimulator");
const VocabularyImpl_1 = require("antlr4ts/VocabularyImpl");
const Utils = __importStar(require("antlr4ts/misc/Utils"));
class CSVMini extends Lexer_1.Lexer {
    static LPAREN = 1;
    static RPAREN = 2;
    static LBRACE = 3;
    static RBRACE = 4;
    static LBRACKET = 5;
    static RBRACKET = 6;
    static QUOTED_FIELD = 7;
    static COMMA = 8;
    static NEWLINE = 9;
    static NUMBER = 10;
    static FIELD_TEXT = 11;
    static WS = 12;
    // tslint:disable:no-trailing-whitespace
    static channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN",
    ];
    // tslint:disable:no-trailing-whitespace
    static modeNames = [
        "DEFAULT_MODE",
    ];
    static ruleNames = [
        "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET", "QUOTED_FIELD",
        "COMMA", "NEWLINE", "NUMBER", "FIELD_TEXT", "WS", "ESC_QUOTE",
    ];
    static _LITERAL_NAMES = [
        undefined, "'('", "')'", "'{'", "'}'", "'['", "']'", undefined, "','",
    ];
    static _SYMBOLIC_NAMES = [
        undefined, "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACKET", "RBRACKET",
        "QUOTED_FIELD", "COMMA", "NEWLINE", "NUMBER", "FIELD_TEXT", "WS",
    ];
    static VOCABULARY = new VocabularyImpl_1.VocabularyImpl(CSVMini._LITERAL_NAMES, CSVMini._SYMBOLIC_NAMES, []);
    // @Override
    // @NotNull
    get vocabulary() {
        return CSVMini.VOCABULARY;
    }
    // tslint:enable:no-trailing-whitespace
    constructor(input) {
        super(input);
        this._interp = new LexerATNSimulator_1.LexerATNSimulator(CSVMini._ATN, this);
    }
    // @Override
    get grammarFileName() { return "CSVMini.g4"; }
    // @Override
    get ruleNames() { return CSVMini.ruleNames; }
    // @Override
    get serializedATN() { return CSVMini._serializedATN; }
    // @Override
    get channelNames() { return CSVMini.channelNames; }
    // @Override
    get modeNames() { return CSVMini.modeNames; }
    static _serializedATN = "\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x0EV\b\x01\x04" +
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
    static __ATN;
    static get _ATN() {
        if (!CSVMini.__ATN) {
            CSVMini.__ATN = new ATNDeserializer_1.ATNDeserializer().deserialize(Utils.toCharArray(CSVMini._serializedATN));
        }
        return CSVMini.__ATN;
    }
}
exports.CSVMini = CSVMini;
