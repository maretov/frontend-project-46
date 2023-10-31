import _ from 'lodash';

const isObj = (obj) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
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

    if (inFirst && !inSecond) {
      return { key, status: 'removed', value: obj1[key] };
    }
    if (!inFirst && inSecond) {
      return { key, status: 'added', value: obj2[key] };
    }
    if (inFirst && inSecond) {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (isObj(value1) && isObj(value2)) {
        return { key, status: 'objects', value: getDiff(value1, value2) };
      }

      if (JSON.stringify(value1) === JSON.stringify(value2)) {
        return { key, status: 'notupdated', value: value1 };
      }

      return { key, status: 'updated', value: { old: value1, new: value2 } };
    }

    return undefined;
  });

  return diffTree;
};

export {
  isObj,
  getDiff,
};
