export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const key = data.key;

    if (!key) {
      return new Response(JSON.stringify({ success: false, error: "Missing key" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Smazání souboru z R2
    await context.env.R2_BUCKET.delete(key);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
