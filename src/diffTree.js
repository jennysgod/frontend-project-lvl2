import _ from 'lodash';

export default function genDiffTree(obj1, obj2) {
  const allKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return allKeys.map((key) => {
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { type: 'added', key, value: obj2[key] };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { type: 'deleted', key, value: obj1[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      const children = genDiffTree(obj1[key], obj2[key]); // рекурсивный обход вл. объектов
      return { type: 'nested', key, children };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'changed', key, value: obj1[key], value2: obj2[key],
      };
    }
    return { type: 'unchanged', key, value: obj1[key] };
  });
}
