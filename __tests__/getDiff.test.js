import getDiff from '../src/getDiff.js';
import stylishDiffResult from '../__fixtures__/stylishDiffResult.js';
import plainDiffResult from '../__fixtures__/plainDiffResult.js';
import jsonDiffResult from '../__fixtures__/jsonDiffResult.js';

const filepath1 = './__fixtures__/file1.json';
const filepath2 = './__fixtures__/file2.yml';

test('getDiff tests', () => {
  expect(getDiff(filepath1, filepath2)).toEqual(stylishDiffResult);
  expect(getDiff(filepath1, filepath2, 'plain')).toEqual(plainDiffResult);
  expect(getDiff(filepath1, filepath2, 'json')).toEqual(jsonDiffResult);
});
