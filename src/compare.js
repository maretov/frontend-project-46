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

const getCommonSortedUniqKeys = (firstObject, secondObject) => {
  const keys1 = Object.keys(firstObject);
  const keys2 = Object.keys(secondObject);
  const keys = [...keys1, ...keys2];
  const sortedKeys = _.sortBy(keys);
  return _.uniq(sortedKeys);
};

const getDiff = (obj1, obj2) => {
  const uniqKeys = getCommonSortedUniqKeys(obj1, obj2);

  const diffTree = uniqKeys.map((key) => {
    const inFirst = Object.prototype.hasOwnProperty.call(obj1, key);
    const inSecond = Object.prototype.hasOwnProperty.call(obj2, key);

    let result;

    if (inFirst && !inSecond) {
      result = { key, status: 'removed', value: obj1[key] };
    }
    if (!inFirst && inSecond) {
      result = { key, status: 'added', value: obj2[key] };
    }
    if (inFirst && inSecond) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (isObj(value1) && isObj(value2)) {
        result = { key, status: 'objects', value: getDiff(value1, value2) };
      } else if (JSON.stringify(value1) === JSON.stringify(value2)) {
        result = { key, status: 'notupdated', value: value1 };
      } else {
        result = { key, status: 'updated', value: { old: value1, new: value2 } };
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
