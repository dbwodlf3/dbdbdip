export interface ParsedTable {
  collectionName: string;
  description: string[];
  fields: ParsedField[];
  
  [key: string]: unknown;
}

export interface ParsedField {
  fieldName: string;
  type: string;
  description: string[];
  fields?: ParsedField[];
}
