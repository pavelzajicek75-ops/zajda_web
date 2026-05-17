import fs from 'fs';
import path from 'path';

export async function post({ request }) {
  try {
    const body = await request.json();
    const id = String(body.id);

    const filePath = path.join(process.cwd(), 'data', 'articles.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const articles = JSON.parse(raw);

    const index = articles.findIndex(a => String(a.id) === id);

    if (index === -1) {
      return new Response(JSON.stringify({ success: false, error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Aktualizace článku
    articles[index] = {
      ...articles[index],
      title: body.title,
      slug: body.slug || '',
      section: body.section || '',
      subsection: body.subsection || '',
      date: body.date || '',
      content: body.content || '',
      published: body.published ?? articles[index].published
    };

    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('API UPDATE ERROR:', err);

    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
