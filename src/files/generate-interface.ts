import { Field } from './../../schema.definitions';
import { getExportNameAndFileName, convertToPascalCase } from './../utils';
import { Type } from "../../schema.definitions";
import { convertScalarType, FieldTreated } from "../types";
import { TypeFieldModel } from '../definitions';

type FieldTreatedExtended = Field & FieldTreated;

export function generateInterfaceFile(name: string, type: Type): string {
  let fields: FieldTreatedExtended[];
  let importableFields = '';
  fields = (type.fields || type.inputFields).map((field) => ({ ...field, ...convertScalarType(field.type) })) as unknown as FieldTreatedExtended[];
  importableFields = fields.filter((f) => f.isImportable)
    .reduce((acc, imp) => {
      const { exportName, fileName } = getExportNameAndFileName(imp.field);
      return acc + `import { ${exportName} } from './${fileName}';
`
    }, '');
  return `${importableFields}/**
 * ${type.description}
 */
export interface ${name}  {
${printFields(fields, Boolean(type.fields))}
}`;
}

function printFields(fields: FieldTreatedExtended[], isField: boolean) {

  return fields.reduce((acc, field) => {
    return acc += `
  ${printField(field, isField)}`
  }, '');
}
function printField(field: TypeFieldModel, isField: boolean) {
  try {

    return `${field.name}: ${field.isImportable ? convertToPascalCase(field.field) : field.field}${field.isList ? '[]' : ''};`
  } catch (err) {
    return 'ERROR field';
  }
}