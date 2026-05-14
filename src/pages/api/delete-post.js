export async function POST({ request }) {
  const form = await request.formData();
  const id = form.get("id");

  console.log("TODO: smazat článek s ID:", id);

  return Response.redirect("/admin/clanky", 302);
}
