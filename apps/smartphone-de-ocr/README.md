# スマホdeOCR

スマホで撮影した書類、メモ、ホワイトボードなどの画像から、OCRでテキストを抽出する静的Webアプリです。
抽出したテキストは画面上で編集でき、コピーしてメールやメモ帳へ貼り付けられます。

## 使い方

1. `index.html` をブラウザで開きます。
2. 「カメラで撮影 / 画像を選択」から画像を撮影、または画像ファイルを選択します。
3. 画像プレビューを確認します。
4. 「OCRを実行」を押します。
5. 読み取り中は進捗が表示されます。
6. 抽出テキストがテキストエリアに表示されます。
7. 必要に応じてテキストを編集し、「コピー」を押します。
8. 「クリア」で画像と抽出テキストをリセットできます。

## ローカルでの起動方法

PowerShellから開く場合:

```powershell
Start-Process C:\CodexLab\apps\smartphone-de-ocr\index.html
```

または、`index.html` をブラウザで直接開いてください。

## GitHub Pagesで公開する場合の注意

このアプリはHTML / CSS / JavaScriptだけで動作するため、GitHub Pagesで公開できます。

公開手順:

1. `smartphone-de-ocr` フォルダ内の `index.html`、`style.css`、`script.js`、`README.md` をGitHubリポジトリに配置します。
2. GitHubで対象リポジトリを開きます。
3. `Settings` を開きます。
4. 左メニューの `Pages` を開きます。
5. `Build and deployment` の `Source` で `Deploy from a branch` を選びます。
6. `Branch` で `main`、公開元フォルダで配置先に合わせて `/ (root)` または `/docs` を選びます。

スマホのカメラ起動はブラウザとOSの制約を受けます。
一般に、カメラ機能はHTTPS環境で安定して動作します。GitHub PagesはHTTPSで配信されるため、ローカルの `file://` よりスマホ実機では安定する場合があります。
カメラ起動が使えない場合でも、画像ファイル選択で利用できます。

## OCR精度に関する注意

OCRにはブラウザ上で動作するTesseract.jsを使用しています。
日本語と英数字を `jpn+eng` で読み取りますが、精度は画像の明るさ、ピント、文字サイズ、傾き、背景の影響を受けます。
読み取り結果は完璧ではないため、テキストエリアで編集してから利用してください。

## 通信とデータの扱い

入力画像や抽出テキストを外部APIや独自サーバーへ送信しません。
OCR処理はブラウザ上で実行します。

ただし、Tesseract.js本体と日本語・英語のOCR用データはCDNから読み込まれます。
初回利用時やキャッシュがない場合は、インターネット接続が必要です。
APIキーは不要です。

## ファイル構成

```text
smartphone-de-ocr/
  index.html
  style.css
  script.js
  README.md
```
