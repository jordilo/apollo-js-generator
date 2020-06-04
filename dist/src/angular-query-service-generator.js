"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueryService = void 0;
const utils_1 = require("./utils");
const types_1 = require("./types");
function generateQueryService(queries, outputPath, serviceName = 'GraphQlDataService') {
    serviceName = serviceName.replace(/service$/gi, '');
    const file = printMainService(queries, serviceName);
    const filename = `/${utils_1.convertPascalToKebabCase(serviceName.replace(/service$/gi, ''))}.service.ts`;
    utils_1.insertFile(`${outputPath}`, filename, file);
    return { name: serviceName, filename };
}
exports.generateQueryService = generateQueryService;
function printMainService(queries, serviceName) {
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
function printQueries(queries) {
    return queries.fields.reduce((acc, current) => {
        const returnType = utils_1.convertToPascalCase(types_1.convertScalarType(current.type).field);
        return acc += `${printQuery(current.name, returnType, current)}`;
    }, ``);
}
function printQuery(name, type, field) {
    const returnType = types_1.convertScalarType(field.type);
    const returnTypeStr = utils_1.convertToPascalCase(returnType.field) + (returnType.isList ? '[]' : '');
    const argumentField = '{ ' + field.args.map((ar) => ar.name + '?: ' + determineParamType(ar)).join(', ') + ' }';
    return `  public ${name}(values: string, variables?: ${argumentField}): Observable<models.${returnTypeStr}> {
    const query = this.simpleQuery('${name}', values);
    return this.apollo.query<{ ${name}: models.${returnTypeStr}}>({ query })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1xdWVyeS1zZXJ2aWNlLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbmd1bGFyLXF1ZXJ5LXNlcnZpY2UtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUFvRjtBQUNwRixtQ0FBNEM7QUFDNUMsU0FBZ0Isb0JBQW9CLENBQUMsT0FBYSxFQUFFLFVBQWtCLEVBQUUsY0FBc0Isb0JBQW9CO0lBQ2hILFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxNQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQ0FBd0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDbEcsa0JBQVUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBTkQsb0RBTUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQWEsRUFBRSxXQUFtQjtJQUMxRCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7ZUFlTSxXQUFXOzs7O0VBSXhCLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7O0NBV3RCLENBQUM7QUFDRixDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsT0FBYTtJQUNqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQzVDLE1BQU0sVUFBVSxHQUFHLDJCQUFtQixDQUFDLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RSxPQUFPLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFBO0lBQ2xFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUM7QUFDRCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLEtBQVk7SUFDMUQsTUFBTSxVQUFVLEdBQUcseUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELE1BQU0sYUFBYSxHQUFHLDJCQUFtQixDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUYsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7SUFDL0csT0FBTyxZQUFZLElBQUksZ0NBQWdDLGFBQWEsd0JBQXdCLGFBQWE7c0NBQ3JFLElBQUk7aUNBQ1QsSUFBSSxZQUFZLGFBQWE7cUNBQ3pCLElBQUk7O0NBRXhDLENBQUM7QUFDRixDQUFDO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxRQUFhO0lBQ3ZDLE1BQU0sQ0FBQyxHQUFHLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUU7UUFDbEIsT0FBTyxTQUFTLEdBQUcsMkJBQW1CLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2pEO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDaEI7QUFDSCxDQUFDIn0=