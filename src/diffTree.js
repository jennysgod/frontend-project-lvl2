import _ from 'lodash';

export default function genDiffTree(data1, data2) {
  const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return allKeys.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { type: 'deleted', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      const children = genDiffTree(data1[key], data2[key]); // рекурсивный обход вл. объектов
      return { type: 'nested', key, children };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        type: 'changed', key, value: data1[key], value2: data2[key],
      };
    }
    return { type: 'unchanged', key, value: data1[key] };
  });
}
