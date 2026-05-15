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

  // Zpracování uploadu
  const formData = await request.formData();
  const file = formData.get("file");

  // Tady vlož logiku pro uložení souboru (např. do /public/uploads)
  // nebo do cloudového úložiště

  return new Response(JSON.stringify({ uploaded: file.name }), {
    headers: { "Content-Type": "application/json" },
  });
}
