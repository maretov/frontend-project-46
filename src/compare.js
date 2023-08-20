import path from "node:path";
import _ from "lodash";
import yaml from "js-yaml";

const normalizePath = (pathSegment) => {
  const cwd = process.cwd();
  return path.resolve(cwd, pathSegment);
};

const getFileFormat = (filePath) =>
  filePath.slice(-4) === "json" ? "json" : "yaml";

const getDataFromFile = (file, format) =>
  format === "json" ? JSON.parse(file) : yaml.load(file);

const getDiff = (obj1, obj2, outputFormat = "json") => {
  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedKeys = _.sortBy(keys);

  const lines = sortedKeys.map((key) => {
    const inFirst = obj1.hasOwnProperty(key);
    const inSecond = obj2.hasOwnProperty(key);

    if (inFirst && !inSecond) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!inFirst && inSecond) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (inFirst && inSecond && obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (inFirst && inSecond && obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
  });

  const uniqLines = _.uniq(lines);
  return `{\n${uniqLines.join("\n")}\n}`;
};

export { normalizePath, getDiff, getFileFormat, getDataFromFile };
