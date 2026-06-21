import "server-only";

// Blog backend. The `locale` request header selects the language. IMPORTANT:
// slugs are locale-specific — the same blog has a different slug per language —
// so always build links from the slug returned for the active locale, and query
// `blog_show` with the matching locale.
const BLOG_API_BASE = "https://backend.renadintl.com";

// Re-fetch blog data at most once every 5 minutes so editorial changes appear
// without a rebuild, while keeping pages fast and mostly cached.
const REVALIDATE_SECONDS = 300;

// Used when a blog has no photo of its own (the detail endpoint often returns an
// empty `landing_photo`, and list items may lack `photos`).
export const FALLBACK_IMAGE = "/images/blog-hero.png";

async function blogFetch(path, lang) {
  try {
    const res = await fetch(`${BLOG_API_BASE}${path}`, {
      headers: { locale: lang },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    // The backend answers a missing slug with a 5xx rather than a 404, so any
    // non-OK status is treated as "no data" by callers.
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Paginated list of blogs for a locale. Always returns a usable shape so callers
// can render an empty state instead of crashing on a network error.
export async function getBlogs(lang, page = 1) {
  const data = await blogFetch(`/blogs_landing?page=${page}`, lang);
  return {
    blogs: Array.isArray(data?.blogs) ? data.blogs : [],
    pagination: data?.pagination ?? null,
  };
}

// A single blog by its (locale-specific) slug. Returns null when missing.
export async function getBlog(lang, slug) {
  // The route `slug` param can arrive already URL-encoded (Next.js passes the
  // raw segment to `generateMetadata`) or decoded (in the page component).
  // Decode first, then encode exactly once, so the backend always receives the
  // real slug rather than a double-encoded one.
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Malformed escape sequence — fall back to the slug as given.
  }
  return blogFetch(`/blog_show?slug=${encodeURIComponent(decoded)}`, lang);
}

// Best photo URL for a list item, falling back to the bundled hero image.
export function blogImage(blog) {
  return blog?.photos?.[0]?.url || FALLBACK_IMAGE;
}

export function blogImageAlt(blog) {
  return blog?.photos?.[0]?.alt || "";
}

// Hero image for a blog detail page. The detail endpoint's `landing_photo` is
// often empty, so fall back to the matching list item's first photo, then to the
// bundled hero image. Handles `landing_photo` being either an array or object.
export function blogHeroImage(post, listBlogs = []) {
  const landing = post?.landing_photo;
  const landingUrl = Array.isArray(landing) ? landing[0]?.url : landing?.url;
  const listMatch = listBlogs.find((b) => b.slug === post?.slug);
  return landingUrl || listMatch?.photos?.[0]?.url || FALLBACK_IMAGE;
}

// Turn an API category enum (e.g. "digital_marketing") into a display label.
// Prefers a localized label from the dictionary, otherwise title-cases the key.
export function categoryLabel(category, dict) {
  if (!category) return "";
  const localized = dict?.blogPage?.categories?.[category];
  if (localized) return localized;
  return category
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
