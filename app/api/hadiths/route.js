import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const HADITH_BASE = process.env.EGYPTIAN_HADITH_BASE_URL || 'https://hadithapi.com/api';
const HADITH_FALLBACK_BASE = process.env.EGYPTIAN_HADITH_FALLBACK_URL || 'https://api.hadith.gading.dev';

const FALLBACK_BOOK_MAP = {
  'sahih-bukhari': 'bukhari',
  'sahih-muslim': 'muslim',
  'al-tirmidhi': 'tirmidzi',
  'abu-dawood': 'abu-daud',
  'ibn-e-majah': 'ibnu-majah',
  'sunan-nasai': 'nasai',
  'musnad-ahmad': 'ahmad',
};

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

function hasNextPage(payload) {
  if (!payload || typeof payload !== 'object') return false;

  const container = payload.hadiths && typeof payload.hadiths === 'object' ? payload.hadiths : payload;
  if (container.next_page_url) return true;

  const currentPage = Number(container.current_page);
  const lastPage = Number(container.last_page);
  if (Number.isFinite(currentPage) && Number.isFinite(lastPage)) {
    return currentPage < lastPage;
  }

  return false;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFallbackHadiths(bookSlug) {
  const mapped = FALLBACK_BOOK_MAP[bookSlug];
  if (!mapped) {
    return { hadiths: [], source: 'primary', unsupported: true };
  }

  const firstRes = await fetch(`${HADITH_FALLBACK_BASE}/books/${mapped}?range=1-1`);
  if (!firstRes.ok) {
    return { hadiths: [], source: 'primary', unsupported: true };
  }

  const firstJson = await firstRes.json();
  const available = Number(firstJson?.data?.available || 0);
  if (!available) {
    return { hadiths: [], source: 'fallback', available: 0 };
  }

  const chunkSize = 300;
  const all = [];
  for (let start = 1; start <= available; start += chunkSize) {
    const end = Math.min(start + chunkSize - 1, available);
    const res = await fetch(`${HADITH_FALLBACK_BASE}/books/${mapped}?range=${start}-${end}`);
    if (!res.ok) break;
    const json = await res.json();
    const rows = Array.isArray(json?.data?.hadiths) ? json.data.hadiths : [];
    if (!rows.length) break;
    const normalized = rows.map((h) => ({
      hadithNumber: h.number,
      hadithArabic: h.arab,
      hadithUrdu: h.id,
      source: 'fallback-gading',
    }));
    all.push(...normalized);
    await sleep(120);
  }

  return { hadiths: all, source: 'fallback', available };
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

    const fetchPage = async (pageNo, attempt = 0) => {
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

      if (res.status === 429 && attempt < 2) {
        await sleep(350 * (attempt + 1));
        return fetchPage(pageNo, attempt + 1);
      }

      return { res, text, json };
    };

    if (all && book) {
      const allHadiths = [];
      let currentPage = 1;

      while (currentPage <= maxPages) {
        const { res, json } = await fetchPage(currentPage);

        if (res.status === 404) {
          const fallback = await fetchFallbackHadiths(book);
          if (fallback.hadiths.length > 0) {
            return NextResponse.json(
              {
                hadiths: fallback.hadiths,
                status: 200,
                all: true,
                source: fallback.source,
                available: fallback.available,
                message: 'تم جلب الأحاديث من مصدر بديل.',
                book,
              },
              { status: 200 }
            );
          }

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
          if (res.status === 429) {
            const fallback = await fetchFallbackHadiths(book);
            if (fallback.hadiths.length > 0) {
              return NextResponse.json(
                {
                  hadiths: fallback.hadiths,
                  all: true,
                  partial: false,
                  rateLimited: true,
                  source: fallback.source,
                  available: fallback.available,
                  pagesFetched: Math.max(currentPage - 1, 0),
                  message: 'تم التحويل إلى مصدر بديل بسبب الضغط على المصدر الأساسي (429).',
                  book,
                },
                { status: 200 }
              );
            }

            return NextResponse.json(
              {
                hadiths: allHadiths,
                all: true,
                partial: true,
                rateLimited: true,
                pagesFetched: Math.max(currentPage - 1, 0),
                message: 'تم إيقاف التحميل بسبب ضغط على المصدر الخارجي (429).',
                book,
              },
              { status: 200 }
            );
          }

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
        if (!hasNextPage(json)) {
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
