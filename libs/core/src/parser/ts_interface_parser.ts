import { Project, Node, PropertySignature } from 'ts-morph';

interface ParsedInterface {
  collectionName: string;
  description: string[];
  fields: ParsedField[];
}

interface ParsedField {
  fieldName: string;
  type: string;
  description: string[];
  fields?: ParsedField[];
}

interface DescDescription {
    fieldName: string;
    description: string[];
}

function parseField(prop: PropertySignature, parentDescriptions?: DescDescription[]): ParsedField {
  const fieldName = prop.getName();
  const typeText = prop.getType().getText();
  const isOptional = prop.hasQuestionToken();
  const fullType = isOptional && !typeText.includes('undefined')
    ? `${typeText} | undefined`
    : typeText;

  const jsDoc = prop.getJsDocs()[0];
  const tags = jsDoc?.getTags() || [];
  const fieldTag = tags.find(tag => tag.getTagName() === 'field');
  const objectTag = tags.find(tag => tag.getTagName() === 'object');

  let description: string[] = [];
  let definedDescriptionFromParent = parentDescriptions?.find(desc => desc.fieldName === fieldName) 
  if(definedDescriptionFromParent) {
    description = definedDescriptionFromParent.description;
  }

    const descDescriptions: DescDescription[] = [];
    tags.forEach(tag => {
        if (tag.getTagName() === 'field') {
            const raw = tag.getComment()?.toString() || '';
            const [first, ...rest] = raw.split('\n');
            const fieldName = first.split(' ')[0].trim();
            descDescriptions.push({
                fieldName,
                description: rest.map(s => s.trim()).filter(Boolean),
            });
        }
    });

  const parsed: ParsedField = {
    fieldName,
    type: fullType,
    description,
  };

  const typeNode = prop.getTypeNode();
  if (
    objectTag ||
    (typeNode && Node.isTypeLiteral(typeNode))
  ) {
    parsed.fields = [];

    const subProps = prop.getType().getProperties();
    for (const sub of subProps) {
      const decl = sub.getDeclarations()[0];
      if (!Node.isPropertySignature(decl)) continue;
      parsed.fields.push(parseField(decl, descDescriptions));
    }
  }

  return parsed;
}

export function parseTsInterface(filePath: string): ParsedInterface[] {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  const results: ParsedInterface[] = [];

  for (const tsInterface of sourceFile.getInterfaces()) {
    const jsDoc = tsInterface.getJsDocs()[0];
    const tags = jsDoc?.getTags() || [];
    const collectionTag = tags.find(tag => tag.getTagName() === 'collection');

    if (!collectionTag) continue;

    let stepParsing = collectionTag.getComment()?.toString().split('\n');
    let collectionName = tsInterface.getName();
    let description: string[] = [];

    if(stepParsing) {
        collectionName = stepParsing[0].split(' ')[0].trim();
        description = stepParsing.slice(1).map(line => line.trim());
    } 

    const parentDescriptions: DescDescription[] = [];
    tags.forEach(tag => {
        if (tag.getTagName() === 'field') {
            const raw = tag.getComment()?.toString() || '';
            const [first, ...rest] = raw.split('\n');
            const fieldName = first.split(' ')[0].trim();
            parentDescriptions.push({
                fieldName,
                description: rest.map(s => s.trim()).filter(Boolean),
            });
        }
    });

    const result: ParsedInterface = {
      collectionName,
      description,
      fields: [],
    };

    for (const prop of tsInterface.getProperties()) {
      result.fields.push(parseField(prop, parentDescriptions));
    }

    results.push(result);
  }

  return results;
}
