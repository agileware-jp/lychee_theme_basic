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