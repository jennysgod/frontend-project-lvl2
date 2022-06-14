import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

export default function makePlain(innerTree) {
  const format = (tree, nodeName = '') => tree
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `Property '${nodeName}${node.key}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${nodeName}${node.key}' was removed`;
        case 'unchanged':
          return '';
        case 'changed':
          return `Property '${nodeName}${node.key}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${format(node.children, nodeName.concat(node.key, '.'))}`;
        default:
          throw new Error('Unknown node type');
      }
    })
    .filter((node) => !!node)
    .join('\n');
  return format(innerTree);
}
