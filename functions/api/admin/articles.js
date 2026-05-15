export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const token = request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token || token !== env.ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "No token" }), { status: 401 });
  }

  // GET ALL
  if (request.method === "GET" && url.pathname === "/api/admin/articles") {
    const list = await env.ARTICLES_KV.list();
    const items = [];

    for (const key of list.keys) {
      const value = await env.ARTICLES_KV.get(key.name, { type: "json" });
      items.push(value);
    }

    return Response.json(items);
  }

  // GET ONE
  if (request.method === "GET" && url.pathname.startsWith("/api/admin/articles/")) {
    const id = url.pathname.split("/").pop();
    const article = await env.ARTICLES_KV.get(id, { type: "json" });
    return Response.json(article || {});
  }

  // CREATE
  if (request.method === "POST") {
    const body = await request.json();
    const id = crypto.randomUUID();
    body.id = id;

    await env.ARTICLES_KV.put(id, JSON.stringify(body));
    return Response.json({ ok: true, id });
  }

  // UPDATE
  if (request.method === "PUT" && url.pathname.startsWith("/api/admin/articles/")) {
    const id = url.pathname.split("/").pop();
    const body = await request.json();

    const existing = await env.ARTICLES_KV.get(id, { type: "json" });

    const updated = {
      ...existing,
      ...body,
      id
    };

    await env.ARTICLES_KV.put(id, JSON.stringify(updated));

    return Response.json({ ok: true });
  }

  // DELETE
  if (request.method === "DELETE" && url.pathname.startsWith("/api/admin/articles/")) {
    const id = url.pathname.split("/").pop();
    await env.ARTICLES_KV.delete(id);
    return Response.json({ ok: true });
  }

  return new Response("Not found", { status: 404 });
}
