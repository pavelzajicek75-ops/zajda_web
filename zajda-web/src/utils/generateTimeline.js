export function generateTimeline(articles) {
  return articles
    .sort((a, b) => new Date(a.datum) - new Date(b.datum))
    .map(a => ({
      datum: a.datum,
      nazev: a.nazev,
      url: a.url,
      live: a.live
    }));
}
