"use strict";

// ===== データ定義: 将来はFlask APIやDB取得結果に置き換える想定 =====
const MASTER_LOCATIONS = [
  { code: "HQ", name: "本社" },
  { code: "FK", name: "福岡" },
  { code: "KG", name: "鹿児島" },
  { code: "MZ", name: "宮崎" },
  { code: "OK", name: "沖縄" }
];

const MASTER_STATUSES = ["在庫中", "移動中", "修理中", "不明"];
const TODAY = new Date("2026-07-02T09:00:00");

const carts = [
  { cartNo: "KG-0001", locationCode: "HQ", locationName: "本社", status: "在庫中", lastUpdatedAt: "2026-07-01 09:10", lastUpdatedUser: "田中", usageType: "通常", note: "本社倉庫A列" },
  { cartNo: "KG-0002", locationCode: "HQ", locationName: "本社", status: "移動中", lastUpdatedAt: "2026-06-30 16:45", lastUpdatedUser: "佐藤", usageType: "通常", note: "福岡向け積込済" },
  { cartNo: "KG-0003", locationCode: "HQ", locationName: "本社", status: "修理中", lastUpdatedAt: "2026-05-02 11:20", lastUpdatedUser: "山下", usageType: "通常", note: "キャスター交換待ち、60日超過" },
  { cartNo: "KG-0004", locationCode: "HQ", locationName: "本社", status: "在庫中", lastUpdatedAt: "2026-03-15 10:00", lastUpdatedUser: "中村", usageType: "予備", note: "棚卸重点確認" },
  { cartNo: "KG-0005", locationCode: "FK", locationName: "福岡", status: "在庫中", lastUpdatedAt: "2026-07-01 13:05", lastUpdatedUser: "松本", usageType: "通常", note: "福岡1F" },
  { cartNo: "KG-0006", locationCode: "FK", locationName: "福岡", status: "移動中", lastUpdatedAt: "2026-05-24 08:30", lastUpdatedUser: "井上", usageType: "通常", note: "鹿児島便、入庫確認待ち" },
  { cartNo: "KG-0007", locationCode: "FK", locationName: "福岡", status: "不明", lastUpdatedAt: "2026-03-22 17:40", lastUpdatedUser: "古賀", usageType: "通常", note: "所在確認中" },
  { cartNo: "KG-0008", locationCode: "FK", locationName: "福岡", status: "在庫中", lastUpdatedAt: "2026-05-29 15:15", lastUpdatedUser: "原田", usageType: "予備", note: "30日超過" },
  { cartNo: "KG-0009", locationCode: "KG", locationName: "鹿児島", status: "在庫中", lastUpdatedAt: "2026-07-02 08:50", lastUpdatedUser: "森", usageType: "通常", note: "棚卸済み" },
  { cartNo: "KG-0010", locationCode: "KG", locationName: "鹿児島", status: "移動中", lastUpdatedAt: "2026-06-25 12:00", lastUpdatedUser: "前田", usageType: "通常", note: "宮崎向け" },
  { cartNo: "KG-0011", locationCode: "KG", locationName: "鹿児島", status: "修理中", lastUpdatedAt: "2026-04-01 09:45", lastUpdatedUser: "坂本", usageType: "通常", note: "扉ロック不良" },
  { cartNo: "KG-0012", locationCode: "KG", locationName: "鹿児島", status: "在庫中", lastUpdatedAt: "2026-06-10 14:10", lastUpdatedUser: "西", usageType: "通常", note: "第2倉庫" },
  { cartNo: "KG-0013", locationCode: "MZ", locationName: "宮崎", status: "在庫中", lastUpdatedAt: "2026-07-01 10:25", lastUpdatedUser: "黒木", usageType: "通常", note: "宮崎DC" },
  { cartNo: "KG-0014", locationCode: "MZ", locationName: "宮崎", status: "移動中", lastUpdatedAt: "2026-06-27 18:20", lastUpdatedUser: "甲斐", usageType: "通常", note: "本社戻り" },
  { cartNo: "KG-0015", locationCode: "MZ", locationName: "宮崎", status: "不明", lastUpdatedAt: "2026-02-28 09:00", lastUpdatedUser: "日高", usageType: "通常", note: "90日超過、要確認" },
  { cartNo: "KG-0016", locationCode: "MZ", locationName: "宮崎", status: "在庫中", lastUpdatedAt: "2026-05-31 11:35", lastUpdatedUser: "川越", usageType: "予備", note: "30日超過" },
  { cartNo: "KG-0017", locationCode: "OK", locationName: "沖縄", status: "在庫中", lastUpdatedAt: "2026-07-01 15:30", lastUpdatedUser: "比嘉", usageType: "通常", note: "沖縄倉庫" },
  { cartNo: "KG-0018", locationCode: "OK", locationName: "沖縄", status: "移動中", lastUpdatedAt: "2026-06-29 07:50", lastUpdatedUser: "金城", usageType: "通常", note: "福岡戻り予定" },
  { cartNo: "KG-0019", locationCode: "OK", locationName: "沖縄", status: "修理中", lastUpdatedAt: "2026-03-01 16:15", lastUpdatedUser: "宮城", usageType: "通常", note: "90日超過、修理状況確認" },
  { cartNo: "KG-0020", locationCode: "OK", locationName: "沖縄", status: "在庫中", lastUpdatedAt: "2026-06-12 09:25", lastUpdatedUser: "大城", usageType: "通常", note: "港湾倉庫" }
];

const histories = [
  { historyId: 1016, processType: "棚卸修正", cartNo: "KG-0015", from: "宮崎", to: "宮崎", processedAt: "2026-07-02 08:55", user: "日高", note: "状態不明として棚卸差異登録" },
  { historyId: 1015, processType: "棚卸", cartNo: "KG-0009", from: "-", to: "鹿児島", processedAt: "2026-07-02 08:50", user: "森", note: "現物確認済" },
  { historyId: 1014, processType: "入庫", cartNo: "KG-0001", from: "福岡", to: "本社", processedAt: "2026-07-01 09:10", user: "田中", note: "返却入庫" },
  { historyId: 1013, processType: "出庫", cartNo: "KG-0017", from: "沖縄", to: "-", processedAt: "2026-07-01 15:30", user: "比嘉", note: "通常出庫" },
  { historyId: 1012, processType: "入庫", cartNo: "KG-0005", from: "本社", to: "福岡", processedAt: "2026-07-01 13:05", user: "松本", note: "福岡着" },
  { historyId: 1011, processType: "出庫", cartNo: "KG-0013", from: "宮崎", to: "-", processedAt: "2026-07-01 10:25", user: "黒木", note: "午前便" },
  { historyId: 1010, processType: "移動", cartNo: "KG-0002", from: "本社", to: "福岡", processedAt: "2026-06-30 16:45", user: "佐藤", note: "翌日到着予定" },
  { historyId: 1009, processType: "移動", cartNo: "KG-0018", from: "沖縄", to: "福岡", processedAt: "2026-06-29 07:50", user: "金城", note: "船便" },
  { historyId: 1008, processType: "移動", cartNo: "KG-0006", from: "福岡", to: "鹿児島", processedAt: "2026-06-28 08:30", user: "井上", note: "鹿児島便" },
  { historyId: 1007, processType: "移動", cartNo: "KG-0014", from: "宮崎", to: "本社", processedAt: "2026-06-27 18:20", user: "甲斐", note: "本社戻り" },
  { historyId: 1006, processType: "移動", cartNo: "KG-0010", from: "鹿児島", to: "宮崎", processedAt: "2026-06-25 12:00", user: "前田", note: "宮崎向け" },
  { historyId: 1005, processType: "移動", cartNo: "KG-0021", from: "本社", to: "福岡", processedAt: "2026-06-21 10:40", user: "佐藤", note: "予備車移動" },
  { historyId: 1004, processType: "移動", cartNo: "KG-0022", from: "本社", to: "福岡", processedAt: "2026-06-18 09:15", user: "中村", note: "福岡補充" },
  { historyId: 1003, processType: "移動", cartNo: "KG-0023", from: "福岡", to: "鹿児島", processedAt: "2026-06-15 13:35", user: "井上", note: "繁忙期補充" },
  { historyId: 1002, processType: "修理", cartNo: "KG-0003", from: "本社", to: "本社", processedAt: "2026-05-02 11:20", user: "山下", note: "キャスター交換依頼" },
  { historyId: 1001, processType: "棚卸", cartNo: "KG-0015", from: "-", to: "宮崎", processedAt: "2026-02-28 09:00", user: "日高", note: "以後更新なし" }
];

const inventoryChecks = new Set();

// ===== 集計処理 =====
function parseDateTime(value) {
  return new Date(value.replace(" ", "T"));
}

function elapsedDays(fromDateText, baseDate = TODAY) {
  const diffMs = baseDate.getTime() - parseDateTime(fromDateText).getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

function withElapsedDays(items = carts) {
  return items.map(cart => ({ ...cart, days: elapsedDays(cart.lastUpdatedAt) }));
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    const value = item[key];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function buildOverallSummary() {
  const enriched = withElapsedDays();
  const total = enriched.length;
  const repair = enriched.filter(cart => cart.status === "修理中").length;
  const unknown = enriched.filter(cart => cart.status === "不明").length;
  const stale90 = enriched.filter(cart => cart.days >= 90).length;
  const moving30 = enriched.filter(cart => cart.status === "移動中" && cart.days >= 30).length;

  return [
    { label: "総保有台数", value: total, note: "登録されている全台数", level: "normal" },
    { label: "稼働中台数", value: total - repair - unknown, note: "在庫中 + 移動中", level: "normal" },
    { label: "修理中台数", value: repair, note: "修理・点検対象", level: repair > 0 ? "warning" : "normal" },
    { label: "不明台数", value: unknown, note: "所在確認が必要", level: unknown > 0 ? "danger" : "normal" },
    { label: "未更新90日以上", value: stale90, note: "危険判定", level: stale90 > 0 ? "danger" : "normal" },
    { label: "移動中30日超", value: moving30, note: "入庫確認待ち", level: moving30 > 0 ? "warning" : "normal" }
  ];
}

function buildActionSummary() {
  const enriched = withElapsedDays();
  return [
    { label: "未更新90日以上", value: enriched.filter(cart => cart.days >= 90).length, note: "所在・状態を優先確認", level: "danger" },
    { label: "移動中30日超", value: enriched.filter(cart => cart.status === "移動中" && cart.days >= 30).length, note: "入庫漏れや滞留を確認", level: "warning" },
    { label: "修理中60日超", value: enriched.filter(cart => cart.status === "修理中" && cart.days >= 60).length, note: "修理完了予定を確認", level: "warning" },
    { label: "状態不明", value: enriched.filter(cart => cart.status === "不明").length, note: "現物・履歴を照合", level: "danger" }
  ].map(item => ({ ...item, level: item.value > 0 ? item.level : "normal" }));
}

function buildLocationSummary() {
  const enriched = withElapsedDays();
  return MASTER_LOCATIONS.map(location => {
    const items = enriched.filter(cart => cart.locationCode === location.code);
    const repair = items.filter(cart => cart.status === "修理中").length;
    const unknown = items.filter(cart => cart.status === "不明").length;
    const stale30 = items.filter(cart => cart.days >= 30).length;
    const stale90 = items.filter(cart => cart.days >= 90).length;
    const attention = repair + unknown + stale30;

    return {
      ...location,
      count: items.length,
      attention,
      repair,
      unknown,
      stale30,
      stale90,
      level: stale90 > 0 || unknown > 0 ? "danger" : repair > 0 || stale30 > 0 ? "warning" : "normal"
    };
  });
}

function buildStatusSummary() {
  const counts = countBy(carts, "status");
  return MASTER_STATUSES.map(status => ({ status, count: counts[status] || 0 }));
}

function getStaleLevel(days) {
  if (days >= 90) return { className: "stale-90", badgeClass: "badge-stale-90", label: "危険" };
  if (days >= 60) return { className: "stale-60", badgeClass: "badge-stale-60", label: "警戒" };
  return { className: "stale-30", badgeClass: "badge-stale-30", label: "注意" };
}

function getStaleCarts() {
  return withElapsedDays()
    .filter(cart => cart.days >= 30)
    .sort((a, b) => b.days - a.days);
}

function getLatestHistories(limit = 20) {
  return [...histories]
    .sort((a, b) => parseDateTime(b.processedAt) - parseDateTime(a.processedAt))
    .slice(0, limit);
}

function getInventoryCarts(locationCode) {
  return carts
    .filter(cart => cart.locationCode === locationCode)
    .sort((a, b) => a.cartNo.localeCompare(b.cartNo));
}

function buildRouteRanking(limit = 5) {
  const routeCounts = histories
    .filter(history => history.from !== "-" && history.to !== "-" && history.from !== history.to)
    .reduce((acc, history) => {
      const key = `${history.from} → ${history.to}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

  return Object.entries(routeCounts)
    .map(([route, count]) => ({ route, count }))
    .sort((a, b) => b.count - a.count || a.route.localeCompare(b.route))
    .slice(0, limit);
}

// ===== 描画処理 =====
function statusBadge(status) {
  const classMap = {
    "在庫中": "badge-stock",
    "移動中": "badge-moving",
    "修理中": "badge-repair",
    "不明": "badge-unknown"
  };
  return `<span class="badge badge-status ${classMap[status] || "badge-unknown"}">${status}</span>`;
}

function processBadge(processType) {
  const classMap = {
    "出庫": "badge-process-out",
    "入庫": "badge-process-in",
    "移動": "badge-process-move",
    "棚卸": "badge-process-inventory",
    "棚卸修正": "badge-process-inventory",
    "修理": "badge-process-repair"
  };
  return `<span class="badge badge-process ${classMap[processType] || "badge-unknown"}">${processType}</span>`;
}

function renderScreenTimestamp() {
  document.getElementById("screenUpdatedAt").textContent = "画面基準日: 2026-07-02 09:00";
}

function renderActionSummary() {
  const html = buildActionSummary().map(item => `
    <div class="action-tile ${item.level === "danger" ? "is-danger" : item.level === "warning" ? "is-warning" : ""}">
      <div class="action-label">${item.label}</div>
      <div class="action-value">${item.value}</div>
      <div class="action-note">${item.value === 0 ? "対象なし" : item.note}</div>
    </div>
  `).join("");
  document.getElementById("actionSummary").innerHTML = html;
}

function renderOverallSummary() {
  const html = buildOverallSummary().map(item => `
    <div class="metric-tile ${item.level === "danger" ? "is-danger" : item.level === "warning" ? "is-warning" : ""}">
      <div class="metric-label">${item.label}</div>
      <div class="metric-value">${item.value}</div>
      <div class="metric-note">${item.note}</div>
    </div>
  `).join("");
  document.getElementById("overallSummary").innerHTML = html;
}

function miniStat(label, value, level = "normal") {
  const className = level === "danger" ? "is-danger" : level === "warning" ? "is-warning" : "";
  return `<div class="mini-stat ${className}"><span>${label}</span><strong>${value}</strong></div>`;
}

function renderLocationSummary() {
  const html = buildLocationSummary().map(location => {
    const tileClass = location.level === "danger" ? "has-danger" : location.level === "warning" ? "has-warning" : "";
    const attentionClass = location.level === "danger" ? "is-danger" : location.level === "warning" ? "is-warning" : "";
    return `
      <div class="location-tile ${tileClass}">
        <div class="location-label">${location.name}</div>
        <div class="location-main">
          <strong class="location-count">${location.count}</strong>
          <span class="text-secondary small">保有台数</span>
        </div>
        <div class="attention-count ${attentionClass}">要注意 ${location.attention}件</div>
        <details>
          <summary>詳細を見る</summary>
          <div class="location-details">
            ${miniStat("修理中", location.repair, location.repair > 0 ? "warning" : "normal")}
            ${miniStat("不明", location.unknown, location.unknown > 0 ? "danger" : "normal")}
            ${miniStat("30日以上", location.stale30, location.stale30 > 0 ? "warning" : "normal")}
            ${miniStat("90日以上", location.stale90, location.stale90 > 0 ? "danger" : "normal")}
          </div>
        </details>
      </div>
    `;
  }).join("");
  document.getElementById("locationSummary").innerHTML = html;
}

function renderStatusSummary() {
  const html = buildStatusSummary().map(item => `
    <div class="metric-tile">
      <div class="metric-label">${item.status}</div>
      <div class="metric-value">${item.count}</div>
      <div class="metric-note">${statusBadge(item.status)}</div>
    </div>
  `).join("");
  document.getElementById("statusSummary").innerHTML = html;
}

function renderStaleCarts() {
  const rows = getStaleCarts().map(cart => {
    const level = getStaleLevel(cart.days);
    return `
      <tr class="${level.className}">
        <td class="fw-semibold">${cart.cartNo}</td>
        <td>${cart.locationName}</td>
        <td>${cart.lastUpdatedAt}</td>
        <td>${statusBadge(cart.status)}</td>
        <td><span class="badge badge-stale ${level.badgeClass}">${level.label}</span></td>
        <td class="text-end stale-days">${cart.days}日</td>
      </tr>
    `;
  }).join("");
  document.getElementById("staleCartTable").innerHTML = rows;
}

function renderHistoryTable() {
  const rows = getLatestHistories(20).map(history => `
    <tr>
      <td>${history.processedAt}</td>
      <td>${processBadge(history.processType)}</td>
      <td class="fw-semibold">${history.cartNo}</td>
      <td>${history.from}</td>
      <td>${history.to}</td>
      <td>${history.user}</td>
      <td>${history.note}</td>
    </tr>
  `).join("");
  document.getElementById("historyTable").innerHTML = rows;
}

function renderRouteRanking() {
  const html = buildRouteRanking(5).map((item, index) => `
    <div class="ranking-item">
      <span class="rank-no">${index + 1}</span>
      <div>
        <div class="route-name">${item.route}</div>
        <div class="route-note">履歴データから集計</div>
      </div>
      <strong>${item.count}件</strong>
    </div>
  `).join("");
  document.getElementById("routeRanking").innerHTML = html || "<div class=\"text-secondary small\">対象となる拠点間移動はありません。</div>";
}

function renderLocationOptions() {
  const select = document.getElementById("inventoryLocation");
  select.innerHTML = MASTER_LOCATIONS.map(location => (
    `<option value="${location.code}">${location.name}</option>`
  )).join("");
  select.value = "HQ";
}

function renderInventoryTable() {
  const locationCode = document.getElementById("inventoryLocation").value;
  const targetCarts = getInventoryCarts(locationCode);
  const rows = targetCarts.map(cart => {
    const checked = inventoryChecks.has(cart.cartNo) ? "checked" : "";
    return `
      <tr>
        <td class="text-center">
          <input class="form-check-input inventory-check" type="checkbox" value="${cart.cartNo}" ${checked} aria-label="${cart.cartNo}を確認済みにする">
        </td>
        <td class="fw-semibold">${cart.cartNo}</td>
        <td>${cart.locationName}</td>
        <td>${statusBadge(cart.status)}</td>
        <td>${cart.lastUpdatedAt}</td>
        <td>${cart.note}</td>
      </tr>
    `;
  }).join("");
  document.getElementById("inventoryTable").innerHTML = rows;
  updateInventoryCounts();
}

function updateInventoryCounts() {
  const locationCode = document.getElementById("inventoryLocation").value;
  const targetCarts = getInventoryCarts(locationCode);
  const checked = targetCarts.filter(cart => inventoryChecks.has(cart.cartNo)).length;
  document.getElementById("checkedCount").textContent = checked;
  document.getElementById("uncheckedCount").textContent = targetCarts.length - checked;
}

// ===== イベント処理 =====
function bindTabEvents() {
  document.querySelectorAll(".view-tab").forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tabTarget;
      document.querySelectorAll(".view-tab").forEach(tab => tab.classList.toggle("is-active", tab === button));
      document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.toggle("is-active", panel.id === targetId));
    });
  });
}

function bindInventoryEvents() {
  document.getElementById("inventoryLocation").addEventListener("change", renderInventoryTable);

  document.getElementById("inventoryTable").addEventListener("change", event => {
    if (!event.target.classList.contains("inventory-check")) {
      return;
    }

    if (event.target.checked) {
      inventoryChecks.add(event.target.value);
    } else {
      inventoryChecks.delete(event.target.value);
    }
    updateInventoryCounts();
  });
}

function initDashboard() {
  renderScreenTimestamp();
  renderActionSummary();
  renderLocationSummary();
  renderStaleCarts();
  renderHistoryTable();
  renderOverallSummary();
  renderStatusSummary();
  renderRouteRanking();
  renderLocationOptions();
  renderInventoryTable();
  bindTabEvents();
  bindInventoryEvents();
}

document.addEventListener("DOMContentLoaded", initDashboard);

window.KagoCartDashboard = {
  carts,
  histories,
  buildOverallSummary,
  buildActionSummary,
  buildLocationSummary,
  buildStatusSummary,
  buildRouteRanking,
  getStaleCarts,
  getLatestHistories,
  getInventoryCarts
};
