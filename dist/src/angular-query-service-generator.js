"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var types_1 = require("./types");
function generateQueryService(queries, outputPath, serviceName) {
    if (serviceName === void 0) { serviceName = 'GraphQlDataService'; }
    serviceName = serviceName.replace(/service$/gi, '');
    var file = printMainService(queries, serviceName);
    var filename = "/" + utils_1.convertPascalToKebabCase(serviceName.replace(/service$/gi, '')) + ".service.ts";
    utils_1.insertFile("" + outputPath, filename, file);
    return { name: serviceName, filename: filename };
}
exports.generateQueryService = generateQueryService;
function printMainService(queries, serviceName) {
    return "import { Injectable } from '@angular/core';\nimport { Apollo } from 'apollo-angular';\nimport { ApolloQueryResult } from 'apollo-client';\nimport { Observable } from 'rxjs';\nimport { map } from 'rxjs/operators';\nimport gql from 'graphql-tag';\nimport * as models from './models';\n\nexport interface GraphQLResponse<T> {\n  data: T;\n}\n\n@Injectable({\n  providedIn: 'root'\n})\nexport class " + serviceName + " {\n\n  constructor(private apollo: Apollo) { }\n  // Queries\n" + printQueries(queries) + "\n\n  private simpleQuery(queryName: string, fields: any) {\n    const queryTitle = queryName.charAt(0).toUpperCase() + queryName.substr(1);\n    return gql`query ${queryTitle} {\n      ${queryName}{\n        ${fields}\n      }\n    }`;\n  }\n}\n";
}
function printQueries(queries) {
    return queries.fields.reduce(function (acc, current) {
        var returnType = utils_1.convertToPascalCase(types_1.convertScalarType(current.type).field);
        return acc += "" + printQuery(current.name, returnType);
    }, "");
}
function printQuery(name, type) {
    return "  public " + name + "<T>(values: string, variables: any): Observable<models." + type + "> {\n    const query = this.simpleQuery('" + name + "', values);\n    return this.apollo.query<{ " + name + ": models." + type + "}>({ query })\n      .pipe(map(({ data }) => data." + name + "));\n  }\n";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1xdWVyeS1zZXJ2aWNlLWdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbmd1bGFyLXF1ZXJ5LXNlcnZpY2UtZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUNBQW9GO0FBQ3BGLGlDQUE0QztBQUM1QyxTQUFnQixvQkFBb0IsQ0FBQyxPQUFhLEVBQUUsVUFBa0IsRUFBRSxXQUEwQztJQUExQyw0QkFBQSxFQUFBLGtDQUEwQztJQUNoSCxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDcEQsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3BELElBQU0sUUFBUSxHQUFHLE1BQUksZ0NBQXdCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsZ0JBQWEsQ0FBQztJQUNsRyxrQkFBVSxDQUFDLEtBQUcsVUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO0FBQ3pDLENBQUM7QUFORCxvREFNQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsT0FBYSxFQUFFLFdBQW1CO0lBQzFELE9BQU8sZ1pBZU0sV0FBVyx1RUFJeEIsWUFBWSxDQUFDLE9BQU8sQ0FBQywyUEFXdEIsQ0FBQztBQUNGLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxPQUFhO0lBQ2pDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsT0FBTztRQUN4QyxJQUFNLFVBQVUsR0FBRywyQkFBbUIsQ0FBQyx5QkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUUsT0FBTyxHQUFHLElBQUksS0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUcsQ0FBQTtJQUN6RCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsSUFBWSxFQUFFLElBQVk7SUFDNUMsT0FBTyxjQUFZLElBQUksK0RBQTBELElBQUksaURBQ2pELElBQUksb0RBQ1QsSUFBSSxpQkFBWSxJQUFJLDBEQUNoQixJQUFJLGVBRXhDLENBQUM7QUFDRixDQUFDIn0=