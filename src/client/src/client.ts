import { TableDocument, TableFieldDocument } from "component/table";
import { parseCommentTable } from "../../lib/parser/comment_parser";
import { exampleStrings } from "../test/example/sql";

let tableDoc = document.createElement("table-document");

let exampleInput = exampleStrings;

let parsedData = parseCommentTable(exampleInput);

console.log(tableDoc);

console.log(parsedData);
