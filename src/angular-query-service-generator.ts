import { queryAdapter } from './adapters/query-adapter';
import { Type, Field, Arg } from './../schema.definitions';
import { convertPascalToKebabCase, insertFile, convertToPascalCase } from './utils';
import { convertScalarType } from './types';
export function generateQueryService(queries: Type, outputPath: string, serviceName: string = 'GraphQlDataService') {
  serviceName = serviceName.replace(/service$/gi, '');
  const file = printMainService(queries, serviceName);
  const filename = `/${convertPascalToKebabCase(serviceName.replace(/service$/gi, ''))}.service.ts`;
  insertFile(`${outputPath}`, filename, file);
  insertFile(`${outputPath}/adapters`, '/query-adapter.ts', queryAdapter);

  return { name: serviceName, filename };
}

function printMainService(queries: Type, serviceName: string) {
  return `/* tslint:disable:max-line-length */
import { QueryAdapter } from './adapters/query-adapter';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { query, mutation, subscription } from 'gql-query-builder'
import * as models from './models';

export interface GraphQLResponse<T> {
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ${serviceName} {

  constructor(private apollo: Apollo) { }
  // Queries
${printQueries(queries)}

  private simpleQuery<T>(operation: string, fields: models.Queryable<T> , variables?: any , enumerables?: string[]) {
    const generated = query([{
      operation,
      fields: fields as any,
      variables,
      enumerables 
    } as any], QueryAdapter) as any;
    return { query: gql\`\${generated.query}\`, variables: generated.variables };
  }
}
`;
}
function printQueries(queries: Type) {
  return queries.fields.reduce((acc, current) => {
    const returnType = convertToPascalCase(convertScalarType(current.type).field);
    return acc += `${printQuery(current.name, returnType, current)}`
  }, ``);
}
function printQuery(name: string, type: string, field: Field) {
  const returnType = convertScalarType(field.type);
  const pascaltType = convertToPascalCase(returnType.field);
  const returnTypeStr = pascaltType + (returnType.isList ? '[]' : '');
  const argumentField = '{ ' + field.args.map((ar) => ar.name + '?: ' + determineParamType(ar)).join(', ') + ' }';
  const queryableObj = `models.${pascaltType}Queryable`;
  const valueType = `models.Queryable<${queryableObj}>`
  return `  /**
   * ${field.description}
   */
  public ${name}(
    values: ${valueType},
    variables?: ${argumentField},
    enumerables?: string[]
    ): Observable<models.${returnTypeStr}> {
    const generatedQuery = this.simpleQuery<${queryableObj}>('${name}', values , variables, enumerables );
    return this.apollo.query<{ ${name}: models.${returnTypeStr}}>(generatedQuery)
      .pipe(map(({ data }) => data.${name}));
  }
`;
}

function determineParamType(argument: Arg) {
  const d = convertScalarType(argument.type);
  if (d.isImportable) {
    return 'models.' + convertToPascalCase(d.field);
  } else {
    return d.field;
  }
}