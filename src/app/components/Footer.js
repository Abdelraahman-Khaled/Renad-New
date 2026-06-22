import Image from "next/image";
import Logo from "./Logo";
import {
  Linkedin,
  XTwitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
} from "./icons";

const socials = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: XTwitter, label: "X" },
  { Icon: Instagram, label: "Instagram" },
];

// tel: needs a clean number (digits + leading +), no spaces
const telHref = (v) => `tel:${v.replace(/[^\d+]/g, "")}`;

export default function Footer({ dict, lang }) {
  const t = dict.footer;

  // Menu items use locale-relative paths (/about, /products, ...) — prefix
  // them with the active locale, matching the navbar links.
  const resolveHref = (href) =>
    href.startsWith("/") ? `/${lang}${href}` : href;

  return (
    <footer id="footer" className="relative overflow-hidden bg-primary-dark text-white/80">
      <Image
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-primary-dark/85" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + social */}
          <div>
            <div className="inline-flex rounded-xl bg-white/95 p-3">
              <Logo />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              {t.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-cta"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{t.menuTitle}</h3>
            <ul className="mt-5 space-y-3">
              {t.menuItems.map((m) => (
                <li key={m.label}>
                  <a
                    href={resolveHref(m.href)}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-cta"
                  >
                    {m.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">{t.marketsTitle}</h3>
            <ul className="mt-5 space-y-3">
              {t.markets.map((m) => (
                <li key={m} className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin className="h-4 w-4 shrink-0 text-cta" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              {t.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                <span>{t.address}</span>
              </li>
              <li className="flex gap-3 text-white/70">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                <span className="flex min-w-0 flex-col gap-1">
                  {t.emails.map((email) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="wrap-break-word transition-colors duration-200 hover:text-cta"
                    >
                      <bdi dir="ltr">{email}</bdi>
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3 text-white/70">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                <span className="flex flex-col gap-1">
                  {t.phones.map((phone) => (
                    <a
                      key={phone}
                      href={telHref(phone)}
                      className="transition-colors duration-200 hover:text-cta"
                    >
                      <bdi dir="ltr">{phone}</bdi>
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row">
          <p>{t.copyright}</p>
          <div className="flex gap-6">
            <a
              href={`/${lang}/privacy`}
              className="transition-colors duration-200 hover:text-cta"
            >
              {t.privacy}
            </a>
            <a
              href={`/${lang}/terms`}
              className="transition-colors duration-200 hover:text-cta"
            >
              {t.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
