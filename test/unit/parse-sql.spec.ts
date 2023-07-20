import { CommentParser } from "../../src/lib/parser/comment_parser";

describe("Parsing SQL", ()=>{
    it("Should parse a sql file", async () => {
        const parser = new CommentParser();
        const comments = parser.parsing({
            inputFilePath: "../example/sqls/table-example.sql", 
            callerFilePath: __dirname
        })

        console.log(comments);
    })
});