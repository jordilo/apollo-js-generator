"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertType = exports.convertScalarType = exports.generateEnums = exports.generateTypes = void 0;
function generateTypes(schema) {
    return schema.types
        .filter((type) => type.kind === "OBJECT" && !type.name.match(/^__/))
        .map((type) => convertType(type));
}
exports.generateTypes = generateTypes;
function generateEnums(schema) {
    return schema.types
        .filter((type) => type.kind === "ENUM");
}
exports.generateEnums = generateEnums;
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
            case "INPUT_OBJECT":
            case "ENUM": {
                return { field: type.name, isImportable: true, isRequired: false };
            }
            case "LIST":
                const { field, isImportable } = convertScalarType(type.ofType);
                return {
                    field: `${field}`,
                    isList: true,
                    isImportable
                };
            case "OBJECT":
                return { field: type.name, isImportable: true };
            case "NON_NULL":
                return Object.assign(Object.assign({}, convertScalarType(type.ofType)), { isRequired: true });
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
        const { isImportable, field } = convertScalarType(fieldToConvert.type);
        return {
            name: fieldToConvert.name,
            isImportable,
            field,
            description: fieldToConvert.description
        };
    }
    catch (err) {
        throw new Error(fieldToConvert.name + " " + index.toString());
    }
}
function convertType({ name, description, fields }) {
    try {
        return {
            name,
            description,
            fields: fields.map((field, index) => generateInnerField(field, index)),
        };
    }
    catch (err) {
        return undefined;
    }
}
exports.convertType = convertType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBZ0IsYUFBYSxDQUFDLE1BQWM7SUFFMUMsT0FBTyxNQUFNLENBQUMsS0FBSztTQUNoQixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBTEQsc0NBS0M7QUFHRCxTQUFnQixhQUFhLENBQUMsTUFBYztJQUMxQyxPQUFPLE1BQU0sQ0FBQyxLQUFLO1NBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFZO0lBQzVDLElBQUk7UUFDRixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxRQUFRO2dCQUNYLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDakIsS0FBSyxhQUFhLENBQUM7b0JBQ25CLEtBQUssTUFBTTt3QkFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxHQUFHLENBQUM7b0JBQ25ELEtBQUssUUFBUSxDQUFDO29CQUNkLEtBQUssU0FBUzt3QkFDWixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3ZFLEtBQUssT0FBTyxDQUFDO29CQUNiLEtBQUssS0FBSyxDQUFDO29CQUNYLEtBQUssU0FBUzt3QkFDWixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ2xELFFBQVE7aUJBRVQ7WUFDSCxLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUNYLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUNwRTtZQUNELEtBQUssTUFBTTtnQkFDVCxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDOUQsT0FBTztvQkFDTCxLQUFLLEVBQUUsR0FBRyxLQUFLLEVBQUU7b0JBQ2pCLE1BQU0sRUFBRSxJQUFJO29CQUNaLFlBQVk7aUJBQ2IsQ0FBQztZQUNKLEtBQUssUUFBUTtnQkFDWCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO1lBQ2xELEtBQUssVUFBVTtnQkFDYix1Q0FBWSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUUsVUFBVSxFQUFFLElBQUksSUFBRztZQUNqRTtnQkFDRSxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN6QztLQUVGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtBQUNILENBQUM7QUF4Q0QsOENBd0NDO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxjQUFxQixFQUFFLEtBQWE7SUFDOUQsSUFBSTtRQUNGLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7WUFDekIsWUFBWTtZQUNaLEtBQUs7WUFDTCxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVc7U0FDeEMsQ0FBQTtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQy9EO0FBQ0gsQ0FBQztBQUNELFNBQWdCLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFRO0lBQzdELElBQUk7UUFDRixPQUFPO1lBQ0wsSUFBSTtZQUNKLFdBQVc7WUFDWCxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN2RSxDQUFDO0tBQ0g7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE9BQU8sU0FBZ0IsQ0FBQztLQUN6QjtBQUNILENBQUM7QUFWRCxrQ0FVQyJ9