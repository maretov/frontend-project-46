import parse from '../../src/parsers.js';
import getTestData from '../../__fixtures__/tests/testData.js';

const testData = getTestData();
const {
  fileJson1,
  fileYaml1,
  parsedJson1,
  parsedYaml1,
} = testData;

test('test function parse', () => {
  expect(parse(fileJson1, '.json')).toEqual(parsedJson1);
  expect(parse(fileYaml1, '.yaml')).toEqual(parsedYaml1);
  expect(parse(fileYaml1, '.yml')).toEqual(parsedYaml1);
});
