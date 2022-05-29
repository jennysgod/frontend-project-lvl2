import fs from 'fs';
import path from 'path';
import parse from './parser.js';
import genDiffTree from './diffTree.js';
import format from './formatters/format.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);
const getContent = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

export default function genDiff(path1, path2, formatName = 'stylish') {
  const fileContent1 = getContent(path1);
  const fileContent2 = getContent(path2);
  const fileFormat1 = getFormat(path1);
  const fileFormat2 = getFormat(path2);

  const data1 = parse(fileContent1, fileFormat1); // объект
  const data2 = parse(fileContent2, fileFormat2); // объект

  const innerTree = genDiffTree(data1, data2);

  return format(innerTree, formatName);
}
