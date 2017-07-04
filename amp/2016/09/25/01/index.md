---
layout: amp
tags: babel javascript
title: babel-preset-es2015でlooseオプションを一括で指定する
---
たまたま[babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)のコミットログを見ていたら、オプションを配下のプラグインに渡す修正が含まれたことに気がついた。

[Support passing options to presets. (#3331)](https://github.com/babel/babel/commit/897f553dc7c6194f6dd788d0a1921d71c2c692d1)

この修正により、今までは個別のプラグインに`loose`の設定を渡すように記述していたのが一括で指定できるようになった。あるいは個々のプラグインへの指定が面倒だからと[babel-preset-es2015-loose](https://github.com/bkonkle/babel-preset-es2015-loose)を使用する必要がなくなった。

```json
{
  "presets": [
    ["es2015", {"loose": true}]
  ]
}
```

上記の指定は`babel-preset-es2015`がver.6.13.0以上のときに使用できる。
