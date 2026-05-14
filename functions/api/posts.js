export async function onRequestGet() {
  const posts = [
    {
      id: 1,
      title: "USA 2026 – Den 1",
      slug: "usa-2026-den-1",
      date: "2026-05-01"
    },
    {
      id: 2,
      title: "Island – Ledovce a vodopády",
      slug: "island-ledovce-vodopady",
      date: "2026-03-15"
    }
  ];

  return new Response(JSON.stringify({ posts }), {
    headers: { "Content-Type": "application/json" }
  });
}
