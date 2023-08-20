#!/usr/bin/env node

import fs from "node:fs";
import {
  normalizePath,
  getDiff,
  getFileFormat,
  getDataFromFile,
} from "../src/compare.js";
import { Command } from "commander";
const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0");

program
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <format>", "output format")
  .action((path1, path2, outputFormat) => {
    const normalizedPath1 = normalizePath(path1);
    const normalizedPath2 = normalizePath(path2);

    const format1 = getFileFormat(normalizedPath1);
    const format2 = getFileFormat(normalizedPath2);

    const file1 = fs.readFileSync(normalizedPath1, "utf-8");
    const file2 = fs.readFileSync(normalizedPath2, "utf-8");

    const obj1 = getDataFromFile(file1, format1);
    const obj2 = getDataFromFile(file2, format2);

    const diff = getDiff(obj1, obj2, outputFormat.format);
    console.log(diff);
  });

program.parse();
