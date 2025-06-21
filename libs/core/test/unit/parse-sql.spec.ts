import path from "path";
import fs from "fs";
import { ParserInputParameter } from "../../src/parser/types/common.js";
import { parseCommentTable } from "../../src/parser/sql_file_comment_parser.js";

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

describe.skip("Parsing SQL", () => {
    it("Should parse a sql file", async () => {
        const parsed_table = parseCommentTable(
            getRawStrings({
                inputFilePath: "../example/mariadb/user/user.table.sql",
                callerFilePath: __dirname,
            })!
        );

        expect(parsed_table.length).toEqual(2);
    });
});
