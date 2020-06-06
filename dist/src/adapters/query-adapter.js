"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAdapter = void 0;
exports.queryAdapter = `import IQueryAdapter from 'gql-query-builder/build/adapters/IQueryAdapter';
import IQueryBuilderOptions from 'gql-query-builder/build/IQueryBuilderOptions';
import { Queryable } from '../models';

// tslint:disable:quotemark
interface QueryBuilderCustom<T> extends IQueryBuilderOptions {
  variables: Queryable<T>;
  enumerables: string[];
}

export class QueryAdapter<T> implements IQueryAdapter {
  constructor(private adapter: QueryBuilderCustom<T> | QueryBuilderCustom<T>[]) {
    console.log(this);
  }
  public queryBuilder() {
    const adapter = this.adapter as QueryBuilderCustom<T>;
    const queryGenerated = \`query{
  \${this.generateQuery(adapter)}
}
\`;
    return { query: queryGenerated, variables: undefined };
  }
  public queriesBuilder(options: import('gql-query-builder/build/IQueryBuilderOptions').default[]) {
    const adapters = this.adapter as QueryBuilderCustom<T>[];

    const queryGenerated = \`query{
  \${adapters.reduce((acc, adapter) => {
      return acc + this.generateQuery(adapter);
    }, '')}
}\`;
    return { query: queryGenerated, variables: undefined };
  }

  private generateQuery(adapter: QueryBuilderCustom<T>) {
    const fields = adapter.fields?.join(\`
  \`);
    const variables = this.generateArgs(adapter.variables, adapter.enumerables);
    return \`
    \${ adapter.operation} \${variables} {
      \${ fields}
    }
    \`;
  }
  private generateArgs(variables: Queryable<T>, enumerables: string[]) {
    if (!variables) {
      return '';
    }
    return '(' + Object.entries(variables)
      .map(([key, field]) => this.generaeArgField(key, field, '', enumerables))
      .join(',') + ')';

  }
  private generaeArgField(key: string, field: any, parent: string, enumerables: string[]) {
    switch (typeof field) {
      case 'object':
        return \`\${key}: {\${Object.entries(field)
          .map(([innerKey, innerField], i) => this.generaeArgField(innerKey, innerField, key + '.' + innerKey, enumerables))}}\`;
      case 'string':
        if ((enumerables?.some((e) => e === parent))) {
          console.log("hola");
          return \`\${key} : \${field}\`;
        }
        return \`\${key} : "\${field}"\`;
      default:
        return \`\${key} : \${field}\`;
    }
  }
}`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnktYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hZGFwdGVycy9xdWVyeS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsWUFBWSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUUxQixDQUFDIn0=