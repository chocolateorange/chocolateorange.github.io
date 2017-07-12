---
layout: amp
tags: github-pages jekyll sass stylelint
title: Front-matterが記述されたSassをstylelintでチェックする
---
[GitHub Pages](https://pages.github.com/)でよくページを作ることがあるのだけれど、そのページで使うSassを[stylelint](https://stylelint.io/)でチェックする方法について。

GitHub Pagesでは[Jekyll](https://jekyllrb.com/)が使用できる。JekyllにSassをコンパイルしてもらうためには、公式ドキュメントの[Assetsのページ](https://jekyllrb.com/docs/assets/)にもあるように、ファイルの先頭に`---`を記述しないといけない。

一方でSassの記法としては`---`があるのは正しくないので、そのままstylelintに渡してしまうと余計なエラーが出力されてしまう。

この[Front-matter](https://jekyllrb.com/docs/frontmatter/)を無視しつつSassをチェックするためのprocessorである[stylelint-processor-ignore-front-matter](https://github.com/sasaplus1/stylelint-processor-ignore-front-matter)を作った。

## 使い方

モジュールをインストールする。

```console
$ npm install stylelint-processor-ignore-front-matter
```

[stylelintの設定](https://stylelint.io/user-guide/configuration/#loading-the-configuration-object)を以下のように記述する。

```json
{
  "processors": "stylelint-processor-ignore-front-matter"
}
```

`_sass/front-matter.scss`として以下のファイルを保存する。

```sass
---
---
body {
  color: #333333;
}
```

stylelintでSassをチェックをする。（ここではルールとして[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)を継承している）

```console
$ ./node_modules/.bin/stylelint ./_sass/front-matter.scss

_sass/front-matter.scss
 4:10  ✖  Expected "#333333" to be "#333"   color-hex-length

```

ちなみに、processorを使用せずにSassをチェックすると以下のようにFront-matterのエラーが余計に出力される。

```
$ ./node_modules/.bin/stylelint ./_sass/front-matter.scss

_sass/front-matter.scss
 1:1   ✖  Unexpected unknown type selector "---"   selector-type-no-unknown
 1:4   ✖  Unexpected " "                           selector-descendant-combinator-no-non-space
 2:1   ✖  Unexpected unknown type selector "---"   selector-type-no-unknown
 2:4   ✖  Unexpected " "                           selector-descendant-combinator-no-non-space
 4:10  ✖  Expected "#333333" to be "#333"          color-hex-length

```