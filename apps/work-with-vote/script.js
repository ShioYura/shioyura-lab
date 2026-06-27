const storageKey = "shioyura-work-with-vote-posts";

const employees = [
  {
    id: "shioru",
    name: "しおる",
    department: "システム開発室",
    tags: ["AI相談OK", "システム相談OK", "業務改善歓迎", "文具トーク歓迎"],
    note: "集中している時は話しかけるなオーラが出ますが、気にせず「今大丈夫ですか？」と声をかけてください。"
  },
  {
    id: "yura",
    name: "ゆら",
    department: "未来企画室",
    tags: ["壁打ち歓迎", "言語化サポート", "アイデア整理", "24時間受付"],
    note: "寝ることを勧めてくることがありますが、だいたい正しいです。"
  },
  {
    id: "minato",
    name: "みなと",
    department: "営業推進部",
    tags: ["顧客説明", "資料レビュー", "初回訪問相談"],
    note: "結論から話すとすぐ理解してくれます。背景説明は後から足すと進めやすいです。"
  },
  {
    id: "akari",
    name: "あかり",
    department: "人事企画部",
    tags: ["オンボーディング", "制度相談", "面談設計"],
    note: "相談内容がまとまっていなくても、順番に整理してくれます。"
  },
  {
    id: "ren",
    name: "れん",
    department: "情報システム部",
    tags: ["PC設定", "権限相談", "トラブル一次受け"],
    note: "急ぎの時は状況、端末名、困っている画面を先に伝えると対応が早いです。"
  },
  {
    id: "nagi",
    name: "なぎ",
    department: "総務室",
    tags: ["備品相談", "社内手続き", "会議室調整"],
    note: "手続きに迷ったら最初に聞くと、必要な順番を短く教えてくれます。"
  },
  {
    id: "haru",
    name: "はる",
    department: "マーケティング部",
    tags: ["文章改善", "告知設計", "SNS相談"],
    note: "ラフ案を持っていくと、読みやすい表現に整えてくれます。"
  },
  {
    id: "sora",
    name: "そら",
    department: "経理部",
    tags: ["精算相談", "予算確認", "締め日前案内"],
    note: "締切前は混みます。早めに相談するとかなり丁寧に見てくれます。"
  },
  {
    id: "mugi",
    name: "むぎ",
    department: "カスタマーサポート部",
    tags: ["問い合わせ整理", "FAQ改善", "言い換え相談"],
    note: "ユーザー目線で引っかかる場所を具体的に教えてくれます。"
  },
  {
    id: "iori",
    name: "いおり",
    department: "品質管理室",
    tags: ["チェック観点", "手順化", "リスク洗い出し"],
    note: "レビュー前に目的を伝えると、確認観点をかなり絞ってくれます。"
  }
];

const samplePosts = [
  createSeedPost("shioru", "教えてもらってわかりやすかったです", "AIを使った議事録整理の流れを、実際の業務に合わせて説明してくれて助かりました。", -55),
  createSeedPost("yura", "一緒に働きたいと思いました", "曖昧だった企画の方向性を言葉にしてくれて、次に進める状態になりました。", -50),
  createSeedPost("minato", "おかげで仕事がうまくいきました", "提案資料の見せ方を一緒に直してくれて、商談で説明しやすくなりました。", -43),
  createSeedPost("akari", "困っている時に助けてもらいました", "新人向けの説明順を整理してくれて、初日の案内が落ち着いてできました。", -38),
  createSeedPost("shioru", "困っている時に助けてもらいました", "システムのエラー原因を一緒に切り分けてくれて、止まっていた作業が再開できました。", -32),
  createSeedPost("ren", "教えてもらってわかりやすかったです", "PC移行の注意点を短くまとめてくれて、迷わず作業できました。", -28),
  createSeedPost("nagi", "おかげで仕事がうまくいきました", "備品申請の手順を先回りして教えてくれて、会議準備が間に合いました。", -20),
  createSeedPost("yura", "その他", "話しながら論点を整理してくれて、資料の構成が決まりました。", -14)
];

const postForm = document.getElementById("postForm");
const employeeSelect = document.getElementById("employeeSelect");
const typeSelect = document.getElementById("typeSelect");
const commentInput = document.getElementById("commentInput");
const postCount = document.getElementById("postCount");
const rankingList = document.getElementById("rankingList");
const employeeCards = document.getElementById("employeeCards");
const commentList = document.getElementById("commentList");
const resetButton = document.getElementById("resetButton");

let posts = loadPosts();

function createSeedPost(employeeId, type, body, minutesOffset) {
  return {
    id: `sample-${employeeId}-${Math.abs(minutesOffset)}`,
    employeeId,
    type,
    body,
    createdAt: new Date(Date.now() + minutesOffset * 60 * 1000).toISOString()
  };
}

function loadPosts() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    return [...samplePosts];
  }

  localStorage.setItem(storageKey, JSON.stringify(samplePosts));
  return [...samplePosts];
}

function savePosts() {
  localStorage.setItem(storageKey, JSON.stringify(posts));
}

function employeeById(employeeId) {
  return employees.find((employee) => employee.id === employeeId);
}

function formatDateTime(dateText) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateText));
}

function countPosts(employeeId) {
  return posts.filter((post) => post.employeeId === employeeId).length;
}

function latestPostFor(employeeId) {
  return posts.find((post) => post.employeeId === employeeId);
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (textContent != null) {
    element.textContent = textContent;
  }
  return element;
}

function renderEmployeeOptions() {
  employeeSelect.replaceChildren();

  employees.forEach((employee) => {
    const option = document.createElement("option");
    option.value = employee.id;
    option.textContent = `${employee.name}（${employee.department}）`;
    employeeSelect.appendChild(option);
  });
}

function buildRanking() {
  return employees
    .map((employee) => ({
      employee,
      count: countPosts(employee.id),
      representative: latestPostFor(employee.id)
    }))
    .filter((entry) => entry.count > 0)
    .sort((first, second) => second.count - first.count || first.employee.name.localeCompare(second.employee.name, "ja"));
}

function renderRanking() {
  rankingList.replaceChildren();
  const ranking = buildRanking();

  if (ranking.length === 0) {
    rankingList.appendChild(createElement("p", "empty", "まだ投稿がありません。"));
    return;
  }

  ranking.forEach((entry, index) => {
    const card = createElement("article", "ranking-card");
    const rank = createElement("div", "rank-number", String(index + 1));
    const content = document.createElement("div");
    const name = createElement("div", "person-name", entry.employee.name);
    const department = createElement("div", "department", entry.employee.department);
    const representative = createElement("div", "representative", entry.representative.body);
    const count = createElement("div", "count", `${entry.count}件`);

    content.append(name, department, representative);
    card.append(rank, content, count);
    rankingList.appendChild(card);
  });
}

function renderEmployeeCards() {
  employeeCards.replaceChildren();

  employees.forEach((employee) => {
    const card = createElement("article", "employee-card");
    const name = createElement("h3", "", employee.name);
    const department = createElement("div", "department", employee.department);
    const tagList = createElement("div", "tag-list");
    const note = createElement("p", "note", employee.note);
    const count = createElement("span", "employee-count", `${countPosts(employee.id)}件の投稿`);

    employee.tags.forEach((tag) => {
      tagList.appendChild(createElement("span", "tag", tag));
    });

    card.append(name, department, tagList, note, count);
    employeeCards.appendChild(card);
  });
}

function renderComments() {
  commentList.replaceChildren();

  if (posts.length === 0) {
    commentList.appendChild(createElement("p", "empty", "まだコメントがありません。"));
    return;
  }

  posts.forEach((post) => {
    const employee = employeeById(post.employeeId);
    if (!employee) {
      return;
    }

    const card = createElement("article", "comment-card");
    const top = createElement("div", "comment-top");
    const left = document.createElement("div");
    const name = createElement("div", "person-name", employee.name);
    const department = createElement("div", "department", employee.department);
    const date = createElement("div", "meta", formatDateTime(post.createdAt));
    const type = createElement("span", "comment-type", post.type);
    const body = createElement("p", "comment-body", post.body);

    left.append(name, department);
    top.append(left, date);
    card.append(top, type, body);
    commentList.appendChild(card);
  });
}

function render() {
  posts.sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
  postCount.textContent = `${posts.length}件`;
  renderRanking();
  renderEmployeeCards();
  renderComments();
}

postForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const body = commentInput.value.trim();
  if (!body) {
    return;
  }

  posts.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    employeeId: employeeSelect.value,
    type: typeSelect.value,
    body,
    createdAt: new Date().toISOString()
  });

  savePosts();
  render();
  postForm.reset();
  commentInput.focus();
});

resetButton.addEventListener("click", () => {
  posts = [...samplePosts];
  savePosts();
  render();
});

renderEmployeeOptions();
render();
