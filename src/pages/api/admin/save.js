import fs from "fs";
import path from "path";

export const post = async ({ request }) => {
  const form = await request.formData();

  const title = form.get("title");
  const content = form.get("content");
  const photos = form.getAll("photos");

  const uploadsDir = "public/uploads/usa2026/";
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const photoPaths = [];

  for (const file of photos) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = Date.now() + "-" + file.name;
    const filepath = path.join(uploadsDir, filename);

    fs.writeFileSync(filepath, buffer);
    photoPaths.push("/uploads/usa2026/" + filename);
  }

  const article = {
    title,
    content,
    photos: photoPaths
  };

  const fileName = title.toLowerCase().replace(/ /g, "-") + ".json";
  const filePath = `src/data/cestovani/usa2026/${fileName}`;

  fs.writeFileSync(filePath, JSON.stringify(article, null, 2));

  // update articles.json
  const articlesPath = "src/data/cestovani/usa2026/articles.json";
  const list = JSON.parse(fs.readFileSync(articlesPath, "utf-8"));

  list.push({
    title,
    file: fileName,
    date: new Date().toISOString().split("T")[0]
  });

  fs.writeFileSync(articlesPath, JSON.stringify(list, null, 2));

  return new Response("OK");
};
