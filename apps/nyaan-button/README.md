# にゃーんボタン

ボタンを押すと画面に「にゃーん」と表示し、ブラウザの音声合成で「にゃーん」と再生する小さなHTMLアプリです。

## 起動方法

`index.html` をブラウザで開きます。

PowerShellから開く場合:

```powershell
Start-Process C:\CodexLab\apps\NyaanButton\index.html
```

## 使用方法

1. 画面中央の「にゃーん」ボタンを押します。
2. メッセージが「にゃーん」に変わります。
3. 音声が再生され、押した回数が増えます。

## フォルダ構成

```text
NyaanButton/
  index.html
  style.css
  script.js
  README.md
```

## 今後の改善案

- 好みの声を選べる設定を追加する
- 音量の調整を追加する
- 複数の鳴き声パターンを追加する
