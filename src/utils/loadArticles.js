import fs from "fs";
import path from "path";

export function loadArticles(folder) {
  const base = path.join(process.cwd(), "src/data", folder);
  const files = fs.readdirSync(base).filter(f => f.endsWith(".json"));

  return files.map(f => {
    const raw = fs.readFileSync(path.join(base, f), "utf-8");
    return JSON.parse(raw);
  });
}
