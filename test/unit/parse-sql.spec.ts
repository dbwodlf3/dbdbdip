import { parseCommentTable } from "../../src/lib/parser/comment_parser";

describe("Parsing SQL", () => {
    it("Should parse a sql file", async () => {
        const parsed_table = parseCommentTable({
            inputFilePath: "../example/sqls/table-example.sql",
            callerFilePath: __dirname,
        });

        expect(parsed_table.length).toEqual(2);
    });
});
