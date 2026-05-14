import subsectionsData from "../../../data/subsections.json";

export async function onRequestPost(context) {
  const form = await context.request.formData();
  const id = Number(form.get("id"));

  subsectionsData.subsections = subsectionsData.subsections.filter(
    sub => sub.id !== id
  );

  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/subsections" }
  });
}
