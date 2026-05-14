export async function POST({ request }) {
  const form = await request.formData();
  const id = form.get("id");

  console.log("TODO: smazat fotku s ID:", id);

  return Response.redirect("/admin/foto", 302);
}
