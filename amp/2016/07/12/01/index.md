---
layout: amp
tags: virtualbox
title: VirtualBoxでのホスト・ゲスト間のアクセスについて
---
VirtualBoxでのホスト・ゲスト間をアクセスする方法について。

## ゲストからホストにアクセスする

[VirtualBox guest OS accessing local server on host OS](http://superuser.com/questions/144453/virtualbox-guest-os-accessing-local-server-on-host-os/144961#144961)

NATのアダプタを持ったゲストからホストにアクセスする。

特に設定は必要なく`http://10.0.2.2`にアクセスすればホストにアクセスできる。

## ホストからゲストにアクセスする

[VirtualBox ゲストOSのWebサーバに外部から接続する](http://undersourcecode.hatenablog.com/entry/2013/08/11/212246)

ポートフォワーディングによりホストからゲストにアクセスする。