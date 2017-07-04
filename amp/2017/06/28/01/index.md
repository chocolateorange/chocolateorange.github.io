---
layout: amp
tags: javascript html
title: formの中にある要素にname属性の値でアクセスする
---
formの中にある要素を取得する方法をよく忘れるのでメモしておく。

```html
<form name="form1">
  <input name="text1">
</form>
```

上記のようにマークアップされていた場合、`form`要素を取得するには以下のコードでアクセスできる。

```js
document.form1;
```

`input`要素を取得するには以下のコードでアクセスできる。

```js
document.form1.elements.text1;
```

ドキュメント内のすべての`form`要素を取得したければ、以下のコードでアクセスできる。

```js
document.forms;
```
