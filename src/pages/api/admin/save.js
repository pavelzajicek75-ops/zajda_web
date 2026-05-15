import jwt from "jsonwebtoken";

export async function post({ request }) {
  const auth = request.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });

  const token = auth.replace("Bearer ", "");

  try {
    jwt.verify(token, import.meta.env.ADMIN_JWT_SECRET);
  } catch (e) {
    return new Response("Invalid token", { status: 401 });
  }

  // 🔒 Pokud token platí, pokračuj v ukládání dat
  const data = await request.json();

  // Tady vlož logiku pro ukládání článku, sekce nebo podsekce
  // Např. zápis do JSON souboru nebo databáze

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}

