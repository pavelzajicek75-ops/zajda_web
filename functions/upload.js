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

  // Uložení originálu
  await context.env.R2_BUCKET.put(`original/${key}`, arrayBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Vytvoření thumbnailu
  const image = await context.env.ASSETS.fetch("https://dummy"); // hack pro aktivaci Image API
  const bitmap = await createImageBitmap(new Blob([arrayBuffer]));

  const maxWidth = 400;
  const scale = maxWidth / bitmap.width;
  const newWidth = maxWidth;
  const newHeight = Math.round(bitmap.height * scale);

  const offscreen = new OffscreenCanvas(newWidth, newHeight);
  const ctx = offscreen.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);

  const thumbBlob = await offscreen.convertToBlob({ type: file.type });
  const thumbBuffer = await thumbBlob.arrayBuffer();

  // Uložení thumbnailu
  await context.env.R2_BUCKET.put(`thumbs/${key}`, thumbBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // Veřejná URL originálu
  const publicUrl = `https://${context.env.ACCOUNT_ID}.r2.cloudflarestorage.com/${context.env.BUCKET_NAME}/original/${key}`;

  return new Response(JSON.stringify({ success: true, url: publicUrl }), {
    status: 200
  });
}
