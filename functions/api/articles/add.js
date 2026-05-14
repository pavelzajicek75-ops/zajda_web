import articlesData from "../../../data/articles.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();

  const title = form.get("title");
  const slug = form.get("slug");
  const content = form.get("content");
  const section_id = Number(form.get("section_id"));
  const subsection_id = Number(form.get("subsection_id"));

  const newArticle = {
    id: Date.now(),
    section_id,
    subsection_id,
    title,
    slug,
    content,
    created: new Date().toISOString().split("T")[0]
  };

  articlesData.articles.push(newArticle);

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/articles" }
  });
}
