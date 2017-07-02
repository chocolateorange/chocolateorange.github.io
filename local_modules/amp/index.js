#!/usr/bin/env node

'use strict';

const fs = require('fs'),
      path = require('path');

const commander = require('commander'),
      fsExtra = require('fs-extra'),
      glob = require('glob');

const metadata = require('./package');

commander
  .version(metadata.version, '-v, --version');

commander
  .arguments('<directory>')
  .description(metadata.description)
  .option('-l, --layout <name>', 'layout name', 'amp')
  .action(function(argument) {
    const baseDirectory = path.resolve(argument);

    const pattern = path.join(baseDirectory, '_+(drafts|posts)/**/*.md');

    glob.sync(pattern).forEach(function(filePath) {
      const outputFileName =
        path.basename(filePath)          // "2017-06-23-01.md"
        .replace(/-/g, '/')              // "2017/06/23/01.md"
        .replace(/.md$/i, '/index.md');  // "2017/06/23/01/index.md"
      
      const outputFilePath = path.join(baseDirectory, 'amp', outputFileName);
      
      const text = fs.readFileSync(filePath, 'utf8')
        .replace(/^---/, [
          '---',
          `layout: ${commander.layout}`,
        ].join('\n'));
      
      // outputFileSync is create subdirectories if directory is not found
      fsExtra.outputFileSync(outputFilePath, text, 'utf8');
    });
  });

commander
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.help();
}
