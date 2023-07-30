interface TableMetaInfo {
    tableName: string;
    tableEngine: "mariadb" | "mongodb";
    tableDescription: string;
    tableFields: FieldMetaInfo[];
}

interface FieldMetaInfo {
    fieldName: string;
    fieldDescription: string;
    fieldOption: FieldOption
}

interface FieldOption {
    [key: string]: boolean
}

export class TableDocument extends HTMLElement {
    metaInfo?: TableMetaInfo;

    connectedCallback() {
        this.render();
    }

    set meta(input: TableMetaInfo){
        this.metaInfo = input;
        this.render();
    }

    render() {
        if (!this.metaInfo) return;
    }
}

export class TableFieldDocument extends HTMLElement {
    metaInfo?: FieldMetaInfo;

    constructor(input: FieldMetaInfo) {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render(){
        if(!this.metaInfo) return;
    }
}

customElements.define('table-document', TableDocument);
customElements.define('table-field-document', TableFieldDocument);
