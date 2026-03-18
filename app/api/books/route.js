import { NextResponse } from 'next/server';

export async function GET(req) {
  const apiKey = "$2y$10$vq3puvEQg4ihwr7D6gcjUe4y2rPHzZejDAy2goE7lwUufFI51Fpi";
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
