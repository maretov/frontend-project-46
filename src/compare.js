import path from 'node:path';
import _ from 'lodash';

const normalizePath = (pathSegment) => {
  const cwd = process.cwd();
  return path.resolve(cwd, pathSegment);
};

const getFileFormat = (filePath) => {
  const parsedPath = path.parse(filePath);
  return parsedPath.ext;
};

const isObj = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true;
  }

  return false;
};

const isComplex = (complex) => {
  if (typeof complex === 'object' && complex !== null) {
    return true;
  }

  return false;
};

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.sortBy(keys);
  const uniqKeys = _.uniq(sortedKeys);

  const diffTree = uniqKeys.map((key) => {
    const inFirst = Object.prototype.hasOwnProperty.call(obj1, key);
    const inSecond = Object.prototype.hasOwnProperty.call(obj2, key);

    let result;

    if (inFirst && !inSecond) {
      result = { key, value: obj1[key], status: 'removed' };
    }
    if (!inFirst && inSecond) {
      result = { key, value: obj2[key], status: 'added' };
    }
    if (inFirst && inSecond) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (isObj(value1) && isObj(value2)) {
        result = { key, value: getDiff(value1, value2), status: 'objects' };
      } else if (JSON.stringify(value1) === JSON.stringify(value2)) {
        result = { key, value: value1, status: 'notupdated' };
      } else {
        result = { key, value: { old: value1, new: value2 }, status: 'updated' };
      }
    }

    return result;
  });

  return diffTree;
};

export {
  normalizePath,
  getFileFormat,
  isObj,
  isComplex,
  getDiff,
};
