---
layout: amp
tags: ci circle yaml
title: YAMLのファイルに直接シェルスクリプトを書く
---
[Circle CI](https://circleci.com/)を使ってデプロイするという仕組みを作る機会があった。

デプロイは簡単なコマンドなので、デプロイ用のシェルスクリプトは別途用意せず、circle.ymlへ以下のように書いた。

```yaml
deployment:
  production:
    branch: master
    commands:
      - npm run build
      - >
        [ -n "$(git status --short)" ]
        &&
        (
        git add .
        &&
        git commit -m "built"
        &&
        git push origin master
        )
        ||
        true
```

YAMLで`>`を使ってコマンドを読みやすく書いた。`>`を使うと改行が半角スペースに変換される。インデントは1段だけで、2段にしてしまうと別の解釈をされてしまうので揃えて書いている。

書いた後に思ったのだけど、デプロイ用のシェルスクリプトを用意した方が良かったか。
