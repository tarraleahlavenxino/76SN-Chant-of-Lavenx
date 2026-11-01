// 这里是档案数据。以后新增条目时，按相同格式添加一组 { ... } 即可。
// 注意：下面的简介是占位符，不代表《踏霞之歌》的正式设定。
const records = [
  {
    id: "Seprentta Seth",
    title: "赛普轮塔·塞特",
    category: "characters",
    summary: "美味介绍"
  },
  {
    id: "Tarraleah Lavenx",
    title: "塔勒利亚·拉雯科斯",
    category: "characters",
    summary: "美味介绍"
  },
  {
    id: "Halenium Lavenx",
    title: "海莱妮娅·拉雯科斯",
    category: "characters",
    summary: "美味介绍"
  },
  {
    id: "",
    title: "安德鲁",
    category: "characters",
    summary: "美味介绍"
  },
  {
    id: "Federal Republic of Luminous",
    title: "卢密勒斯联邦共和国",
    category: "world",
    summary: "所谓“世界的心脏”。原址是知世界中心的一块月牙型的岛屿，后来在高度发展中蜕变为海上的巨大垂直生长型超级大国。与其说是国家，不如说卢密勒斯是一个多方高科技势力相互制衡的一块混乱地。"
  },
  {
    id: "The Empire of Diverlands",
    title: "戴维尔帝国",
    category: "world",
    summary: "“我们的心跳随大海，潮起潮落。” 位于踏霞大陆西部浩瀚波涛上的明珠，以天空为弦，借大海作弓，在通透热烈的阳光下奏唱着蔚蓝的颂歌。"
  },
  {
    id: "DOC-001（暂定）",
    title: "未命名文献",
    category: "documents",
    summary: "【占位符】这里将来可以放故事、文献或历史年表。"
  }
];

const pages = ["home", "characters", "world", "documents", "article"];
const categoryNames = {
  characters: "PERSONNEL FILE",
  world: "WORLD RECORD",
  documents: "ARCHIVED DOCUMENT"
};
let previousPage = "characters";

function showPage(pageName) {
  if (!pages.includes(pageName)) return;
  pages.forEach(name => {
    document.getElementById("page-" + name).hidden = name !== pageName;
  });
  document.querySelectorAll(".nav-link").forEach(button => {
    const active = button.dataset.page === pageName;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "instant" });
}

function renderList(category, containerId, searchTerm = "") {
  const container = document.getElementById(containerId);
  container.replaceChildren();
  const filtered = records.filter(record =>
    record.category === category &&
    (record.title + " " + record.id + " " + record.summary)
      .toLocaleLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
  );

  if (filtered.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "没有找到符合条件的档案。";
    container.appendChild(message);
    return;
  }

  filtered.forEach(record => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "record-row";
    const body = document.createElement("span");
    const id = document.createElement("span");
    id.className = "record-id";
    id.textContent = record.id;
    const title = document.createElement("strong");
    title.className = "record-title";
    title.textContent = record.title;
    const summary = document.createElement("span");
    summary.className = "record-summary";
    summary.textContent = record.summary;
    const arrow = document.createElement("span");
    arrow.className = "record-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    body.append(id, title, summary);
    button.append(body, arrow);
    button.addEventListener("click", () => openArticle(record));
    container.appendChild(button);
  });
}

function openArticle(record) {
  previousPage = record.category;
  document.getElementById("article-path").textContent = record.id;
  document.getElementById("article-type").textContent = categoryNames[record.category];
  document.getElementById("article-title").textContent = record.title;
  document.getElementById("article-id").textContent = "档案编号 / " + record.id;
  document.getElementById("article-summary").textContent = record.summary;
  showPage("article");
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});
document.getElementById("back-button").addEventListener("click", () => showPage(previousPage));
document.getElementById("character-search").addEventListener("input", event => {
  renderList("characters", "characters-list", event.target.value);
});

renderList("characters", "characters-list");
renderList("world", "world-list");
renderList("documents", "documents-list");
showPage("home");
