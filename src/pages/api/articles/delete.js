import fs from 'fs';
import path from 'path';

export async function post({ request }) {
  try {
    const filters = await request.json(); // libovolné parametry
    const filePath = path.join(process.cwd(), 'data', 'articles.json');

    const raw = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(raw);

    // Funkce pro porovnání všech parametrů
    const matches = (article, filters) => {
      return Object.entries(filters).every(([key, value]) => {
        return String(article[key]) === String(value);
      });
    };

    const remaining = articles.filter(a => !matches(a, filters));
    const removedCount = articles.length - remaining.length;

    fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2), 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      removed: removedCount
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('DELETE API ERROR:', err);

    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
