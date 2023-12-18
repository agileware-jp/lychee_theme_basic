# 開発
1. `npm install`
2. `npm run watch`

# ビルド
1. `npm install`
2. `npm run build`

# リリース用ファイルの生成
1. `npm run build`
2. `lychee-theme_Basic` ディレクトリを作成
3. `javascripts` と `stylesheets` を `lychee-theme_Basic` にコピー
4. `zip -r lychee-theme_Basic.zip lychee-theme_Basic/` でzipファイルを作成
5. githubのReleasesに追加

## リリース用ファイル生成についてメモ
- このテーマに必要なものは `stylesheets` と `javascripts` だけなので、その2つをzipで圧縮
- リポジトリ名とテーマディレクトリ名が少し違うので注意（lycheeテーマに並んだときに目立つように、あえてlycheeとthemeの区切りをハイフンにしています）
- このリポジトリはテーマ"開発用"なので、リリース物は別で生成し、Releasesに登録する

## cssの構成についての注意
すべてのcss（context_menuやresponsive、jstoolbar等）は `application.css` に集約している。  
しかし、 `responsive.css` や `context_menu.css` は `application.css` とは別で用意されているため、 `application.css` 側で上書きするには「important」等を使用し詳細度を高めて上書きする必要がある。
それをすると、プラグイン側から上書きしたりすることが困難になるため、 `application.css` と同階層に空のcontext_menuやresponsive、jstoolbarを用意し、デフォルトのスタイルを完全にリセットし、 `application.css` 側からの上書きを可能にする。