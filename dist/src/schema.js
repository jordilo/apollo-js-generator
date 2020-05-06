"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function getConfiguration() {
    var apolloConfigBuffer = fs.readFileSync(process.cwd() + '/.apollo-configuration', { encoding: 'utf-8' });
    return JSON.parse(apolloConfigBuffer);
}
exports.getConfiguration = getConfiguration;
function getSchema(_a) {
    var output = _a.output;
    var d = fs.readFileSync(process.cwd() + output, { encoding: 'utf-8' });
    var schema = JSON.parse(d);
    return schema.data.__schema;
}
exports.getSchema = getSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxxQ0FBeUI7QUFJekIsU0FBZ0IsZ0JBQWdCO0lBRTlCLElBQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsd0JBQXdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUU1RyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQWlCLENBQUM7QUFDeEQsQ0FBQztBQUxELDRDQUtDO0FBQ0QsU0FBZ0IsU0FBUyxDQUFDLEVBQXdCO1FBQXRCLGtCQUFNO0lBRWhDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUF5QixDQUFDO0lBRXJELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUE7QUFDN0IsQ0FBQztBQU5ELDhCQU1DIn0=