import path from 'node:path';
import _ from 'lodash';
import yaml from 'js-yaml';

const normalizePath = (pathSegment) => {
  const cwd = process.cwd();
  return path.resolve(cwd, pathSegment);
};

const getFileFormat = (filePath) => (filePath.slice(-4) === 'json' ? 'json' : 'yaml');

const getDataFromFile = (file, format) => (format === 'json' ? JSON.parse(file) : yaml.load(file));

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.sortBy(keys);

  const lines = sortedKeys.map((key) => {
    const inFirst = Object.prototype.hasOwnProperty.call(obj1, key);
    const inSecond = Object.prototype.hasOwnProperty.call(obj2, key);

    let result;

    if (inFirst && !inSecond) {
      result = `  - ${key}: ${obj1[key]}`;
    }
    if (!inFirst && inSecond) {
      result = `  + ${key}: ${obj2[key]}`;
    }
    if (inFirst && inSecond && obj1[key] !== obj2[key]) {
      result = `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (inFirst && inSecond && obj1[key] === obj2[key]) {
      result = `    ${key}: ${obj1[key]}`;
    }

    return result;
  });

  const uniqLines = _.uniq(lines);
  return `{\n${uniqLines.join('\n')}\n}`;
};

export {
  normalizePath,
  getFileFormat,
  getDataFromFile,
  getDiff,
};
