export async function onRequestGet() {
  const photos = [
    {
      id: 1,
      url: "https://placehold.co/600x400/orange/white?text=Foto+1",
      alt: "Ukázková fotka 1"
    },
    {
      id: 2,
      url: "https://placehold.co/600x400/444/fff?text=Foto+2",
      alt: "Ukázková fotka 2"
    }
  ];

  return new Response(JSON.stringify({ photos }), {
    headers: { "Content-Type": "application/json" }
  });
}
