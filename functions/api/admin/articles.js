import jwt from "jsonwebtoken";

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;

  // 1) Ověření JWT
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return jsonResponse({ error: "Missing token" }, 401);
  }

  try {
    jwt.verify(token, env.JWT_SECRET);
  } catch (e) {
    return jsonResponse({ error: "Invalid token" }, 401);
  }

  // 2) Routing podle metody
  if (method === "GET") {
    return handleGetArticles(env);
  }

  if (method === "POST") {
    return handleCreateArticle(request, env);
  }

  if (method === "PUT") {
    const id = url.searchParams.get("id");
    if (!id) return jsonResponse({ error: "Missing id" }, 400);
    return handleUpdateArticle(request, env, id);
  }

  if (method === "DELETE") {
    const id = url.searchParams.get("id");
    if (!id) return jsonResponse({ error: "Missing id" }, 400);
    return handleDeleteArticle(env, id);
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}

// ---------- Helpers ----------

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

async function handleGetArticles(env) {
  // Všechny klíče v KV
  const list = await env.ARTICLES_KV.list();
  const articles = [];

  for (const key of list.keys) {
    const value = await env.ARTICLES_KV.get(key.name, { type: "json" });
    if (value) articles.push(value);
  }

  return jsonResponse(articles);
}

async function handleCreateArticle(request, env) {
  const body = await request.json();
  const id = crypto.randomUUID();

  const article = {
    id,
    title: body.title || "",
    content: body.content || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  await env.ARTICLES_KV.put(id, JSON.stringify(article));
  return jsonResponse(article, 201);
}

async function handleUpdateArticle(request, env, id) {
  const existing = await env.ARTICLES_KV.get(id, { type: "json" });
  if (!existing) {
    return jsonResponse({ error: "Article not found" }, 404);
  }

  const body = await request.json();

  const updated = {
    ...existing,
    title: body.title ?? existing.title,
    content: body.content ?? existing.content,
    updatedAt: new Date().toISOString()
  };

  await env.ARTICLES_KV.put(id, JSON.stringify(updated));
  return jsonResponse(updated);
}

async function handleDeleteArticle(env, id) {
  await env.ARTICLES_KV.delete(id);
  return jsonResponse({ success: true });
}
