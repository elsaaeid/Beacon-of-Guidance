import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const HADITH_BASE = 'https://hadithapi.com/api';

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

    let API_KEY = process.env.HADITH_API_KEY || process.env.NEXT_PUBLIC_HADITH_API_KEY;
    if (!API_KEY) {
      // attempt to read .env.local as a fallback so devs don't always need to restart
      API_KEY = await readEnvFallback('HADITH_API_KEY');
    }
    console.log('/api/hadiths - HADITH_API_KEY present:', !!API_KEY);
    if (!API_KEY) {
      return NextResponse.json({ error: 'Missing server-side HADITH_API_KEY — ensure .env.local contains HADITH_API_KEY and restart dev server' }, { status: 500 });
    }

    const url = new URL(`${HADITH_BASE}/hadiths`);
    if (book) url.searchParams.set('book', book);
    if (page) url.searchParams.set('page', page);
    if (limit) url.searchParams.set('limit', limit);
    url.searchParams.set('apiKey', API_KEY);

    const res = await fetch(url.toString(), { method: 'GET' });
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: res.status });
    } catch (e) {
      return NextResponse.text(text, { status: res.status });
    }
  } catch (err) {
    console.error('API /api/hadiths error', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
