import fs from 'fs';
import path from 'path';

interface ParserInputParameter {
    inputText?: string;
    inputFilePath?: string;
    callerFilePath?: string;
}

const COMMENT_SYMBOL_LIST = [
    "@table",
    "@tableColumn"
];

interface CommentSymbol {
    symbol?: string;
    value?: string[];
    description?: string[];
}

export class CommentParser {
    
    parsing ( input: ParserInputParameter ) {
        const strings = this.getRawStrings(input);
        const comments = [];

        return this.parseGetComments(strings || "");
    }

    /** get input as string and search comments, and return comment unit */
    parseGetComments(inputString: string) {
        const comments: CommentSymbol[] = [];

        const commentStartFilter = /\/\*/g;
        const commentMiddleFilter = /\n\s*\*/g;
        const commentEndFilter = /\*\//g;

        const startPivotIter = inputString.matchAll(commentStartFilter);
        const endPivotIter = inputString.matchAll(commentEndFilter);

        let parsed_result = "";

        while(true) {
            const start = startPivotIter.next();
            const end = endPivotIter.next();

            if(start.value == undefined || end.value == undefined) {
                break;
            }

            let parsed_string = inputString.slice(
                start.value.index, 
                end.value.index
            );
            

            let lines: any = [];
            let descriptions: any[] = [];

            lines = parsed_string.split('\n').map(line => line.trim());
            lines = lines.map((line: any) => line.replace(/^[*]*/i, '').trimStart());

            for (let line of lines) {
                if(line[0]=="@") {
                    let tokens = line.split(/\s+/);
                    for (let symbol of COMMENT_SYMBOL_LIST) {
                        if (tokens[0] == symbol) {
                            tokens.shift();
                            comments.push({symbol, value: [...tokens], description:[...descriptions]});
                            descriptions = [];
                            break;
                        }
                    }
                }
                else {
                    descriptions.push(line);
                }
            }

            parsed_result = parsed_string;
        }

        return comments;
    }

    // Helper
    getRawStrings (inputString: ParserInputParameter) {
        if (inputString.inputFilePath) {
            const filePath = path.resolve(inputString.callerFilePath || '',
                inputString.inputFilePath);
            return fs.readFileSync(filePath, 'utf-8');
        }

        return inputString.inputText;
    }
}