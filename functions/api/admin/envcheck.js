export const onRequestGet = async (context) => {
  const { env } = context;

  const result = {
    ADMIN_USERNAME: env.ADMIN_USERNAME ? "✅ exists" : "❌ missing",
    ADMIN_PASSWORD: env.ADMIN_PASSWORD ? "✅ exists" : "❌ missing",
    JWT_SECRET: env.JWT_SECRET ? "✅ exists" : "❌ missing",
  };

  return new Response(JSON.stringify(result, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
