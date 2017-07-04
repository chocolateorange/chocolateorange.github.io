---
layout: amp
tags: node.js
title: fs.existsSyncが非推奨ではなくなっていた
---
node.jsのドキュメントを読んでいた時に`fs.existsSync()`が非推奨ではなくなっていたことにふと気がついた。

調べてみるとver.6.xから非推奨ではなくなっている。

| バージョン                                                                          | 記述                     |
| ----------------------------------------------------------------------------------- | ------------------------ |
| [0.10.x](https://nodejs.org/docs/latest-v0.10.x/api/fs.html#fs_fs_existssync_path)  | 特になし                 |
| [0.12.x](https://nodejs.org/docs/latest-v0.12.x/api/fs.html#fs_fs_existssync_path)  | 非推奨になります         |
| [4.x](https://nodejs.org/docs/latest-v4.x/api/fs.html#fs_fs_existssync_path)        | 非推奨                   |
| [5.x](https://nodejs.org/docs/latest-v5.x/api/fs.html#fs_fs_existssync_path)        | 非推奨                   |
| [6.x](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_existssync_path)   | 非推奨**ではありません** |
| [7.x](https://nodejs.org/dist/latest-v7.x/docs/api/fs.html#fs_fs_existssync_path)   | 非推奨**ではありません** |

調べてみると、[issues/1592](https://github.com/nodejs/node/issues/1592#issuecomment-251770788)や[commit/7b5ffa46fe4d2868c1662694da06eb55ec744bde](https://github.com/nodejs/node/commit/7b5ffa46fe4d2868c1662694da06eb55ec744bde)で非推奨が取り消されているのを確認できた。

非同期の`fs.exists()`は変わらず非推奨になっている。
