export default {
  async fetch(request) {
    const sections = [
      { id: 1, name: "Cestování", slug: "cestovani" },
      { id: 2, name: "Fotografování", slug: "fotografije" },
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
  }
};
