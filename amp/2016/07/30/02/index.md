---
layout: amp
tags: ci travis
title: Travis CIでX11を使ったテストをする
---
[Travis CI](https://travis-ci.org/)でX11を使ったテストをする際には`xvfb-run`を使うと簡単にできるようだ。

- [TravisCIで実ブラウザ環境のテストを行う方法](http://c-note.chatwork.com/post/147942086975/testing-with-travis-on-the-real-browser)
- [Xvfb を利用したヘッドレスブラウザテスト](http://qiita.com/kt3k@github/items/cea3c6de3c2337004a84)

以下は`xvfb-run`で[Karma](https://karma-runner.github.io/1.0/)を実行している。

```yaml
script:
  - xvfb-run karma start --single-run
```