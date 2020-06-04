import { map } from 'rxjs/operators';
import { TypeFieldModel } from './definitions.d';
import { Schema, OfType, Field, Type } from '../schema.definitions';
import { TypeModel } from './definitions';
import _ from 'lodash';
export function generateTypes(schema: Schema) {

  return schema.types
    .filter((type) => type.kind === "OBJECT" && !type.name.match(/^__/))
    .map((type) => convertType(type));
}


export function generateEnums(schema: Schema) {
  return schema.types
    .filter((type) => type.kind === "ENUM");
}

export function convertScalarType(type: OfType): FieldTreated {
  try {
    switch (type.kind) {
      case "SCALAR":
        switch (type.name) {
          case 'timestamptz':
          case 'uuid':
            return { field: 'string', isImportable: false, };
          case "String":
          case "Boolean":
            return { field: type.name.toLocaleLowerCase(), isImportable: false };
          case "Float":
          case "Int":
          case "numeric":
            return { field: "number", isImportable: false };
          default:

        }
      case "INPUT_OBJECT":
      case "ENUM": {
        return { field: type.name, isImportable: true };
      }
      case "LIST":
        const { field, isImportable } = convertScalarType(type.ofType)
        return {
          field: `${field}`,
          isList: true,
          isImportable
        };
      case "OBJECT":
        return { field: type.name, isImportable: true };
      case "NON_NULL":
        return { ...convertScalarType(type.ofType), isRequired: true };
      default:
        return convertScalarType(type.ofType);
    }

  } catch (err) {
    throw new Error(type.name);
  }
}
function generateInnerField(fieldToConvert: Field, index: number): TypeFieldModel {
  try {
    const { isImportable, field } = convertScalarType(fieldToConvert.type);
    return {
      name: fieldToConvert.name,
      isImportable,
      field,
      description: fieldToConvert.description
    }
  } catch (err) {
    throw new Error(fieldToConvert.name + " " + index.toString());
  }
}
export function convertType({ name, description, fields }: Type): TypeModel {
  try {
    return {
      name,
      description,
      fields: fields.map((field, index) => generateInnerField(field, index)),
    };
  } catch (err) {
    return undefined as any;
  }
}

export interface FieldTreated {
  field: string; isImportable: boolean; isList?: boolean; isRequired?: boolean
}