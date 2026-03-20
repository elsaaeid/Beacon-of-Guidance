import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const HADITH_BASE = 'https://hadithapi.com/api';

function extractHadithArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];
  if (Array.isArray(payload.hadiths)) return payload.hadiths;
  if (Array.isArray(payload.hadith)) return payload.hadith;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.hadiths?.data)) return payload.hadiths.data;
  if (Array.isArray(payload.hadith?.data)) return payload.hadith.data;
  return [];
}

async function readEnvFallback(keyName = 'HADITH_API_KEY') {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const txt = await fs.readFile(envPath, 'utf8');
    const lines = txt.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const name = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (name === keyName && val) return val;
    }
  } catch (e) {
    // ignore read errors
  }
  return null;
}

async function fetchHadithsForBook(apiKey, bookId, limit) {
  const url = new URL(`${HADITH_BASE}/hadiths`);
  if (bookId) url.searchParams.set('book', bookId);
  if (limit) url.searchParams.set('limit', String(limit));
  url.searchParams.set('apiKey', apiKey);
  const res = await fetch(url.toString());
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Failed to fetch hadiths for ${bookId}: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const includeHadiths = searchParams.get('includeHadiths') === '1' || searchParams.get('includeHadiths') === 'true';
    const limitPerBook = parseInt(searchParams.get('limitPerBook') || '50', 10) || 50;
    const concurrency = parseInt(searchParams.get('concurrency') || '4', 10) || 4;

    let API_KEY = process.env.HADITH_API_KEY || process.env.NEXT_PUBLIC_HADITH_API_KEY;
    if (!API_KEY) {
      API_KEY = await readEnvFallback('HADITH_API_KEY');
    }
    // Debug: only log presence (do not print the key)
    console.log('/api/hadith/books - HADITH_API_KEY present:', !!API_KEY);
    if (!API_KEY) {
      return NextResponse.json({ error: 'Missing server-side HADITH_API_KEY — ensure .env.local contains HADITH_API_KEY and restart dev server' }, { status: 500 });
    }

    // Fetch books
    const booksRes = await fetch(`${HADITH_BASE}/books?apiKey=${API_KEY}`);
    if (!booksRes.ok) {
      const t = await booksRes.text().catch(() => '');
      return NextResponse.json({ error: `Failed to fetch books: ${booksRes.status} ${booksRes.statusText} ${t}` }, { status: 502 });
    }

    const booksJson = await booksRes.json();
    let books = Array.isArray(booksJson) ? booksJson : (Array.isArray(booksJson.books) ? booksJson.books : Object.values(booksJson).find(v => Array.isArray(v)) || []);

    if (!includeHadiths) {
      return NextResponse.json(books);
    }

    const pickBookId = (b) => b.bookSlug || b.slug || b.book || b.key || b.name || b.title || b.id;

    const results = [];
    for (let i = 0; i < books.length; i += concurrency) {
      const chunk = books.slice(i, i + concurrency);
      const promises = chunk.map(async (b) => {
        const bookId = pickBookId(b);
        try {
          const hadithData = await fetchHadithsForBook(API_KEY, bookId, limitPerBook);
          // Normalize if needed
          return { ...b, hadiths: extractHadithArray(hadithData) };
        } catch (err) {
          console.error('book hadith fetch error', err);
          return { ...b, hadiths: [], _hadithsError: String(err && err.message) };
        }
      });
      const settled = await Promise.all(promises);
      results.push(...settled);
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error('/api/hadith/books error', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
