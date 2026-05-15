import jwt from "jsonwebtoken";

export async function post({ request }) {
  try {
    const { password } = await request.json();

    const realPassword = import.meta.env.ADMIN_PASSWORD;
    const jwtSecret = import.meta.env.ADMIN_JWT_SECRET;

    if (!realPassword || !jwtSecret) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500 }
      );
    }

    if (password !== realPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { role: "admin" },
      jwtSecret,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({ token }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400 }
    );
  }
}
