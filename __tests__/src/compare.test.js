import { fileURLToPath } from 'url';
import path from 'node:path';
import {
  normalizePath,
  getFileFormat,
  isObj,
  isComplex,
  getDiff,
} from '../../src/compare.js';
import getTestData from '../../__fixtures__/tests/testData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testData = getTestData();
const { parsedJson1, parsedJson2, diff } = testData;

test('test function normalizePath', () => {
  const expectedPath1 = path.join(__dirname, '../..', '__fixtures__/tests', 'file1.json');
  const expectedPath2 = path.join(__dirname, '../../src/index.js');
  expect(normalizePath('__fixtures__/tests/file1.json')).toBe(expectedPath1);
  expect(normalizePath('src/index.js')).toBe(expectedPath2);
});

test('test function getFileFormat', () => {
  expect(getFileFormat('file.json')).toBe('.json');
  expect(getFileFormat('../temp/file.ini')).toBe('.ini');
  expect(getFileFormat('/home/test/file.yaml')).toBe('.yaml');
});

test('test function getDiff', () => {
  expect(getDiff(parsedJson1, parsedJson2)).toStrictEqual(diff);
});

test('test function isObj', () => {
  expect(isObj({ name: 'Jhon' })).toBe(true);
  expect(isObj([1, 2, 3])).toBe(false);
  expect(isObj(null)).toBe(false);
  expect(isObj('string')).toBe(false);
  expect(isObj(56)).toBe(false);
});

test('test function isComplex', () => {
  expect(isComplex({ name: 'John' })).toBe(true);
  expect(isComplex([1, 3, 4])).toBe(true);
  expect(isComplex(null)).toBe(false);
  expect(isComplex('string')).toBe(false);
  expect(isComplex(56)).toBe(false);
});
