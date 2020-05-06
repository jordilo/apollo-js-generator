import { Schema, } from '../schema.definitions';
import { Type } from "../schema.definitions";
import { convertType } from './types';

let schema: Schema;

export function generateQueries(__schema: Schema) {
  schema = __schema;

  const queryObject = getField(__schema.queryType.name);

  const queries: any[] = [];
  queryObject.fields
    .reduce((acc, field) => {
      const f = getField(field.name);
      if (f) {
        acc.push(f);
      }
      return acc;
    }, [] as Type[])
    .map(field => getField(field.name))
    .map((type) => convertType(type));

  console.log(queries);
}

function getField(name: string) {
  console.log(name);
  try {
    return schema.types.find((type) => type.name === name) as Type
  } catch (err) {
    return { name } as Type
  }
}
//schema.data.__schema.types.filter((type) => type.kind === "INPUT_OBJECT").filter(({name}) => name.match(/^books/)).map(({name , inputFields}) => ({name ,inputFields}))

