// /src/pages/api/r2-upload.js

import { R2_CONFIG } from "../../../r2.config.mjs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: R2_CONFIG.endpoint,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey
  }
});

export async function post({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400
      });
    }

    const arrayBuffer = await file.arrayBuffer();

    const uploadParams = {
      Bucket: R2_CONFIG.bucketName,
      Key: file.name,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type
    };

    await client.send(new PutObjectCommand(uploadParams));

    const url = `${R2_CONFIG.endpoint}/${R2_CONFIG.bucketName}/${file.name}`;

    return new Response(JSON.stringify({ success: true, url }), {
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}
