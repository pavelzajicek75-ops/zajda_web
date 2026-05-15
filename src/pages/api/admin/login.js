import jwt from "jsonwebtoken";

export async function post({ request }) {
  const body = await request.json();

  const USER = "admin";
  const PASS = "admin123";

  if (body.username !== USER || body.password !== PASS) {
    return new Response(
      JSON.stringify({ success: false, message: "Špatné přihlašovací údaje" }),
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { user: USER },
    import.meta.env.ADMIN_JWT_SECRET,
    { expiresIn: "7d" }
  );

  return new Response(
    JSON.stringify({ success: true, token }),
    { headers: { "Content-Type": "application/json" } }
  );
}
