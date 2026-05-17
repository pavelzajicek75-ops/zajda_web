import fs from "fs";
import path from "path";

export async function post({ request }) {
  const body = await request.json();

  const filePath = path.join(process.cwd(), "src/data/articles.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const articles = JSON.parse(raw);

  const newArticle = {
    id: Date.now().toString(),
    title: body.title,
    section: body.section,
    subsection: body.subsection,
    location: body.location,
    created: body.date,
    updated: new Date().toISOString(),
    content: body.content
  };

  articles.push(newArticle);

  fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
