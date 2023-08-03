import { WordCount } from "component/table";
import { parseCommentTable } from "../../lib/parser/comment_parser";
import { exampleStrings } from "../test/example/sql";

const SidebarWrapper = document.getElementById("SideBar");
const TableBoardWrapper = document.getElementById("TableBoard");

let exampleInput = exampleStrings;

let parsedData = parseCommentTable(exampleInput);

let sidebar = "";

let contentBody = "";

console.log(WordCount);
