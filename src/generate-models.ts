import { Schema, Type, Arg } from './../schema.definitions';
import { getExportNameAndFileName, insertFile, FileNaming } from './utils';
import { generateEnums } from './types';
import { generateEnumFile } from './files/generate-enum';
import { generateInterfaceFile } from './files/generate-interface';

let count = 0;
export function generateModels(schema: Schema, outputPath: string): string {
  const indexFileString = schema.types
    .filter((type) => type.kind !== "SCALAR" && !type.name.match(/^__/))
    .map((type) => {
      const fileNaming = getExportNameAndFileName(type.name);
      const file = swithFileFromKind(type, fileNaming);
      // if (type.fields?.some(field => field.args.length)) {
      //   const _arguments = type.fields.reduce((acc, cur) => {
      //     return [...acc, ...cur.args]
      //   }, [] as Arg[]);
      //   console.log(++count, type.name, _arguments);
      // }
      insertFile(outputPath + '/models/', fileNaming.fileName + '.d.ts', file), { flag: 'wx+' };
      return fileNaming;
    })
    .reduce((acc, currentType) => {
      return acc + `export {${currentType.exportName}} from './${currentType.fileName}';
`
    }, '')
    ;
  insertFile(outputPath + '/models/', "index.d.ts", indexFileString), { flag: 'wx+' };
  return indexFileString;
}


function swithFileFromKind(type: Type, fileNaming: FileNaming) {
  switch (type.kind) {
    case 'INPUT_OBJECT':
    case 'OBJECT':
      return generateInterfaceFile(fileNaming.exportName, type);
    // return `export interface ${fileNaming.exportName} {}`
    case 'ENUM':
      return generateEnumFile(fileNaming.exportName, type);
  }
  return '';
}