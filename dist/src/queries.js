"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQueries = void 0;
const types_1 = require("./types");
let schema;
function generateQueries(__schema) {
    schema = __schema;
    const queryObject = getField(__schema.queryType.name);
    const queries = [];
    queryObject.fields
        .reduce((acc, field) => {
        const f = getField(field.name);
        if (f) {
            acc.push(f);
        }
        return acc;
    }, [])
        .map(field => getField(field.name))
        .map((type) => types_1.convertType(type));
    console.log(queries);
}
exports.generateQueries = generateQueries;
function getField(name) {
    console.log(name);
    try {
        return schema.types.find((type) => type.name === name);
    }
    catch (err) {
        return { name };
    }
}
//schema.data.__schema.types.filter((type) => type.kind === "INPUT_OBJECT").filter(({name}) => name.match(/^books/)).map(({name , inputFields}) => ({name ,inputFields}))
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG1DQUFzQztBQUV0QyxJQUFJLE1BQWMsQ0FBQztBQUVuQixTQUFnQixlQUFlLENBQUMsUUFBZ0I7SUFDOUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUVsQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0RCxNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7SUFDMUIsV0FBVyxDQUFDLE1BQU07U0FDZixNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDckIsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsRUFBRTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDYjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLEVBQVksQ0FBQztTQUNmLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBbEJELDBDQWtCQztBQUVELFNBQVMsUUFBUSxDQUFDLElBQVk7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQixJQUFJO1FBQ0YsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQVMsQ0FBQTtLQUMvRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxFQUFFLElBQUksRUFBVSxDQUFBO0tBQ3hCO0FBQ0gsQ0FBQztBQUNELHlLQUF5SyJ9