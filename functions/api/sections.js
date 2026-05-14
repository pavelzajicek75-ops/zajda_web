export async function onRequestGet() {
  const sections = [
    { id: 1, name: "Cestování", slug: "cestovani" },
    { id: 2, name: "Fotografie", slug: "fotografie" },
    { id: 3, name: "Projekty", slug: "projekty" },
    { id: 4, name: "Zajda", slug: "zajda" }
  ];

  const subsections = [
    { id: 1, section_id: 1, name: "USA 2026", slug: "usa-2026" },
    { id: 2, section_id: 1, name: "Island", slug: "island" },
    { id: 3, section_id: 1, name: "Tokyo", slug: "tokyo" },
    { id: 4, section_id: 2, name: "Krajiny", slug: "krajiny" },
    { id: 5, section_id: 2, name: "Města", slug: "mesta" }
  ];

  return new Response(JSON.stringify({ sections, subsections }), {
    headers: { "Content-Type": "application/json" }
  });
}

