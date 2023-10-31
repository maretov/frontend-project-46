import _ from 'lodash';

export const isComplex = (complex) => {
  if (typeof complex === 'object' && complex !== null) {
    return true;
  }

  return false;
};

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

      switch (status) {
        case 'objects':
          return iter(value, pathCopy);
        case 'removed':
          return `Property '${stringPath}' was removed`;
        case 'added':
          return `Property '${stringPath}' was added with value: ${buildValue(value)}`;
        case 'updated':
          return `Property '${stringPath}' was updated. From ${buildValue(value.old)} to ${buildValue(value.new)}`;
        case 'notupdated':
          return '';
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

    return _.compact(lines).join('\n');
  };

  const resultLines = iter(differences, []);
  return resultLines;
};

export default formatToPlain;
