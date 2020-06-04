"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = exports.getConfiguration = void 0;
const fs = __importStar(require("fs"));
function getConfiguration() {
    const apolloConfigBuffer = fs.readFileSync(process.cwd() + '/.apollo-configuration', { encoding: 'utf-8' });
    return JSON.parse(apolloConfigBuffer);
}
exports.getConfiguration = getConfiguration;
function getSchema({ output }) {
    const d = fs.readFileSync(process.cwd() + output, { encoding: 'utf-8' });
    const schema = JSON.parse(d);
    return schema.data.__schema;
}
exports.getSchema = getSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsdUNBQXlCO0FBSXpCLFNBQWdCLGdCQUFnQjtJQUU5QixNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLHdCQUF3QixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFNUcsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFpQixDQUFDO0FBQ3hELENBQUM7QUFMRCw0Q0FLQztBQUNELFNBQWdCLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBZ0I7SUFFaEQsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQXlCLENBQUM7SUFFckQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQTtBQUM3QixDQUFDO0FBTkQsOEJBTUMifQ==