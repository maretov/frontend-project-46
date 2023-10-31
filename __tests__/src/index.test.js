import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../../src/index.js';
import jsonResult from '../../__fixtures__/jsonResult.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylishResult = readFile('stylishResult');
const plainResult = readFile('plainResult');

test('genDiff', () => {
  const pathJson1 = '__fixtures__/file1.json';
  const pathJson2 = '__fixtures__/file2.json';
  const pathYaml1 = '__fixtures__/file1.yml';
  const pathYaml2 = '__fixtures__/file2.yaml';
  expect(genDiff(pathJson1, pathJson2)).toBe(stylishResult);
  expect(genDiff(pathYaml1, pathYaml2, 'stylish')).toBe(stylishResult);
  expect(genDiff(pathJson1, pathYaml2, 'plain')).toBe(plainResult);
  expect(genDiff(pathYaml1, pathJson2, 'json')).toBe(jsonResult);
});
