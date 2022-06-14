import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import genDiffTree from './diffTree.js';
import format from './formatters/format.js';

const extractFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

export default function genDiff(path1, path2, formatName = 'stylish') {
  const fileContent1 = readFile(path1);
  const fileContent2 = readFile(path2);
  const fileFormat1 = extractFormat(path1);
  const fileFormat2 = extractFormat(path2);

  const data1 = parse(fileContent1, fileFormat1); // объект
  const data2 = parse(fileContent2, fileFormat2); // объект

  const innerTree = genDiffTree(data1, data2);

  return format(innerTree, formatName);
}
