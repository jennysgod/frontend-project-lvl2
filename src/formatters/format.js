import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

export default function format(diffTree, formatName) {
  switch (formatName) {
    case 'stylish':
      return makeStylish(diffTree);
    case 'plain':
      return makePlain(diffTree);
    case 'json':
      return makeJson(diffTree);
    default:
      throw new Error('Unknown format');
  }
}
