---
layout: amp
tags: ci travis
title: Travis-CIでコンテナベースの環境にパッケージを追加する
---
Travis-CIでは`sudo: false`とするとコンテナベースの環境が使用され、動作が高速になるが通常の方法によるパッケージの追加ができない。

APTアドオンを使用することによって、コンテナベースの環境でもパッケージを追加できる。

[Installing Packages with the APT Addon](https://docs.travis-ci.com/user/installing-dependencies/#Installing-Packages-with-the-APT-Addon)

ホワイトリストは以下のリポジトリから確認できる。

[https://github.com/travis-ci/apt-source-whitelist](https://github.com/travis-ci/apt-source-whitelist)
