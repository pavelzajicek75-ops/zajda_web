import sectionsData from "../../../data/sections.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();
  const name = form.get("name");
  const slug = form.get("slug");

  const newSection = {
    id: Date.now(),
    name,
    slug
  };

  sectionsData.sections.push(newSection);

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/sections" }
  });
}
