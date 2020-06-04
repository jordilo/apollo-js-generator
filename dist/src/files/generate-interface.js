"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInterfaceFile = void 0;
const utils_1 = require("./../utils");
const types_1 = require("../types");
function generateInterfaceFile(name, type) {
    let fields;
    let importableFields = '';
    fields = (type.fields || type.inputFields).map((field) => (Object.assign(Object.assign({}, field), types_1.convertScalarType(field.type))));
    importableFields = fields.filter((f) => f.isImportable)
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
        return `${field.name}: ${field.isImportable ? utils_1.convertToPascalCase(field.field) : field.field}${field.isList ? '[]' : ''};`;
    }
    catch (err) {
        return 'ERROR field';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZpbGVzL2dlbmVyYXRlLWludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzQ0FBMkU7QUFFM0Usb0NBQTJEO0FBSzNELFNBQWdCLHFCQUFxQixDQUFDLElBQVksRUFBRSxJQUFVO0lBQzVELElBQUksTUFBOEIsQ0FBQztJQUNuQyxJQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztJQUMxQixNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGlDQUFNLEtBQUssR0FBSyx5QkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUcsQ0FBc0MsQ0FBQztJQUNqSixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ3BELE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtRQUNuQixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLGdDQUF3QixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxPQUFPLEdBQUcsR0FBRyxZQUFZLFVBQVUsY0FBYyxRQUFRO0NBQzlELENBQUE7SUFDRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxPQUFPLEdBQUcsZ0JBQWdCO0tBQ3ZCLElBQUksQ0FBQyxXQUFXOzttQkFFRixJQUFJO0VBQ3JCLFdBQVcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN6QyxDQUFDO0FBQ0gsQ0FBQztBQWhCRCxzREFnQkM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxNQUE4QixFQUFFLE9BQWdCO0lBRW5FLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLEdBQUcsSUFBSTtJQUNkLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQTtJQUM5QixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsS0FBcUIsRUFBRSxPQUFnQjtJQUN6RCxJQUFJO1FBRUYsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsMkJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUE7S0FDM0g7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sYUFBYSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQyJ9