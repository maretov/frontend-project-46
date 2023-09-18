import { fileURLToPath } from 'url';
import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getTestData = () => {
  const fileJson1 = readFile('testFile1.json');
  const fileJson2 = readFile('testFile2.json');
  const fileYaml1 = readFile('testFile1.yaml');
  const fileYaml2 = readFile('testFile2.yaml');
  const diffFile = readFile('testDiff.json');
  const stylishResult = readFile('testStylishDiff');
  const plainResult = readFile('testPlainDiff');

  const parsedJson1 = JSON.parse(fileJson1);
  const parsedJson2 = JSON.parse(fileJson2);
  const parsedYaml1 = yaml.load(fileYaml1);
  const parsedYaml2 = yaml.load(fileYaml2);
  const diff = JSON.parse(diffFile);

  const testData = {
    fileJson1,
    fileJson2,
    fileYaml1,
    diffFile,
    stylishResult,
    plainResult,
    parsedJson1,
    parsedJson2,
    parsedYaml1,
    parsedYaml2,
    diff,
  };

  return testData;
};

export default getTestData;
