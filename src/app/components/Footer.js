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

const menu = [
  { label: "Company", href: "#about" },
  { label: "Our Brands", href: "#brands" },
  { label: "Distribution", href: "#how-we-work" },
  { label: "Why Renad", href: "#why" },
  { label: "Partner with Us", href: "#contact" },
];

const markets = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

const socials = [
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: XTwitter, label: "X" },
  { Icon: Instagram, label: "Instagram" },
];

export default function Footer() {
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
              Renad International Trading FZCO — a UAE-based distribution partner
              connecting global consumer brands with retail networks across the
              GCC.
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
            <h3 className="font-display text-lg font-semibold text-white">Menu</h3>
            <ul className="mt-5 space-y-3">
              {menu.map((m) => (
                <li key={m.label}>
                  <a
                    href={m.href}
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
            <h3 className="font-display text-lg font-semibold text-white">Markets</h3>
            <ul className="mt-5 space-y-3">
              {markets.map((m) => (
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
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3 text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                <span>Dubai Silicon Oasis, Dubai, United Arab Emirates</span>
              </li>
              <li>
                <a
                  href="mailto:partners@renadtrading.com"
                  className="flex items-center gap-3 text-white/70 transition-colors duration-200 hover:text-cta"
                >
                  <Mail className="h-4 w-4 shrink-0 text-cta" />
                  partners@renadtrading.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+97140000000"
                  className="flex items-center gap-3 text-white/70 transition-colors duration-200 hover:text-cta"
                >
                  <Phone className="h-4 w-4 shrink-0 text-cta" />
                  +971 4 000 0000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row">
          <p>© 2026 Renad International Trading FZCO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-200 hover:text-cta">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-cta">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
