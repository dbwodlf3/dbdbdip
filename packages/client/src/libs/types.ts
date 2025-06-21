export interface ParsedInterface {
  collectionName: string;
  description: string[];
  fields: ParsedField[];
}

export interface ParsedField {
  fieldName: string;
  type: string;
  description: string[];
  fields?: ParsedField[];
}
