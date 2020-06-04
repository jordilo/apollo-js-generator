"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModels = void 0;
const utils_1 = require("./utils");
const generate_enum_1 = require("./files/generate-enum");
const generate_interface_1 = require("./files/generate-interface");
let count = 0;
function generateModels(schema, outputPath) {
    const indexFileString = schema.types
        .filter((type) => type.kind !== "SCALAR" && !type.name.match(/^__/))
        .map((type) => {
        const fileNaming = utils_1.getExportNameAndFileName(type.name);
        const file = swithFileFromKind(type, fileNaming);
        // if (type.fields?.some(field => field.args.length)) {
        //   const _arguments = type.fields.reduce((acc, cur) => {
        //     return [...acc, ...cur.args]
        //   }, [] as Arg[]);
        //   console.log(++count, type.name, _arguments);
        // }
        utils_1.insertFile(outputPath + '/models/', fileNaming.fileName + '.d.ts', file), { flag: 'wx+' };
        return fileNaming;
    })
        .reduce((acc, currentType) => {
        return acc + `export {${currentType.exportName}} from './${currentType.fileName}';
`;
    }, '');
    utils_1.insertFile(outputPath + '/models/', "index.d.ts", indexFileString), { flag: 'wx+' };
    return indexFileString;
}
exports.generateModels = generateModels;
function swithFileFromKind(type, fileNaming) {
    switch (type.kind) {
        case 'INPUT_OBJECT':
        case 'OBJECT':
            return generate_interface_1.generateInterfaceFile(fileNaming.exportName, type);
        // return `export interface ${fileNaming.exportName} {}`
        case 'ENUM':
            return generate_enum_1.generateEnumFile(fileNaming.exportName, type);
    }
    return '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtbW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2dlbmVyYXRlLW1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBMkU7QUFFM0UseURBQXlEO0FBQ3pELG1FQUFtRTtBQUVuRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxTQUFnQixjQUFjLENBQUMsTUFBYyxFQUFFLFVBQWtCO0lBQy9ELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxLQUFLO1NBQ2pDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE1BQU0sVUFBVSxHQUFHLGdDQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxNQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsdURBQXVEO1FBQ3ZELDBEQUEwRDtRQUMxRCxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBQ3JCLGlEQUFpRDtRQUNqRCxJQUFJO1FBQ0osa0JBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO1FBQzFGLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztTQUNELE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRTtRQUMzQixPQUFPLEdBQUcsR0FBRyxXQUFXLFdBQVcsQ0FBQyxVQUFVLGFBQWEsV0FBVyxDQUFDLFFBQVE7Q0FDcEYsQ0FBQTtJQUNHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDTDtJQUNILGtCQUFVLENBQUMsVUFBVSxHQUFHLFVBQVUsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDcEYsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQztBQXRCRCx3Q0FzQkM7QUFHRCxTQUFTLGlCQUFpQixDQUFDLElBQVUsRUFBRSxVQUFzQjtJQUMzRCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDakIsS0FBSyxjQUFjLENBQUM7UUFDcEIsS0FBSyxRQUFRO1lBQ1gsT0FBTywwQ0FBcUIsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELHdEQUF3RDtRQUN4RCxLQUFLLE1BQU07WUFDVCxPQUFPLGdDQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDeEQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMifQ==