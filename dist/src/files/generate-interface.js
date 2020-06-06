"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterfaceFile = void 0;
const utils_1 = require("./../utils");
const types_1 = require("../types");
const lodash_1 = __importDefault(require("lodash"));
function generateInterfaceFile(name, type) {
    let fields;
    let importableFields = '';
    fields = (type.fields || type.inputFields).map((field) => (Object.assign(Object.assign({}, field), types_1.convertScalarType(field.type))));
    importableFields = lodash_1.default.chain(fields.filter((f) => f.isImportable && f.field !== type.name))
        .groupBy('field')
        .map((d) => d[0])
        .value()
        .reduce((acc, imp) => {
        const { exportName, fileName } = utils_1.getExportNameAndFileName(imp.field);
        return acc + `import { ${exportName} } from './${fileName}';
`;
    }, '');
    return `${importableFields}/**
 * ${type.description}
 */
export interface ${name}  {
${printFields(fields, Boolean(type.inputFields))}
}
export interface ${name}Queryable  {
${printFields(fields, true)}
}


`;
}
exports.generateInterfaceFile = generateInterfaceFile;
function printFields(fields, plainObject = false) {
    return fields.reduce((acc, field) => {
        return acc += `
  ${printField(field, plainObject)}`;
    }, '');
}
function printField(field, plainObject) {
    try {
        const required = field.isRequired ? '?' : '';
        const listSuffix = field.isList && !plainObject ? '[]' : '';
        return `${field.name}${required}: ${field.isImportable ? utils_1.convertToPascalCase(field.field) : field.field}${listSuffix};`;
    }
    catch (err) {
        return 'ERROR field';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZpbGVzL2dlbmVyYXRlLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxzQ0FBMkU7QUFFM0Usb0NBQTJEO0FBRTNELG9EQUF1QjtBQUl2QixTQUFnQixxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsSUFBVTtJQUM1RCxJQUFJLE1BQThCLENBQUM7SUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxLQUFLLEdBQUsseUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFHLENBQXNDLENBQUM7SUFDakosZ0JBQWdCLEdBQUcsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0RixPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLEtBQUssRUFBRTtTQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLGdDQUF3QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxPQUFPLEdBQUcsR0FBRyxZQUFZLFVBQVUsY0FBYyxRQUFRO0NBQzlELENBQUE7SUFDRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxPQUFPLEdBQUcsZ0JBQWdCO0tBQ3ZCLElBQUksQ0FBQyxXQUFXOzttQkFFRixJQUFJO0VBQ3JCLFdBQVcsQ0FBQyxNQUFNLEVBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7bUJBRTlCLElBQUk7RUFDckIsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7Ozs7Q0FJMUIsQ0FBQztBQUNGLENBQUM7QUF6QkQsc0RBeUJDO0FBRUQsU0FBUyxXQUFXLENBQUMsTUFBOEIsRUFBRSxjQUF1QixLQUFLO0lBRS9FLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEdBQUcsSUFBSTtJQUNkLFVBQVUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQTtJQUNsQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsS0FBcUIsRUFBRSxXQUFvQjtJQUM3RCxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7UUFDM0QsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsQ0FBQTtLQUN4SDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxhQUFhLENBQUM7S0FDdEI7QUFDSCxDQUFDIn0=