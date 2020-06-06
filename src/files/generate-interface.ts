import { map } from 'rxjs/operators';
import { Field } from './../../schema.definitions';
import { getExportNameAndFileName, convertToPascalCase } from './../utils';
import { Type } from "../../schema.definitions";
import { convertScalarType, FieldTreated } from "../types";
import { TypeFieldModel } from '../definitions';
import _ from 'lodash';

type FieldTreatedExtended = Field & FieldTreated;

export function generateInterfaceFile(name: string, type: Type): string {
  let fields: FieldTreatedExtended[];
  let importableFields = '';
  fields = (type.fields || type.inputFields).map((field) => ({ ...field, ...convertScalarType(field.type) })) as unknown as FieldTreatedExtended[];
  importableFields = _.chain(fields.filter((f) => f.isImportable && f.field !== type.name))
    .groupBy('field')
    .map((d) => d[0])
    .value()
    .reduce((acc, imp) => {
      const { exportName, fileName } = getExportNameAndFileName(imp.field);
      return acc + `import { ${exportName} } from './${fileName}';
`
    }, '');
  return `${importableFields}/**
 * ${type.description}
 */
export interface ${name}  {
${printFields(fields , Boolean(type.inputFields))}
}
export interface ${name}Queryable  {
${printFields(fields, true)}
}


`;
}

function printFields(fields: FieldTreatedExtended[], plainObject: boolean = false) {

  return fields.reduce((acc, field) => {
    return acc += `
  ${printField(field, plainObject)}`
  }, '');
}
function printField(field: TypeFieldModel, plainObject: boolean) {
  try {
    const required = field.isRequired ? '?' : '';
    const listSuffix = field.isList && !plainObject ? '[]' : ''
    return `${field.name}${required}: ${field.isImportable ? convertToPascalCase(field.field) : field.field}${listSuffix};`
  } catch (err) {
    return 'ERROR field';
  }
}