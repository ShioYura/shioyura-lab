# 一緒に働きたい人投票アプリ

社内ポータル向けの試作ミニアプリです。
「この人のおかげで仕事がうまくいった」「教えてもらってわかりやすかった」などのポジティブなコメントを投稿し、名前ごとに集計・ランキング表示します。

このアプリは評価制度や査定のためのものではありません。
新人や他部署の人が、誰に声をかけやすいか、誰がどんなことで頼られているかを知るための、感謝と相談しやすさを可視化する試作アプリです。

## 使い方

1. `index.html` をブラウザで開きます。
2. 名前、コメント種別、コメント本文を入力します。
3. 「投稿する」を押すと、ランキング、社員カード、コメント一覧に即反映されます。
4. 投稿データはブラウザの `localStorage` に保存されます。

PowerShellから開く場合:

```powershell
Start-Process C:\CodexLab\apps\work-with-vote\index.html
```

## サンプルデータ

社員データと初期コメントはすべて架空です。
実在の人物、部署、評価情報ではありません。

含まれる社員データ:

- しおる: システム開発室
- ゆら: 未来企画室
- その他、架空社員8名

## 注意点

- ネガティブ投票、低評価、減点、ワーストランキングはありません。
- 投稿は感謝、助け合い、相談しやすさの記録を目的にしています。
- 試作版のため、データ保存はブラウザの `localStorage` のみです。
- 外部APIやデータベース接続は使っていません。

## GitHub Pagesでの公開方法

1. この `work-with-vote` フォルダ内の `index.html`、`style.css`、`script.js`、`README.md` をGitHubリポジトリに配置します。
2. GitHubで対象リポジトリを開きます。
3. `Settings` を開きます。
4. 左メニューの `Pages` を開きます。
5. `Build and deployment` の `Source` で `Deploy from a branch` を選びます。
6. `Branch` で `main`、公開元フォルダで配置先に合わせて `/ (root)` または `/docs` を選びます。
7. 保存後、GitHub PagesのURLが表示されるまで待ちます。

このアプリはHTML/CSS/JavaScriptだけで動くため、GitHub Pagesで公開できます。

## ファイル構成

```text
work-with-vote/
  index.html
  style.css
  script.js
  README.md
```
