import yaml from 'js-yaml';

export default function parse(content, format) {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error('Unknown file extension');
  }
}
