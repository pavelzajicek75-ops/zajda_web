export async function POST({ request }) {
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

  // TODO: tady později:
  // - uložit článek do D1
  // - nahrát fotky do R2
  // - uložit URL fotek do D1

  return Response.redirect("/admin/clanky", 302);
}
