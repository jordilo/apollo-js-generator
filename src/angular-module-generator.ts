import { convertPascalToKebabCase, insertFile } from './utils';

interface ProvidersDesc {
  name: string;
  filename: string;
}
export function generateAngularModule(outputPath: string, moduleName: string = 'GraphQlApiModule', providers: ProvidersDesc[]) {
  const moduleFile = generateAngularModuleFile(moduleName, providers);
  const moduleFileName = `/${convertPascalToKebabCase(moduleName.replace(/module$/gi, ''))}.module.ts`;
  insertFile(`${outputPath}`, moduleFileName, moduleFile);
}

function generateAngularModuleFile(moduleName: string, providers: ProvidersDesc[]) {

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

function printProvidersImports(providers: ProvidersDesc[]) {
  return providers.reduce((acc, { name, filename }: ProvidersDesc) => {
    return acc + `import { ${name} } from '.${filename.replace('.ts', '')}';
`;
  }, ``);
}

function printProviders(providers: ProvidersDesc[]) {
  return providers.reduce((acc, { name }) => {
    return acc + `${name},`
  }, '')

}