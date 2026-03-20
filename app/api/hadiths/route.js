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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const book = searchParams.get('book');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const all = searchParams.get('all') === '1' || searchParams.get('all') === 'true';
    const pageLimit = parseInt(limit || '50', 10) || 50;
    const maxPages = parseInt(searchParams.get('maxPages') || '50', 10) || 50;

    let API_KEY = process.env.HADITH_API_KEY || process.env.NEXT_PUBLIC_HADITH_API_KEY;
    if (!API_KEY) {
      // attempt to read .env.local as a fallback so devs don't always need to restart
      API_KEY = await readEnvFallback('HADITH_API_KEY');
    }
    console.log('/api/hadiths - HADITH_API_KEY present:', !!API_KEY);
    if (!API_KEY) {
      return NextResponse.json({ error: 'Missing server-side HADITH_API_KEY — ensure .env.local contains HADITH_API_KEY and restart dev server' }, { status: 500 });
    }

    const requestPage = page || '1';

    const fetchPage = async (pageNo) => {
      const url = new URL(`${HADITH_BASE}/hadiths`);
      if (book) url.searchParams.set('book', book);
      url.searchParams.set('page', String(pageNo));
      url.searchParams.set('limit', String(pageLimit));
      url.searchParams.set('apiKey', API_KEY);

      const res = await fetch(url.toString(), { method: 'GET' });
      const text = await res.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch (e) {
        // keep raw text for passthrough responses
      }
      return { res, text, json };
    };

    if (all && book) {
      const allHadiths = [];
      let currentPage = 1;

      while (currentPage <= maxPages) {
        const { res, json } = await fetchPage(currentPage);

        if (res.status === 404) {
          return NextResponse.json(
            {
              hadiths: [],
              status: 404,
              message: (json && json.message) || 'Hadiths not found.',
              book,
            },
            { status: 200 }
          );
        }

        if (!res.ok) {
          return NextResponse.json(
            {
              error: (json && (json.message || json.error)) || `Upstream error: ${res.status} ${res.statusText}`,
              status: res.status,
            },
            { status: res.status }
          );
        }

        const chunk = extractHadithArray(json);
        if (!Array.isArray(chunk) || chunk.length === 0) {
          break;
        }

        allHadiths.push(...chunk);
        if (chunk.length < pageLimit) {
          break;
        }
        currentPage += 1;
      }

      return NextResponse.json({ hadiths: allHadiths, page: requestPage, all: true, pagesFetched: currentPage });
    }

    const { res, text, json } = await fetchPage(requestPage);

    // Some book slugs return upstream 404 ("Hadiths not found").
    // Return a stable 200 payload so UI fetches do not fail at network level.
    if (res.status === 404) {
      return NextResponse.json(
        {
          hadiths: [],
          status: 404,
          message: (json && json.message) || 'Hadiths not found.',
          book,
        },
        { status: 200 }
      );
    }

    if (json !== null) {
      const normalized = extractHadithArray(json);
      if (normalized.length > 0 && !Array.isArray(json?.hadiths)) {
        return NextResponse.json({ ...json, hadiths: normalized }, { status: res.status });
      }
      return NextResponse.json(json, { status: res.status });
    }

    return NextResponse.text(text, { status: res.status });
  } catch (err) {
    console.error('API /api/hadiths error', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
