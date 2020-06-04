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
        return acc += `${printQuery(current.name, returnType)}`;
    }, ``);
}
function printQuery(name, type) {
    return `  public ${name}<T>(values: string, variables: any): Observable<models.${type}> {
    const query = this.simpleQuery('${name}', values);
    return this.apollo.query<{ ${name}: models.${type}}>({ query })
      .pipe(map(({ data }) => data.${name}));
  }
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1xdWVyeS1zZXJ2aWNlLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbmd1bGFyLXF1ZXJ5LXNlcnZpY2UtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUFvRjtBQUNwRixtQ0FBNEM7QUFDNUMsU0FBZ0Isb0JBQW9CLENBQUMsT0FBYSxFQUFFLFVBQWtCLEVBQUUsY0FBc0Isb0JBQW9CO0lBQ2hILFdBQVcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxNQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQ0FBd0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDbEcsa0JBQVUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBTkQsb0RBTUM7QUFFRCxTQUFTLGdCQUFnQixDQUFDLE9BQWEsRUFBRSxXQUFtQjtJQUMxRCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7ZUFlTSxXQUFXOzs7O0VBSXhCLFlBQVksQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7Ozs7O0NBV3RCLENBQUM7QUFDRixDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsT0FBYTtJQUNqQyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQzVDLE1BQU0sVUFBVSxHQUFHLDJCQUFtQixDQUFDLHlCQUFpQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RSxPQUFPLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUE7SUFDekQsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLElBQVksRUFBRSxJQUFZO0lBQzVDLE9BQU8sWUFBWSxJQUFJLDBEQUEwRCxJQUFJO3NDQUNqRCxJQUFJO2lDQUNULElBQUksWUFBWSxJQUFJO3FDQUNoQixJQUFJOztDQUV4QyxDQUFDO0FBQ0YsQ0FBQyJ9