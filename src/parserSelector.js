import yaml from 'js-yaml';

export default function parserSelector(fileData, fileExt) {
  switch (fileExt) {
    case 'json':
      return JSON.parse(fileData);
    case 'yml':
      return yaml.load(fileData);
    default:
      throw new Error('Unknown file extension');
  }
}
