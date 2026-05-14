export async function onRequestPost({ request }) {
  const form = await request.formData();

  const title = form.get("title");
  const description = form.get("description");
  const date = form.get("date");
  const content = form.get("content");
  const sectionId = form.get("section_id");
  const subsectionId = form.get("subsection_id");
  const photos = form.getAll("photos");

  console.log("NOVÝ ČLÁNEK:");
  console.log({ title, description, date, content, sectionId, subsectionId });
  console.log("Počet fotek:", photos.length);

  return Response.redirect("/admin/clanky", 302);
}
