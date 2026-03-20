import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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
  let apiKey = process.env.HADITH_API_KEY || process.env.NEXT_PUBLIC_HADITH_API_KEY;
  if (!apiKey) {
    apiKey = await readEnvFallback('HADITH_API_KEY');
  }
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing HADITH_API_KEY' }, { status: 500 });
  }
  const url = `https://hadithapi.com/api/books?apiKey=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
