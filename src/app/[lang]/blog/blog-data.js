// Language-independent post metadata. Order matches `blogPage.posts` in the
// dictionaries — the localized text (title, excerpt, body…) is joined by index.
export const blogPosts = [
  {
    slug: "how-brands-win-shelf-space-gcc-pharmacies",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "premium-mouth-care-demand-gulf",
    image:
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "compliant-route-to-retail-six-markets",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "modern-trade-vs-traditional-retail",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "product-registration-labeling-gcc",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "signals-brand-ready-gulf-expansion",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
];

export const findPostIndex = (slug) =>
  blogPosts.findIndex((p) => p.slug === slug);
