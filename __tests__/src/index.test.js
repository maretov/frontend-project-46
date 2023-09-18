import genDiff from '../../src/index.js';
import getTestData from '../../__fixtures__/tests/testData.js';

const testData = getTestData();
const { stylishResult, plainResult, diff } = testData;

test('test function genDiff', () => {
  const path1 = '__fixtures__/tests/testFile1.json';
  const path2 = '__fixtures__/tests/testFile2.yaml';
  expect(genDiff(path1, path2)).toBe(stylishResult);
  expect(genDiff(path1, path2, 'plain')).toBe(plainResult);
  expect(genDiff(path1, path2, 'json')).toBe(JSON.stringify(diff));
});
