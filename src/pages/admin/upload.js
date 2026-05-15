import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export async function post({ request }) {
  const auth = request.headers.get("authorization");
  if (!auth) return new Response("Unauthorized", { status: 401 });

  const token = auth.replace("Bearer ", "");

  try {
    jwt.verify(token, import.meta.env.ADMIN_JWT_SECRET);
  } catch (e) {
    return new Response("Invalid token", { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadDir = path.resolve("public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = Date.now() + "-" + file.name;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return new Response(
    JSON.stringify({
      success: true,
      url: "/uploads/" + fileName
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
