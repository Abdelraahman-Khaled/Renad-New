import "server-only";

// Products backend. The `locale` request header selects the language; product
// text (description, size) is returned already localized.
const PRODUCTS_API_BASE = "https://backend.renadintl.com";

// Re-fetch at most once every 5 minutes so catalogue changes appear without a
// rebuild, while keeping the page fast and mostly cached.
const REVALIDATE_SECONDS = 300;

async function apiFetch(path, lang) {
  try {
    const res = await fetch(`${PRODUCTS_API_BASE}${path}`, {
      headers: { locale: lang },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Paginated product list for a locale. Always returns a usable shape so callers
// can render an empty state instead of crashing on a network error.
export async function getProducts(lang, page = 1) {
  const data = await apiFetch(`/products_website?page=${page}`, lang);
  return {
    products: Array.isArray(data?.products) ? data.products : [],
    pagination: data?.pagination ?? null,
  };
}
