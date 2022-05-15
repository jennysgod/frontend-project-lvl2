#!/usr/bin/env node

import { Command } from 'commander';
import { getDiff } from '../src/getDiff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(getDiff(filepath1, filepath2, `${program.opts().format}`));
  });

program.parse();
