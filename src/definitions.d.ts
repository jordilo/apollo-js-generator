export interface ApolloConfig {
  apolloUrl: string;
  output: string;
  token: string;
  outputPath: string;
  getFromUri: boolean;
  authotization: string;
}

export interface TypeModel {
  name: string,
  fields: TypeFieldModel[];
  description: string;
}
export interface TypeFieldModel {
  description: string;
  name: string;
  isImportable: boolean;
  isList?: boolean;
  isRequired?: boolean;
  field: string;
}