export async function post() {
  // Klient smaže token z localStorage
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
