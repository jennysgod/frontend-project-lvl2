import _ from 'lodash';

const tab = '  ';

const printValue = (obj, depth) => {
  if (!_.isObject(obj)) {
    return obj;
  }
  const currentDepth = depth + 2;
  const allObjKeys = Object.keys(obj);
  const res = allObjKeys
    .map((key) => `${key}: ${printValue(obj[key], currentDepth)}`)
    .join(`\n${tab.repeat(currentDepth)}`);

  return `{\n${tab.repeat(currentDepth)}${res}\n${tab.repeat(depth)}}`;
};

const stylish = (diffTree) => {
  const makeStylish = (tree, depth = 1) => tree
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `${tab.repeat(depth)}+ ${node.key}: ${printValue(node.value, depth + 1)}`;
        case 'deleted':
          return `${tab.repeat(depth)}- ${node.key}: ${printValue(node.value, depth + 1)}`;
        case 'unchanged':
          return `${tab.repeat(depth)}  ${node.key}: ${printValue(node.value, depth + 1)}`;
        case 'changed':
          return `${tab.repeat(depth)}- ${node.key}: ${printValue(node.value, depth + 1)}\n${tab.repeat(depth)}+ ${node.key}: ${printValue(node.value2, depth + 1)}`;
        case 'nested':
          return `${tab.repeat(depth + 1)}${node.key}: {\n${makeStylish(node.children, depth + 2)}\n${tab.repeat(depth + 1)}}`;
        default:
          throw new Error('Unknown node type');
      }
    })
    .join('\n');

  return `{\n${makeStylish(diffTree)}\n}`;
};
export default stylish;
