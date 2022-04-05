import _ from 'lodash';
import fs from 'fs';
import path from 'path';

export default function getDiff(path1, path2) {
  const fileData = (filepath) => JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8'));
  const obj1 = fileData(path1);
  const obj2 = fileData(path2);
  const allKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const arr = allKeys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }

    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (!_.isEqual(obj1[key], obj2[key])) {
      return `  - ${key}: ${obj1[key]} \n  + ${key}: ${obj2[key]}`;
    }

    return `    ${key}: ${obj1[key]}`;
  });
  let res = _.join(arr, '\n');
  res = `{\n${res} \n}`;
  return res;
}
