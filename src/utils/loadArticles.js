import fs from "fs";
import path from "path";

export function loadArticles(folder) {
  const base = path.join(process.cwd(), "src/data", folder);

  // Pokud složka neexistuje, vrať prázdné pole
  if (!fs.existsSync(base)) {
    console.warn(`⚠️ Folder not found: ${base}`);
    return [];
  }

  const files = fs.readdirSync(base).filter(f => f.endsWith(".json"));

  // Pokud nejsou žádné soubory, vrať prázdné pole
  if (files.length === 0) {
    console.warn(`⚠️ No JSON files found in ${base}`);
    return [];
  }

  return files.map(f => {
    try {
      const raw = fs.readFileSync(path.join(base, f), "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error(`❌ Error parsing ${f}:`, err.message);
      return null;
    }
  }).filter(Boolean);
}
