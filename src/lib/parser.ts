interface ParserInputParameter {
    inputText?: string;
    inputFilePath?: string;
}

class Parser {
    
    parsing ( input: ParserInputParameter ) {
        const strings = this.getRawStrings(input);
        const comments = [];
    }

    parseGetComments(inputString: string) {
        const comments: string[] = [];

        const commentStartFilter = /\/\*/g;
        const commentMiddleFilter = /\n\s*\*/g;
        const commentEndFilter = /\*\//g;

        const startPivotIter = inputString.matchAll(commentStartFilter);
        const endPivotIter = inputString.matchAll(commentEndFilter);

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

            parsed_string = parsed_string.replace(commentMiddleFilter, '');
        }

        return comments;
    }

    // Helper
    getRawStrings (inputString: ParserInputParameter) {
        // If file path todo something...
        return inputString;
    }
}