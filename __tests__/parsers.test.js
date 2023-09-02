import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let fileJson;
let fileYaml;
let parsed;

beforeAll(() => {
  fileJson = readFile('file1.json');
  fileYaml = readFile('file1.yml');
  parsed = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };
});

test('test function parse', () => {
  expect(parse(fileJson, '.json')).toEqual(parsed);
  expect(parse(fileYaml, '.yaml')).toEqual(parsed);
  expect(parse(fileYaml, '.yml')).toEqual(parsed);
});
