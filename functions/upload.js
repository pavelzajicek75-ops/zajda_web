export async function onRequestPost(context) {
  const formData = await context.request.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const key = file.name;

  // Upload do R2
  await context.env.R2_BUCKET.put(key, arrayBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Veřejná URL
  const publicUrl = `https://${context.env.ACCOUNT_ID}.r2.cloudflarestorage.com/${context.env.BUCKET_NAME}/${key}`;

  return new Response(JSON.stringify({ success: true, url: publicUrl }), {
    status: 200
  });
}
