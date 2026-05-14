export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (context) => {
  const { searchParams } = new URL(context.request.url);
  const slug = searchParams.get("section");

  const section = await context.env.DB.prepare(
    "SELECT id FROM sections WHERE slug = ?"
  )
    .bind(slug)
    .first<{ id: number }>();

  if (!section) {
    return new Response(JSON.stringify({ post: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const post = await context.env.DB.prepare(
    `SELECT * FROM posts WHERE section_id = ? ORDER BY date DESC LIMIT 1`
  )
    .bind(section.id)
    .first();

  return new Response(JSON.stringify({ post }), {
    headers: { "Content-Type": "application/json" },
  });
};
