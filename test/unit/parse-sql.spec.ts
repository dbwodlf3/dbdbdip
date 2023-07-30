import path from "path";
import fs from "fs";
import { ParserInputParameter } from "lib/parser/types/common";
import { parseCommentTable } from "../../src/lib/parser/comment_parser";

// Helper
function getRawStrings(inputString: ParserInputParameter) {
    if (inputString.inputFilePath) {
        const filePath = path.resolve(
            inputString.callerFilePath || "",
            inputString.inputFilePath
        );
        return fs.readFileSync(filePath, "utf-8");
    }

    return inputString.inputText;
}

describe("Parsing SQL", () => {
    it("Should parse a sql file", async () => {
        const parsed_table = parseCommentTable(
            getRawStrings({
                inputFilePath: "../example/sqls/table-example.sql",
                callerFilePath: __dirname,
            })!
        );

        expect(parsed_table.length).toEqual(2);
    });
});
