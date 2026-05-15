import { signJWT } from "../../_utils/auth";

export const onRequestPost = async (context) => {
  const { request, env } = context;

  const { username, password } = await request.json().catch(() => ({}));

  const ADMIN_USER = env.ADMIN_USERNAME;
  const ADMIN_PASS = env.ADMIN_PASSWORD;
  const JWT_SECRET = env.JWT_SECRET;

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Missing credentials" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return new Response(
      JSON.stringify({ error: "Invalid credentials" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: "admin",
    role: "admin",
    iat: now,
    exp: now + 24 * 60 * 60, // 24 hodin
  };

  const token = await signJWT(payload, JWT_SECRET);

  return new Response(
    JSON.stringify({ token }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
