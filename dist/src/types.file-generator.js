"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function generateFiles(outputPath, types) {
    var file = types.reduce(function (acc, type) {
        return acc += createFileStream(type);
    }, '');
    utils_1.insertFile(outputPath + '/models/', "index.d.ts", file), { flag: 'wx' };
}
exports.generateFiles = generateFiles;
function createFileStream(type) {
    return "" +
        ("export interface " + utils_1.convertToPascalCase(type.name) + " {" + printFields(type.fields) + "\n}\n");
}
function printFields(fields) {
    return fields.reduce(function (acc, field) {
        return acc += "  \n  " + printField(field);
    }, "");
}
function printField(field) {
    return field.name + ": " + (field.isImportable ? utils_1.convertToPascalCase(field.field) : field.field) + ";";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuZmlsZS1nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMuZmlsZS1nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpQ0FBMEQ7QUFDMUQsU0FBZ0IsYUFBYSxDQUFDLFVBQWtCLEVBQUUsS0FBa0I7SUFFbEUsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO1FBQ2xDLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNQLGtCQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDMUUsQ0FBQztBQU5ELHNDQU1DO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFlO0lBQ3ZDLE9BQU8sRUFBRTtTQUNQLHNCQUFvQiwyQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFFbEYsQ0FBQSxDQUFDO0FBQ0YsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLE1BQXdCO0lBQzNDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLO1FBQzlCLE9BQU8sR0FBRyxJQUFJLFdBQ2QsVUFBVSxDQUFDLEtBQUssQ0FBRyxDQUFBO0lBQ3JCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNULENBQUM7QUFDRCxTQUFTLFVBQVUsQ0FBQyxLQUFxQjtJQUN2QyxPQUFVLEtBQUssQ0FBQyxJQUFJLFdBQUssS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsMkJBQW1CLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxPQUFHLENBQUE7QUFDakcsQ0FBQyJ9