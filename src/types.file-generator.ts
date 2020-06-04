import { EnumValue } from './../schema.definitions';
import { TypeModel, TypeFieldModel } from './definitions.d';
import { convertToPascalCase, insertFile, getExportNameAndFileName } from './utils';
import { Type, InputField } from '../schema.definitions';
export function generateInterfaceFiles(outputPath: string, types: TypeModel[]) {

  const indexFileString = types.reduce((acc, type) => {
    const fileFilledData = createInterfaceFileStream(type);
    const { fileName, exportName } = getExportNameAndFileName(type.name);
    insertFile(outputPath + '/models/', fileName + '.d.ts', fileFilledData), { flag: 'wx' };
    return `export {${exportName}}  from './${fileName}'`;
  }, '');
  insertFile(outputPath + '/models/', "index.d.ts", indexFileString), { flag: 'wx' };
}

export function generateEnumFiles(outputPath: string, enums: Type[]) {
  const file = enums.reduce((acc, type) => {
    return acc += createEnumFileStream(type);
  }, '');
  insertFile(outputPath + '/enums/', "index.d.ts", file), { flag: 'wx' };
}

export function createInterfaceFileStream(type: TypeModel) {

  const importableFields = type.fields.filter((field) => field.isImportable);
  const imports = importableFields.reduce((acc, curr) => {
    const { fileName, exportName } = getExportNameAndFileName(curr.name);
    return acc + `import {${exportName}} from './${fileName}';
`;
  }, '')
  return imports +
    `export interface ${convertToPascalCase(type.name)} {${printFields(type.fields)}
}
`;
}
function createEnumFileStream(type: Type) {
  return `` +
    `export type ${convertToPascalCase(type.name)} = ${printEnumFields(type.enumValues)}
    `;
}

function printEnumFields(type: EnumValue[]) {
  return type.map((input) => `'${input.name}'`).join('|') + ';';
}
function printFields(fields: TypeFieldModel[]) {

  return fields.reduce((acc, field) => {
    return acc += `
  ${printField(field)}`
  }, '');
}
function printField(field: TypeFieldModel) {
  return `${field.name}: ${field.isImportable ? convertToPascalCase(field.field) : field.field};`
}




