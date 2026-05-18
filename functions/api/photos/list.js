export async function onRequestGet(context) {
  try {
    // Získání seznamu objektů z R2 bucketu
    const list = await context.env.R2_BUCKET.list();

    const files = list.objects.map(obj => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded,
      url: `https://${context.env.ACCOUNT_ID}.r2.cloudflarestorage.com/${context.env.BUCKET_NAME}/${obj.key}`
    }));

    return new Response(JSON.stringify({ success: true, files }), {
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
