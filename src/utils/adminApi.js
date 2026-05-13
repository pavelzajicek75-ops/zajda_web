import fs from "fs";

export function getArticles() {
  const raw = fs.readFileSync("src/data/cestovani/usa2026/articles.json", "utf-8");
  return JSON.parse(raw);
}
