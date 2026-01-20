// Generated from src/grammars/antlr/SqlMini.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { SqlMiniListener } from "./SqlMiniListener";

export class SqlMiniParser extends Parser {
	public static readonly SELECT = 1;
	public static readonly FROM = 2;
	public static readonly WHERE = 3;
	public static readonly INSERT = 4;
	public static readonly INTO = 5;
	public static readonly VALUES = 6;
	public static readonly UPDATE = 7;
	public static readonly SET = 8;
	public static readonly DELETE = 9;
	public static readonly CREATE = 10;
	public static readonly DROP = 11;
	public static readonly ALTER = 12;
	public static readonly TABLE = 13;
	public static readonly VIEW = 14;
	public static readonly INDEX = 15;
	public static readonly DATABASE = 16;
	public static readonly SCHEMA = 17;
	public static readonly USE = 18;
	public static readonly SHOW = 19;
	public static readonly TABLES = 20;
	public static readonly DATABASES = 21;
	public static readonly COLUMNS = 22;
	public static readonly DESCRIBE = 23;
	public static readonly DESC = 24;
	public static readonly DISTINCT = 25;
	public static readonly GROUP = 26;
	public static readonly BY = 27;
	public static readonly HAVING = 28;
	public static readonly ORDER = 29;
	public static readonly ASC = 30;
	public static readonly DESC_ORDER = 31;
	public static readonly LIMIT = 32;
	public static readonly AS = 33;
	public static readonly IF = 34;
	public static readonly EXISTS = 35;
	public static readonly ADD = 36;
	public static readonly MODIFY = 37;
	public static readonly AND = 38;
	public static readonly OR = 39;
	public static readonly NOT = 40;
	public static readonly NULL = 41;
	public static readonly TRUE = 42;
	public static readonly FALSE = 43;
	public static readonly PRIMARY = 44;
	public static readonly FOREIGN = 45;
	public static readonly KEY = 46;
	public static readonly REFERENCES = 47;
	public static readonly UNIQUE = 48;
	public static readonly AUTO_INCREMENT = 49;
	public static readonly DEFAULT = 50;
	public static readonly VARCHAR = 51;
	public static readonly CHAR = 52;
	public static readonly INT = 53;
	public static readonly INTEGER = 54;
	public static readonly BIGINT = 55;
	public static readonly SMALLINT = 56;
	public static readonly TINYINT = 57;
	public static readonly DECIMAL = 58;
	public static readonly NUMERIC = 59;
	public static readonly FLOAT = 60;
	public static readonly DOUBLE = 61;
	public static readonly REAL = 62;
	public static readonly DATE = 63;
	public static readonly TIME = 64;
	public static readonly DATETIME = 65;
	public static readonly TIMESTAMP = 66;
	public static readonly TEXT = 67;
	public static readonly BLOB = 68;
	public static readonly BOOLEAN = 69;
	public static readonly EQUALS = 70;
	public static readonly NOT_EQUALS = 71;
	public static readonly LESS_THAN = 72;
	public static readonly GREATER_THAN = 73;
	public static readonly LESS_EQUALS = 74;
	public static readonly GREATER_EQUALS = 75;
	public static readonly PLUS = 76;
	public static readonly MINUS = 77;
	public static readonly MULTIPLY = 78;
	public static readonly DIVIDE = 79;
	public static readonly MODULO = 80;
	public static readonly SEMICOLON = 81;
	public static readonly COMMA = 82;
	public static readonly LPAREN = 83;
	public static readonly RPAREN = 84;
	public static readonly STRING = 85;
	public static readonly QUOTED_IDENTIFIER = 86;
	public static readonly NUMBER = 87;
	public static readonly BOOLEAN_LITERAL = 88;
	public static readonly IDENTIFIER = 89;
	public static readonly COMMENT = 90;
	public static readonly WS = 91;
	public static readonly RULE_sqlFile = 0;
	public static readonly RULE_statement = 1;
	public static readonly RULE_selectStatement = 2;
	public static readonly RULE_insertStatement = 3;
	public static readonly RULE_updateStatement = 4;
	public static readonly RULE_deleteStatement = 5;
	public static readonly RULE_createStatement = 6;
	public static readonly RULE_dropStatement = 7;
	public static readonly RULE_alterStatement = 8;
	public static readonly RULE_useStatement = 9;
	public static readonly RULE_showStatement = 10;
	public static readonly RULE_describeStatement = 11;
	public static readonly RULE_selectList = 12;
	public static readonly RULE_tableList = 13;
	public static readonly RULE_columnList = 14;
	public static readonly RULE_valueList = 15;
	public static readonly RULE_updateList = 16;
	public static readonly RULE_orderList = 17;
	public static readonly RULE_expression = 18;
	public static readonly RULE_subquery = 19;
	public static readonly RULE_functionCall = 20;
	public static readonly RULE_createBody = 21;
	public static readonly RULE_columnDefinition = 22;
	public static readonly RULE_dataType = 23;
	public static readonly RULE_constraintList = 24;
	public static readonly RULE_constraint = 25;
	public static readonly RULE_tableName = 26;
	public static readonly RULE_columnName = 27;
	public static readonly RULE_databaseName = 28;
	public static readonly RULE_functionName = 29;
	public static readonly RULE_alias = 30;
	public static readonly RULE_identifier = 31;
	public static readonly RULE_literal = 32;
	public static readonly RULE_comment = 33;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"sqlFile", "statement", "selectStatement", "insertStatement", "updateStatement", 
		"deleteStatement", "createStatement", "dropStatement", "alterStatement", 
		"useStatement", "showStatement", "describeStatement", "selectList", "tableList", 
		"columnList", "valueList", "updateList", "orderList", "expression", "subquery", 
		"functionCall", "createBody", "columnDefinition", "dataType", "constraintList", 
		"constraint", "tableName", "columnName", "databaseName", "functionName", 
		"alias", "identifier", "literal", "comment",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"'='", undefined, "'<'", "'>'", "'<='", "'>='", "'+'", "'-'", "'*'", "'/'", 
		"'%'", "';'", "','", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "SELECT", "FROM", "WHERE", "INSERT", "INTO", "VALUES", "UPDATE", 
		"SET", "DELETE", "CREATE", "DROP", "ALTER", "TABLE", "VIEW", "INDEX", 
		"DATABASE", "SCHEMA", "USE", "SHOW", "TABLES", "DATABASES", "COLUMNS", 
		"DESCRIBE", "DESC", "DISTINCT", "GROUP", "BY", "HAVING", "ORDER", "ASC", 
		"DESC_ORDER", "LIMIT", "AS", "IF", "EXISTS", "ADD", "MODIFY", "AND", "OR", 
		"NOT", "NULL", "TRUE", "FALSE", "PRIMARY", "FOREIGN", "KEY", "REFERENCES", 
		"UNIQUE", "AUTO_INCREMENT", "DEFAULT", "VARCHAR", "CHAR", "INT", "INTEGER", 
		"BIGINT", "SMALLINT", "TINYINT", "DECIMAL", "NUMERIC", "FLOAT", "DOUBLE", 
		"REAL", "DATE", "TIME", "DATETIME", "TIMESTAMP", "TEXT", "BLOB", "BOOLEAN", 
		"EQUALS", "NOT_EQUALS", "LESS_THAN", "GREATER_THAN", "LESS_EQUALS", "GREATER_EQUALS", 
		"PLUS", "MINUS", "MULTIPLY", "DIVIDE", "MODULO", "SEMICOLON", "COMMA", 
		"LPAREN", "RPAREN", "STRING", "QUOTED_IDENTIFIER", "NUMBER", "BOOLEAN_LITERAL", 
		"IDENTIFIER", "COMMENT", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SqlMiniParser._LITERAL_NAMES, SqlMiniParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SqlMiniParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "SqlMini.g4"; }

	// @Override
	public get ruleNames(): string[] { return SqlMiniParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return SqlMiniParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(SqlMiniParser._ATN, this);
	}
	// @RuleVersion(0)
	public sqlFile(): SqlFileContext {
		let _localctx: SqlFileContext = new SqlFileContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, SqlMiniParser.RULE_sqlFile);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 71;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SqlMiniParser.SELECT) | (1 << SqlMiniParser.INSERT) | (1 << SqlMiniParser.UPDATE) | (1 << SqlMiniParser.DELETE) | (1 << SqlMiniParser.CREATE) | (1 << SqlMiniParser.DROP) | (1 << SqlMiniParser.ALTER) | (1 << SqlMiniParser.USE) | (1 << SqlMiniParser.SHOW) | (1 << SqlMiniParser.DESCRIBE) | (1 << SqlMiniParser.DESC))) !== 0) || _la === SqlMiniParser.COMMENT) {
				{
				{
				this.state = 68;
				this.statement();
				}
				}
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 74;
			this.match(SqlMiniParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, SqlMiniParser.RULE_statement);
		let _la: number;
		try {
			this.state = 120;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.SELECT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 76;
				this.selectStatement();
				this.state = 78;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 77;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.INSERT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 80;
				this.insertStatement();
				this.state = 82;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 81;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.UPDATE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 84;
				this.updateStatement();
				this.state = 86;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 85;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.DELETE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 88;
				this.deleteStatement();
				this.state = 90;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 89;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.CREATE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 92;
				this.createStatement();
				this.state = 94;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 93;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.DROP:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 96;
				this.dropStatement();
				this.state = 98;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 97;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.ALTER:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 100;
				this.alterStatement();
				this.state = 102;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 101;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.USE:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 104;
				this.useStatement();
				this.state = 106;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 105;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.SHOW:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 108;
				this.showStatement();
				this.state = 110;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 109;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.DESCRIBE:
			case SqlMiniParser.DESC:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 112;
				this.describeStatement();
				this.state = 114;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 113;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			case SqlMiniParser.COMMENT:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 116;
				this.comment();
				this.state = 118;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.SEMICOLON) {
					{
					this.state = 117;
					this.match(SqlMiniParser.SEMICOLON);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectStatement(): SelectStatementContext {
		let _localctx: SelectStatementContext = new SelectStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, SqlMiniParser.RULE_selectStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 122;
			this.match(SqlMiniParser.SELECT);
			this.state = 124;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.DISTINCT) {
				{
				this.state = 123;
				this.match(SqlMiniParser.DISTINCT);
				}
			}

			this.state = 126;
			this.selectList();
			this.state = 127;
			this.match(SqlMiniParser.FROM);
			this.state = 128;
			this.tableList();
			this.state = 131;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.WHERE) {
				{
				this.state = 129;
				this.match(SqlMiniParser.WHERE);
				this.state = 130;
				this.expression(0);
				}
			}

			this.state = 136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.GROUP) {
				{
				this.state = 133;
				this.match(SqlMiniParser.GROUP);
				this.state = 134;
				this.match(SqlMiniParser.BY);
				this.state = 135;
				this.columnList();
				}
			}

			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.HAVING) {
				{
				this.state = 138;
				this.match(SqlMiniParser.HAVING);
				this.state = 139;
				this.expression(0);
				}
			}

			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.ORDER) {
				{
				this.state = 142;
				this.match(SqlMiniParser.ORDER);
				this.state = 143;
				this.match(SqlMiniParser.BY);
				this.state = 144;
				this.orderList();
				}
			}

			this.state = 149;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.LIMIT) {
				{
				this.state = 147;
				this.match(SqlMiniParser.LIMIT);
				this.state = 148;
				this.match(SqlMiniParser.NUMBER);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public insertStatement(): InsertStatementContext {
		let _localctx: InsertStatementContext = new InsertStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SqlMiniParser.RULE_insertStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 151;
			this.match(SqlMiniParser.INSERT);
			this.state = 152;
			this.match(SqlMiniParser.INTO);
			this.state = 153;
			this.tableName();
			this.state = 158;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.LPAREN) {
				{
				this.state = 154;
				this.match(SqlMiniParser.LPAREN);
				this.state = 155;
				this.columnList();
				this.state = 156;
				this.match(SqlMiniParser.RPAREN);
				}
			}

			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.VALUES:
				{
				this.state = 160;
				this.match(SqlMiniParser.VALUES);
				this.state = 161;
				this.match(SqlMiniParser.LPAREN);
				this.state = 162;
				this.valueList();
				this.state = 163;
				this.match(SqlMiniParser.RPAREN);
				}
				break;
			case SqlMiniParser.SELECT:
				{
				this.state = 165;
				this.selectStatement();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public updateStatement(): UpdateStatementContext {
		let _localctx: UpdateStatementContext = new UpdateStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, SqlMiniParser.RULE_updateStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 168;
			this.match(SqlMiniParser.UPDATE);
			this.state = 169;
			this.tableName();
			this.state = 170;
			this.match(SqlMiniParser.SET);
			this.state = 171;
			this.updateList();
			this.state = 174;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.WHERE) {
				{
				this.state = 172;
				this.match(SqlMiniParser.WHERE);
				this.state = 173;
				this.expression(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deleteStatement(): DeleteStatementContext {
		let _localctx: DeleteStatementContext = new DeleteStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SqlMiniParser.RULE_deleteStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 176;
			this.match(SqlMiniParser.DELETE);
			this.state = 177;
			this.match(SqlMiniParser.FROM);
			this.state = 178;
			this.tableName();
			this.state = 181;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.WHERE) {
				{
				this.state = 179;
				this.match(SqlMiniParser.WHERE);
				this.state = 180;
				this.expression(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createStatement(): CreateStatementContext {
		let _localctx: CreateStatementContext = new CreateStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, SqlMiniParser.RULE_createStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 183;
			this.match(SqlMiniParser.CREATE);
			this.state = 184;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SqlMiniParser.TABLE) | (1 << SqlMiniParser.VIEW) | (1 << SqlMiniParser.INDEX) | (1 << SqlMiniParser.DATABASE) | (1 << SqlMiniParser.SCHEMA))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 185;
			this.tableName();
			this.state = 187;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.LPAREN) {
				{
				this.state = 186;
				this.createBody();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dropStatement(): DropStatementContext {
		let _localctx: DropStatementContext = new DropStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SqlMiniParser.RULE_dropStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 189;
			this.match(SqlMiniParser.DROP);
			this.state = 190;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SqlMiniParser.TABLE) | (1 << SqlMiniParser.VIEW) | (1 << SqlMiniParser.INDEX) | (1 << SqlMiniParser.DATABASE) | (1 << SqlMiniParser.SCHEMA))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 193;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.IF) {
				{
				this.state = 191;
				this.match(SqlMiniParser.IF);
				this.state = 192;
				this.match(SqlMiniParser.EXISTS);
				}
			}

			this.state = 195;
			this.tableName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alterStatement(): AlterStatementContext {
		let _localctx: AlterStatementContext = new AlterStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, SqlMiniParser.RULE_alterStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this.match(SqlMiniParser.ALTER);
			this.state = 198;
			this.match(SqlMiniParser.TABLE);
			this.state = 199;
			this.tableName();
			this.state = 200;
			_la = this._input.LA(1);
			if (!(((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & ((1 << (SqlMiniParser.DROP - 11)) | (1 << (SqlMiniParser.ADD - 11)) | (1 << (SqlMiniParser.MODIFY - 11)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 201;
			this.columnDefinition();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public useStatement(): UseStatementContext {
		let _localctx: UseStatementContext = new UseStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, SqlMiniParser.RULE_useStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 203;
			this.match(SqlMiniParser.USE);
			this.state = 204;
			this.databaseName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public showStatement(): ShowStatementContext {
		let _localctx: ShowStatementContext = new ShowStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, SqlMiniParser.RULE_showStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this.match(SqlMiniParser.SHOW);
			this.state = 212;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.TABLES:
				{
				this.state = 207;
				this.match(SqlMiniParser.TABLES);
				}
				break;
			case SqlMiniParser.DATABASES:
				{
				this.state = 208;
				this.match(SqlMiniParser.DATABASES);
				}
				break;
			case SqlMiniParser.COLUMNS:
				{
				this.state = 209;
				this.match(SqlMiniParser.COLUMNS);
				this.state = 210;
				this.match(SqlMiniParser.FROM);
				this.state = 211;
				this.tableName();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public describeStatement(): DescribeStatementContext {
		let _localctx: DescribeStatementContext = new DescribeStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SqlMiniParser.RULE_describeStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			_la = this._input.LA(1);
			if (!(_la === SqlMiniParser.DESCRIBE || _la === SqlMiniParser.DESC)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 215;
			this.tableName();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public selectList(): SelectListContext {
		let _localctx: SelectListContext = new SelectListContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, SqlMiniParser.RULE_selectList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 225;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.MULTIPLY:
				{
				this.state = 217;
				this.match(SqlMiniParser.MULTIPLY);
				}
				break;
			case SqlMiniParser.NOT:
			case SqlMiniParser.NULL:
			case SqlMiniParser.LPAREN:
			case SqlMiniParser.STRING:
			case SqlMiniParser.QUOTED_IDENTIFIER:
			case SqlMiniParser.NUMBER:
			case SqlMiniParser.BOOLEAN_LITERAL:
			case SqlMiniParser.IDENTIFIER:
				{
				this.state = 218;
				this.expression(0);
				this.state = 223;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.AS || _la === SqlMiniParser.QUOTED_IDENTIFIER || _la === SqlMiniParser.IDENTIFIER) {
					{
					this.state = 220;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlMiniParser.AS) {
						{
						this.state = 219;
						this.match(SqlMiniParser.AS);
						}
					}

					this.state = 222;
					this.alias();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 227;
				this.match(SqlMiniParser.COMMA);
				this.state = 228;
				this.expression(0);
				this.state = 233;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.AS || _la === SqlMiniParser.QUOTED_IDENTIFIER || _la === SqlMiniParser.IDENTIFIER) {
					{
					this.state = 230;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlMiniParser.AS) {
						{
						this.state = 229;
						this.match(SqlMiniParser.AS);
						}
					}

					this.state = 232;
					this.alias();
					}
				}

				}
				}
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableList(): TableListContext {
		let _localctx: TableListContext = new TableListContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, SqlMiniParser.RULE_tableList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 240;
			this.tableName();
			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SqlMiniParser.AS || _la === SqlMiniParser.QUOTED_IDENTIFIER || _la === SqlMiniParser.IDENTIFIER) {
				{
				this.state = 242;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.AS) {
					{
					this.state = 241;
					this.match(SqlMiniParser.AS);
					}
				}

				this.state = 244;
				this.alias();
				}
			}

			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 247;
				this.match(SqlMiniParser.COMMA);
				this.state = 248;
				this.tableName();
				this.state = 253;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.AS || _la === SqlMiniParser.QUOTED_IDENTIFIER || _la === SqlMiniParser.IDENTIFIER) {
					{
					this.state = 250;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === SqlMiniParser.AS) {
						{
						this.state = 249;
						this.match(SqlMiniParser.AS);
						}
					}

					this.state = 252;
					this.alias();
					}
				}

				}
				}
				this.state = 259;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnList(): ColumnListContext {
		let _localctx: ColumnListContext = new ColumnListContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, SqlMiniParser.RULE_columnList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 260;
			this.columnName();
			this.state = 265;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 261;
				this.match(SqlMiniParser.COMMA);
				this.state = 262;
				this.columnName();
				}
				}
				this.state = 267;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public valueList(): ValueListContext {
		let _localctx: ValueListContext = new ValueListContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, SqlMiniParser.RULE_valueList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 268;
			this.expression(0);
			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 269;
				this.match(SqlMiniParser.COMMA);
				this.state = 270;
				this.expression(0);
				}
				}
				this.state = 275;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public updateList(): UpdateListContext {
		let _localctx: UpdateListContext = new UpdateListContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, SqlMiniParser.RULE_updateList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 276;
			this.columnName();
			this.state = 277;
			this.match(SqlMiniParser.EQUALS);
			this.state = 278;
			this.expression(0);
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 279;
				this.match(SqlMiniParser.COMMA);
				this.state = 280;
				this.columnName();
				this.state = 281;
				this.match(SqlMiniParser.EQUALS);
				this.state = 282;
				this.expression(0);
				}
				}
				this.state = 288;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orderList(): OrderListContext {
		let _localctx: OrderListContext = new OrderListContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, SqlMiniParser.RULE_orderList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 289;
			this.columnName();
			this.state = 291;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				{
				this.state = 290;
				_la = this._input.LA(1);
				if (!(_la === SqlMiniParser.DESC || _la === SqlMiniParser.ASC)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			}
			this.state = 300;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 293;
				this.match(SqlMiniParser.COMMA);
				this.state = 294;
				this.columnName();
				this.state = 296;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
				case 1:
					{
					this.state = 295;
					_la = this._input.LA(1);
					if (!(_la === SqlMiniParser.DESC || _la === SqlMiniParser.ASC)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					}
					break;
				}
				}
				}
				this.state = 302;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 36;
		this.enterRecursionRule(_localctx, 36, SqlMiniParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				{
				this.state = 304;
				this.match(SqlMiniParser.LPAREN);
				this.state = 305;
				this.expression(0);
				this.state = 306;
				this.match(SqlMiniParser.RPAREN);
				}
				break;

			case 2:
				{
				this.state = 308;
				this.match(SqlMiniParser.NOT);
				this.state = 309;
				this.expression(5);
				}
				break;

			case 3:
				{
				this.state = 310;
				this.functionCall();
				}
				break;

			case 4:
				{
				this.state = 311;
				this.columnName();
				}
				break;

			case 5:
				{
				this.state = 312;
				this.literal();
				}
				break;

			case 6:
				{
				this.state = 313;
				this.subquery();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 327;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 325;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SqlMiniParser.RULE_expression);
						this.state = 316;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 317;
						_la = this._input.LA(1);
						if (!(((((_la - 76)) & ~0x1F) === 0 && ((1 << (_la - 76)) & ((1 << (SqlMiniParser.PLUS - 76)) | (1 << (SqlMiniParser.MINUS - 76)) | (1 << (SqlMiniParser.MULTIPLY - 76)) | (1 << (SqlMiniParser.DIVIDE - 76)) | (1 << (SqlMiniParser.MODULO - 76)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 318;
						this.expression(9);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SqlMiniParser.RULE_expression);
						this.state = 319;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 320;
						_la = this._input.LA(1);
						if (!(((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & ((1 << (SqlMiniParser.EQUALS - 70)) | (1 << (SqlMiniParser.NOT_EQUALS - 70)) | (1 << (SqlMiniParser.LESS_THAN - 70)) | (1 << (SqlMiniParser.GREATER_THAN - 70)) | (1 << (SqlMiniParser.LESS_EQUALS - 70)) | (1 << (SqlMiniParser.GREATER_EQUALS - 70)))) !== 0))) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 321;
						this.expression(8);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SqlMiniParser.RULE_expression);
						this.state = 322;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 323;
						_la = this._input.LA(1);
						if (!(_la === SqlMiniParser.AND || _la === SqlMiniParser.OR)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 324;
						this.expression(7);
						}
						break;
					}
					}
				}
				this.state = 329;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subquery(): SubqueryContext {
		let _localctx: SubqueryContext = new SubqueryContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, SqlMiniParser.RULE_subquery);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 330;
			this.match(SqlMiniParser.LPAREN);
			this.state = 331;
			this.selectStatement();
			this.state = 332;
			this.match(SqlMiniParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let _localctx: FunctionCallContext = new FunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, SqlMiniParser.RULE_functionCall);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 334;
			this.functionName();
			this.state = 335;
			this.match(SqlMiniParser.LPAREN);
			this.state = 348;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.DISTINCT:
			case SqlMiniParser.NOT:
			case SqlMiniParser.NULL:
			case SqlMiniParser.LPAREN:
			case SqlMiniParser.STRING:
			case SqlMiniParser.QUOTED_IDENTIFIER:
			case SqlMiniParser.NUMBER:
			case SqlMiniParser.BOOLEAN_LITERAL:
			case SqlMiniParser.IDENTIFIER:
				{
				this.state = 337;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.DISTINCT) {
					{
					this.state = 336;
					this.match(SqlMiniParser.DISTINCT);
					}
				}

				this.state = 339;
				this.expression(0);
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === SqlMiniParser.COMMA) {
					{
					{
					this.state = 340;
					this.match(SqlMiniParser.COMMA);
					this.state = 341;
					this.expression(0);
					}
					}
					this.state = 346;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case SqlMiniParser.MULTIPLY:
				{
				this.state = 347;
				this.match(SqlMiniParser.MULTIPLY);
				}
				break;
			case SqlMiniParser.RPAREN:
				break;
			default:
				break;
			}
			this.state = 350;
			this.match(SqlMiniParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createBody(): CreateBodyContext {
		let _localctx: CreateBodyContext = new CreateBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, SqlMiniParser.RULE_createBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 352;
			this.match(SqlMiniParser.LPAREN);
			this.state = 353;
			this.columnDefinition();
			this.state = 358;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SqlMiniParser.COMMA) {
				{
				{
				this.state = 354;
				this.match(SqlMiniParser.COMMA);
				this.state = 355;
				this.columnDefinition();
				}
				}
				this.state = 360;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 361;
			this.match(SqlMiniParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnDefinition(): ColumnDefinitionContext {
		let _localctx: ColumnDefinitionContext = new ColumnDefinitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, SqlMiniParser.RULE_columnDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 363;
			this.columnName();
			this.state = 364;
			this.dataType();
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (SqlMiniParser.NOT - 40)) | (1 << (SqlMiniParser.PRIMARY - 40)) | (1 << (SqlMiniParser.FOREIGN - 40)) | (1 << (SqlMiniParser.UNIQUE - 40)) | (1 << (SqlMiniParser.AUTO_INCREMENT - 40)) | (1 << (SqlMiniParser.DEFAULT - 40)))) !== 0)) {
				{
				this.state = 365;
				this.constraintList();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public dataType(): DataTypeContext {
		let _localctx: DataTypeContext = new DataTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, SqlMiniParser.RULE_dataType);
		let _la: number;
		try {
			this.state = 386;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.VARCHAR:
			case SqlMiniParser.CHAR:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 368;
				_la = this._input.LA(1);
				if (!(_la === SqlMiniParser.VARCHAR || _la === SqlMiniParser.CHAR)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 369;
				this.match(SqlMiniParser.LPAREN);
				this.state = 370;
				this.match(SqlMiniParser.NUMBER);
				this.state = 371;
				this.match(SqlMiniParser.RPAREN);
				}
				break;
			case SqlMiniParser.INT:
			case SqlMiniParser.INTEGER:
			case SqlMiniParser.BIGINT:
			case SqlMiniParser.SMALLINT:
			case SqlMiniParser.TINYINT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 372;
				_la = this._input.LA(1);
				if (!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (SqlMiniParser.INT - 53)) | (1 << (SqlMiniParser.INTEGER - 53)) | (1 << (SqlMiniParser.BIGINT - 53)) | (1 << (SqlMiniParser.SMALLINT - 53)) | (1 << (SqlMiniParser.TINYINT - 53)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case SqlMiniParser.DECIMAL:
			case SqlMiniParser.NUMERIC:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 373;
				_la = this._input.LA(1);
				if (!(_la === SqlMiniParser.DECIMAL || _la === SqlMiniParser.NUMERIC)) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 374;
				this.match(SqlMiniParser.LPAREN);
				this.state = 375;
				this.match(SqlMiniParser.NUMBER);
				this.state = 378;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SqlMiniParser.COMMA) {
					{
					this.state = 376;
					this.match(SqlMiniParser.COMMA);
					this.state = 377;
					this.match(SqlMiniParser.NUMBER);
					}
				}

				this.state = 380;
				this.match(SqlMiniParser.RPAREN);
				}
				break;
			case SqlMiniParser.FLOAT:
			case SqlMiniParser.DOUBLE:
			case SqlMiniParser.REAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 381;
				_la = this._input.LA(1);
				if (!(((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & ((1 << (SqlMiniParser.FLOAT - 60)) | (1 << (SqlMiniParser.DOUBLE - 60)) | (1 << (SqlMiniParser.REAL - 60)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case SqlMiniParser.DATE:
			case SqlMiniParser.TIME:
			case SqlMiniParser.DATETIME:
			case SqlMiniParser.TIMESTAMP:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 382;
				_la = this._input.LA(1);
				if (!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (SqlMiniParser.DATE - 63)) | (1 << (SqlMiniParser.TIME - 63)) | (1 << (SqlMiniParser.DATETIME - 63)) | (1 << (SqlMiniParser.TIMESTAMP - 63)))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case SqlMiniParser.TEXT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 383;
				this.match(SqlMiniParser.TEXT);
				}
				break;
			case SqlMiniParser.BLOB:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 384;
				this.match(SqlMiniParser.BLOB);
				}
				break;
			case SqlMiniParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 385;
				this.match(SqlMiniParser.BOOLEAN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constraintList(): ConstraintListContext {
		let _localctx: ConstraintListContext = new ConstraintListContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, SqlMiniParser.RULE_constraintList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 389;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 388;
				this.constraint();
				}
				}
				this.state = 391;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 40)) & ~0x1F) === 0 && ((1 << (_la - 40)) & ((1 << (SqlMiniParser.NOT - 40)) | (1 << (SqlMiniParser.PRIMARY - 40)) | (1 << (SqlMiniParser.FOREIGN - 40)) | (1 << (SqlMiniParser.UNIQUE - 40)) | (1 << (SqlMiniParser.AUTO_INCREMENT - 40)) | (1 << (SqlMiniParser.DEFAULT - 40)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constraint(): ConstraintContext {
		let _localctx: ConstraintContext = new ConstraintContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, SqlMiniParser.RULE_constraint);
		try {
			this.state = 409;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SqlMiniParser.NOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 393;
				this.match(SqlMiniParser.NOT);
				this.state = 394;
				this.match(SqlMiniParser.NULL);
				}
				break;
			case SqlMiniParser.PRIMARY:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 395;
				this.match(SqlMiniParser.PRIMARY);
				this.state = 396;
				this.match(SqlMiniParser.KEY);
				}
				break;
			case SqlMiniParser.UNIQUE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 397;
				this.match(SqlMiniParser.UNIQUE);
				}
				break;
			case SqlMiniParser.AUTO_INCREMENT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 398;
				this.match(SqlMiniParser.AUTO_INCREMENT);
				}
				break;
			case SqlMiniParser.DEFAULT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 399;
				this.match(SqlMiniParser.DEFAULT);
				this.state = 400;
				this.literal();
				}
				break;
			case SqlMiniParser.FOREIGN:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 401;
				this.match(SqlMiniParser.FOREIGN);
				this.state = 402;
				this.match(SqlMiniParser.KEY);
				this.state = 403;
				this.match(SqlMiniParser.REFERENCES);
				this.state = 404;
				this.tableName();
				this.state = 405;
				this.match(SqlMiniParser.LPAREN);
				this.state = 406;
				this.columnName();
				this.state = 407;
				this.match(SqlMiniParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tableName(): TableNameContext {
		let _localctx: TableNameContext = new TableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, SqlMiniParser.RULE_tableName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 411;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public columnName(): ColumnNameContext {
		let _localctx: ColumnNameContext = new ColumnNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, SqlMiniParser.RULE_columnName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 413;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public databaseName(): DatabaseNameContext {
		let _localctx: DatabaseNameContext = new DatabaseNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, SqlMiniParser.RULE_databaseName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 415;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionName(): FunctionNameContext {
		let _localctx: FunctionNameContext = new FunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, SqlMiniParser.RULE_functionName);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 417;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public alias(): AliasContext {
		let _localctx: AliasContext = new AliasContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, SqlMiniParser.RULE_alias);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 419;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, SqlMiniParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 421;
			_la = this._input.LA(1);
			if (!(_la === SqlMiniParser.QUOTED_IDENTIFIER || _la === SqlMiniParser.IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, SqlMiniParser.RULE_literal);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 423;
			_la = this._input.LA(1);
			if (!(_la === SqlMiniParser.NULL || ((((_la - 85)) & ~0x1F) === 0 && ((1 << (_la - 85)) & ((1 << (SqlMiniParser.STRING - 85)) | (1 << (SqlMiniParser.NUMBER - 85)) | (1 << (SqlMiniParser.BOOLEAN_LITERAL - 85)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public comment(): CommentContext {
		let _localctx: CommentContext = new CommentContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, SqlMiniParser.RULE_comment);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 425;
			this.match(SqlMiniParser.COMMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 18:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);

		case 1:
			return this.precpred(this._ctx, 7);

		case 2:
			return this.precpred(this._ctx, 6);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03]\u01AE\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x03\x02\x07\x02H\n\x02\f\x02\x0E\x02K\v\x02\x03\x02\x03\x02\x03\x03" +
		"\x03\x03\x05\x03Q\n\x03\x03\x03\x03\x03\x05\x03U\n\x03\x03\x03\x03\x03" +
		"\x05\x03Y\n\x03\x03\x03\x03\x03\x05\x03]\n\x03\x03\x03\x03\x03\x05\x03" +
		"a\n\x03\x03\x03\x03\x03\x05\x03e\n\x03\x03\x03\x03\x03\x05\x03i\n\x03" +
		"\x03\x03\x03\x03\x05\x03m\n\x03\x03\x03\x03\x03\x05\x03q\n\x03\x03\x03" +
		"\x03\x03\x05\x03u\n\x03\x03\x03\x03\x03\x05\x03y\n\x03\x05\x03{\n\x03" +
		"\x03\x04\x03\x04\x05\x04\x7F\n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x05\x04\x86\n\x04\x03\x04\x03\x04\x03\x04\x05\x04\x8B\n\x04\x03\x04" +
		"\x03\x04\x05\x04\x8F\n\x04\x03\x04\x03\x04\x03\x04\x05\x04\x94\n\x04\x03" +
		"\x04\x03\x04\x05\x04\x98\n\x04\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x05\x05\xA1\n\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x05\x05\xA9\n\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06" +
		"\x03\x06\x05\x06\xB1\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07\x05" +
		"\x07\xB8\n\x07\x03\b\x03\b\x03\b\x03\b\x05\b\xBE\n\b\x03\t\x03\t\x03\t" +
		"\x03\t\x05\t\xC4\n\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\v\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xD7\n\f\x03\r" +
		"\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xDF\n\x0E\x03\x0E\x05\x0E" +
		"\xE2\n\x0E\x05\x0E\xE4\n\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xE9\n\x0E" +
		"\x03\x0E\x05\x0E\xEC\n\x0E\x07\x0E\xEE\n\x0E\f\x0E\x0E\x0E\xF1\v\x0E\x03" +
		"\x0F\x03\x0F\x05\x0F\xF5\n\x0F\x03\x0F\x05\x0F\xF8\n\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x05\x0F\xFD\n\x0F\x03\x0F\x05\x0F\u0100\n\x0F\x07\x0F\u0102\n" +
		"\x0F\f\x0F\x0E\x0F\u0105\v\x0F\x03\x10\x03\x10\x03\x10\x07\x10\u010A\n" +
		"\x10\f\x10\x0E\x10\u010D\v\x10\x03\x11\x03\x11\x03\x11\x07\x11\u0112\n" +
		"\x11\f\x11\x0E\x11\u0115\v\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x07\x12\u011F\n\x12\f\x12\x0E\x12\u0122\v\x12" +
		"\x03\x13\x03\x13\x05\x13\u0126\n\x13\x03\x13\x03\x13\x03\x13\x05\x13\u012B" +
		"\n\x13\x07\x13\u012D\n\x13\f\x13\x0E\x13\u0130\v\x13\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05" +
		"\x14\u013D\n\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14" +
		"\x03\x14\x03\x14\x07\x14\u0148\n\x14\f\x14\x0E\x14\u014B\v\x14\x03\x15" +
		"\x03\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x05\x16\u0154\n\x16\x03" +
		"\x16\x03\x16\x03\x16\x07\x16\u0159\n\x16\f\x16\x0E\x16\u015C\v\x16\x03" +
		"\x16\x05\x16\u015F\n\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17" +
		"\x07\x17\u0167\n\x17\f\x17\x0E\x17\u016A\v\x17\x03\x17\x03\x17\x03\x18" +
		"\x03\x18\x03\x18\x05\x18\u0171\n\x18\x03\x19\x03\x19\x03\x19\x03\x19\x03" +
		"\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19\u017D\n\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x05\x19\u0185\n\x19\x03\x1A\x06" +
		"\x1A\u0188\n\x1A\r\x1A\x0E\x1A\u0189\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03\x1B\x03" +
		"\x1B\x03\x1B\x03\x1B\x05\x1B\u019C\n\x1B\x03\x1C\x03\x1C\x03\x1D\x03\x1D" +
		"\x03\x1E\x03\x1E\x03\x1F\x03\x1F\x03 \x03 \x03!\x03!\x03\"\x03\"\x03#" +
		"\x03#\x03#\x02\x02\x03&$\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 " +
		"\x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"<\x02>\x02@\x02B\x02D\x02\x02\x10\x03\x02\x0F\x13\x04\x02\r\r&\'\x03\x02" +
		"\x19\x1A\x04\x02\x1A\x1A  \x03\x02NR\x03\x02HM\x03\x02()\x03\x0256\x03" +
		"\x027;\x03\x02<=\x03\x02>@\x03\x02AD\x04\x02XX[[\x05\x02++WWYZ\x02\u01DC" +
		"\x02I\x03\x02\x02\x02\x04z\x03\x02\x02\x02\x06|\x03\x02\x02\x02\b\x99" +
		"\x03\x02\x02\x02\n\xAA\x03\x02\x02\x02\f\xB2\x03\x02\x02\x02\x0E\xB9\x03" +
		"\x02\x02\x02\x10\xBF\x03\x02\x02\x02\x12\xC7\x03\x02\x02\x02\x14\xCD\x03" +
		"\x02\x02\x02\x16\xD0\x03\x02\x02\x02\x18\xD8\x03\x02\x02\x02\x1A\xE3\x03" +
		"\x02\x02\x02\x1C\xF2\x03\x02\x02\x02\x1E\u0106\x03\x02\x02\x02 \u010E" +
		"\x03\x02\x02\x02\"\u0116\x03\x02\x02\x02$\u0123\x03\x02\x02\x02&\u013C" +
		"\x03\x02\x02\x02(\u014C\x03\x02\x02\x02*\u0150\x03\x02\x02\x02,\u0162" +
		"\x03\x02\x02\x02.\u016D\x03\x02\x02\x020\u0184\x03\x02\x02\x022\u0187" +
		"\x03\x02\x02\x024\u019B\x03\x02\x02\x026\u019D\x03\x02\x02\x028\u019F" +
		"\x03\x02\x02\x02:\u01A1\x03\x02\x02\x02<\u01A3\x03\x02\x02\x02>\u01A5" +
		"\x03\x02\x02\x02@\u01A7\x03\x02\x02\x02B\u01A9\x03\x02\x02\x02D\u01AB" +
		"\x03\x02\x02\x02FH\x05\x04\x03\x02GF\x03\x02\x02\x02HK\x03\x02\x02\x02" +
		"IG\x03\x02\x02\x02IJ\x03\x02\x02\x02JL\x03\x02\x02\x02KI\x03\x02\x02\x02" +
		"LM\x07\x02\x02\x03M\x03\x03\x02\x02\x02NP\x05\x06\x04\x02OQ\x07S\x02\x02" +
		"PO\x03\x02\x02\x02PQ\x03\x02\x02\x02Q{\x03\x02\x02\x02RT\x05\b\x05\x02" +
		"SU\x07S\x02\x02TS\x03\x02\x02\x02TU\x03\x02\x02\x02U{\x03\x02\x02\x02" +
		"VX\x05\n\x06\x02WY\x07S\x02\x02XW\x03\x02\x02\x02XY\x03\x02\x02\x02Y{" +
		"\x03\x02\x02\x02Z\\\x05\f\x07\x02[]\x07S\x02\x02\\[\x03\x02\x02\x02\\" +
		"]\x03\x02\x02\x02]{\x03\x02\x02\x02^`\x05\x0E\b\x02_a\x07S\x02\x02`_\x03" +
		"\x02\x02\x02`a\x03\x02\x02\x02a{\x03\x02\x02\x02bd\x05\x10\t\x02ce\x07" +
		"S\x02\x02dc\x03\x02\x02\x02de\x03\x02\x02\x02e{\x03\x02\x02\x02fh\x05" +
		"\x12\n\x02gi\x07S\x02\x02hg\x03\x02\x02\x02hi\x03\x02\x02\x02i{\x03\x02" +
		"\x02\x02jl\x05\x14\v\x02km\x07S\x02\x02lk\x03\x02\x02\x02lm\x03\x02\x02" +
		"\x02m{\x03\x02\x02\x02np\x05\x16\f\x02oq\x07S\x02\x02po\x03\x02\x02\x02" +
		"pq\x03\x02\x02\x02q{\x03\x02\x02\x02rt\x05\x18\r\x02su\x07S\x02\x02ts" +
		"\x03\x02\x02\x02tu\x03\x02\x02\x02u{\x03\x02\x02\x02vx\x05D#\x02wy\x07" +
		"S\x02\x02xw\x03\x02\x02\x02xy\x03\x02\x02\x02y{\x03\x02\x02\x02zN\x03" +
		"\x02\x02\x02zR\x03\x02\x02\x02zV\x03\x02\x02\x02zZ\x03\x02\x02\x02z^\x03" +
		"\x02\x02\x02zb\x03\x02\x02\x02zf\x03\x02\x02\x02zj\x03\x02\x02\x02zn\x03" +
		"\x02\x02\x02zr\x03\x02\x02\x02zv\x03\x02\x02\x02{\x05\x03\x02\x02\x02" +
		"|~\x07\x03\x02\x02}\x7F\x07\x1B\x02\x02~}\x03\x02\x02\x02~\x7F\x03\x02" +
		"\x02\x02\x7F\x80\x03\x02\x02\x02\x80\x81\x05\x1A\x0E\x02\x81\x82\x07\x04" +
		"\x02\x02\x82\x85\x05\x1C\x0F\x02\x83\x84\x07\x05\x02\x02\x84\x86\x05&" +
		"\x14\x02\x85\x83\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x8A\x03\x02" +
		"\x02\x02\x87\x88\x07\x1C\x02\x02\x88\x89\x07\x1D\x02\x02\x89\x8B\x05\x1E" +
		"\x10\x02\x8A\x87\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x8E\x03\x02" +
		"\x02\x02\x8C\x8D\x07\x1E\x02\x02\x8D\x8F\x05&\x14\x02\x8E\x8C\x03\x02" +
		"\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x93\x03\x02\x02\x02\x90\x91\x07\x1F" +
		"\x02\x02\x91\x92\x07\x1D\x02\x02\x92\x94\x05$\x13\x02\x93\x90\x03\x02" +
		"\x02\x02\x93\x94\x03\x02\x02\x02\x94\x97\x03\x02\x02\x02\x95\x96\x07\"" +
		"\x02\x02\x96\x98\x07Y\x02\x02\x97\x95\x03\x02\x02\x02\x97\x98\x03\x02" +
		"\x02\x02\x98\x07\x03\x02\x02\x02\x99\x9A\x07\x06\x02\x02\x9A\x9B\x07\x07" +
		"\x02\x02\x9B\xA0\x056\x1C\x02\x9C\x9D\x07U\x02\x02\x9D\x9E\x05\x1E\x10" +
		"\x02\x9E\x9F\x07V\x02\x02\x9F\xA1\x03\x02\x02\x02\xA0\x9C\x03\x02\x02" +
		"\x02\xA0\xA1\x03\x02\x02\x02\xA1\xA8\x03\x02\x02\x02\xA2\xA3\x07\b\x02" +
		"\x02\xA3\xA4\x07U\x02\x02\xA4\xA5\x05 \x11\x02\xA5\xA6\x07V\x02\x02\xA6" +
		"\xA9\x03\x02\x02\x02\xA7\xA9\x05\x06\x04\x02\xA8\xA2\x03\x02\x02\x02\xA8" +
		"\xA7\x03\x02\x02\x02\xA9\t\x03\x02\x02\x02\xAA\xAB\x07\t\x02\x02\xAB\xAC" +
		"\x056\x1C\x02\xAC\xAD\x07\n\x02\x02\xAD\xB0\x05\"\x12\x02\xAE\xAF\x07" +
		"\x05\x02\x02\xAF\xB1\x05&\x14\x02\xB0\xAE\x03\x02\x02\x02\xB0\xB1\x03" +
		"\x02\x02\x02\xB1\v\x03\x02\x02\x02\xB2\xB3\x07\v\x02\x02\xB3\xB4\x07\x04" +
		"\x02\x02\xB4\xB7\x056\x1C\x02\xB5\xB6\x07\x05\x02\x02\xB6\xB8\x05&\x14" +
		"\x02\xB7\xB5\x03\x02\x02\x02\xB7\xB8\x03\x02\x02\x02\xB8\r\x03\x02\x02" +
		"\x02\xB9\xBA\x07\f\x02\x02\xBA\xBB\t\x02\x02\x02\xBB\xBD\x056\x1C\x02" +
		"\xBC\xBE\x05,\x17\x02\xBD\xBC\x03\x02\x02\x02\xBD\xBE\x03\x02\x02\x02" +
		"\xBE\x0F\x03\x02\x02\x02\xBF\xC0\x07\r\x02\x02\xC0\xC3\t\x02\x02\x02\xC1" +
		"\xC2\x07$\x02\x02\xC2\xC4\x07%\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3\xC4" +
		"\x03\x02\x02\x02\xC4\xC5\x03\x02\x02\x02\xC5\xC6\x056\x1C\x02\xC6\x11" +
		"\x03\x02\x02\x02\xC7\xC8\x07\x0E\x02\x02\xC8\xC9\x07\x0F\x02\x02\xC9\xCA" +
		"\x056\x1C\x02\xCA\xCB\t\x03\x02\x02\xCB\xCC\x05.\x18\x02\xCC\x13\x03\x02" +
		"\x02\x02\xCD\xCE\x07\x14\x02\x02\xCE\xCF\x05:\x1E\x02\xCF\x15\x03\x02" +
		"\x02\x02\xD0\xD6\x07\x15\x02\x02\xD1\xD7\x07\x16\x02\x02\xD2\xD7\x07\x17" +
		"\x02\x02\xD3\xD4\x07\x18\x02\x02\xD4\xD5\x07\x04\x02\x02\xD5\xD7\x056" +
		"\x1C\x02\xD6\xD1\x03\x02\x02\x02\xD6\xD2\x03\x02\x02\x02\xD6\xD3\x03\x02" +
		"\x02\x02\xD7\x17\x03\x02\x02\x02\xD8\xD9\t\x04\x02\x02\xD9\xDA\x056\x1C" +
		"\x02\xDA\x19\x03\x02\x02\x02\xDB\xE4\x07P\x02\x02\xDC\xE1\x05&\x14\x02" +
		"\xDD\xDF\x07#\x02\x02\xDE\xDD\x03\x02\x02\x02\xDE\xDF\x03\x02\x02\x02" +
		"\xDF\xE0\x03\x02\x02\x02\xE0\xE2\x05> \x02\xE1\xDE\x03\x02\x02\x02\xE1" +
		"\xE2\x03\x02\x02\x02\xE2\xE4\x03\x02\x02\x02\xE3\xDB\x03\x02\x02\x02\xE3" +
		"\xDC\x03\x02\x02\x02\xE4\xEF\x03\x02\x02\x02\xE5\xE6\x07T\x02\x02\xE6" +
		"\xEB\x05&\x14\x02\xE7\xE9\x07#\x02\x02\xE8\xE7\x03\x02\x02\x02\xE8\xE9" +
		"\x03\x02\x02\x02\xE9\xEA\x03\x02\x02\x02\xEA\xEC\x05> \x02\xEB\xE8\x03" +
		"\x02\x02\x02\xEB\xEC\x03\x02\x02\x02\xEC\xEE\x03\x02\x02\x02\xED\xE5\x03" +
		"\x02\x02\x02\xEE\xF1\x03\x02\x02\x02\xEF\xED\x03\x02\x02\x02\xEF\xF0\x03" +
		"\x02\x02\x02\xF0\x1B\x03\x02\x02\x02\xF1\xEF\x03\x02\x02\x02\xF2\xF7\x05" +
		"6\x1C\x02\xF3\xF5\x07#\x02\x02\xF4\xF3\x03\x02\x02\x02\xF4\xF5\x03\x02" +
		"\x02\x02\xF5\xF6\x03\x02\x02\x02\xF6\xF8\x05> \x02\xF7\xF4\x03\x02\x02" +
		"\x02\xF7\xF8\x03\x02\x02\x02\xF8\u0103\x03\x02\x02\x02\xF9\xFA\x07T\x02" +
		"\x02\xFA\xFF\x056\x1C\x02\xFB\xFD\x07#\x02\x02\xFC\xFB\x03\x02\x02\x02" +
		"\xFC\xFD\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\u0100\x05> \x02\xFF" +
		"\xFC\x03\x02\x02\x02\xFF\u0100\x03\x02\x02\x02\u0100\u0102\x03\x02\x02" +
		"\x02\u0101\xF9\x03\x02\x02\x02\u0102\u0105\x03\x02\x02\x02\u0103\u0101" +
		"\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\x1D\x03\x02\x02\x02" +
		"\u0105\u0103\x03\x02\x02\x02\u0106\u010B\x058\x1D\x02\u0107\u0108\x07" +
		"T\x02\x02\u0108\u010A\x058\x1D\x02\u0109\u0107\x03\x02\x02\x02\u010A\u010D" +
		"\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02\u010B\u010C\x03\x02\x02\x02" +
		"\u010C\x1F\x03\x02\x02\x02\u010D\u010B\x03\x02\x02\x02\u010E\u0113\x05" +
		"&\x14\x02\u010F\u0110\x07T\x02\x02\u0110\u0112\x05&\x14\x02\u0111\u010F" +
		"\x03\x02\x02\x02\u0112\u0115\x03\x02\x02\x02\u0113\u0111\x03\x02\x02\x02" +
		"\u0113\u0114\x03\x02\x02\x02\u0114!\x03\x02\x02\x02\u0115\u0113\x03\x02" +
		"\x02\x02\u0116\u0117\x058\x1D\x02\u0117\u0118\x07H\x02\x02\u0118\u0120" +
		"\x05&\x14\x02\u0119\u011A\x07T\x02\x02\u011A\u011B\x058\x1D\x02\u011B" +
		"\u011C\x07H\x02\x02\u011C\u011D\x05&\x14\x02\u011D\u011F\x03\x02\x02\x02" +
		"\u011E\u0119\x03\x02\x02\x02\u011F\u0122\x03\x02\x02\x02\u0120\u011E\x03" +
		"\x02\x02\x02\u0120\u0121\x03\x02\x02\x02\u0121#\x03\x02\x02\x02\u0122" +
		"\u0120\x03\x02\x02\x02\u0123\u0125\x058\x1D\x02\u0124\u0126\t\x05\x02" +
		"\x02\u0125\u0124\x03\x02\x02\x02\u0125\u0126\x03\x02\x02\x02\u0126\u012E" +
		"\x03\x02\x02\x02\u0127\u0128\x07T\x02\x02\u0128\u012A\x058\x1D\x02\u0129" +
		"\u012B\t\x05\x02\x02\u012A\u0129\x03\x02\x02\x02\u012A\u012B\x03\x02\x02" +
		"\x02\u012B\u012D\x03\x02\x02\x02\u012C\u0127\x03\x02\x02\x02\u012D\u0130" +
		"\x03\x02\x02\x02\u012E\u012C\x03\x02\x02\x02\u012E\u012F\x03\x02\x02\x02" +
		"\u012F%\x03\x02\x02\x02\u0130\u012E\x03\x02\x02\x02\u0131\u0132\b\x14" +
		"\x01\x02\u0132\u0133\x07U\x02\x02\u0133\u0134\x05&\x14\x02\u0134\u0135" +
		"\x07V\x02\x02\u0135\u013D\x03\x02\x02\x02\u0136\u0137\x07*\x02\x02\u0137" +
		"\u013D\x05&\x14\x07\u0138\u013D\x05*\x16\x02\u0139\u013D\x058\x1D\x02" +
		"\u013A\u013D\x05B\"\x02\u013B\u013D\x05(\x15\x02\u013C\u0131\x03\x02\x02" +
		"\x02\u013C\u0136\x03\x02\x02\x02\u013C\u0138\x03\x02\x02\x02\u013C\u0139" +
		"\x03\x02\x02\x02\u013C\u013A\x03\x02\x02\x02\u013C\u013B\x03\x02\x02\x02" +
		"\u013D\u0149\x03\x02\x02\x02\u013E\u013F\f\n\x02\x02\u013F\u0140\t\x06" +
		"\x02\x02\u0140\u0148\x05&\x14\v\u0141\u0142\f\t\x02\x02\u0142\u0143\t" +
		"\x07\x02\x02\u0143\u0148\x05&\x14\n\u0144\u0145\f\b\x02\x02\u0145\u0146" +
		"\t\b\x02\x02\u0146\u0148\x05&\x14\t\u0147\u013E\x03\x02\x02\x02\u0147" +
		"\u0141\x03\x02\x02\x02\u0147\u0144\x03\x02\x02\x02\u0148\u014B\x03\x02" +
		"\x02\x02\u0149\u0147\x03\x02\x02\x02\u0149\u014A\x03\x02\x02\x02\u014A" +
		"\'\x03\x02\x02\x02\u014B\u0149\x03\x02\x02\x02\u014C\u014D\x07U\x02\x02" +
		"\u014D\u014E\x05\x06\x04\x02\u014E\u014F\x07V\x02\x02\u014F)\x03\x02\x02" +
		"\x02\u0150\u0151\x05<\x1F\x02\u0151\u015E\x07U\x02\x02\u0152\u0154\x07" +
		"\x1B\x02\x02\u0153\u0152\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154" +
		"\u0155\x03\x02\x02\x02\u0155\u015A\x05&\x14\x02\u0156\u0157\x07T\x02\x02" +
		"\u0157\u0159\x05&\x14\x02\u0158\u0156\x03\x02\x02\x02\u0159\u015C\x03" +
		"\x02\x02\x02\u015A\u0158\x03\x02\x02\x02\u015A\u015B\x03\x02\x02\x02\u015B" +
		"\u015F\x03\x02\x02\x02\u015C\u015A\x03\x02\x02\x02\u015D\u015F\x07P\x02" +
		"\x02\u015E\u0153\x03\x02\x02\x02\u015E\u015D\x03\x02\x02\x02\u015E\u015F" +
		"\x03\x02\x02\x02\u015F\u0160\x03\x02\x02\x02\u0160\u0161\x07V\x02\x02" +
		"\u0161+\x03\x02\x02\x02\u0162\u0163\x07U\x02\x02\u0163\u0168\x05.\x18" +
		"\x02\u0164\u0165\x07T\x02\x02\u0165\u0167\x05.\x18\x02\u0166\u0164\x03" +
		"\x02\x02\x02\u0167\u016A\x03\x02\x02\x02\u0168\u0166\x03\x02\x02\x02\u0168" +
		"\u0169\x03\x02\x02\x02\u0169\u016B\x03\x02\x02\x02\u016A\u0168\x03\x02" +
		"\x02\x02\u016B\u016C\x07V\x02\x02\u016C-\x03\x02\x02\x02\u016D\u016E\x05" +
		"8\x1D\x02\u016E\u0170\x050\x19\x02\u016F\u0171\x052\x1A\x02\u0170\u016F" +
		"\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171/\x03\x02\x02\x02\u0172" +
		"\u0173\t\t\x02\x02\u0173\u0174\x07U\x02\x02\u0174\u0175\x07Y\x02\x02\u0175" +
		"\u0185\x07V\x02\x02\u0176\u0185\t\n\x02\x02\u0177\u0178\t\v\x02\x02\u0178" +
		"\u0179\x07U\x02\x02\u0179\u017C\x07Y\x02\x02\u017A\u017B\x07T\x02\x02" +
		"\u017B\u017D\x07Y\x02\x02\u017C\u017A\x03\x02\x02\x02\u017C\u017D\x03" +
		"\x02\x02\x02\u017D\u017E\x03\x02\x02\x02\u017E\u0185\x07V\x02\x02\u017F" +
		"\u0185\t\f\x02\x02\u0180\u0185\t\r\x02\x02\u0181\u0185\x07E\x02\x02\u0182" +
		"\u0185\x07F\x02\x02\u0183\u0185\x07G\x02\x02\u0184\u0172\x03\x02\x02\x02" +
		"\u0184\u0176\x03\x02\x02\x02\u0184\u0177\x03\x02\x02\x02\u0184\u017F\x03" +
		"\x02\x02\x02\u0184\u0180\x03\x02\x02\x02\u0184\u0181\x03\x02\x02\x02\u0184" +
		"\u0182\x03\x02\x02\x02\u0184\u0183\x03\x02\x02\x02\u01851\x03\x02\x02" +
		"\x02\u0186\u0188\x054\x1B\x02\u0187\u0186\x03\x02\x02\x02\u0188\u0189" +
		"\x03\x02\x02\x02\u0189\u0187\x03\x02\x02\x02\u0189\u018A\x03\x02\x02\x02" +
		"\u018A3\x03\x02\x02\x02\u018B\u018C\x07*\x02\x02\u018C\u019C\x07+\x02" +
		"\x02\u018D\u018E\x07.\x02\x02\u018E\u019C\x070\x02\x02\u018F\u019C\x07" +
		"2\x02\x02\u0190\u019C\x073\x02\x02\u0191\u0192\x074\x02\x02\u0192\u019C" +
		"\x05B\"\x02\u0193\u0194\x07/\x02\x02\u0194\u0195\x070\x02\x02\u0195\u0196" +
		"\x071\x02\x02\u0196\u0197\x056\x1C\x02\u0197\u0198\x07U\x02\x02\u0198" +
		"\u0199\x058\x1D\x02\u0199\u019A\x07V\x02\x02\u019A\u019C\x03\x02\x02\x02" +
		"\u019B\u018B\x03\x02\x02\x02\u019B\u018D\x03\x02\x02\x02\u019B\u018F\x03" +
		"\x02\x02\x02\u019B\u0190\x03\x02\x02\x02\u019B\u0191\x03\x02\x02\x02\u019B" +
		"\u0193\x03\x02\x02\x02\u019C5\x03\x02\x02\x02\u019D\u019E\x05@!\x02\u019E" +
		"7\x03\x02\x02\x02\u019F\u01A0\x05@!\x02\u01A09\x03\x02\x02\x02\u01A1\u01A2" +
		"\x05@!\x02\u01A2;\x03\x02\x02\x02\u01A3\u01A4\x05@!\x02\u01A4=\x03\x02" +
		"\x02\x02\u01A5\u01A6\x05@!\x02\u01A6?\x03\x02\x02\x02\u01A7\u01A8\t\x0E" +
		"\x02\x02\u01A8A\x03\x02\x02\x02\u01A9\u01AA\t\x0F\x02\x02\u01AAC\x03\x02" +
		"\x02\x02\u01AB\u01AC\x07\\\x02\x02\u01ACE\x03\x02\x02\x029IPTX\\`dhlp" +
		"txz~\x85\x8A\x8E\x93\x97\xA0\xA8\xB0\xB7\xBD\xC3\xD6\xDE\xE1\xE3\xE8\xEB" +
		"\xEF\xF4\xF7\xFC\xFF\u0103\u010B\u0113\u0120\u0125\u012A\u012E\u013C\u0147" +
		"\u0149\u0153\u015A\u015E\u0168\u0170\u017C\u0184\u0189\u019B";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SqlMiniParser.__ATN) {
			SqlMiniParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SqlMiniParser._serializedATN));
		}

		return SqlMiniParser.__ATN;
	}

}

export class SqlFileContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(SqlMiniParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_sqlFile; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterSqlFile) {
			listener.enterSqlFile(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitSqlFile) {
			listener.exitSqlFile(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public selectStatement(): SelectStatementContext | undefined {
		return this.tryGetRuleContext(0, SelectStatementContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.SEMICOLON, 0); }
	public insertStatement(): InsertStatementContext | undefined {
		return this.tryGetRuleContext(0, InsertStatementContext);
	}
	public updateStatement(): UpdateStatementContext | undefined {
		return this.tryGetRuleContext(0, UpdateStatementContext);
	}
	public deleteStatement(): DeleteStatementContext | undefined {
		return this.tryGetRuleContext(0, DeleteStatementContext);
	}
	public createStatement(): CreateStatementContext | undefined {
		return this.tryGetRuleContext(0, CreateStatementContext);
	}
	public dropStatement(): DropStatementContext | undefined {
		return this.tryGetRuleContext(0, DropStatementContext);
	}
	public alterStatement(): AlterStatementContext | undefined {
		return this.tryGetRuleContext(0, AlterStatementContext);
	}
	public useStatement(): UseStatementContext | undefined {
		return this.tryGetRuleContext(0, UseStatementContext);
	}
	public showStatement(): ShowStatementContext | undefined {
		return this.tryGetRuleContext(0, ShowStatementContext);
	}
	public describeStatement(): DescribeStatementContext | undefined {
		return this.tryGetRuleContext(0, DescribeStatementContext);
	}
	public comment(): CommentContext | undefined {
		return this.tryGetRuleContext(0, CommentContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_statement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
}


export class SelectStatementContext extends ParserRuleContext {
	public SELECT(): TerminalNode { return this.getToken(SqlMiniParser.SELECT, 0); }
	public selectList(): SelectListContext {
		return this.getRuleContext(0, SelectListContext);
	}
	public FROM(): TerminalNode { return this.getToken(SqlMiniParser.FROM, 0); }
	public tableList(): TableListContext {
		return this.getRuleContext(0, TableListContext);
	}
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DISTINCT, 0); }
	public WHERE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.WHERE, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public GROUP(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.GROUP, 0); }
	public BY(): TerminalNode[];
	public BY(i: number): TerminalNode;
	public BY(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.BY);
		} else {
			return this.getToken(SqlMiniParser.BY, i);
		}
	}
	public columnList(): ColumnListContext | undefined {
		return this.tryGetRuleContext(0, ColumnListContext);
	}
	public HAVING(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.HAVING, 0); }
	public ORDER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.ORDER, 0); }
	public orderList(): OrderListContext | undefined {
		return this.tryGetRuleContext(0, OrderListContext);
	}
	public LIMIT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LIMIT, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_selectStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterSelectStatement) {
			listener.enterSelectStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitSelectStatement) {
			listener.exitSelectStatement(this);
		}
	}
}


export class InsertStatementContext extends ParserRuleContext {
	public INSERT(): TerminalNode { return this.getToken(SqlMiniParser.INSERT, 0); }
	public INTO(): TerminalNode { return this.getToken(SqlMiniParser.INTO, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public VALUES(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.VALUES, 0); }
	public LPAREN(): TerminalNode[];
	public LPAREN(i: number): TerminalNode;
	public LPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.LPAREN);
		} else {
			return this.getToken(SqlMiniParser.LPAREN, i);
		}
	}
	public valueList(): ValueListContext | undefined {
		return this.tryGetRuleContext(0, ValueListContext);
	}
	public RPAREN(): TerminalNode[];
	public RPAREN(i: number): TerminalNode;
	public RPAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.RPAREN);
		} else {
			return this.getToken(SqlMiniParser.RPAREN, i);
		}
	}
	public selectStatement(): SelectStatementContext | undefined {
		return this.tryGetRuleContext(0, SelectStatementContext);
	}
	public columnList(): ColumnListContext | undefined {
		return this.tryGetRuleContext(0, ColumnListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_insertStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterInsertStatement) {
			listener.enterInsertStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitInsertStatement) {
			listener.exitInsertStatement(this);
		}
	}
}


export class UpdateStatementContext extends ParserRuleContext {
	public UPDATE(): TerminalNode { return this.getToken(SqlMiniParser.UPDATE, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public SET(): TerminalNode { return this.getToken(SqlMiniParser.SET, 0); }
	public updateList(): UpdateListContext {
		return this.getRuleContext(0, UpdateListContext);
	}
	public WHERE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.WHERE, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_updateStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterUpdateStatement) {
			listener.enterUpdateStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitUpdateStatement) {
			listener.exitUpdateStatement(this);
		}
	}
}


export class DeleteStatementContext extends ParserRuleContext {
	public DELETE(): TerminalNode { return this.getToken(SqlMiniParser.DELETE, 0); }
	public FROM(): TerminalNode { return this.getToken(SqlMiniParser.FROM, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public WHERE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.WHERE, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_deleteStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterDeleteStatement) {
			listener.enterDeleteStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitDeleteStatement) {
			listener.exitDeleteStatement(this);
		}
	}
}


export class CreateStatementContext extends ParserRuleContext {
	public CREATE(): TerminalNode { return this.getToken(SqlMiniParser.CREATE, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TABLE, 0); }
	public VIEW(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.VIEW, 0); }
	public INDEX(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.INDEX, 0); }
	public DATABASE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DATABASE, 0); }
	public SCHEMA(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.SCHEMA, 0); }
	public createBody(): CreateBodyContext | undefined {
		return this.tryGetRuleContext(0, CreateBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_createStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterCreateStatement) {
			listener.enterCreateStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitCreateStatement) {
			listener.exitCreateStatement(this);
		}
	}
}


export class DropStatementContext extends ParserRuleContext {
	public DROP(): TerminalNode { return this.getToken(SqlMiniParser.DROP, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public TABLE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TABLE, 0); }
	public VIEW(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.VIEW, 0); }
	public INDEX(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.INDEX, 0); }
	public DATABASE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DATABASE, 0); }
	public SCHEMA(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.SCHEMA, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.IF, 0); }
	public EXISTS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.EXISTS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_dropStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterDropStatement) {
			listener.enterDropStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitDropStatement) {
			listener.exitDropStatement(this);
		}
	}
}


export class AlterStatementContext extends ParserRuleContext {
	public ALTER(): TerminalNode { return this.getToken(SqlMiniParser.ALTER, 0); }
	public TABLE(): TerminalNode { return this.getToken(SqlMiniParser.TABLE, 0); }
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public columnDefinition(): ColumnDefinitionContext {
		return this.getRuleContext(0, ColumnDefinitionContext);
	}
	public ADD(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.ADD, 0); }
	public DROP(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DROP, 0); }
	public MODIFY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MODIFY, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_alterStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterAlterStatement) {
			listener.enterAlterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitAlterStatement) {
			listener.exitAlterStatement(this);
		}
	}
}


export class UseStatementContext extends ParserRuleContext {
	public USE(): TerminalNode { return this.getToken(SqlMiniParser.USE, 0); }
	public databaseName(): DatabaseNameContext {
		return this.getRuleContext(0, DatabaseNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_useStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterUseStatement) {
			listener.enterUseStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitUseStatement) {
			listener.exitUseStatement(this);
		}
	}
}


export class ShowStatementContext extends ParserRuleContext {
	public SHOW(): TerminalNode { return this.getToken(SqlMiniParser.SHOW, 0); }
	public TABLES(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TABLES, 0); }
	public DATABASES(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DATABASES, 0); }
	public COLUMNS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.COLUMNS, 0); }
	public FROM(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.FROM, 0); }
	public tableName(): TableNameContext | undefined {
		return this.tryGetRuleContext(0, TableNameContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_showStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterShowStatement) {
			listener.enterShowStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitShowStatement) {
			listener.exitShowStatement(this);
		}
	}
}


export class DescribeStatementContext extends ParserRuleContext {
	public tableName(): TableNameContext {
		return this.getRuleContext(0, TableNameContext);
	}
	public DESCRIBE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DESCRIBE, 0); }
	public DESC(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DESC, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_describeStatement; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterDescribeStatement) {
			listener.enterDescribeStatement(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitDescribeStatement) {
			listener.exitDescribeStatement(this);
		}
	}
}


export class SelectListContext extends ParserRuleContext {
	public MULTIPLY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MULTIPLY, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	public alias(): AliasContext[];
	public alias(i: number): AliasContext;
	public alias(i?: number): AliasContext | AliasContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AliasContext);
		} else {
			return this.getRuleContext(i, AliasContext);
		}
	}
	public AS(): TerminalNode[];
	public AS(i: number): TerminalNode;
	public AS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.AS);
		} else {
			return this.getToken(SqlMiniParser.AS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_selectList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterSelectList) {
			listener.enterSelectList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitSelectList) {
			listener.exitSelectList(this);
		}
	}
}


export class TableListContext extends ParserRuleContext {
	public tableName(): TableNameContext[];
	public tableName(i: number): TableNameContext;
	public tableName(i?: number): TableNameContext | TableNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TableNameContext);
		} else {
			return this.getRuleContext(i, TableNameContext);
		}
	}
	public alias(): AliasContext[];
	public alias(i: number): AliasContext;
	public alias(i?: number): AliasContext | AliasContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AliasContext);
		} else {
			return this.getRuleContext(i, AliasContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	public AS(): TerminalNode[];
	public AS(i: number): TerminalNode;
	public AS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.AS);
		} else {
			return this.getToken(SqlMiniParser.AS, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_tableList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterTableList) {
			listener.enterTableList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitTableList) {
			listener.exitTableList(this);
		}
	}
}


export class ColumnListContext extends ParserRuleContext {
	public columnName(): ColumnNameContext[];
	public columnName(i: number): ColumnNameContext;
	public columnName(i?: number): ColumnNameContext | ColumnNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnNameContext);
		} else {
			return this.getRuleContext(i, ColumnNameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_columnList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterColumnList) {
			listener.enterColumnList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitColumnList) {
			listener.exitColumnList(this);
		}
	}
}


export class ValueListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_valueList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterValueList) {
			listener.enterValueList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitValueList) {
			listener.exitValueList(this);
		}
	}
}


export class UpdateListContext extends ParserRuleContext {
	public columnName(): ColumnNameContext[];
	public columnName(i: number): ColumnNameContext;
	public columnName(i?: number): ColumnNameContext | ColumnNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnNameContext);
		} else {
			return this.getRuleContext(i, ColumnNameContext);
		}
	}
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.EQUALS);
		} else {
			return this.getToken(SqlMiniParser.EQUALS, i);
		}
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_updateList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterUpdateList) {
			listener.enterUpdateList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitUpdateList) {
			listener.exitUpdateList(this);
		}
	}
}


export class OrderListContext extends ParserRuleContext {
	public columnName(): ColumnNameContext[];
	public columnName(i: number): ColumnNameContext;
	public columnName(i?: number): ColumnNameContext | ColumnNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnNameContext);
		} else {
			return this.getRuleContext(i, ColumnNameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	public ASC(): TerminalNode[];
	public ASC(i: number): TerminalNode;
	public ASC(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.ASC);
		} else {
			return this.getToken(SqlMiniParser.ASC, i);
		}
	}
	public DESC(): TerminalNode[];
	public DESC(i: number): TerminalNode;
	public DESC(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.DESC);
		} else {
			return this.getToken(SqlMiniParser.DESC, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_orderList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterOrderList) {
			listener.enterOrderList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitOrderList) {
			listener.exitOrderList(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.RPAREN, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MINUS, 0); }
	public MULTIPLY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MULTIPLY, 0); }
	public DIVIDE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DIVIDE, 0); }
	public MODULO(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MODULO, 0); }
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.EQUALS, 0); }
	public NOT_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NOT_EQUALS, 0); }
	public LESS_THAN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LESS_THAN, 0); }
	public GREATER_THAN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.GREATER_THAN, 0); }
	public LESS_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LESS_EQUALS, 0); }
	public GREATER_EQUALS(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.GREATER_EQUALS, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.OR, 0); }
	public NOT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NOT, 0); }
	public functionCall(): FunctionCallContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallContext);
	}
	public columnName(): ColumnNameContext | undefined {
		return this.tryGetRuleContext(0, ColumnNameContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public subquery(): SubqueryContext | undefined {
		return this.tryGetRuleContext(0, SubqueryContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_expression; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
}


export class SubqueryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(SqlMiniParser.LPAREN, 0); }
	public selectStatement(): SelectStatementContext {
		return this.getRuleContext(0, SelectStatementContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(SqlMiniParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_subquery; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterSubquery) {
			listener.enterSubquery(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitSubquery) {
			listener.exitSubquery(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	public functionName(): FunctionNameContext {
		return this.getRuleContext(0, FunctionNameContext);
	}
	public LPAREN(): TerminalNode { return this.getToken(SqlMiniParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(SqlMiniParser.RPAREN, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public MULTIPLY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.MULTIPLY, 0); }
	public DISTINCT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DISTINCT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_functionCall; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterFunctionCall) {
			listener.enterFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitFunctionCall) {
			listener.exitFunctionCall(this);
		}
	}
}


export class CreateBodyContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(SqlMiniParser.LPAREN, 0); }
	public columnDefinition(): ColumnDefinitionContext[];
	public columnDefinition(i: number): ColumnDefinitionContext;
	public columnDefinition(i?: number): ColumnDefinitionContext | ColumnDefinitionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColumnDefinitionContext);
		} else {
			return this.getRuleContext(i, ColumnDefinitionContext);
		}
	}
	public RPAREN(): TerminalNode { return this.getToken(SqlMiniParser.RPAREN, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.COMMA);
		} else {
			return this.getToken(SqlMiniParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_createBody; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterCreateBody) {
			listener.enterCreateBody(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitCreateBody) {
			listener.exitCreateBody(this);
		}
	}
}


export class ColumnDefinitionContext extends ParserRuleContext {
	public columnName(): ColumnNameContext {
		return this.getRuleContext(0, ColumnNameContext);
	}
	public dataType(): DataTypeContext {
		return this.getRuleContext(0, DataTypeContext);
	}
	public constraintList(): ConstraintListContext | undefined {
		return this.tryGetRuleContext(0, ConstraintListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_columnDefinition; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterColumnDefinition) {
			listener.enterColumnDefinition(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitColumnDefinition) {
			listener.exitColumnDefinition(this);
		}
	}
}


export class DataTypeContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LPAREN, 0); }
	public NUMBER(): TerminalNode[];
	public NUMBER(i: number): TerminalNode;
	public NUMBER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SqlMiniParser.NUMBER);
		} else {
			return this.getToken(SqlMiniParser.NUMBER, i);
		}
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.RPAREN, 0); }
	public VARCHAR(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.VARCHAR, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.CHAR, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.INT, 0); }
	public INTEGER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.INTEGER, 0); }
	public BIGINT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.BIGINT, 0); }
	public SMALLINT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.SMALLINT, 0); }
	public TINYINT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TINYINT, 0); }
	public DECIMAL(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DECIMAL, 0); }
	public NUMERIC(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NUMERIC, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.COMMA, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.FLOAT, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DOUBLE, 0); }
	public REAL(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.REAL, 0); }
	public DATE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DATE, 0); }
	public TIME(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TIME, 0); }
	public DATETIME(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DATETIME, 0); }
	public TIMESTAMP(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TIMESTAMP, 0); }
	public TEXT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.TEXT, 0); }
	public BLOB(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.BLOB, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.BOOLEAN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_dataType; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterDataType) {
			listener.enterDataType(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitDataType) {
			listener.exitDataType(this);
		}
	}
}


export class ConstraintListContext extends ParserRuleContext {
	public constraint(): ConstraintContext[];
	public constraint(i: number): ConstraintContext;
	public constraint(i?: number): ConstraintContext | ConstraintContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConstraintContext);
		} else {
			return this.getRuleContext(i, ConstraintContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_constraintList; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterConstraintList) {
			listener.enterConstraintList(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitConstraintList) {
			listener.exitConstraintList(this);
		}
	}
}


export class ConstraintContext extends ParserRuleContext {
	public NOT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NOT, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NULL, 0); }
	public PRIMARY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.PRIMARY, 0); }
	public KEY(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.KEY, 0); }
	public UNIQUE(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.UNIQUE, 0); }
	public AUTO_INCREMENT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.AUTO_INCREMENT, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.DEFAULT, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public FOREIGN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.FOREIGN, 0); }
	public REFERENCES(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.REFERENCES, 0); }
	public tableName(): TableNameContext | undefined {
		return this.tryGetRuleContext(0, TableNameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.LPAREN, 0); }
	public columnName(): ColumnNameContext | undefined {
		return this.tryGetRuleContext(0, ColumnNameContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_constraint; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterConstraint) {
			listener.enterConstraint(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitConstraint) {
			listener.exitConstraint(this);
		}
	}
}


export class TableNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_tableName; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterTableName) {
			listener.enterTableName(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitTableName) {
			listener.exitTableName(this);
		}
	}
}


export class ColumnNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_columnName; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterColumnName) {
			listener.enterColumnName(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitColumnName) {
			listener.exitColumnName(this);
		}
	}
}


export class DatabaseNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_databaseName; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterDatabaseName) {
			listener.enterDatabaseName(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitDatabaseName) {
			listener.exitDatabaseName(this);
		}
	}
}


export class FunctionNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_functionName; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterFunctionName) {
			listener.enterFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitFunctionName) {
			listener.exitFunctionName(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_alias; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterAlias) {
			listener.enterAlias(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitAlias) {
			listener.exitAlias(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.IDENTIFIER, 0); }
	public QUOTED_IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.QUOTED_IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_identifier; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.STRING, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NUMBER, 0); }
	public BOOLEAN_LITERAL(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.BOOLEAN_LITERAL, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(SqlMiniParser.NULL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_literal; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
}


export class CommentContext extends ParserRuleContext {
	public COMMENT(): TerminalNode { return this.getToken(SqlMiniParser.COMMENT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SqlMiniParser.RULE_comment; }
	// @Override
	public enterRule(listener: SqlMiniListener): void {
		if (listener.enterComment) {
			listener.enterComment(this);
		}
	}
	// @Override
	public exitRule(listener: SqlMiniListener): void {
		if (listener.exitComment) {
			listener.exitComment(this);
		}
	}
}


