import _ from 'lodash';

export default function buildDiffTree(file1, file2) {
  const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const tree = allKeys.map((key) => {
    if (_.isEqual(file1[key], file2[key])) {
      return { type: 'unchanged', key, value: file1[key] };
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return { type: 'added', key, value: file2[key] };
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return { type: 'deleted', key, value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      const children = buildDiffTree(file1[key], file2[key]); // рекурсивный обход вл. объектов
      return { type: 'nested', key, children };
    }
    return {
      type: 'changed', key, value: file1[key], value2: file2[key],
    };
  });
  return tree;
}
