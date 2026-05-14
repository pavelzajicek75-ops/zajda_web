import articlesData from "../../../data/articles.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();
  const id = Number(form.get("id"));

  articlesData.articles = articlesData.articles.filter(a => a.id !== id);

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/articles" }
  });
}
