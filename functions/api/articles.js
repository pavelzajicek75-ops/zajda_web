import articlesData from "../../data/articles.json";

export async function onRequestGet(context) {
  return new Response(JSON.stringify(articlesData), {
    headers: { "Content-Type": "application/json" }
  });
}
