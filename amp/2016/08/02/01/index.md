---
layout: amp
tags: github npm private
title: モジュールをプライベートリポジトリからインストールする
---
GitHubのプライベートリポジトリに置いてあるモジュールを、npmでインストールする方法について。

- [How to use private Github repo as npm dependency](http://stackoverflow.com/questions/28728665/how-to-use-private-github-repo-as-npm-dependency/28729646#28729646)

リポジトリのアクセストークンを作ってそれを含んだURLで指定する方法と、プロトコルを`git+ssh`などにしてユーザのSSH鍵を使ってインストールする方法とあるようだ。
