#!/usr/bin/env node

'use strict';

const path = require('path');

const commander = require('commander'),
      fsExtra = require('fs-extra'),
      rimraf = require('rimraf');

const metadata = require('./package');

commander
  .version(metadata.version, '-v, --version');

commander
  .arguments('<directory>')
  .description('move files in _drafts to _posts')
  .action(function(argument) {
    const baseDirectory = path.resolve(argument);

    // copy to _posts from _drafts
    fsExtra.copySync(
      path.join(baseDirectory, '_drafts'),
      path.join(baseDirectory, '_posts')
    );

    // remove files in _drafts
    rimraf.sync(
      path.join(baseDirectory, '_drafts/!(.gitkeep)')
    );
  });

commander
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.help();
}
