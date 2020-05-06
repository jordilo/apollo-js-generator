import { Type } from './schema.definitions';
import { generateQueryService } from './src/angular-query-service-generator';
import { ApolloConfig } from './src/definitions.d';
import { generateAngularModule } from './src/angular-module-generator';
import { generateFiles } from './src/types.file-generator';
import { getConfiguration, getSchema } from './src/schema';
import { generateTypes } from './src/types';
import * as apollogen from 'apollo-codegen'


export const generateGrapQlSchema = async () => {

    const options = getConfiguration();
    const { apolloUrl, output, getFromUri, authotization } = options;
    if (getFromUri) {
        return await apollogen.downloadSchema(
            apolloUrl,
            process.cwd() + output,
            {
                "x-hasura-admin-secret": process.env.GRAPHQL_AUTH || authotization
            },
            true,
            "POST")
            .then(result => {
                generateAsync(options);

            })
            .catch((err) => {
                console.log(err)
            });

    } else {
        return await new Promise((res, err) => {
            try {

                generateAsync(options)
            } catch (err) {
                return err();
            }
            res();
        });
    }
}

function generateAsync(options: ApolloConfig) {
    const schema = getSchema(options);
    const types = generateTypes(schema);
    const outputFolder = process.cwd() + options.outputPath;
    generateFiles(outputFolder, types);
    const queryObj = schema.types.find((t) => t.name === schema.queryType.name) as Type;
    const { name: serviceName, filename } = generateQueryService(queryObj, outputFolder);
    generateAngularModule(outputFolder, undefined, [{ name: serviceName, filename }]);
    return JSON.stringify(types);
}

generateGrapQlSchema()