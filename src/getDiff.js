import fs from 'fs';
import path from 'path';
import parserSelector from './parserSelector.js';
import buildDiffTree from './buildDiffTree.js';
import format from './formatters/index.js';

const getExt = (filepath) => path.extname(filepath).slice(1);
const getData = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

export default function getDiff(path1, path2, selectedFormat = 'stylish') {
  const ext1 = getExt(path1);
  const ext2 = getExt(path2);
  const data1 = getData(path1);
  const data2 = getData(path2);

  const parsedData1 = parserSelector(data1, ext1); // объект
  const parsedData2 = parserSelector(data2, ext2); // объект

  const tree = buildDiffTree(parsedData1, parsedData2);
  const result = format(tree, selectedFormat);

  return result;
}
