# Apollo Angular generator
With this package you'll create easilly a data layer for your Angular application from you GraphQL server.

## Installation
```cli
  npm install @jordilo/apollo-js-generator
```
## Run
Before run, configure options as [below](#configuration) are explained 

```cli
  npm run graphql-generate-angular
```

## Configuration 
Create a file in root of your project named **.apollo-configuration**
```json
  {
      "apolloUrl": "https://{YOURDOMAIN}/v1/graphql",
      "authotization": "your-site-admin-password",
      "getFromUri":true,
      "output": "/schema.json",
      "outputPath": "/src/graphql"
  }
```
| Name  | Description  |
|---|---|
| apolloUrl  | url of the graphql  |
| authotization  | admin password access for graphql url (you can use GRAPHQL_AUTH environment variable instead) |
|  getFromUri (default false) | Flag to download schema from url or previous schema downloaded  |
|  output |   path where schema will be donwload for future uses|
|  outputPath |   path where graphql module will be generated|

## TODOS
* Generate templates from template generator (p.e. mustache)
* Separate each interface in a unique file
* Create Angular Store redux
* Unit test