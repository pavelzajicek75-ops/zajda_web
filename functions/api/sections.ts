export const onRequestGet: PagesFunction<{ DB: D1Database }> = async (ctx) => {
  const sections = await ctx.env.DB.prepare("SELECT * FROM sections").all();
  const subsections = await ctx.env.DB.prepare("SELECT * FROM subsections").all();

  return new Response(JSON.stringify({ sections, subsections }), {
    headers: { "Content-Type": "application/json" }
  });
};
