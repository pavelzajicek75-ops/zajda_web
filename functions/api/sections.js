import sectionsData from "../../data/sections.json";

export async function onRequestGet(context) {
  return new Response(JSON.stringify(sectionsData), {
    headers: { "Content-Type": "application/json" }
  });
}

