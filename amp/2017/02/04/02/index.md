---
layout: amp
tags: ejs sass webpack
title: webpackでSassやejsをコンパイルする
---
[webpack](https://webpack.js.org/)でJavaScriptを生成せずにHTMLやCSSを生成する方法について。[Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)を使ったことがなかったので、試してみたかった。

最初に必要なモジュールをインストールする。

```console
$ npm install css-loader extract-text-webpack-plugin glob lodash.frompairs node-sass sass-loader webpack@1
```

次に以下のコードを`webpack.config.js`として保存する。

```js
'use strict';

const path = require('path');

const fromPairs = require('lodash.frompairs'),
      glob = require('glob');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ファイル名の先頭に`_`があるファイルを無視しつつ`*.scss`を検索する
const files = glob.sync(`${__dirname}/src/**/!(_)*.s[ac]ss`);

// 階層構造を保ちつつ出力先ディレクトリに出力させる
const entry = fromPairs(
  files.map(filePath => [
    filePath.replace(`${__dirname}/src/`, '').replace(/\.s[ac]ss$/, ''),
    filePath,
  ])
);

module.exports = {

  entry,

  output: {
    path: path.join(__dirname, 'dest'),
    filename: '[name].css',
  },

  module: {
    loaders: [
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
    ],
  },

  sassLoader: {
    outputStyle: 'expanded',
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

};
```

これでwebpackを実行すると、`src`ディレクトリに配置した`*.scss`のファイルが階層構造を保ったまま`dest`ディレクトリにCSSとして出力される。

webpackの`--watch`オプションでファイルを監視させると、パーシャルとなるファイルが更新されたときでも、そのファイルを読み込んでいるファイルがコンパイルされる。

以下のリポジトリにSassまたはejsをコンパイルするためのwebpackの環境が作ってある。

- [compile-sass-with-webpack](https://github.com/sasaplus1-prototype/compile-sass-with-webpack)
- [compile-ejs-with-webpack](https://github.com/sasaplus1-prototype/compile-ejs-with-webpack)

---

そもそもなぜこんなことをはじめたかというと、[gulp](http://gulpjs.com/)にSassのファイルを監視させつつコンパイルさせていたときのこと。

パーシャルとなるファイルが更新されたときに、そのファイルを読み込んでいる親となるファイルがコンパイルされないので、その動作が気になっていたからだった。

ファイルが更新されるたびにすべてのファイルをコンパイルしなおす、という動作でも良いけれどファイル数があまりにも多い場合は確実に遅くなるはずで避けたいと思った。

[Stack Overflowでも質問](http://stackoverflow.com/questions/25171132/gulp-compile-all-parent-sass-files-when-a-dependent-child-import-is-changed)されていて、以下のモジュールを使用すれば解決できるようだ。

- [gulp-filter](https://github.com/sindresorhus/gulp-filter)
- [gulp-sass-inheritance](https://github.com/berstend/gulp-sass-inheritance)

でも、Sassのコンパイルをしたいだけなのにgulpfile.jsがどんどん複雑になっていきそう。

---

そもそも、gulpやwebpackを使わずに[node-sass](https://github.com/sass/node-sass)へ`--watch`オプションを付加して直接実行すれば、上記の問題は解決できる。
