import _ from 'lodash';

const printValue = (obj) => {
  if (_.isObject(obj)) {
    return '[complex value]';
  }
  if (_.isString(obj)) {
    return `'${obj}'`;
  }
  return obj;
};

export default function plain(innerTree) {
  const makePlain = (tree, nodeName = '') => tree
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `Property '${nodeName}${node.key}' was added with value: ${printValue(node.value)}`;
        case 'deleted':
          return `Property '${nodeName}${node.key}' was removed`;
        case 'unchanged':
          return '';
        case 'changed':
          return `Property '${nodeName}${node.key}' was updated. From ${printValue(node.value)} to ${printValue(node.value2)}`;
        case 'nested':
          return `${makePlain(node.children, nodeName.concat(node.key, '.'))}`;
        default:
          throw new Error('Unknown node type');
      }
    })
    .filter((node) => !!node)
    .join('\n');
  return makePlain(innerTree);
}
