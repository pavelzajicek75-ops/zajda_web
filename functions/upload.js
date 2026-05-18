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

  // Vytvoření bitmapy
  const bitmap = await createImageBitmap(new Blob([arrayBuffer]));

  // Thumbnail
  const maxWidth = 400;
  const scale = maxWidth / bitmap.width;
  const newWidth = maxWidth;
  const newHeight = Math.round(bitmap.height * scale);

  const canvasThumb = new OffscreenCanvas(newWidth, newHeight);
  const ctxThumb = canvasThumb.getContext("2d");
  ctxThumb.drawImage(bitmap, 0, 0, newWidth, newHeight);

  const thumbBlob = await canvasThumb.convertToBlob({ type: file.type });
  const thumbBuffer = await thumbBlob.arrayBuffer();

  await context.env.R2_BUCKET.put(`thumbs/${key}`, thumbBuffer, {
    httpMetadata: { contentType: file.type }
  });

  // WebP originál
  const canvasWebp = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctxWebp = canvasWebp.getContext("2d");
  ctxWebp.drawImage(bitmap, 0, 0);

  const webpBlob = await canvasWebp.convertToBlob({ type: "image/webp", quality: 0.85 });
  const webpBuffer = await webpBlob.arrayBuffer();

  await context.env.R2_BUCKET.put(`webp/original/${key}.webp`, webpBuffer, {
    httpMetadata: { contentType: "image/webp" }
  });

  // WebP thumbnail
  const canvasWebpThumb = new OffscreenCanvas(newWidth, newHeight);
  const ctxWebpThumb = canvasWebpThumb.getContext("2d");
  ctxWebpThumb.drawImage(bitmap, 0, 0, newWidth, newHeight);

  const webpThumbBlob = await canvasWebpThumb.convertToBlob({ type: "image/webp", quality: 0.85 });
  const webpThumbBuffer = await webpThumbBlob.arrayBuffer();

  await context.env.R2_BUCKET.put(`webp/thumbs/${key}.webp`, webpThumbBuffer, {
    httpMetadata: { contentType: "image/webp" }
  });

  // Veřejná URL originálu
  const publicUrl = `https://${context.env.ACCOUNT_ID}.r2.cloudflarestorage.com/${context.env.BUCKET_NAME}/original/${key}`;

  return new Response(JSON.stringify({ success: true, url: publicUrl }), {
    status: 200
  });
}
