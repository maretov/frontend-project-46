import {
  normalizePath,
  getFileFormat,
  getDataFromFile,
  getDiff,
} from '../src/compare.js';

let fileJson;
let fileYaml;
let objJson;
let objYaml;
let diff;

beforeAll(() => {
  fileJson = `{
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  }`;
  fileYaml = `---
    timeout: 20
    verbose: true
    host: hexlet.io
  `;
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
  diff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
});

test('test function normalizePath', () => {
  expect(normalizePath('__tests__/compare.test.js')).toBe(
    '/home/maretov/hexlet/frontend-project-46/__tests__/compare.test.js',
  );
  expect(normalizePath('/home/maretov/test.js')).toBe('/home/maretov/test.js');
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
