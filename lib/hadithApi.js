const BASE_URL = "/api";

// -----------------------------------
// Build URL
// -----------------------------------
function buildUrl(endpoint, params = {}) {
  let cleanEndpoint = endpoint.startsWith("/") ? endpoint : "/" + endpoint;
  // Do NOT add trailing slash for local API
  const url = new URL(BASE_URL + cleanEndpoint, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
}

// -----------------------------------
// Generic fetch
// -----------------------------------
async function fetchAPI(endpoint, params = {}) {
  const url = buildUrl(endpoint, params);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json();
}

// -----------------------------------
// Public Functions
// -----------------------------------

// Get all books
export async function getBooks() {
  const data = await fetchAPI("/books");
  return Array.isArray(data) ? data : (data?.books || []);
}

// Get all hadiths of a book
export async function getHadithsByBook(bookSlug, options = {}) {
  const { all = true, limit = 100, maxPages, expectedCount } = options;
  const effectivePageSize = 25;
  const computedMaxPages = Number.isFinite(Number(expectedCount)) && Number(expectedCount) > 0
    ? Math.ceil(Number(expectedCount) / effectivePageSize) + 1
    : 10;
  // Cap requests, while still allowing near-full fetches for large books.
  const safeMaxPages = Math.min(Number(maxPages || computedMaxPages), 220);
  const data = await fetchAPI("/hadiths", { book: bookSlug, all: all ? 1 : 0, limit, maxPages: safeMaxPages });
  return {
    hadiths: data?.hadiths || [],
    source: data?.source || "primary",
    message: data?.message || null,
    rateLimited: !!data?.rateLimited,
  };
}
