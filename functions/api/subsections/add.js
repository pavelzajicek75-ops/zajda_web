import subsectionsData from "../../../data/subsections.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();

  const name = form.get("name");
  const slug = form.get("slug");
  const section_id = Number(form.get("section_id"));

  const newSub = {
    id: Date.now(),
    section_id,
    name,
    slug
  };

  subsectionsData.subsections.push(newSub);

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/subsections" }
  });
}
