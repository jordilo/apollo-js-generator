import { Schema } from '../schema.definitions';

import * as fs from 'fs';
import { ApolloConfig } from './definitions';
import { RootObject } from '../schema.definitions';

export function getConfiguration() {

  const apolloConfigBuffer = fs.readFileSync(process.cwd() + '/.apollo-configuration', { encoding: 'utf-8' });

  return JSON.parse(apolloConfigBuffer) as ApolloConfig;
}
export function getSchema({ output }: ApolloConfig): Schema {

  const d = fs.readFileSync(process.cwd() + output, { encoding: 'utf-8' });
  const schema = JSON.parse(d) as { data: RootObject };

  return schema.data.__schema
}
