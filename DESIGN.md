# Renad International Trading — DESIGN.md

> Design system for the Renad website. Reference this file when building or refining UI so every page stays visually consistent. Format adapted from the `awesome-design-md` (Stitch) 9-section spec, mapped to Renad's brand.

---

## 1. Visual Theme & Atmosphere

Premium, executive, regional. Renad is a **GCC distribution leader** — trusted by global brands, not a startup and not a logistics service. The feel: clean editorial layouts, generous whitespace, confident large headings, soft depth, and disciplined use of two brand colors. References: DP World / Maersk (trust & scale), Stripe (spacing & hierarchy), Apple (product presentation).

---

## 2. Color Palette & Roles

Brand colors are drawn from the Renad logo: a teal-cyan wordmark + a red monogram.

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Primary | `primary` | `#1799BC` | Links, primary buttons, icons, stat figures, highlighted cards |
| Primary Deep | `primary-dark` | `#0B5C72` | Dark sections (map, footer, headers), gradients, hover |
| Secondary | `secondary` | `#34B7D6` | Gradient stops, light accents |
| CTA / Accent | `cta` | `#E0241C` | Filled CTAs, highlighted heading words, dots, tags, "Soon" |
| CTA Deep | `cta-dark` | `#BC1C15` | CTA hover/press |
| Surface | `surface` | `#EAF6FA` | Tinted section backgrounds, soft cards, pills |
| Ink | `ink` | `#0F2A36` | Default heading color |
| Hairline | `line` | `#E3EAF0` | 1px borders (use `slate-100/200` interchangeably) |

**Product-brand colors** (independent of Renad chrome): PaperMints green `#1F9D57`, TUNG blue `#1C8FD6`. Use only inside their own product visuals/spotlights.

**Rule:** one filled CTA per band. Never use `cta` red as body text. Don't introduce accent colors outside this list (product hues excepted).

---

## 3. Typography

- **Display / headings:** Poppins (`--font-display`), weight 600–800, `letter-spacing: -0.02em`, tight leading (`leading-[1.1]`).
- **Body:** Open Sans (`--font-sans`), weight 400–500, `leading-relaxed`.
- **Arabic (RTL):** Tajawal (`--font-tajawal`, applied via `.font-arabic` on `<body lang="ar">`), weights 300–700. Used for both headings and body when `dir="rtl"` — Poppins/Open Sans have no Arabic glyphs. Drop the negative `letter-spacing` in Arabic (reset to `0`); Tajawal has no 600 weight (use 500 or 700).

| Role | Tailwind | Notes |
|------|----------|-------|
| Display | `text-5xl`–`text-7xl font-bold` | Hero / page headers |
| H2 | `text-4xl sm:text-5xl font-bold` | Section titles |
| H3 | `text-lg`–`text-2xl font-bold` | Card titles |
| Eyebrow | `text-base font-semibold uppercase tracking-[0.18em] text-cta` | Above every section H2 |
| Body | `text-base`–`text-lg leading-relaxed text-slate-500` | Paragraphs |
| Caption | `text-xs`–`text-sm text-slate-400` | Meta, labels |

Highlight one phrase per heading in `text-primary` (or `text-cta` on dark).

---

## 4. Component Stylings

- **Buttons:** pill (`rounded-full`), `px-6/7 py-3/3.5`, `text-sm font-semibold`, `transition-colors duration-200`.
  - Primary: `bg-primary text-white hover:bg-primary-dark` (on dark: `bg-cta hover:bg-cta-dark`).
  - Secondary: `border border-slate-200 text-navy hover:border-primary hover:text-primary` (or `border-white/30` on dark).
  - Always `cursor-pointer`; include an arrow that nudges on hover (`group-hover:translate-x-0.5`).
- **Cards:** `rounded-3xl border border-slate-100 bg-white shadow-card`, padding `p-7/8`, hover `hover:shadow-lift`. Highlighted card: `bg-primary text-white`.
- **Inputs:** `rounded-xl border border-slate-200 px-4 py-3 text-sm`, focus `focus:border-primary focus:ring-2 focus:ring-primary/30`. Always pair with a `<label>`.
- **Pills/tags:** `rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary-dark` (or `bg-cta/10 text-cta`).
- **Nav:** floating pill, transparent over dark heroes → solid white on scroll.

---

## 5. Layout Principles

- Container: `max-w-7xl mx-auto px-6 lg:px-10`.
- Section padding: `py-24` (compact `py-16`, hero/dark `py-28`).
- Grid gaps: cards `gap-6`, dense `gap-4/5`.
- Centered headers: `max-w-2xl mx-auto text-center`; two-column editorial: `lg:grid-cols-2 gap-16`.
- Alternate section backgrounds: `white` ↔ `surface`, with `primary-dark` for premium dark breaks.

---

## 6. Depth & Elevation

Brand-tinted, layered, soft (defined in `globals.css`):
- `--shadow-card`: `0 1px 2px rgba(11,92,114,.05), 0 6px 18px rgba(11,92,114,.07)` — resting cards.
- `--shadow-lift`: `0 2px 6px rgba(11,92,114,.06), 0 20px 44px rgba(11,92,114,.13)` — hover / floating panels / modals.
- Radii: cards `rounded-3xl`, inputs/icons `rounded-xl/2xl`, buttons/pills `rounded-full`, hero panel `rounded-3xl`.

---

## 7. Do's and Don'ts

**Do:** keep one filled CTA per band · use SVG icons (1.75 stroke) not emojis · `cursor-pointer` + smooth 150–300ms transitions on all interactive elements · maintain 4.5:1 text contrast · visible `:focus-visible` rings · reveal sections on scroll (GSAP) but respect reduced-motion · keep product brand colors inside product contexts.

**Don't:** introduce new accent colors · use red for body text · use heavy/black flat shadows · ship layout-shifting hover (scale that reflows) · leave icon-only buttons without `aria-label` · let logistics/freight imagery dominate (products & distribution lead, ≤10% logistics).

---

## 8. Responsive Behavior

- Breakpoints: Tailwind `sm 640 · md 768 · lg 1024 · xl 1280`.
- Mobile: single column; nav collapses to a hamburger; display type steps down (`text-7xl → text-4xl`).
- Touch targets ≥ 44px on mobile. No horizontal scroll except intentional carousels (testimonials, hero).

---

## 9. Agent Prompt Guide

When prompting for new UI: *"Build a [section] for Renad — premium GCC distribution. Use teal `#1799BC` primary + red `#E0241C` CTA, Poppins headings (tight `-0.02em`) + Open Sans body, `rounded-3xl` white cards with `shadow-card`, pill buttons, `surface #EAF6FA` tinted background, one filled CTA, eyebrow in uppercase red above the H2, reveal-on-scroll."*
