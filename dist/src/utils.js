"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function getFileName(name) {
    return name.replace('_', '-') + ".ts";
}
exports.getFileName = getFileName;
function convertPascalToKebabCase(str) {
    return str.charAt(0).toLowerCase() + str.substr(1).replace(/[A-Z]/g, function (d) { return "-" + d.toLowerCase(); });
}
exports.convertPascalToKebabCase = convertPascalToKebabCase;
function convertToCamelCase(str) {
    return str.split('_')
        .reduce(function (acc, current) { return acc + loweralize(current); }, '');
}
exports.convertToCamelCase = convertToCamelCase;
function convertToPascalCase(str, prefix) {
    return (prefix ? prefix : '')
        .concat(capitalize(str)
        .split('_')
        .reduce(function (acc, current) { return acc + capitalize(current); }, ''));
}
exports.convertToPascalCase = convertToPascalCase;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
exports.capitalize = capitalize;
function loweralize(str) {
    return str.charAt(0).toLocaleLowerCase() + str.substr(1);
}
exports.loweralize = loweralize;
function insertFile(path, file, data) {
    var fullPath = path.concat(file);
    if (fs_1.existsSync(fullPath)) {
        try {
            fs_1.writeFileSync(fullPath, '', { flag: 'wx' });
            fs_1.appendFileSync(fullPath, data), { flag: 'wx' };
        }
        catch (err) {
        }
    }
    else {
        fs_1.mkdirSync(path, { recursive: true });
        fs_1.writeFileSync(fullPath, data, { flag: 'wx' });
    }
}
exports.insertFile = insertFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5QkFBMEU7QUFFMUUsU0FBZ0IsV0FBVyxDQUFDLElBQVk7SUFDdEMsT0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsUUFBSyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLEdBQVc7SUFDbEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLE1BQUksQ0FBQyxDQUFDLFdBQVcsRUFBSSxFQUFyQixDQUFxQixDQUFDLENBQUM7QUFDckcsQ0FBQztBQUZELDREQUVDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUMsR0FBVztJQUM1QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ2xCLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxHQUFHLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFIRCxnREFHQztBQUNELFNBQWdCLG1CQUFtQixDQUFDLEdBQVcsRUFBRSxNQUFlO0lBQzlELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzFCLE1BQU0sQ0FDTCxVQUFVLENBQUMsR0FBRyxDQUFDO1NBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxHQUFHLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUF6QixDQUF5QixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEUsQ0FBQztBQU5ELGtEQU1DO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7SUFDcEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUZELGdDQUVDO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLEdBQVc7SUFDcEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZO0lBQ2pFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxlQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEIsSUFBSTtZQUNGLGtCQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVDLG1CQUFjLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ2hEO1FBQUMsT0FBTyxHQUFHLEVBQUU7U0FDYjtLQUNGO1NBQU07UUFDTCxjQUFTLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDcEMsa0JBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0M7QUFFSCxDQUFDO0FBYkQsZ0NBYUMifQ==