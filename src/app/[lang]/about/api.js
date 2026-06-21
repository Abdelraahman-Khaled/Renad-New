import "server-only";

// About-page backend. The `locale` request header selects the language, exactly
// like the blog endpoints.
const API_BASE = "https://backend.renadintl.com";

// Re-fetch at most once every 5 minutes so content edits appear without a
// rebuild, while keeping the page fast and mostly cached.
const REVALIDATE_SECONDS = 300;

// Localized FAQ list shown on the About page. Each entry is
// `{ id, question, answer }` where `answer` is trusted HTML from the CMS.
// Always returns an array so callers can render an empty state instead of
// crashing on a network error or unexpected payload.
export async function getFaqs(lang) {
  try {
    const res = await fetch(`${API_BASE}/faq_about_us`, {
      headers: { locale: lang },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
