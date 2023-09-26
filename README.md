# 環境の立ち上げ
1. `npm install`
2. `npm run watch`

# リリース用ファイルの生成
1. `npm run build`
2. `javascripts` と `stylesheets` をzipで圧縮
3. zipファイル名を`lychee-theme_Basic` に変更
4. githubのReleasesに追加

## リリース用ファイル生成についてメモ
- このテーマに必要なものは `stylesheets` と `javascripts` だけなので、その2つをzipで圧縮
- ディレクトリ名がそのままテーマ名になるので、圧縮後にディレクトリ名を変更する
- このリポジトリはテーマ"開発用"なので、リリース物は別で生成する

## cssの構成についての注意
すべてのcss（context_menuやresponsive、jstoolbar等）は `application.css` に集約している。  
しかし、 `responsive.css` や `context_menu.css` は `application.css` とは別で用意されているため、 `application.css` 側で上書きするには「important」等を使用し詳細度を高めて上書きする必要がある。
それをすると、プラグイン側から上書きしたりすることが困難になるため、 `application.css` と同階層に空のcontext_menuやresponsive、jstoolbarを用意し、デフォルトのスタイルを完全にリセットし、 `application.css` 側からの上書きを可能にする。