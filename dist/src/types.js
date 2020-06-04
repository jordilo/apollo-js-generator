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
            case "INPUT_OBJECT": {
                return { field: type.name, isImportable: true };
            }
            case "ENUM": {
                return { field: type.name, isImportable: true };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsU0FBZ0IsYUFBYSxDQUFDLE1BQWM7SUFFMUMsT0FBTyxNQUFNLENBQUMsS0FBSztTQUNoQixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBTEQsc0NBS0M7QUFHRCxTQUFnQixhQUFhLENBQUMsTUFBYztJQUMxQyxPQUFPLE1BQU0sQ0FBQyxLQUFLO1NBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxJQUFZO0lBQzVDLElBQUk7UUFDRixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDakIsS0FBSyxRQUFRO2dCQUNYLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDakIsS0FBSyxhQUFhLENBQUM7b0JBQ25CLEtBQUssTUFBTTt3QkFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxHQUFHLENBQUM7b0JBQ25ELEtBQUssUUFBUSxDQUFDO29CQUNkLEtBQUssU0FBUzt3QkFDWixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ3ZFLEtBQUssT0FBTyxDQUFDO29CQUNiLEtBQUssS0FBSyxDQUFDO29CQUNYLEtBQUssU0FBUzt3QkFDWixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLENBQUM7b0JBQ2xELFFBQVE7aUJBRVQ7WUFDSCxLQUFLLGNBQWMsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQztnQkFDWCxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ2pEO1lBQ0QsS0FBSyxNQUFNO2dCQUNULE1BQU0sRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUM5RCxPQUFPO29CQUNMLEtBQUssRUFBRSxHQUFHLEtBQUssRUFBRTtvQkFDakIsTUFBTSxFQUFFLElBQUk7b0JBQ1osWUFBWTtpQkFDYixDQUFDO1lBQ0osS0FBSyxRQUFRO2dCQUNYLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDbEQ7Z0JBQ0UsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekM7S0FFRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBeENELDhDQXdDQztBQUNELFNBQVMsa0JBQWtCLENBQUMsY0FBcUIsRUFBRSxLQUFhO0lBQzlELElBQUk7UUFDRixNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO1lBQ3pCLFlBQVk7WUFDWixLQUFLO1lBQ0wsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXO1NBQ3hDLENBQUE7S0FDRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMvRDtBQUNILENBQUM7QUFDRCxTQUFnQixXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBUTtJQUM3RCxJQUFJO1FBQ0YsT0FBTztZQUNMLElBQUk7WUFDSixXQUFXO1lBQ1gsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdkUsQ0FBQztLQUNIO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixPQUFPLFNBQWdCLENBQUM7S0FDekI7QUFDSCxDQUFDO0FBVkQsa0NBVUMifQ==