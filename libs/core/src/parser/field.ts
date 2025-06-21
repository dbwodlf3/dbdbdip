export interface Field {
    fieldName: string;
    fieldDescription: string[];
    fieldOption: FieldOption;
}

interface FieldOption {
    index?: boolean;
    unique?: boolean;
}

interface FieldToken {

}

