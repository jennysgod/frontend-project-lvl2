import _ from 'lodash';

const makeIndent = (depth) => '  '.repeat(depth);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const currentDepth = depth + 2;
  const allObjKeys = Object.keys(value);
  const res = allObjKeys
    .map((key) => `${key}: ${stringify(value[key], currentDepth)}`)
    .join(`\n${makeIndent(currentDepth)}`);

  return `{\n${makeIndent(currentDepth)}${res}\n${makeIndent(depth)}}`;
};

export default function makeStylish(innerTree) {
  const format = (tree, depth = 1) => tree
    .map((node) => {
      switch (node.type) {
        case 'added':
          return `${makeIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return `${makeIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${makeIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}\n${makeIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
        case 'nested':
          return `${makeIndent(depth + 1)}${node.key}: {\n${format(node.children, depth + 2)}\n${makeIndent(depth + 1)}}`;
        default:
          throw new Error('Unknown node type');
      }
    })
    .join('\n');

  return `{\n${format(innerTree)}\n}`;
}
