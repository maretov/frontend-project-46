import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs';
import parse from '../src/parsers.js';
import {
  normalizePath,
  getFileFormat,
  isObj,
  getDiff,
} from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__/tests', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let file1;
let file2;
let diffFile;
let json1;
let json2;
let diff;

beforeAll(() => {
  file1 = readFile('testFile1.json');
  file2 = readFile('testFile2.json');
  diffFile = readFile('testDiff.json');

  json1 = parse(file1, '.json');
  json2 = parse(file2, '.json');
  diff = parse(diffFile, '.json');
});

test('test function normalizePath', () => {
  const expectedPath = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  expect(normalizePath('__fixtures__/file1.json')).toBe(expectedPath);
});

test('test function getFileFormat', () => {
  expect(getFileFormat('file.json')).toBe('.json');
  expect(getFileFormat('../temp/file.ini')).toBe('.ini');
  expect(getFileFormat('/home/test/file.yaml')).toBe('.yaml');
});

test('test function getDiff', () => {
  expect(getDiff(json1, json2)).toStrictEqual(diff);
});

test('test function isObj', () => {
  expect(isObj({ name: 'Jhon' })).toBe(true);
  expect(isObj([1, 2, 3])).toBe(false);
  expect(isObj(null)).toBe(false);
  expect(isObj('string')).toBe(false);
  expect(isObj(56)).toBe(false);
});
