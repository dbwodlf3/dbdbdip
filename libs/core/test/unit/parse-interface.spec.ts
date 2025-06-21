import path from "path";
import { parseTsInterface } from "../../src/parser/ts_interface_parser.js";
import { TestSettings } from "./common.js";

const testeFile = path.join(TestSettings.exampleDir, "user.interface.ts");

describe("Parsing Interface", () => {
    it("Parsing interface", ()=>{
        const parsed = parseTsInterface(testeFile)
        console.log(JSON.stringify(parsed, null, 2));
        // console.log("letsgo~");
    })
});
