"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var schema;
function generateQueries(__schema) {
    schema = __schema;
    var queryObject = getField(__schema.queryType.name);
    var queries = [];
    queryObject.fields
        .reduce(function (acc, field) {
        var f = getField(field.name);
        if (f) {
            acc.push(f);
        }
        return acc;
    }, [])
        .map(function (field) { return getField(field.name); })
        .map(function (type) { return types_1.convertType(type); });
    console.log(queries);
}
exports.generateQueries = generateQueries;
function getField(name) {
    console.log(name);
    try {
        return schema.types.find(function (type) { return type.name === name; });
    }
    catch (err) {
        return { name: name };
    }
}
//schema.data.__schema.types.filter((type) => type.kind === "INPUT_OBJECT").filter(({name}) => name.match(/^books/)).map(({name , inputFields}) => ({name ,inputFields}))
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9xdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsaUNBQXNDO0FBRXRDLElBQUksTUFBYyxDQUFDO0FBRW5CLFNBQWdCLGVBQWUsQ0FBQyxRQUFnQjtJQUM5QyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBRWxCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRELElBQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztJQUMxQixXQUFXLENBQUMsTUFBTTtTQUNmLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLO1FBQ2pCLElBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLEVBQUU7WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2I7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUMsRUFBRSxFQUFZLENBQUM7U0FDZixHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFwQixDQUFvQixDQUFDO1NBQ2xDLEdBQUcsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLG1CQUFXLENBQUMsSUFBSSxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFsQkQsMENBa0JDO0FBRUQsU0FBUyxRQUFRLENBQUMsSUFBWTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLElBQUk7UUFDRixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWxCLENBQWtCLENBQVMsQ0FBQTtLQUMvRDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osT0FBTyxFQUFFLElBQUksTUFBQSxFQUFVLENBQUE7S0FDeEI7QUFDSCxDQUFDO0FBQ0QseUtBQXlLIn0=