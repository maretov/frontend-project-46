import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../../src/parsers.js';
import formatToPlain from '../../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '../..', '__fixtures__/tests', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let diffFile;
let diff;
let testPlainDiff;

beforeAll(() => {
  diffFile = readFile('testDiff.json');
  diff = parse(diffFile, '.json');
  testPlainDiff = readFile('testPlainDiff');
});

test('test function formatToPlain', () => {
  expect(formatToPlain(diff)).toBe(testPlainDiff);
});
