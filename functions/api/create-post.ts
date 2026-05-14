export const onRequestPost: PagesFunction<{
  DB: D1Database;
  R2_BUCKET: R2Bucket;
}> = async (context) => {
  const formData = await context.request.formData();

  const title = formData.get("title")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const date = formData.get("date")?.toString() || "";
  const tags = formData.get("tags")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const sectionId = Number(formData.get("section_id"));
  const subsectionId = formData.get("subsection_id")
    ? Number(formData.get("subsection_id"))
    : null;

  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  // 1) Upload fotek do R2
  const photos = formData.getAll("photos") as File[];
  let coverUrl: string | null = null;

  for (let i = 0; i < photos.length; i++) {
    const file = photos[i];
    if (!file || file.size === 0) continue;

    const key = `posts/${slug}/${Date.now()}-${file.name}`;
    await context.env.R2_BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type },
    });

    const publicUrl = `https://YOUR_R2_PUBLIC_DOMAIN/${key}`;

    if (i === 0) {
      coverUrl = publicUrl;
    }

    await context.env.DB.prepare(
      `INSERT INTO photos (post_id, url, alt) VALUES (NULL, ?, ?)`
    )
      .bind(publicUrl, title)
      .run();
  }

  // 2) Uložení článku do D1
  await context.env.DB.prepare(
    `INSERT INTO posts (section_id, subsection_id, title, slug, description, content, date, tags, cover)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      sectionId,
      subsectionId,
      title,
      slug,
      description,
      content,
      date,
      tags,
      coverUrl
    )
    .run();

  return new Response(JSON.stringify({ success: true, slug }), {
    headers: { "Content-Type": "application/json" },
  });
};
