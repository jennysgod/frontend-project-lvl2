import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parserSelector from './parsers.js';

export default function getDiff(path1, path2) {
  const getExt = (filepath) => path.extname(filepath).slice(1);
  const getData = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

  const ext1 = getExt(path1);
  const ext2 = getExt(path2);
  const data1 = getData(path1);
  const data2 = getData(path2);

  const parsedData1 = parserSelector(data1, ext1);
  const parsedData2 = parserSelector(data2, ext2);
  const allKeys = _.union(Object.keys(parsedData1), Object.keys(parsedData2)).sort();

  const arr = allKeys.map((key) => {
    if (!_.has(parsedData1, key) && _.has(parsedData2, key)) {
      return `+ ${key}: ${parsedData2[key]}`;
    }

    if (_.has(parsedData1, key) && !_.has(parsedData2, key)) {
      return `- ${key}: ${parsedData1[key]}`;
    }

    if (!_.isEqual(parsedData1[key], parsedData2[key])) {
      return `- ${key}: ${parsedData1[key]}\n  + ${key}: ${parsedData2[key]}`;
    }

    return `  ${key}: ${parsedData1[key]}`;
  }).join('\n  ');
  return `{\n  ${arr}\n}`;
}
