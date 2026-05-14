import sectionsData from "../../../data/sections.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();
  const id = Number(form.get("id"));

  sectionsData.sections = sectionsData.sections.filter(s => s.id !== id);

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/sections" }
  });
}
