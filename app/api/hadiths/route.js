import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const HADITH_BASE = 'https://api.sunnah.com';
const HADITH_FALLBACK_BASE = 'https://api.sunnah.com';
const HADITH_JSON_FALLBACK_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

const FALLBACK_BOOK_MAP = {
  'sahih-bukhari': 'bukhari',
  'sahih-muslim': 'muslim',
  'al-tirmidhi': 'tirmidhi',
  'abu-dawood': 'abudawud',
  'ibn-e-majah': 'ibnmajah',
  'sunan-nasai': 'nasai',
};

const JSON_FALLBACK_BOOK_MAP = {
  'sahih-bukhari': 'ara-bukhari',
  'sahih-muslim': 'ara-muslim',
  'al-tirmidhi': 'ara-tirmidhi',
  'abu-dawood': 'ara-abudawud',
  'ibn-e-majah': 'ara-ibnmajah',
  'sunan-nasai': 'ara-nasai',
};

function extractHadithArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const buckets = [
    payload.hadiths,
    payload.hadith,
    payload.data,
    payload.data?.hadiths,
    payload.result,
    payload.result?.hadiths,
  ];

  for (const item of buckets) {
    if (Array.isArray(item)) return item;
  }

  return [];
}

function normalizeHadith(row) {
  return {
    hadithNumber:
      row?.hadithNumber ||
      row?.hadithnumber ||
      row?.hadithNo ||
      row?.number ||
      row?.id ||
      '-',
    hadithArabic:
      String(
        row?.text ||
          row?.body ||
          row?.hadithArabic ||
          row?.arabic_text ||
          row?.arabic ||
          row?.hadith ||
          ''
      )
        .replace(/\s+/g, ' ')
        .trim(),
    hadithUrdu: '',
  };
}

async function fetchSunnahPage({ baseUrl, bookSlug, page, limit, apiKey }) {
  const mapped = FALLBACK_BOOK_MAP[bookSlug] || bookSlug;
  const headers = {
    Accept: 'application/json',
    'x-api-key': apiKey,
  };

  const candidates = [
    `${baseUrl}/v1/collections/${mapped}/hadiths?page=${page}&limit=${limit}`,
    `${baseUrl}/v1/hadiths?collection=${mapped}&page=${page}&limit=${limit}`,
  ];

  let last = { status: 500, message: 'Unknown upstream error', json: null };

  for (const url of candidates) {
    const res = await fetch(url, { headers, method: 'GET' });
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      json = null;
    }

    if (res.ok) {
      return {
        ok: true,
        status: res.status,
        json,
        rows: extractHadithArray(json),
      };
    }

    last = {
      status: res.status,
      message: (json && (json.message || json.error)) || `${res.status} ${res.statusText}`,
      json,
    };

    if (res.status === 401 || res.status === 403) {
      break;
    }
  }

  return {
    ok: false,
    status: last.status,
    message: last.message,
    json: last.json,
    rows: [],
  };
}

async function fetchFallbackHadiths(bookSlug) {
  const mapped = JSON_FALLBACK_BOOK_MAP[bookSlug];
  if (!mapped) return { hadiths: [], source: 'fallback-json', unsupported: true };

  const minUrl = `${HADITH_JSON_FALLBACK_BASE}/${mapped}.min.json`;
  const prettyUrl = `${HADITH_JSON_FALLBACK_BASE}/${mapped}.json`;

  let res = await fetch(minUrl, { method: 'GET' });
  if (!res.ok) {
    res = await fetch(prettyUrl, { method: 'GET' });
  }
  if (!res.ok) {
    return { hadiths: [], source: 'fallback-json', available: 0 };
  }

  const json = await res.json();
  const rows = extractHadithArray(json);
  const hadiths = rows.map(normalizeHadith);
  return { hadiths, source: 'fallback-json', available: hadiths.length };
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

    let apiKey = process.env.SUNNAH_API_KEY || process.env.HADITH_API_KEY || process.env.NEXT_PUBLIC_HADITH_API_KEY;
    if (!apiKey) {
      apiKey = await readEnvFallback('SUNNAH_API_KEY') || await readEnvFallback('HADITH_API_KEY');
    }
    const requestPage = page || '1';
    const requestPageNum = Math.max(parseInt(requestPage, 10) || 1, 1);

    if (all && book) {
      const allRows = [];
      let currentPage = 1;

      while (currentPage <= maxPages) {
        const result = apiKey
          ? await fetchSunnahPage({
              baseUrl: HADITH_BASE,
              bookSlug: book,
              page: currentPage,
              limit: pageLimit,
              apiKey,
            })
          : { ok: false, status: 401, message: 'Missing SUNNAH_API_KEY', rows: [] };

        if (!result.ok) {
          if (currentPage === 1) {
            const fallbackResult = await fetchSunnahPage({
              baseUrl: HADITH_FALLBACK_BASE,
              bookSlug: book,
              page: currentPage,
              limit: pageLimit,
              apiKey,
            });
            if (fallbackResult.ok) {
              const rows = (fallbackResult.rows || []).map(normalizeHadith);
              return NextResponse.json({
                hadiths: rows,
                page: currentPage,
                all: true,
                pagesFetched: 1,
                source: 'fallback',
                available: rows.length,
              });
            }
          }

          if (result.status === 401 || result.status === 403) {
            const jsonFallback = await fetchFallbackHadiths(book);
            if (jsonFallback.hadiths.length > 0) {
              return NextResponse.json(
                {
                  hadiths: jsonFallback.hadiths,
                  all: true,
                  partial: false,
                  source: jsonFallback.source,
                  available: jsonFallback.available,
                  message: 'تم التحويل تلقائيًا إلى مصدر JSON لأن Sunnah API يحتاج مفتاحًا صالحًا.',
                  status: 200,
                },
                { status: 200 }
              );
            }

            return NextResponse.json(
              {
                hadiths: allRows,
                all: true,
                partial: allRows.length > 0,
                message: 'Sunnah API authorization failed. Verify SUNNAH_API_KEY.',
                status: result.status,
              },
              { status: 200 }
            );
          }

          break;
        }

        const chunk = (result.rows || []).map(normalizeHadith);
        if (!chunk.length) break;
        allRows.push(...chunk);

        if (chunk.length < pageLimit) break;
        currentPage += 1;
      }

      if (!allRows.length) {
        const fallback = await fetchFallbackHadiths(book);
        if (fallback.hadiths.length > 0) {
          return NextResponse.json(
            {
              hadiths: fallback.hadiths,
              status: 200,
              all: true,
              source: fallback.source,
              available: fallback.available,
              message: 'تم جلب الأحاديث من مصدر JSON بديل.',
              book,
            },
            { status: 200 }
          );
        }

        return NextResponse.json(
          {
            hadiths: [],
            status: 404,
            message: 'Hadiths not found.',
            book,
          },
          { status: 200 }
        );
      }

      return NextResponse.json({
        hadiths: allRows,
        page: requestPage,
        all: true,
        pagesFetched: Math.max(Math.ceil(allRows.length / Math.max(pageLimit, 1)), 1),
        source: 'sunnah-api',
        available: allRows.length,
      });
    }

    if (!book) {
      return NextResponse.json(
        {
          hadiths: [],
          status: 404,
          message: 'Book slug is required.',
          book,
        },
        { status: 200 }
      );
    }

    const result = apiKey
      ? await fetchSunnahPage({
          baseUrl: HADITH_BASE,
          bookSlug: book,
          page: requestPageNum,
          limit: pageLimit,
          apiKey,
        })
      : { ok: false, status: 401, message: 'Missing SUNNAH_API_KEY', rows: [] };

    if (!result.ok) {
      if (result.status === 401 || result.status === 403) {
        const jsonFallback = await fetchFallbackHadiths(book);
        if (jsonFallback.hadiths.length > 0) {
          const start = (requestPageNum - 1) * pageLimit;
          const end = start + pageLimit;
          const pagedFallback = jsonFallback.hadiths.slice(start, end);
          const nextPageFallback = end < jsonFallback.hadiths.length ? requestPageNum + 1 : null;

          return NextResponse.json(
            {
              hadiths: pagedFallback,
              status: 200,
              current_page: requestPageNum,
              next_page_url: nextPageFallback
                ? `/api/hadiths?book=${book}&page=${nextPageFallback}&limit=${pageLimit}`
                : null,
              source: jsonFallback.source,
              book,
              message: 'تم التحويل تلقائيًا إلى مصدر JSON لأن Sunnah API يحتاج مفتاحًا صالحًا.',
            },
            { status: 200 }
          );
        }

        return NextResponse.json(
          {
            hadiths: [],
            status: result.status,
            message: 'Sunnah API authorization failed. Verify SUNNAH_API_KEY.',
            book,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          hadiths: [],
          status: result.status || 404,
          message: result.message || 'Hadiths not found.',
          book,
        },
        { status: 200 }
      );
    }

    const paged = (result.rows || []).map(normalizeHadith);
    const nextPage = paged.length >= pageLimit ? requestPageNum + 1 : null;

    return NextResponse.json({
      hadiths: paged,
      page: requestPageNum,
      limit: pageLimit,
      current_page: requestPageNum,
      next_page_url: nextPage ? `/api/hadiths?book=${book}&page=${nextPage}&limit=${pageLimit}` : null,
      source: 'sunnah-api',
      book,
    });
  } catch (err) {
    console.error('API /api/hadiths error', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
