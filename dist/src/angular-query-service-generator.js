"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryService = void 0;
const query_adapter_1 = require("./adapters/query-adapter");
const utils_1 = require("./utils");
const types_1 = require("./types");
function generateQueryService(queries, outputPath, serviceName = 'GraphQlDataService') {
    serviceName = serviceName.replace(/service$/gi, '');
    const file = printMainService(queries, serviceName);
    const filename = `/${utils_1.convertPascalToKebabCase(serviceName.replace(/service$/gi, ''))}.service.ts`;
    utils_1.insertFile(`${outputPath}`, filename, file);
    utils_1.insertFile(`${outputPath}/adapters`, '/query-adapter.ts', query_adapter_1.queryAdapter);
    return { name: serviceName, filename };
}
exports.generateQueryService = generateQueryService;
function printMainService(queries, serviceName) {
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
function printQueries(queries) {
    return queries.fields.reduce((acc, current) => {
        const returnType = utils_1.convertToPascalCase(types_1.convertScalarType(current.type).field);
        return acc += `${printQuery(current.name, returnType, current)}`;
    }, ``);
}
function printQuery(name, type, field) {
    const returnType = types_1.convertScalarType(field.type);
    const pascaltType = utils_1.convertToPascalCase(returnType.field);
    const returnTypeStr = pascaltType + (returnType.isList ? '[]' : '');
    const argumentField = '{ ' + field.args.map((ar) => ar.name + '?: ' + determineParamType(ar)).join(', ') + ' }';
    const queryableObj = `models.${pascaltType}Queryable`;
    const valueType = `models.Queryable<${queryableObj}>`;
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
function determineParamType(argument) {
    const d = types_1.convertScalarType(argument.type);
    if (d.isImportable) {
        return 'models.' + utils_1.convertToPascalCase(d.field);
    }
    else {
        return d.field;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1xdWVyeS1zZXJ2aWNlLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbmd1bGFyLXF1ZXJ5LXNlcnZpY2UtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUF3RDtBQUV4RCxtQ0FBb0Y7QUFDcEYsbUNBQTRDO0FBQzVDLFNBQWdCLG9CQUFvQixDQUFDLE9BQWEsRUFBRSxVQUFrQixFQUFFLGNBQXNCLG9CQUFvQjtJQUNoSCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsTUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksZ0NBQXdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ2xHLGtCQUFVLENBQUMsR0FBRyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsa0JBQVUsQ0FBQyxHQUFHLFVBQVUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLDRCQUFZLENBQUMsQ0FBQztJQUV4RSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBUkQsb0RBUUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQWEsRUFBRSxXQUFtQjtJQUMxRCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7OztlQWlCTSxXQUFXOzs7O0VBSXhCLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7OztDQVl0QixDQUFDO0FBQ0YsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLE9BQWE7SUFDakMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUM1QyxNQUFNLFVBQVUsR0FBRywyQkFBbUIsQ0FBQyx5QkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUUsT0FBTyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQTtJQUNsRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxLQUFZO0lBQzFELE1BQU0sVUFBVSxHQUFHLHlCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxNQUFNLFdBQVcsR0FBRywyQkFBbUIsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsTUFBTSxhQUFhLEdBQUcsV0FBVyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNoSCxNQUFNLFlBQVksR0FBRyxVQUFVLFdBQVcsV0FBVyxDQUFDO0lBQ3RELE1BQU0sU0FBUyxHQUFHLG9CQUFvQixZQUFZLEdBQUcsQ0FBQTtJQUNyRCxPQUFPO09BQ0YsS0FBSyxDQUFDLFdBQVc7O1dBRWIsSUFBSTtjQUNELFNBQVM7a0JBQ0wsYUFBYTs7MkJBRUosYUFBYTs4Q0FDTSxZQUFZLE1BQU0sSUFBSTtpQ0FDbkMsSUFBSSxZQUFZLGFBQWE7cUNBQ3pCLElBQUk7O0NBRXhDLENBQUM7QUFDRixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxRQUFhO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUU7UUFDbEIsT0FBTyxTQUFTLEdBQUcsMkJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDIn0=