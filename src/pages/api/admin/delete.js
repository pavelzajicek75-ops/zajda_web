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

  const { id } = await request.json();

  // Logika pro smazání položky podle ID
  // Např. odstranění článku z JSON nebo databáze

  return new Response(JSON.stringify({ deleted: id }), {
    headers: { "Content-Type": "application/json" },
  });
}
