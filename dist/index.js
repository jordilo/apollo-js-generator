#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var angular_query_service_generator_1 = require("./src/angular-query-service-generator");
var angular_module_generator_1 = require("./src/angular-module-generator");
var types_file_generator_1 = require("./src/types.file-generator");
var schema_1 = require("./src/schema");
var types_1 = require("./src/types");
var apollogen = __importStar(require("apollo-codegen"));
exports.generateGrapQlSchema = function () { return __awaiter(void 0, void 0, void 0, function () {
    var options, apolloUrl, output, getFromUri, authotization;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                options = schema_1.getConfiguration();
                apolloUrl = options.apolloUrl, output = options.output, getFromUri = options.getFromUri, authotization = options.authotization;
                if (!getFromUri) return [3 /*break*/, 2];
                return [4 /*yield*/, apollogen.downloadSchema(apolloUrl, process.cwd() + output, {
                        "x-hasura-admin-secret": process.env.GRAPHQL_AUTH || authotization
                    }, true, "POST")
                        .then(function (result) {
                        generateAsync(options);
                    })
                        .catch(function (err) {
                        console.log(err);
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, new Promise(function (res, err) {
                    try {
                        generateAsync(options);
                    }
                    catch (error) {
                        return err(error);
                    }
                    res();
                })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
function generateAsync(options) {
    var schema = schema_1.getSchema(options);
    var types = types_1.generateTypes(schema);
    var outputFolder = process.cwd() + options.outputPath;
    types_file_generator_1.generateFiles(outputFolder, types);
    var queryObj = schema.types.find(function (t) { return t.name === schema.queryType.name; });
    var _a = angular_query_service_generator_1.generateQueryService(queryObj, outputFolder), serviceName = _a.name, filename = _a.filename;
    angular_module_generator_1.generateAngularModule(outputFolder, undefined, [{ name: serviceName, filename: filename }]);
    return JSON.stringify(types);
}
exports.generateGrapQlSchema();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEseUZBQTZFO0FBRTdFLDJFQUF1RTtBQUN2RSxtRUFBMkQ7QUFDM0QsdUNBQTJEO0FBQzNELHFDQUE0QztBQUM1Qyx3REFBMkM7QUFHOUIsUUFBQSxvQkFBb0IsR0FBRzs7Ozs7Z0JBRTFCLE9BQU8sR0FBRyx5QkFBZ0IsRUFBRSxDQUFDO2dCQUMzQixTQUFTLEdBQXdDLE9BQU8sVUFBL0MsRUFBRSxNQUFNLEdBQWdDLE9BQU8sT0FBdkMsRUFBRSxVQUFVLEdBQW9CLE9BQU8sV0FBM0IsRUFBRSxhQUFhLEdBQUssT0FBTyxjQUFaLENBQWE7cUJBQzdELFVBQVUsRUFBVix3QkFBVTtnQkFDSCxxQkFBTSxTQUFTLENBQUMsY0FBYyxDQUNqQyxTQUFTLEVBQ1QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFDdEI7d0JBQ0ksdUJBQXVCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLElBQUksYUFBYTtxQkFDckUsRUFDRCxJQUFJLEVBQ0osTUFBTSxDQUFDO3lCQUNOLElBQUksQ0FBQyxVQUFBLE1BQU07d0JBQ1IsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUUzQixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRzt3QkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO29CQUNwQixDQUFDLENBQUMsRUFBQTtvQkFkTixzQkFBTyxTQWNELEVBQUM7b0JBR0EscUJBQU0sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRztvQkFDOUIsSUFBSTt3QkFFQSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7cUJBQ3pCO29CQUFDLE9BQU8sS0FBSyxFQUFFO3dCQUNaLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQjtvQkFDRCxHQUFHLEVBQUUsQ0FBQztnQkFDVixDQUFDLENBQUMsRUFBQTtvQkFSRixzQkFBTyxTQVFMLEVBQUM7OztLQUVWLENBQUE7QUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFxQjtJQUN4QyxJQUFNLE1BQU0sR0FBRyxrQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLElBQU0sS0FBSyxHQUFHLHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7SUFDeEQsb0NBQWEsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFoQyxDQUFnQyxDQUFTLENBQUM7SUFDOUUsSUFBQSxtRkFBOEUsRUFBNUUscUJBQWlCLEVBQUUsc0JBQXlELENBQUM7SUFDckYsZ0RBQXFCLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELDRCQUFvQixFQUFFLENBQUEifQ==