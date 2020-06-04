import { Type, Field, Arg } from './../schema.definitions';
import { convertPascalToKebabCase, insertFile, convertToPascalCase } from './utils';
import { convertScalarType } from './types';
export function generateQueryService(queries: Type, outputPath: string, serviceName: string = 'GraphQlDataService') {
  serviceName = serviceName.replace(/service$/gi, '');
  const file = printMainService(queries, serviceName);
  const filename = `/${convertPascalToKebabCase(serviceName.replace(/service$/gi, ''))}.service.ts`;
  insertFile(`${outputPath}`, filename, file);
  return { name: serviceName, filename };
}

function printMainService(queries: Type, serviceName: string) {
  return `import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
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

  private simpleQuery(queryName: string, fields: any) {
    const queryTitle = queryName.charAt(0).toUpperCase() + queryName.substr(1);
    return gql\`query \${queryTitle} {
      \${queryName}{
        \${fields}
      }
    }\`;
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
  const returnTypeStr = convertToPascalCase(returnType.field) + (returnType.isList ? '[]' : '');
  const argumentField = '{ ' + field.args.map((ar) => ar.name + '?: ' + determineParamType(ar)).join(', ') + ' }'
  return `  public ${name}(values: string, variables?: ${argumentField}): Observable<models.${returnTypeStr}> {
    const query = this.simpleQuery('${name}', values);
    return this.apollo.query<{ ${name}: models.${returnTypeStr}}>({ query })
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