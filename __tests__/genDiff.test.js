import genDiff from '../src/index.js';
import stylishDiffResult from '../__fixtures__/stylishDiffResult.js';
import plainDiffResult from '../__fixtures__/plainDiffResult.js';
import jsonDiffResult from '../__fixtures__/jsonDiffResult.js';

const filepath1 = './__fixtures__/file1.json';
const filepath2 = './__fixtures__/file2.yml';

test.each([
  [filepath1, filepath2, 'stylish', stylishDiffResult],
  [filepath1, filepath2, 'plain', plainDiffResult],
  [filepath1, filepath2, 'json', jsonDiffResult],
])('Compared %s and %s in "%s" format to be \n%s', (file1, file2, format, expected) => {
  expect(genDiff(file1, file2, format)).toEqual(expected);
});
