// Generated from src/grammars/antlr/SqlMini.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { SqlFileContext } from "./SqlMiniParser";
import { StatementContext } from "./SqlMiniParser";
import { SelectStatementContext } from "./SqlMiniParser";
import { InsertStatementContext } from "./SqlMiniParser";
import { UpdateStatementContext } from "./SqlMiniParser";
import { DeleteStatementContext } from "./SqlMiniParser";
import { CreateStatementContext } from "./SqlMiniParser";
import { DropStatementContext } from "./SqlMiniParser";
import { AlterStatementContext } from "./SqlMiniParser";
import { UseStatementContext } from "./SqlMiniParser";
import { ShowStatementContext } from "./SqlMiniParser";
import { DescribeStatementContext } from "./SqlMiniParser";
import { SelectListContext } from "./SqlMiniParser";
import { TableListContext } from "./SqlMiniParser";
import { ColumnListContext } from "./SqlMiniParser";
import { ValueListContext } from "./SqlMiniParser";
import { UpdateListContext } from "./SqlMiniParser";
import { OrderListContext } from "./SqlMiniParser";
import { ExpressionContext } from "./SqlMiniParser";
import { SubqueryContext } from "./SqlMiniParser";
import { FunctionCallContext } from "./SqlMiniParser";
import { CreateBodyContext } from "./SqlMiniParser";
import { ColumnDefinitionContext } from "./SqlMiniParser";
import { DataTypeContext } from "./SqlMiniParser";
import { ConstraintListContext } from "./SqlMiniParser";
import { ConstraintContext } from "./SqlMiniParser";
import { TableNameContext } from "./SqlMiniParser";
import { ColumnNameContext } from "./SqlMiniParser";
import { DatabaseNameContext } from "./SqlMiniParser";
import { FunctionNameContext } from "./SqlMiniParser";
import { AliasContext } from "./SqlMiniParser";
import { IdentifierContext } from "./SqlMiniParser";
import { LiteralContext } from "./SqlMiniParser";
import { CommentContext } from "./SqlMiniParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `SqlMiniParser`.
 */
export interface SqlMiniListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SqlMiniParser.sqlFile`.
	 * @param ctx the parse tree
	 */
	enterSqlFile?: (ctx: SqlFileContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.sqlFile`.
	 * @param ctx the parse tree
	 */
	exitSqlFile?: (ctx: SqlFileContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.selectStatement`.
	 * @param ctx the parse tree
	 */
	enterSelectStatement?: (ctx: SelectStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.selectStatement`.
	 * @param ctx the parse tree
	 */
	exitSelectStatement?: (ctx: SelectStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.insertStatement`.
	 * @param ctx the parse tree
	 */
	enterInsertStatement?: (ctx: InsertStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.insertStatement`.
	 * @param ctx the parse tree
	 */
	exitInsertStatement?: (ctx: InsertStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.updateStatement`.
	 * @param ctx the parse tree
	 */
	enterUpdateStatement?: (ctx: UpdateStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.updateStatement`.
	 * @param ctx the parse tree
	 */
	exitUpdateStatement?: (ctx: UpdateStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.deleteStatement`.
	 * @param ctx the parse tree
	 */
	enterDeleteStatement?: (ctx: DeleteStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.deleteStatement`.
	 * @param ctx the parse tree
	 */
	exitDeleteStatement?: (ctx: DeleteStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.createStatement`.
	 * @param ctx the parse tree
	 */
	enterCreateStatement?: (ctx: CreateStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.createStatement`.
	 * @param ctx the parse tree
	 */
	exitCreateStatement?: (ctx: CreateStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.dropStatement`.
	 * @param ctx the parse tree
	 */
	enterDropStatement?: (ctx: DropStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.dropStatement`.
	 * @param ctx the parse tree
	 */
	exitDropStatement?: (ctx: DropStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.alterStatement`.
	 * @param ctx the parse tree
	 */
	enterAlterStatement?: (ctx: AlterStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.alterStatement`.
	 * @param ctx the parse tree
	 */
	exitAlterStatement?: (ctx: AlterStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.useStatement`.
	 * @param ctx the parse tree
	 */
	enterUseStatement?: (ctx: UseStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.useStatement`.
	 * @param ctx the parse tree
	 */
	exitUseStatement?: (ctx: UseStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.showStatement`.
	 * @param ctx the parse tree
	 */
	enterShowStatement?: (ctx: ShowStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.showStatement`.
	 * @param ctx the parse tree
	 */
	exitShowStatement?: (ctx: ShowStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.describeStatement`.
	 * @param ctx the parse tree
	 */
	enterDescribeStatement?: (ctx: DescribeStatementContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.describeStatement`.
	 * @param ctx the parse tree
	 */
	exitDescribeStatement?: (ctx: DescribeStatementContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.selectList`.
	 * @param ctx the parse tree
	 */
	enterSelectList?: (ctx: SelectListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.selectList`.
	 * @param ctx the parse tree
	 */
	exitSelectList?: (ctx: SelectListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.tableList`.
	 * @param ctx the parse tree
	 */
	enterTableList?: (ctx: TableListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.tableList`.
	 * @param ctx the parse tree
	 */
	exitTableList?: (ctx: TableListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.columnList`.
	 * @param ctx the parse tree
	 */
	enterColumnList?: (ctx: ColumnListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.columnList`.
	 * @param ctx the parse tree
	 */
	exitColumnList?: (ctx: ColumnListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.valueList`.
	 * @param ctx the parse tree
	 */
	enterValueList?: (ctx: ValueListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.valueList`.
	 * @param ctx the parse tree
	 */
	exitValueList?: (ctx: ValueListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.updateList`.
	 * @param ctx the parse tree
	 */
	enterUpdateList?: (ctx: UpdateListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.updateList`.
	 * @param ctx the parse tree
	 */
	exitUpdateList?: (ctx: UpdateListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.orderList`.
	 * @param ctx the parse tree
	 */
	enterOrderList?: (ctx: OrderListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.orderList`.
	 * @param ctx the parse tree
	 */
	exitOrderList?: (ctx: OrderListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.subquery`.
	 * @param ctx the parse tree
	 */
	enterSubquery?: (ctx: SubqueryContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.subquery`.
	 * @param ctx the parse tree
	 */
	exitSubquery?: (ctx: SubqueryContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.createBody`.
	 * @param ctx the parse tree
	 */
	enterCreateBody?: (ctx: CreateBodyContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.createBody`.
	 * @param ctx the parse tree
	 */
	exitCreateBody?: (ctx: CreateBodyContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.columnDefinition`.
	 * @param ctx the parse tree
	 */
	enterColumnDefinition?: (ctx: ColumnDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.columnDefinition`.
	 * @param ctx the parse tree
	 */
	exitColumnDefinition?: (ctx: ColumnDefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.dataType`.
	 * @param ctx the parse tree
	 */
	enterDataType?: (ctx: DataTypeContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.dataType`.
	 * @param ctx the parse tree
	 */
	exitDataType?: (ctx: DataTypeContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.constraintList`.
	 * @param ctx the parse tree
	 */
	enterConstraintList?: (ctx: ConstraintListContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.constraintList`.
	 * @param ctx the parse tree
	 */
	exitConstraintList?: (ctx: ConstraintListContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.constraint`.
	 * @param ctx the parse tree
	 */
	enterConstraint?: (ctx: ConstraintContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.constraint`.
	 * @param ctx the parse tree
	 */
	exitConstraint?: (ctx: ConstraintContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.tableName`.
	 * @param ctx the parse tree
	 */
	enterTableName?: (ctx: TableNameContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.tableName`.
	 * @param ctx the parse tree
	 */
	exitTableName?: (ctx: TableNameContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.columnName`.
	 * @param ctx the parse tree
	 */
	enterColumnName?: (ctx: ColumnNameContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.columnName`.
	 * @param ctx the parse tree
	 */
	exitColumnName?: (ctx: ColumnNameContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.databaseName`.
	 * @param ctx the parse tree
	 */
	enterDatabaseName?: (ctx: DatabaseNameContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.databaseName`.
	 * @param ctx the parse tree
	 */
	exitDatabaseName?: (ctx: DatabaseNameContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.functionName`.
	 * @param ctx the parse tree
	 */
	enterFunctionName?: (ctx: FunctionNameContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.functionName`.
	 * @param ctx the parse tree
	 */
	exitFunctionName?: (ctx: FunctionNameContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.alias`.
	 * @param ctx the parse tree
	 */
	enterAlias?: (ctx: AliasContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.alias`.
	 * @param ctx the parse tree
	 */
	exitAlias?: (ctx: AliasContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;

	/**
	 * Enter a parse tree produced by `SqlMiniParser.comment`.
	 * @param ctx the parse tree
	 */
	enterComment?: (ctx: CommentContext) => void;
	/**
	 * Exit a parse tree produced by `SqlMiniParser.comment`.
	 * @param ctx the parse tree
	 */
	exitComment?: (ctx: CommentContext) => void;
}

