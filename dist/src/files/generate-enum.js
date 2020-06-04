"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnumFile = void 0;
function generateEnumFile(name, type) {
    const values = type.enumValues.map((enumValues) => `'${enumValues.name}'`).join(' | ');
    return `/**
 * ${type.description}
 */
export type ${name}  = ${values};`;
}
exports.generateEnumFile = generateEnumFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9maWxlcy9nZW5lcmF0ZS1lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLFNBQWdCLGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFVO0lBRXZELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RixPQUFPO0tBQ0osSUFBSSxDQUFDLFdBQVc7O2NBRVAsSUFBSSxPQUFPLE1BQU0sR0FBRyxDQUFDO0FBQ25DLENBQUM7QUFQRCw0Q0FPQyJ9