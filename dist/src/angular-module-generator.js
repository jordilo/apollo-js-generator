"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAngularModule = void 0;
const utils_1 = require("./utils");
function generateAngularModule(outputPath, moduleName = 'GraphQlApiModule', providers) {
    const moduleFile = generateAngularModuleFile(moduleName, providers);
    const moduleFileName = `/${utils_1.convertPascalToKebabCase(moduleName.replace(/module$/gi, ''))}.module.ts`;
    utils_1.insertFile(`${outputPath}`, moduleFileName, moduleFile);
}
exports.generateAngularModule = generateAngularModule;
function generateAngularModuleFile(moduleName, providers) {
    return `
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
${printProvidersImports(providers)}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: apolloClientFactory,
    deps: [HttpLink]
  }],
})
export class ${moduleName} {

  public static forRoot(graphQlWsUrl: string): ModuleWithProviders<${moduleName}> {
    return {
      ngModule: ${moduleName},
      providers: [
        ${printProviders(providers)}
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => apolloClientFactory(httpLink, graphQlWsUrl),
          deps: [HttpLink]
        }
      ]
    };
  }
}

function apolloClientFactory(httpLink: HttpLink, uri: string) {
  let link;
  if (uri.match(/^ws/)) {
    link = new WebSocketLink({
      uri,
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: \`Bearer \${localStorage.getItem('token')}\`
          }
        }
      }
    });
  } else if (uri.match(/^http/)) {
    link = httpLink.create({
      uri,
      headers: new HttpHeaders({ Authorization: \`Bearer \${localStorage.getItem('token')}\` })
    });
  } else {
    throw new Error('url should be valid');
  }
  return new ApolloClient({
    cache: new InMemoryCache(),
    link
  });
}
`;
}
function printProvidersImports(providers) {
    return providers.reduce((acc, { name, filename }) => {
        return acc + `import { ${name} } from '.${filename.replace('.ts', '')}';
`;
    }, ``);
}
function printProviders(providers) {
    return providers.reduce((acc, { name }) => {
        return acc + `${name},`;
    }, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb2R1bGUtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FuZ3VsYXItbW9kdWxlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBK0Q7QUFNL0QsU0FBZ0IscUJBQXFCLENBQUMsVUFBa0IsRUFBRSxhQUFxQixrQkFBa0IsRUFBRSxTQUEwQjtJQUMzSCxNQUFNLFVBQVUsR0FBRyx5QkFBeUIsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEUsTUFBTSxjQUFjLEdBQUcsSUFBSSxnQ0FBd0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDckcsa0JBQVUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBSkQsc0RBSUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLFVBQWtCLEVBQUUsU0FBMEI7SUFFL0UsT0FBTzs7Ozs7Ozs7O0VBU1AscUJBQXFCLENBQUMsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O2VBZ0JuQixVQUFVOztxRUFFNEMsVUFBVTs7a0JBRTdELFVBQVU7O1VBRWxCLGNBQWMsQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc0NsQyxDQUFDO0FBRUYsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsU0FBMEI7SUFDdkQsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBaUIsRUFBRSxFQUFFO1FBQ2pFLE9BQU8sR0FBRyxHQUFHLFlBQVksSUFBSSxhQUFhLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztDQUN4RSxDQUFDO0lBQ0EsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLFNBQTBCO0lBQ2hELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7UUFDeEMsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQTtJQUN6QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFFUixDQUFDIn0=