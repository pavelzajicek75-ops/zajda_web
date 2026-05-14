export async function onRequestGet(context) {
  try {
    console.log("Sections API called");

    const sections = [
      { id: 1, name: "Cestování", slug: "cestovani" },
      { id: 2, name: "Fotografování", slug: "fotografovani" },
      { id: 3, name: "Moje projekty", slug: "projekty" },
      { id: 4, name: "Zajda", slug: "zajda" }
    ];

    const subsections = [
      { id: 1, section_id: 1, name: "USA 2020", slug: "usa-2020" },
      { id: 2, section_id: 1, name: "Island", slug: "island" },
      { id: 3, section_id: 1, name: "Tokyo", slug: "tokyo" },
      { id: 4, section_id: 2, name: "Krajiny", slug: "krajiny" },
      { id: 5, section_id: 2, name: "Města", slug: "mesta" }
    ];

    return new Response(JSON.stringify({ sections, subsections }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("Error in sections.js:", err);
    return new Response("Internal error: " + err.message, { status: 500 });
  }
}

