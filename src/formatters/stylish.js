import _ from 'lodash';

const space = '  ';
const hasChildren = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const currentDepth = depth + 1;
  const res = Object.keys(obj).map((key) => `${key}: ${hasChildren(obj[key], currentDepth + 1)}`).join(`\n${space.repeat(currentDepth + 1)}`);
  return `{\n${space.repeat(currentDepth + 1)}${res}\n${space.repeat(depth)}}`;
};

const stylish = (diffTree) => {
  const iter = (tree, depth = 1) => tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${space.repeat(depth)}+ ${node.key}: ${hasChildren(node.value, depth + 1)}`;
      case 'deleted':
        return `${space.repeat(depth)}- ${node.key}: ${hasChildren(node.value, depth + 1)}`;
      case 'unchanged':
        return `${space.repeat(depth)}  ${node.key}: ${hasChildren(node.value, depth + 1)}`;
      case 'changed':
        return `${space.repeat(depth)}- ${node.key}: ${hasChildren(node.value, depth + 1)}\n${space.repeat(depth)}+ ${node.key}: ${hasChildren(node.value2, depth + 1)}`;
      case 'nested':
        return `${space.repeat(depth + 1)}${node.key}: {\n${iter(node.children, depth + 2)}\n${space.repeat(depth + 1)}}`;
      default:
        throw new Error('Error');
    }
  }).join('\n');
  return `{\n${iter(diffTree)}\n}`;
};
export default stylish;
