
import { appendFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

export function getFileName(name: string): string {
  return `${name.replace('_', '-')}.ts`;
}

export function convertPascalToKebabCase(str: string) {
  return str.charAt(0).toLowerCase() + str.substr(1).replace(/[A-Z]/g, (d) => `-${d.toLowerCase()}`);
}

export function convertToCamelCase(str: string): string {
  return str.split('_')
    .reduce((acc, current) => acc + loweralize(current), '');
}
export function convertToPascalCase(str: string, prefix?: string): string {
  return (prefix ? prefix : '')
    .concat(
      capitalize(str)
        .split('_')
        .reduce((acc, current) => acc + capitalize(current), ''));
}
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
export function loweralize(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.substr(1);
}

export function insertFile(path: string, file: string, data: string) {
  const fullPath = path.concat(file);
  if (existsSync(fullPath)) {
    try {
      writeFileSync(fullPath, '', { flag: 'wx' });
      appendFileSync(fullPath, data), { flag: 'wx' };
    } catch (err) {
    }
  } else {
    mkdirSync(path, { recursive: true })
    writeFileSync(fullPath, data, { flag: 'wx' });
  }

}