import _ from 'lodash';
import { isComplex } from '../src/compare.js';

const buildValue = (data) => {
  if (isComplex(data)) {
    return '[complex value]';
  }

  if (typeof data === 'string') {
    return `'${data}'`;
  }

  return data;
};

const formatToPlain = (differences) => {
  const iter = (diffs, path) => {
    const lines = diffs.map((diff) => {
      const { key, value, status } = diff;
      const pathCopy = [...path];
      pathCopy.push(key);
      const stringPath = pathCopy.join('.');
      let line;

      if (status === 'objects') {
        line = iter(value, pathCopy);
      }

      if (status === 'removed') {
        line = `Property '${stringPath}' was removed`;
      }

      if (status === 'added') {
        line = `Property '${stringPath}' was added with value ${buildValue(value)}`;
      }

      if (status === 'updated') {
        line = `Property '${stringPath}' was updated. From ${buildValue(value.old)} to ${buildValue(value.new)}`;
      }

      return line;
    });

    return _.compact(lines).join('\n');
  };

  const resultLines = iter(differences, []);
  return resultLines;
};

export default formatToPlain;
