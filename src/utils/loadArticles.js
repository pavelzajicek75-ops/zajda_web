import fs from "fs";

export async function loadArticles() {
  const raw = fs.readFileSync("src/data/cestovani/usa2026/articles.json", "utf-8");
  const list = JSON.parse(raw);

  return list.map((item) => ({
    title: item.title,
    file: item.file,
    date: item.date || "2026-07-15"
  }));
}
