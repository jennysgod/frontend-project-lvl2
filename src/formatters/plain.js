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

export default function formatPlain(innerTree) {
  const format = (tree, nodeName = '') => tree
    .map((node) => {
      const propertyName = nodeName ? `${nodeName}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${propertyName}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${propertyName}' was removed`;
        case 'unchanged':
          return '';
        case 'changed':
          return `Property '${propertyName}' was updated. From ${stringify(node.value)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${format(node.children, propertyName)}`;
        default:
          throw new Error('Unknown node type');
      }
    })
    .filter(Boolean)
    .join('\n');
  return format(innerTree);
}
