export async function onRequestPost(context) {
  const form = await context.request.formData();
  const file = form.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file" }), { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const uint8 = new Uint8Array(arrayBuffer);

  const filename = Date.now() + "-" + file.name.replace(/\s+/g, "_");

  await context.env.ASSETS.put(`uploads/${filename}`, uint8, {
    httpMetadata: { contentType: file.type }
  });

  return new Response(
    JSON.stringify({
      success: true,
      url: `/uploads/${filename}`
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
