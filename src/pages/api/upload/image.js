export async function post() {
  return new Response(JSON.stringify({
    success: true,
    url: "https://placehold.co/800x600"
  }), {
    headers: { "Content-Type": "application/json" }
  });
}
