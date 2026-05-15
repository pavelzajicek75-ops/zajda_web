import jwt from "jsonwebtoken";

/**
 * API endpoint pro přihlášení administrátora.
 * Ověří uživatelské jméno a heslo, vygeneruje JWT token.
 */
export async function post({ request }) {
  const body = await request.json();

  // 🔐 Výchozí přihlašovací údaje
  const USER = "admin";
  const PASS = "admin123";

  // ❌ Špatné údaje
  if (body.username !== USER || body.password !== PASS) {
    return new Response(
      JSON.stringify({ success: false, message: "Špatné přihlašovací údaje" }),
      { status: 401 }
    );
  }

  // ✅ Správné údaje → vytvoříme token
  const token = jwt.sign(
    { user: USER },
    import.meta.env.ADMIN_JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 🔁 Vrátíme token klientovi
  return new Response(
    JSON.stringify({ success: true, token }),
    { headers: { "Content-Type": "application/json" } }
  );
}
