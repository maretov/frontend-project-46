import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../../src/parsers.js';
import formatToStylish from '../../formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__/tests', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let diffFile;
let diff;
let testStylishDiff;

beforeAll(() => {
  diffFile = readFile('testDiff.json');
  diff = parse(diffFile, '.json');
  testStylishDiff = readFile('testStylishDiff');
});

test('test function formatToStylish', () => {
  expect(formatToStylish(diff, 'stylish')).toBe(testStylishDiff);
});
