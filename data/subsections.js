import subsectionsData from "../../data/subsections.json";

export async function onRequestGet(context) {
  return new Response(JSON.stringify(subsectionsData), {
    headers: { "Content-Type": "application/json" }
  });
}
