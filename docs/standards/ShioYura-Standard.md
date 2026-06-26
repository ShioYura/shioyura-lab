# ShioYura Standard

> Development Standard for ShioYura Lab

---

## Version

* Version : 1.0
* Created : 2026-06-26
* Author : ShioYura Lab

---

# Purpose

本ドキュメントは、しおゆら研究所で開発するすべてのアプリケーションの共通ルールを定義する。

目的は、

* 小さく作る
* 早く試す
* 楽しみながら改善する

ことである。

まず動くものを作り、必要に応じて育てていくことを基本方針とする。

---

# Development Philosophy

しおゆら研究所では、

**「言葉で説明するより、まず触ってもらう」**

を大切にする。

完成品ではなく、

動くプロトタイプを素早く作ることを優先する。

---

# Application Requirements

アプリごとの仕様は毎回別途指示する。

本ドキュメントでは共通ルールのみ定義する。

---

# Standard Folder Structure

GitHub Repository

```
shioyura-lab
```

基本構成

```
apps/
    app-name/
        index.html
        style.css
        script.js
        README.md
```

アプリは必ず `apps/アプリ名/` 配下に作成する。

---

# Development Policy

以下を基本とする。

* HTML
* CSS
* JavaScript

まずは最小構成で完成させる。

スマートフォンとPCの両方で快適に利用できるレスポンシブデザインを採用する。

---

# Security

データは可能な限りブラウザ内だけで処理する。

以下を原則禁止とする。

* fetch()
* Ajax
* WebSocket
* その他、外部サーバーへ送信する処理

外部APIを利用する場合は、その目的を説明してから実装する。

---

# Data Policy

公開版では

* 架空データ
* 匿名化データ

のみ使用する。

会社データをGitHubへアップロードしない。

CSVはブラウザ内だけで読み込み、外部へ送信しない構成を基本とする。

ローカル保存が必要な場合は、

* LocalStorage
* SQLite

を利用する。

---

# GitHub

Repository

```
shioyura-lab
```

GitHub Pagesで公開可能な構成を基本とする。

公開デモはブラウザのみで動作する構成を優先する。

---

# README

各アプリにはREADME.mdを作成する。

内容は以下を含める。

* アプリ概要
* 起動方法
* 使用方法
* フォルダ構成
* 今後の改善案

---

# Completion Report

開発完了後は以下を報告する。

* 作成ファイル一覧
* 実行方法
* 改善案
* 今後追加できそうな機能

---

# Design Principles

画面はシンプルで分かりやすくする。

派手な装飾よりも、

「すぐ動く」

ことを優先する。

---

# Motto

> Small Apps.
>
> Big Ideas.
>
> Build with Curiosity.

---

# Change Log

## Version 1.0 (2026-06-26)

* 初版作成
* Webアプリ開発標準を策定
* GitHub Pages公開を前提とした構成を採用
* ブラウザ内処理を基本方針とした
