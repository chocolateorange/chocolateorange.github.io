---
layout: amp
tags: ci travis
title: Travis CIで最新のFirefoxを使う
---
[Travis CI](https://travis-ci.org/)で最新のFirefoxを使う方法について。

- [TravisCIで実ブラウザ環境のテストを行う方法](http://c-note.chatwork.com/post/147942086975/testing-with-travis-on-the-real-browser)
- [Travis CI - Firefox](https://docs.travis-ci.com/user/firefox/)

以下のような設定を`.travis.yml`に書いておけば良い。

```yaml
addons:
  firefox: latest
```
