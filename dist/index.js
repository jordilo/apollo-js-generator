#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGrapQlSchema = void 0;
const angular_query_service_generator_1 = require("./src/angular-query-service-generator");
const angular_module_generator_1 = require("./src/angular-module-generator");
const schema_1 = require("./src/schema");
const apollogen = __importStar(require("apollo-codegen"));
const generate_models_1 = require("./src/generate-models");
exports.generateGrapQlSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = schema_1.getConfiguration();
    const { apolloUrl, output, getFromUri, authotization } = options;
    if (getFromUri) {
        return yield apollogen.downloadSchema(apolloUrl, process.cwd() + output, {
            "x-hasura-admin-secret": process.env.GRAPHQL_AUTH || authotization
        }, true, "POST")
            .then(result => {
            generateAsync(options);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    else {
        return yield new Promise((res, err) => {
            try {
                generateAsync(options);
            }
            catch (error) {
                return err(error);
            }
            res();
        });
    }
});
function generateAsync(options) {
    const schema = schema_1.getSchema(options);
    const outputFolder = process.cwd() + options.outputPath;
    const types = generate_models_1.generateModels(schema, outputFolder);
    // const types = generateTypes(schema);
    // const enums = generateEnums(schema);
    // generateInterfaceFiles(outputFolder, types);
    // generateEnumFiles(outputFolder, enums);
    const queryObj = schema.types.find((t) => t.name === schema.queryType.name);
    const muObj = schema.types.find((t) => t.name === schema.mutationType.name);
    const { name: serviceName, filename } = angular_query_service_generator_1.generateQueryService(queryObj, outputFolder);
    angular_module_generator_1.generateAngularModule(outputFolder, undefined, [{ name: serviceName, filename }]);
    return JSON.stringify(types);
}
exports.generateGrapQlSchema();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDJGQUE2RTtBQUU3RSw2RUFBdUU7QUFFdkUseUNBQTJEO0FBRTNELDBEQUEyQztBQUMzQywyREFBdUQ7QUFFMUMsUUFBQSxvQkFBb0IsR0FBRyxHQUFTLEVBQUU7SUFFM0MsTUFBTSxPQUFPLEdBQUcseUJBQWdCLEVBQUUsQ0FBQztJQUNuQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQ2pFLElBQUksVUFBVSxFQUFFO1FBQ1osT0FBTyxNQUFNLFNBQVMsQ0FBQyxjQUFjLENBQ2pDLFNBQVMsRUFDVCxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxFQUN0QjtZQUNJLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLGFBQWE7U0FDckUsRUFDRCxJQUFJLEVBQ0osTUFBTSxDQUFDO2FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsQ0FBQztLQUVWO1NBQU07UUFDSCxPQUFPLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDbEMsSUFBSTtnQkFFQSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDekI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNyQjtZQUNELEdBQUcsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFDLENBQUM7S0FDTjtBQUNMLENBQUMsQ0FBQSxDQUFBO0FBRUQsU0FBUyxhQUFhLENBQUMsT0FBcUI7SUFDeEMsTUFBTSxNQUFNLEdBQUcsa0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUV4RCxNQUFNLEtBQUssR0FBRyxnQ0FBYyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNsRCx1Q0FBdUM7SUFDdkMsdUNBQXVDO0lBQ3ZDLCtDQUErQztJQUMvQywwQ0FBMEM7SUFDMUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQVMsQ0FBQztJQUNwRixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBUyxDQUFDO0lBQ3BGLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLHNEQUFvQixDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNyRixnREFBcUIsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELDRCQUFvQixFQUFFLENBQUEifQ==