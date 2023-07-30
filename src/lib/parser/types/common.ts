export interface ParserInputParameter {
    inputText?: string;
    inputFilePath?: string;
    callerFilePath?: string;
}

export interface TableDocument {
    table: ParsedTableSymbol;
    fields: ParsedTableFieldSymbol[];
}

export interface ParsedTableSymbol {
    tableName: string;
    tableOption: string[];
    description: string[];
}

export interface ParsedTableFieldSymbol {
    name: string;
    fieldType: string;
    fieldOption: string[];
    description: string[];
}

export interface ParsedCommentSymbol {
    symbol: CommentSymbolType;
    value: string[];
    description: string[];
}

export const COMMENT_SYMBOL_LIST = [
    "@table",
    "@tableColumn",
] as CommentSymbolType[];

export const COMMENT_SYMBOL_LIST_MAP = {
    "@table": "@table",
    "@tableColumn": "@tableColumn",
    "@UNKOWN": "@UNKOWN",
} as const;

export type CommentSymbolType =
    (typeof COMMENT_SYMBOL_LIST_MAP)[keyof typeof COMMENT_SYMBOL_LIST_MAP];
