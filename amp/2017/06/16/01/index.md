---
layout: amp
tags: javascript uglifyjs webpack
title: UglifyJSで文字列をエスケープシーケンスに変換する
---
HTMLがShift\_JISで配信されている環境で、JavaScriptにマルチバイトの文字を書いてUTF-8で保存し、ブラウザでアラートを表示したら文字化けしてしまった。

素直にスクリプトをShift\_JISで保存し直せばよかったのだろうが、UTF-8で保存したかったので文字列をエスケープシーケンスへ変換することにした。

調べてみると、UglifyJSにはエスケープシーケンスに変換するオプションがあるようで、以下のIssueのコメントのようにすると変換できる。

[https://github.com/mishoo/UglifyJS2/issues/490#issuecomment-53410397](https://github.com/mishoo/UglifyJS2/issues/490#issuecomment-53410397)

## CLI

CLIから実行する場合は以下のようにオプションを指定する。

```console
$ uglifyjs index.js -b beautify=false,ascii_only=true   
```

標準入力からスクリプトを与えると以下のような出力になった。

```console
$ printf -- 'alert("マルチバイト")' | uglifyjs -b beautify=false,ascii_only=true
alert("\u30de\u30eb\u30c1\u30d0\u30a4\u30c8");
```

## webpack

webpackの場合は[UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)を使用するので、以下のようにオプションを指定する。

```js
const webpack = require('webpack');

module.exports = {
  // ...
  plugins: [
    new webpack.optimize.UglifyJSPlugin({
      output: {
        ascii_only: true,
      },
    }),
  ],
};
```
