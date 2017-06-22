#!/usr/bin/env node

'use strict';

const { spawnSync } = require('child_process'),
      fs = require('fs'),
      path = require('path');

const commander = require('commander'),
      mkdirp = require('mkdirp'),
      strftime = require('strftime');

const metadata = require('./package');

commander
  .version(metadata.version, '-v, --version');

commander
  .arguments('<directory>')
  .description('write a new post with $EDITOR')
  .action(function(argument) {
    const editor = process.env.EDITOR;

    if (!editor) {
      return process.stderr.write('$EDITOR is not defined.');
    }

    const baseDirectory = path.resolve(argument);

    const now = new Date();

    const dirName = strftime('%Y/%m', now),  // YYYY/MM
          filePrefix = strftime('%F', now);  // YYYY-MM-DD

    const existsSync = fs.existsSync.bind(fs);

    const postNumber = (function(){
      for (let i = 1; i < 100; ++i) {
        const number = (i < 10) ? `0${i}` : i;

        const files = [
          path.join(baseDirectory, `_drafts/${dirName}/${filePrefix}-${number}.md`),
          path.join(baseDirectory, `_posts/${dirName}/${filePrefix}-${number}.md`),
        ];

        if (!files.some(existsSync)) {
          return number;
        }
      }
    }());

    const filepath = path.join(
      baseDirectory, `_drafts/${dirName}/${filePrefix}-${postNumber}.md`
    );

    mkdirp.sync(path.dirname(filepath), {
      mode: parseInt('755', 8),
    });

    fs.writeFileSync(filepath, [
      '---',
      'tags:',
      'title:',
      '---',
      '',
    ].join('\n'));

    spawnSync(editor, [filepath], {
      stdio: 'inherit',
    });
  });

commander
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.help();
}
