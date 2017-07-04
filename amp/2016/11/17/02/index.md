---
layout: amp
tags: javascript node.js
title: スクリプト中でrequireされたかどうかを調べる
---
`require`されたか、`node`コマンドから実行されたか、というのをスクリプトから判定する方法を忘れてしまって調べ直した。

`require.main`が自身の参照なら`node`コマンドから実行された、と判定できるようだ。

```js
if (require.main === module) {
  // nodeコマンドから実行された
} else {
  // requireされた
}
```

[Accessing the main module - Node.js Documentation](https://nodejs.org/api/modules.html#modules_accessing_the_main_module)

> When a file is run directly from Node.js, require.main is set to its module. That means that you can determine whether a file has been run directly by testing.
