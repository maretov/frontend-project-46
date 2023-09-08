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
      let line;

      if (status === 'objects') {
        const iterValue = iter(value, depth + 1);
        const indent = buildIndent(depth, status);
        return `${indent}${key}: ${iterValue}`;
      }

      if (status === 'updated') {
        const indentDel = buildIndent(depth, 'removed');
        const buildedOldValue = buildValue(value.old, depth + 1);
        const deletedLine = `${indentDel}${key}: ${buildedOldValue}`;

        const indentAdd = buildIndent(depth, 'added');
        const buildedNewValue = buildValue(value.new, depth + 1);
        const addedLine = `${indentAdd}${key}: ${buildedNewValue}`;

        line = `${deletedLine}\n${addedLine}`;
      } else {
        const indent = buildIndent(depth, status);
        const buildedValue = buildValue(value, depth + 1);
        line = `${indent}${key}: ${buildedValue}`;
      }

      return line;
    });

    const indentFull = buildIndent(depth, 'notupdated');
    const resultedIndent = indentFull.substring(0, indentFull.length - 4);
    return `{\n${formattedLines.join('\n')}\n${resultedIndent}}`;
  };

  return iter(differences, 1);
};

export default formatToStylish;