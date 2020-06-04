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
    // const queryObj = schema.types.find((t) => t.name === schema.queryType.name) as Type;
    // const { name: serviceName, filename } = generateQueryService(queryObj, outputFolder);
    // generateAngularModule(outputFolder, undefined, [{ name: serviceName, filename }]);
    return JSON.stringify(types);
}
exports.generateGrapQlSchema();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLHlDQUEyRDtBQUUzRCwwREFBMkM7QUFDM0MsMkRBQXVEO0FBRTFDLFFBQUEsb0JBQW9CLEdBQUcsR0FBUyxFQUFFO0lBRTNDLE1BQU0sT0FBTyxHQUFHLHlCQUFnQixFQUFFLENBQUM7SUFDbkMsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUNqRSxJQUFJLFVBQVUsRUFBRTtRQUNaLE9BQU8sTUFBTSxTQUFTLENBQUMsY0FBYyxDQUNqQyxTQUFTLEVBQ1QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFDdEI7WUFDSSx1QkFBdUIsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxhQUFhO1NBQ3JFLEVBQ0QsSUFBSSxFQUNKLE1BQU0sQ0FBQzthQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNYLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLENBQUM7S0FFVjtTQUFNO1FBQ0gsT0FBTyxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2xDLElBQUk7Z0JBRUEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQ3pCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDckI7WUFDRCxHQUFHLEVBQUUsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0tBQ047QUFDTCxDQUFDLENBQUEsQ0FBQTtBQUVELFNBQVMsYUFBYSxDQUFDLE9BQXFCO0lBQ3hDLE1BQU0sTUFBTSxHQUFHLGtCQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFFeEQsTUFBTSxLQUFLLEdBQUcsZ0NBQWMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDbEQsdUNBQXVDO0lBQ3ZDLHVDQUF1QztJQUN2QywrQ0FBK0M7SUFDL0MsMENBQTBDO0lBQzFDLHVGQUF1RjtJQUN2Rix3RkFBd0Y7SUFDeEYscUZBQXFGO0lBQ3JGLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsNEJBQW9CLEVBQUUsQ0FBQSJ9