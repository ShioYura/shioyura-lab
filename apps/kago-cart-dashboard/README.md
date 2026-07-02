# かご台車管理ダッシュボード HTML試作版

物流向け「かご台車管理システム」の画面モックです。
Python、Flask、DBは使わず、HTML/CSS/JavaScriptだけで動作します。
現在のデザインは、近未来SF映画に登場する宇宙港の貨物管理端末をイメージしたFuturistic HUDテーマです。

## 起動方法

PowerShellで以下を実行します。

```powershell
Start-Process C:\CodexLab\apps\kago-cart-dashboard\index.html
```

## 画面内容

- ダッシュボード / 棚卸確認のタブ切替
- 全体サマリー
- 要対応カード
- 拠点別 保有台数と要注意件数
- 拠点別 修理中、不明、未更新30日以上、未更新90日以上の折りたたみ詳細
- 長期間未更新のかご車一覧 30日、60日、90日で色分け
- 最新履歴一覧 処理区分バッジつき、スクロール表示
- 折りたたみ補助情報
  - 全体サマリー
  - 状態別集計
  - 拠点間移動ランキング
  - 状態や判定条件の説明
- 棚卸確認タブ
  - 拠点選択
  - 棚卸対象一覧
- 棚卸チェック済み件数、未チェック件数

## 実装メモ

- `index.html` は画面構造を定義しています。
- `style.css` は業務画面向けの見た目を定義しています。
- 黒背景、シアンブルーのHUD表現、半透明パネル、スキャンライン、レーダー風装飾は `style.css` に集約しています。
- `app.js` はデータ定義、集計処理、描画処理、イベント処理を定義しています。
- サンプルデータは `app.js` 内の `carts` と `histories` に定義しています。
- 集計処理は `buildOverallSummary`、`buildActionSummary`、`buildLocationSummary`、`buildStatusSummary`、`buildRouteRanking`、`getStaleCarts` に分けています。
- 描画処理は `render...` 関数に分けています。
- 将来Flask化する場合は、データ取得部分をAPIレスポンスに置き換え、集計処理をPython側またはSQL側へ移す想定です。
