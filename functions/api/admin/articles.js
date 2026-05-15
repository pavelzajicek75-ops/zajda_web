import { verifyJWT } from "../../_utils/auth";

export const onRequestGet = async (context) => {
  const { request, env } = context;
  const auth = request.headers.get("Authorization") || "";
  const JWT_SECRET = env.JWT_SECRET;

  if (!auth.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "No token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = auth.slice("Bearer ".length).trim();
  const payload = await verifyJWT(token, JWT_SECRET).catch(() => null);

  if (!payload || payload.role !== "admin") {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Tady bys normálně načetl články z JSON / KV / DB
  const articles = [
    { id: 1, title: "Test článek 1" },
    { id: 2, title: "Test článek 2" },
  ];

  return new Response(JSON.stringify({ articles }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
