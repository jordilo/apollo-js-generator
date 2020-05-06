import { TypeModel, TypeFieldModel } from './definitions.d';
import { convertToPascalCase, insertFile } from './utils';
export function generateFiles(outputPath: string, types: TypeModel[]) {

  const file = types.reduce((acc, type) => {
    return acc += createFileStream(type);
  }, '');
  insertFile(outputPath + '/models/', "index.d.ts", file), { flag: 'wx' };
}

function createFileStream(type: TypeModel) {
  return `` +
    `export interface ${convertToPascalCase(type.name)} {${printFields(type.fields)}
}
`;
}
function printFields(fields: TypeFieldModel[]) {
  return fields.reduce((acc, field) => {
    return acc += `
  ${printField(field)}`
  }, ``);
}
function printField(field: TypeFieldModel) {
  return `${field.name}: ${field.isImportable ? convertToPascalCase(field.field) : field.field};`
}


