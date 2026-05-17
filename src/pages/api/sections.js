import fs from "fs";
import path from "path";

export async function get() {
  const filePath = path.join(process.cwd(), "src/data/sections.json");
  const json = fs.readFileSync(filePath, "utf-8");

  return new Response(json, {
    headers: { "Content-Type": "application/json" }
  });
}
