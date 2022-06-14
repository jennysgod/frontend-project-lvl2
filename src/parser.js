import yaml from 'js-yaml';

export default function parse(content, formatName) {
  switch (formatName) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error('Unknown format');
  }
}
