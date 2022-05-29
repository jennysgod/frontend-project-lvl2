import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default function format(diffTree, selectedFormat) {
  switch (selectedFormat) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return json(diffTree);
    default:
      throw new Error('Unknown format');
  }
}
