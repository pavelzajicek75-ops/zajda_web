export async function onRequestPost(context) {
  const body = await context.request.json();
  const { id, title, date, content, image } = body;

  const articlesKV = context.env.ARTICLES;

  const all = await articlesKV.get("articles", { type: "json" }) || [];

  const index = all.findIndex(a => String(a.id) === String(id));

  if (index === -1) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  all[index] = { ...all[index], title, date, content, image };

  await articlesKV.put("articles", JSON.stringify(all));

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" }
  });
}
