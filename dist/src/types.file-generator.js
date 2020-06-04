"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInterfaceFileStream = exports.generateEnumFiles = exports.generateInterfaceFiles = void 0;
const utils_1 = require("./utils");
function generateInterfaceFiles(outputPath, types) {
    const indexFileString = types.reduce((acc, type) => {
        const fileFilledData = createInterfaceFileStream(type);
        const { fileName, exportName } = utils_1.getExportNameAndFileName(type.name);
        utils_1.insertFile(outputPath + '/models/', fileName + '.d.ts', fileFilledData), { flag: 'wx' };
        return `export {${exportName}}  from './${fileName}'`;
    }, '');
    utils_1.insertFile(outputPath + '/models/', "index.d.ts", indexFileString), { flag: 'wx' };
}
exports.generateInterfaceFiles = generateInterfaceFiles;
function generateEnumFiles(outputPath, enums) {
    const file = enums.reduce((acc, type) => {
        return acc += createEnumFileStream(type);
    }, '');
    utils_1.insertFile(outputPath + '/enums/', "index.d.ts", file), { flag: 'wx' };
}
exports.generateEnumFiles = generateEnumFiles;
function createInterfaceFileStream(type) {
    const importableFields = type.fields.filter((field) => field.isImportable);
    const imports = importableFields.reduce((acc, curr) => {
        const { fileName, exportName } = utils_1.getExportNameAndFileName(curr.name);
        return acc + `import {${exportName}} from './${fileName}';
`;
    }, '');
    return imports +
        `export interface ${utils_1.convertToPascalCase(type.name)} {${printFields(type.fields)}
}
`;
}
exports.createInterfaceFileStream = createInterfaceFileStream;
function createEnumFileStream(type) {
    return `` +
        `export type ${utils_1.convertToPascalCase(type.name)} = ${printEnumFields(type.enumValues)}
    `;
}
function printEnumFields(type) {
    return type.map((input) => `'${input.name}'`).join('|') + ';';
}
function printFields(fields) {
    return fields.reduce((acc, field) => {
        return acc += `
  ${printField(field)}`;
    }, '');
}
function printField(field) {
    return `${field.name}: ${field.isImportable ? utils_1.convertToPascalCase(field.field) : field.field};`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuZmlsZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMuZmlsZS1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsbUNBQW9GO0FBRXBGLFNBQWdCLHNCQUFzQixDQUFDLFVBQWtCLEVBQUUsS0FBa0I7SUFFM0UsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNqRCxNQUFNLGNBQWMsR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxHQUFHLGdDQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRSxrQkFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLEVBQUUsUUFBUSxHQUFHLE9BQU8sRUFBRSxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN4RixPQUFPLFdBQVcsVUFBVSxjQUFjLFFBQVEsR0FBRyxDQUFDO0lBQ3hELENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQLGtCQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDckYsQ0FBQztBQVRELHdEQVNDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsVUFBa0IsRUFBRSxLQUFhO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdEMsT0FBTyxHQUFHLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1Asa0JBQVUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUN6RSxDQUFDO0FBTEQsOENBS0M7QUFFRCxTQUFnQix5QkFBeUIsQ0FBQyxJQUFlO0lBRXZELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzRSxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDcEQsTUFBTSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxnQ0FBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckUsT0FBTyxHQUFHLEdBQUcsV0FBVyxVQUFVLGFBQWEsUUFBUTtDQUMxRCxDQUFDO0lBQ0EsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ04sT0FBTyxPQUFPO1FBQ1osb0JBQW9CLDJCQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Q0FFbEYsQ0FBQztBQUNGLENBQUM7QUFaRCw4REFZQztBQUNELFNBQVMsb0JBQW9CLENBQUMsSUFBVTtJQUN0QyxPQUFPLEVBQUU7UUFDUCxlQUFlLDJCQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUNsRixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBQWlCO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2hFLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxNQUF3QjtJQUUzQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxHQUFHLElBQUk7SUFDZCxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtJQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsS0FBcUI7SUFDdkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsMkJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUE7QUFDakcsQ0FBQyJ9