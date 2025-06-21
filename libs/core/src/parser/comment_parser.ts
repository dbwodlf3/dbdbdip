// import fs from "fs";
// import path from "path";
import {
    COMMENT_SYMBOL_LIST,
    ParsedCommentSymbol,
    CommentSymbolType,
    ParsedTableFieldSymbol,
    ParsedTableSymbol,
    ParserInputParameter,
    TableDocument,
} from "./types/common.js";

export function parseCommentTable(input: string) {
    const strings = input;
    const comments: ParsedCommentSymbol[] = [];

    const result: TableDocument[] = [];

    let _rawComments = prepareComments(strings || "");
    for (const rawComments of _rawComments) {
        for (const rawComment of rawComments) {
            comments.push(parseComment(rawComment));
        }
    }

    let _tables: ParsedTableSymbol[] = [];
    let _fields: ParsedTableFieldSymbol[] = [];

    for (const comment of comments) {
        if (comment.symbol == "@table") {
            if (_tables.length > 0) {
                result.push({ table: _tables[0], fields: _fields });
                _tables = [];
                _fields = [];
            }
            _tables.push(parseTable(comment));
        } else if (comment.symbol == "@tableColumn") {
            _fields.push(parseTableColumn(comment));
        }
    }
    if (_tables.length > 0) result.push({ table: _tables[0], fields: _fields });

    return result;
}

function parseTable(input: ParsedCommentSymbol) {
    let tableName = "";
    let tableOption: string[] = [];
    let description: string[] = [];

    /** Field name */
    let _value = input.value?.join(" ");
    let _fieldMatchs = _value?.match(/{[^{}]*}/gi);
    let _fieldMatchs2 = _value?.match(/\[[^{}]*\]/gi);
    let _fieldMatchs3 = _value?.match(/\([^{}]*\)/gi);
    if (_fieldMatchs)
        for (const match of _fieldMatchs) {
            _value = _value?.replace(match, "");
        }
    if (_fieldMatchs2)
        for (const match of _fieldMatchs2) {
            _value = _value?.replace(match, "");
        }
    if (_fieldMatchs3)
        for (const match of _fieldMatchs3) {
            _value = _value?.replace(match, "");
        }
    tableName = String(_value?.match(/\w+/i)) || "";

    /** Field Option Definition */
    let _tableOption = _value
        ?.match(/\[[^{}]*\]/gi)
        ?.map((x) => x.slice(1, -1));
    if (_tableOption && _tableOption[0])
        tableOption = _tableOption[0].split(",");

    /** description */
    description = input.description || [];

    return { tableName, tableOption, description };
}

function parseTableColumn(input: ParsedCommentSymbol) {
    if (input.symbol != "@tableColumn") throw new Error();
    const bracketedRegex = /[[\](){}]/;
    let result: ParsedTableFieldSymbol = {
        name: "?",
        fieldType: "?",
        fieldOption: [],
        description: [],
    };
    /** Field name */
    let _value = input.value?.join(" ");
    let _fieldMatchs = _value?.match(/{[^{}]*}/gi);
    let _fieldMatchs2 = _value?.match(/\[[^{}]*\]/gi);
    let _fieldMatchs3 = _value?.match(/\([^{}]*\)/gi);
    if (_fieldMatchs)
        for (const match of _fieldMatchs) {
            _value = _value?.replace(match, "");
        }
    if (_fieldMatchs2)
        for (const match of _fieldMatchs2) {
            _value = _value?.replace(match, "");
        }
    if (_fieldMatchs3)
        for (const match of _fieldMatchs3) {
            _value = _value?.replace(match, "");
        }
    let _filedName = _value?.match(/\w+/i);

    result.name = String(_filedName) || "?";

    /** Field Type Definition */
    _value = input.value?.join(" ");
    let _fieldTypes = _value?.match(/{[^{}]*}/gi)?.map((x) => x.slice(1, -1));

    result.fieldType = String(_fieldTypes) || "?";

    /** Field Option Definition */
    let _fieldOptions = _value
        ?.match(/\[[^{}]*\]/gi)
        ?.map((x) => x.slice(1, -1));
    if (_fieldOptions && _fieldOptions[0])
        _fieldOptions = _fieldOptions[0].split(",");

    result.fieldOption = _fieldOptions || [];

    result.description = input.description || [];

    return result;
}

function parseComment(inputString: string) {
    let result: ParsedCommentSymbol = {
        symbol: "@UNKOWN",
        value: [],
        description: [],
    };
    let lines = inputString.split("\n");

    for (const _symbol of COMMENT_SYMBOL_LIST) {
        let __symbol = lines[0].match(_symbol);
        if (!__symbol) continue;
        result.symbol = String(__symbol) as CommentSymbolType;
        result.value = String(lines[0].replace(result.symbol, ""))
            .split(/\s/)
            .filter((x) => x.trim().length > 0);
    }

    for (let i = 1; i < lines.length; i++) {
        result.description.push(lines[i]);
    }

    return result;
}

/** get input as string and search comments, and return comment unit */
function prepareComments(inputString: string) {
    const commentStartFilter = /\/\*/g;
    const commentEndFilter = /\*\//g;

    const startPivotIter = inputString.matchAll(commentStartFilter);
    const endPivotIter = inputString.matchAll(commentEndFilter);

    let commentBlocks = [];
    while (true) {
        const start = startPivotIter.next();
        const end = endPivotIter.next();

        if (start.value == undefined || end.value == undefined) {
            break;
        }

        commentBlocks.push(
            inputString.slice(start.value.index, end.value.index)
        );
    }

    let _commentBlocks: string[][] = [];
    for (let comments of commentBlocks) {
        comments = comments.replace(/^\s*\/\*\*/gim, "");
        comments = comments.replace(/\*\*\/$/gim, "");
        comments = comments.replace(/\*\/$/gim, "");
        comments = comments.replace(/^\s*\*/gim, "");

        _commentBlocks.push(comments.split(/(?=@)/));
    }

    let _comments: string[][] = [];
    for (let symbolBlock of _commentBlocks) {
        let _symbolBlocks = [];
        _symbolBlocks = symbolBlock;
        _symbolBlocks = _symbolBlocks.filter((x) => x.trim().length > 0);
        _symbolBlocks = _symbolBlocks.map((x) =>
            x.replace(/[\t ]+/g, " ").trim()
        );

        _comments.push(_symbolBlocks);
    }

    return _comments;
}
