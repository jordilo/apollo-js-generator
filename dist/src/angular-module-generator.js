"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function generateAngularModule(outputPath, moduleName, providers) {
    if (moduleName === void 0) { moduleName = 'GraphQlApiModule'; }
    var moduleFile = generateAngularModuleFile(moduleName, providers);
    var moduleFileName = "/" + utils_1.convertPascalToKebabCase(moduleName.replace(/module$/gi, '')) + ".module.ts";
    utils_1.insertFile("" + outputPath, moduleFileName, moduleFile);
}
exports.generateAngularModule = generateAngularModule;
function generateAngularModuleFile(moduleName, providers) {
    return "\nimport { NgModule, ModuleWithProviders } from '@angular/core';\nimport { CommonModule } from '@angular/common';\nimport { HttpClientModule, HttpHeaders } from '@angular/common/http';\nimport { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';\nimport { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';\nimport { InMemoryCache } from 'apollo-cache-inmemory';\nimport { ApolloClient } from 'apollo-client';\nimport { WebSocketLink } from 'apollo-link-ws';\n" + printProvidersImports(providers) + "\n\n@NgModule({\n  declarations: [],\n  imports: [\n    CommonModule,\n    HttpClientModule,\n    ApolloModule,\n    HttpLinkModule\n  ],\n  providers: [{\n    provide: APOLLO_OPTIONS,\n    useFactory: apolloClientFactory,\n    deps: [HttpLink]\n  }],\n})\nexport class " + moduleName + " {\n\n  public static forRoot(graphQlWsUrl: string): ModuleWithProviders<" + moduleName + "> {\n    return {\n      ngModule: " + moduleName + ",\n      providers: [\n        " + printProviders(providers) + "\n        {\n          provide: APOLLO_OPTIONS,\n          useFactory: (httpLink: HttpLink) => apolloClientFactory(httpLink, graphQlWsUrl),\n          deps: [HttpLink]\n        }\n      ]\n    };\n  }\n}\n\nfunction apolloClientFactory(httpLink: HttpLink, uri: string) {\n  let link;\n  if (uri.match(/^ws/)) {\n    link = new WebSocketLink({\n      uri,\n      options: {\n        reconnect: true,\n        connectionParams: {\n          headers: {\n            Authorization: `Bearer ${localStorage.getItem('token')}`\n          }\n        }\n      }\n    });\n  } else if (uri.match(/^http/)) {\n    link = httpLink.create({\n      uri,\n      headers: new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` })\n    });\n  } else {\n    throw new Error('url should be valid');\n  }\n  return new ApolloClient({\n    cache: new InMemoryCache(),\n    link\n  });\n}\n";
}
function printProvidersImports(providers) {
    return providers.reduce(function (acc, _a) {
        var name = _a.name, filename = _a.filename;
        return acc + ("import { " + name + " } from '." + filename.replace('.ts', '') + "';\n");
    }, "");
}
function printProviders(providers) {
    return providers.reduce(function (acc, _a) {
        var name = _a.name;
        return acc + (name + ",");
    }, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb2R1bGUtZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FuZ3VsYXItbW9kdWxlLWdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUErRDtBQU0vRCxTQUFnQixxQkFBcUIsQ0FBQyxVQUFrQixFQUFFLFVBQXVDLEVBQUUsU0FBMEI7SUFBbkUsMkJBQUEsRUFBQSwrQkFBdUM7SUFDL0YsSUFBTSxVQUFVLEdBQUcseUJBQXlCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BFLElBQU0sY0FBYyxHQUFHLE1BQUksZ0NBQXdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsZUFBWSxDQUFDO0lBQ3JHLGtCQUFVLENBQUMsS0FBRyxVQUFZLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFKRCxzREFJQztBQUVELFNBQVMseUJBQXlCLENBQUMsVUFBa0IsRUFBRSxTQUEwQjtJQUUvRSxPQUFPLDZkQVNQLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxzUkFnQm5CLFVBQVUsaUZBRTRDLFVBQVUsMkNBRTdELFVBQVUsdUNBRWxCLGNBQWMsQ0FBQyxTQUFTLENBQUMsNjNCQXNDbEMsQ0FBQztBQUVGLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLFNBQTBCO0lBQ3ZELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxFQUFpQztZQUEvQixjQUFJLEVBQUUsc0JBQVE7UUFDNUMsT0FBTyxHQUFHLElBQUcsY0FBWSxJQUFJLGtCQUFhLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUN4RSxDQUFBLENBQUM7SUFDQSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsU0FBMEI7SUFDaEQsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLEVBQVE7WUFBTixjQUFJO1FBQ2xDLE9BQU8sR0FBRyxJQUFNLElBQUksTUFBRyxDQUFBLENBQUE7SUFDekIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRVIsQ0FBQyJ9