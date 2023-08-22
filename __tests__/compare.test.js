import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs';
import {
  normalizePath,
  getFileFormat,
  getDataFromFile,
  getDiff,
} from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileJson;
let fileYaml;
let objJson;
let objYaml;
let diff;

beforeAll(() => {
  fileJson = readFile('file1.json');
  fileYaml = readFile('file2.yaml');
  diff = readFile('expectedFile');
  objJson = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  objYaml = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
});

test('test function normalizePath', () => {
  const expectedPath = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  expect(normalizePath('__fixtures__/file1.json')).toBe(expectedPath);
});

test('test function getFileFormat', () => {
  expect(getFileFormat('file.json')).toBe('json');
  expect(getFileFormat('file.yaml')).toBe('yaml');
});

test('test function getDataFromFile', () => {
  expect(getDataFromFile(fileJson, 'json')).toEqual(objJson);
  expect(getDataFromFile(fileYaml, 'yaml')).toEqual(objYaml);
});

test('test function getDiff', () => {
  expect(getDiff(objJson, objYaml, 'json')).toBe(diff);
});
