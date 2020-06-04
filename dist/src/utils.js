"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExportNameAndFileName = exports.insertFile = exports.loweralize = exports.capitalize = exports.convertToPascalCase = exports.convertToCamelCase = exports.convertPascalToKebabCase = exports.getFileName = void 0;
const fs_1 = require("fs");
function getFileName(name) {
    return `${name.replace('_', '-')}.ts`;
}
exports.getFileName = getFileName;
function convertPascalToKebabCase(str) {
    return str.charAt(0).toLowerCase() + str.substr(1).replace(/[A-Z]/g, (d) => `-${d.toLowerCase()}`);
}
exports.convertPascalToKebabCase = convertPascalToKebabCase;
function convertToCamelCase(str) {
    return str.split('_')
        .reduce((acc, current) => acc + loweralize(current), '');
}
exports.convertToCamelCase = convertToCamelCase;
function convertToPascalCase(str, prefix) {
    return (prefix ? prefix : '')
        .concat(capitalize(str)
        .split('_')
        .reduce((acc, current) => acc + capitalize(current), ''));
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
    const fullPath = path.concat(file);
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
function getExportNameAndFileName(name) {
    const exportName = convertToPascalCase(name);
    const fileName = `${name}`;
    return { exportName, fileName };
}
exports.getExportNameAndFileName = getExportNameAndFileName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkJBQTBFO0FBRTFFLFNBQWdCLFdBQVcsQ0FBQyxJQUFZO0lBQ3RDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxrQ0FFQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLEdBQVc7SUFDbEQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JHLENBQUM7QUFGRCw0REFFQztBQUVELFNBQWdCLGtCQUFrQixDQUFDLEdBQVc7SUFDNUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNsQixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFIRCxnREFHQztBQUNELFNBQWdCLG1CQUFtQixDQUFDLEdBQVcsRUFBRSxNQUFlO0lBQzlELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQzFCLE1BQU0sQ0FDTCxVQUFVLENBQUMsR0FBRyxDQUFDO1NBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBTkQsa0RBTUM7QUFDRCxTQUFnQixVQUFVLENBQUMsR0FBVztJQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRkQsZ0NBRUM7QUFDRCxTQUFnQixVQUFVLENBQUMsR0FBVztJQUNwQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVk7SUFDakUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxJQUFJLGVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4QixJQUFJO1lBQ0Ysa0JBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUMsbUJBQWMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDaEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtTQUNiO0tBQ0Y7U0FBTTtRQUNMLGNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNwQyxrQkFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMvQztBQUVILENBQUM7QUFiRCxnQ0FhQztBQUtELFNBQWdCLHdCQUF3QixDQUFDLElBQVk7SUFDbkQsTUFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUMzQixPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ2xDLENBQUM7QUFKRCw0REFJQyJ9