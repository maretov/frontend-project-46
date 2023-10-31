import { isObj } from '../src/compare.js';

const specialChar = {
  notupdated: ' ',
  updated: '-',
  removed: '-',
  added: '+',
  objects: ' ',
};

const buildIndent = (depth, status) => {
  const fullIndent = '    '.repeat(depth);
  const clippedIndent = fullIndent.substring(0, fullIndent.length - 2);
  const additionalIndent = `${specialChar[status]} `;
  return `${clippedIndent}${additionalIndent}`;
};

const buildValue = (data, depth) => {
  if (isObj(data)) {
    const keys = Object.keys(data);
    const lines = keys.map((key) => {
      const indent = buildIndent(depth, 'notupdated');
      const value = buildValue(data[key], depth + 1);
      return `${indent}${key}: ${value}`;
    });

    const indentFull = buildIndent(depth, 'notupdated');
    const endIndent = indentFull.substring(0, indentFull.length - 4);
    return `{\n${lines.join('\n')}\n${endIndent}}`;
  }

  return data;
};

const formatToStylish = (differences) => {
  const iter = (diffs, depth) => {
    const formattedLines = diffs.map((diff) => {
      const { key, value, status } = diff;

      switch (status) {
        case 'objects': {
          const iterValue = iter(value, depth + 1);
          const indent = buildIndent(depth, status);
          return `${indent}${key}: ${iterValue}`;
        }
        case 'updated': {
          const indentDel = buildIndent(depth, 'removed');
          const buildedOldValue = buildValue(value.old, depth + 1);
          const deletedLine = `${indentDel}${key}: ${buildedOldValue}`;

          const indentAdd = buildIndent(depth, 'added');
          const buildedNewValue = buildValue(value.new, depth + 1);
          const addedLine = `${indentAdd}${key}: ${buildedNewValue}`;

          return `${deletedLine}\n${addedLine}`;
        }
        case 'notupdated':
        case 'added':
        case 'removed': {
          const indent = buildIndent(depth, status);
          const buildedValue = buildValue(value, depth + 1);
          return `${indent}${key}: ${buildedValue}`;
        }
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });

    const indentFull = buildIndent(depth, 'notupdated');
    const resultedIndent = indentFull.substring(0, indentFull.length - 4);
    return `{\n${formattedLines.join('\n')}\n${resultedIndent}}`;
  };

  return iter(differences, 1);
};

export default formatToStylish;
