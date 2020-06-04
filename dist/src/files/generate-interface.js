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
${printFields(fields, Boolean(type.fields))}
}`;
}
exports.generateInterfaceFile = generateInterfaceFile;
function printFields(fields, isField) {
    return fields.reduce((acc, field) => {
        return acc += `
  ${printField(field, isField)}`;
    }, '');
}
function printField(field, isField) {
    try {
        const required = field.isRequired ? '?' : '';
        return `${field.name}${required}: ${field.isImportable ? utils_1.convertToPascalCase(field.field) : field.field}${field.isList ? '[]' : ''};`;
    }
    catch (err) {
        return 'ERROR field';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZpbGVzL2dlbmVyYXRlLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxzQ0FBMkU7QUFFM0Usb0NBQTJEO0FBRTNELG9EQUF1QjtBQUl2QixTQUFnQixxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsSUFBVTtJQUM1RCxJQUFJLE1BQThCLENBQUM7SUFDbkMsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxpQ0FBTSxLQUFLLEdBQUsseUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFHLENBQXNDLENBQUM7SUFDakosZ0JBQWdCLEdBQUcsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0RixPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLEtBQUssRUFBRTtTQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLGdDQUF3QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxPQUFPLEdBQUcsR0FBRyxZQUFZLFVBQVUsY0FBYyxRQUFRO0NBQzlELENBQUE7SUFDRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxPQUFPLEdBQUcsZ0JBQWdCO0tBQ3ZCLElBQUksQ0FBQyxXQUFXOzttQkFFRixJQUFJO0VBQ3JCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN6QyxDQUFDO0FBQ0gsQ0FBQztBQW5CRCxzREFtQkM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxNQUE4QixFQUFFLE9BQWdCO0lBRW5FLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEdBQUcsSUFBSTtJQUNkLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQTtJQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsS0FBcUIsRUFBRSxPQUFnQjtJQUN6RCxJQUFJO1FBQ0YsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0MsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxLQUFLLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLDJCQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFBO0tBQ3RJO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLGFBQWEsQ0FBQztLQUN0QjtBQUNILENBQUMifQ==