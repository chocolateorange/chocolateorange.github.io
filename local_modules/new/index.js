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
  .description(metadata.description)
  .option('-m, --max-find-count <count>', 'max find count [100]', (n) => parseInt(n, 10), 100)
  .option('-t, --template <template>', 'template file path')
  .action(function(argument) {

    const editor = process.env.EDITOR;

    if (!editor) {
      process.stderr.write('$EDITOR is not defined.\n');

      return;
    }

    //--------------------------------------------------------------------------

    const baseDirectory = path.resolve(argument);

    //--------------------------------------------------------------------------

    const now = new Date();

    const filePath = getFilePath({
      baseDirectory,
      dirPath: strftime('%Y/%m', now),      // YYYY/MM
      fileNamePrefix: strftime('%F', now),  // YYYY-MM-DD
      maxFindCount: commander.maxFindCount,
    });

    if (!filePath) {
      process.stderr.write(
        'cannot create file. ' +
        'try pass to more large value for --max-find-count.\n'
      );

      return;
    }

    //--------------------------------------------------------------------------

    const template = (commander.template) ?
      fs.readFileSync(
        path.resolve(commander.template),
        'utf8'
      ) : [
        '---',
        '---',
        '',
      ].join('\n');

    createDraft({
      filePath,
      text: template,
    });

    executeEditor({
      editor,
      filePath,
    });

    //--------------------------------------------------------------------------

    /**
     * get next post file path
     *
     * @param {Object} params
     * @param {string} params.baseDirectory
     * @param {string} params.dirPath
     * @param {string} params.fileNamePrefix
     * @param {number} params.maxFindCount
     * @return {string}
     */
    function getFilePath({ baseDirectory, dirPath, fileNamePrefix, maxFindCount }) {
      const existsSync = fs.existsSync.bind(fs);

      for (let i = 1; i < maxFindCount; ++i) {
        const number = (i < 10) ? `0${i}` : i;

        const files = [
          path.join(baseDirectory, `_drafts/${dirPath}/${fileNamePrefix}-${number}.md`),
          path.join(baseDirectory, `_posts/${dirPath}/${fileNamePrefix}-${number}.md`),
        ];

        if (!files.some(existsSync)) {
          return path.join(
            baseDirectory, `_drafts/${dirPath}/${fileNamePrefix}-${number}.md`
          );
        }
      }

      return '';
    }

    /**
     * create draft
     *
     * @param {Object} params
     * @param {string} params.filePath
     * @param {string} params.text
     */
    function createDraft({ filePath, text }) {
      const dirPath = path.dirname(filePath);

      mkdirp.sync(dirPath, {
        mode: parseInt('755', 8),
      });

      fs.writeFileSync(filePath, text);
    }

    /**
     * execute user's favorite editor
     *
     * @param {Object} params
     * @param {string} params.editor
     * @param {string} params.filePath
     * @return {Object}
     */
    function executeEditor({ editor, filePath }) {
      return spawnSync(editor, [filePath], {
        stdio: 'inherit',
      });
    }
  });

commander
  .parse(process.argv);

if (commander.args.length === 0) {
  commander.help();
}
