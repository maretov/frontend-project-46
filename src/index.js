import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import formatTo from '../formatters/index.js';
import { getDiff } from './compare.js';

const normalizePath = (pathSegment) => {
  const cwd = process.cwd();
  return path.resolve(cwd, pathSegment);
};

const getFileFormat = (filePath) => {
  const parsedPath = path.parse(filePath);
  return parsedPath.ext;
};

const genDiff = (path1, path2, format) => {
  const normalizedPath1 = normalizePath(path1);
  const normalizedPath2 = normalizePath(path2);

  const format1 = getFileFormat(normalizedPath1);
  const format2 = getFileFormat(normalizedPath2);

  const file1 = fs.readFileSync(normalizedPath1, 'utf-8');
  const file2 = fs.readFileSync(normalizedPath2, 'utf-8');

  const obj1 = parse(file1, format1);
  const obj2 = parse(file2, format2);

  const diff = getDiff(obj1, obj2);
  const formattedDiff = formatTo(diff, format);

  return formattedDiff;
};

export default genDiff;
