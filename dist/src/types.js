"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateTypes(schema) {
    return schema.types
        .filter(function (type) { return type.kind === "OBJECT" && !type.name.match(/^__/); })
        .map(function (type) { return convertType(type); });
}
exports.generateTypes = generateTypes;
function convertScalarType(type) {
    try {
        switch (type.kind) {
            case "SCALAR":
                switch (type.name) {
                    case 'timestamptz':
                    case 'uuid':
                        return { field: 'string', isImportable: false, };
                    case "String":
                    case "Boolean":
                        return { field: type.name.toLocaleLowerCase(), isImportable: false };
                    case "Float":
                    case "Int":
                    case "numeric":
                        return { field: "number", isImportable: false };
                    default:
                }
            case "LIST":
                var _a = convertScalarType(type.ofType), field = _a.field, isImportable = _a.isImportable;
                return {
                    field: field + "[]",
                    isImportable: isImportable
                };
            case "OBJECT":
                return { field: type.name, isImportable: true };
            default:
                return convertScalarType(type.ofType);
        }
    }
    catch (err) {
        throw new Error(type.name);
    }
}
exports.convertScalarType = convertScalarType;
function generateInnerField(fieldToConvert, index) {
    try {
        var _a = convertScalarType(fieldToConvert.type), isImportable = _a.isImportable, field = _a.field;
        return {
            name: fieldToConvert.name,
            isImportable: isImportable,
            field: field,
            description: fieldToConvert.description
        };
    }
    catch (err) {
        throw new Error(fieldToConvert.name + " " + index.toString());
    }
}
function convertType(_a) {
    var name = _a.name, description = _a.description, fields = _a.fields;
    try {
        return {
            name: name,
            description: description,
            fields: fields.map(function (field, index) { return generateInnerField(field, index); }),
        };
    }
    catch (err) {
        return undefined;
    }
}
exports.convertType = convertType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxTQUFnQixhQUFhLENBQUMsTUFBYztJQUUxQyxPQUFPLE1BQU0sQ0FBQyxLQUFLO1NBQ2hCLE1BQU0sQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQWpELENBQWlELENBQUM7U0FDbkUsR0FBRyxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUxELHNDQUtDO0FBR0QsU0FBZ0IsaUJBQWlCLENBQUMsSUFBWTtJQUM1QyxJQUFJO1FBQ0YsUUFBUSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2pCLEtBQUssUUFBUTtnQkFDWCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pCLEtBQUssYUFBYSxDQUFDO29CQUNuQixLQUFLLE1BQU07d0JBQ1QsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssR0FBRyxDQUFDO29CQUNuRCxLQUFLLFFBQVEsQ0FBQztvQkFDZCxLQUFLLFNBQVM7d0JBQ1osT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUN2RSxLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLEtBQUssQ0FBQztvQkFDWCxLQUFLLFNBQVM7d0JBQ1osT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxDQUFDO29CQUNsRCxRQUFRO2lCQUVUO1lBQ0gsS0FBSyxNQUFNO2dCQUNILElBQUEsbUNBQXdELEVBQXRELGdCQUFLLEVBQUUsOEJBQStDLENBQUE7Z0JBQzlELE9BQU87b0JBQ0wsS0FBSyxFQUFLLEtBQUssT0FBSTtvQkFDbkIsWUFBWSxjQUFBO2lCQUNiLENBQUM7WUFDSixLQUFLLFFBQVE7Z0JBQ1gsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNsRDtnQkFDRSxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QztLQUVGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtBQUNILENBQUM7QUFqQ0QsOENBaUNDO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxjQUFxQixFQUFFLEtBQWE7SUFDOUQsSUFBSTtRQUNJLElBQUEsMkNBQWdFLEVBQTlELDhCQUFZLEVBQUUsZ0JBQWdELENBQUM7UUFDdkUsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjLENBQUMsSUFBSTtZQUN6QixZQUFZLGNBQUE7WUFDWixLQUFLLE9BQUE7WUFDTCxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVc7U0FDeEMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0FBQ0gsQ0FBQztBQUNELFNBQWdCLFdBQVcsQ0FBQyxFQUFtQztRQUFqQyxjQUFJLEVBQUUsNEJBQVcsRUFBRSxrQkFBTTtJQUNyRCxJQUFJO1FBQ0YsT0FBTztZQUNMLElBQUksTUFBQTtZQUNKLFdBQVcsYUFBQTtZQUNYLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSyxFQUFFLEtBQUssSUFBSyxPQUFBLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQztTQUN2RSxDQUFDO0tBQ0g7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sU0FBZ0IsQ0FBQztLQUN6QjtBQUNILENBQUM7QUFWRCxrQ0FVQyJ9