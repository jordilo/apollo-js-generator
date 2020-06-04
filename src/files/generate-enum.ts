import { Type } from './../../schema.definitions';
export function generateEnumFile(name: string, type: Type): string {

  const values = type.enumValues.map((enumValues) => `'${enumValues.name}'`).join(' | ');
  return `/**
 * ${type.description}
 */
export type ${name}  = ${values};`;
}