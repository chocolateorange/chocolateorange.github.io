---
layout: amp
tags: eslint
title: ESLintの推奨ルールでコードをチェックする
---
[Airbnb](https://github.com/airbnb/javascript)や[Google](https://github.com/google/eslint-config-google)が自社のスタイルを[ESLint](http://eslint.org/)のルールとして公開しているけれど、自分には合わないので自分用ルールなどを作っていた。ただ、メンテナンスが面倒でそのうちESLintを使わなくなってしまった。しばらくそんな状態だったので、よくないと思い調べなおしたらESLintの推奨ルールがあるということがわかったので使うようにした。

以下を`.eslintrc`に記述する。

```json
{
  "extends": "eslint:recommended"
}
```

この設定をすると[List of available rules - ESLint](http://eslint.org/docs/rules/)にあるチェックマークがついているルールに関してチェックされるようになる。

[mysticatea/eslint-recommended.md](https://gist.github.com/mysticatea/df40f5e3cdbf0e9ae618)には日本語での解説がある。
