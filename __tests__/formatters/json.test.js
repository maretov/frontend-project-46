import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../../src/parsers.js';
import formatToJson from '../../formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__/tests', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let diffFile;
let diff;
let testJsonDiff;

beforeAll(() => {
  diffFile = readFile('testDiff.json');
  diff = parse(diffFile, '.json');
  testJsonDiff = JSON.stringify(diff);
});

test('test function formatToPlain', () => {
  expect(formatToJson(diff)).toBe(testJsonDiff);
});
