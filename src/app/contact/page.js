import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import { MapPin, Mail, Phone, Linkedin, XTwitter, Instagram } from "../components/icons";

export const metadata = {
  title: "Contact Us — Renad International Trading",
  description:
    "Get in touch with Renad International Trading to bring your consumer brand to retail and pharmacy networks across the GCC.",
};

const details = [
  {
    Icon: MapPin,
    label: "Office",
    value: "Dubai Silicon Oasis, Dubai, United Arab Emirates",
    href: null,
  },
  {
    Icon: Mail,
    label: "Email",
    value: "partners@renadtrading.com",
    href: "mailto:partners@renadtrading.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+971 4 000 0000",
    href: "tel:+97140000000",
  },
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

export default function ContactPage() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Contact Us"
          title="Let's bring your brand to the Gulf"
          subtitle="Tell us about your brand and the markets you're targeting — our team will map the route to retail."
          crumb="Contact"
        />

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10">
            {/* Form */}
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                Send us a message
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                Fill in the form and we&apos;ll get back to you within two
                business days.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-slate-100 bg-surface p-8 shadow-card">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Get in touch
                </h3>
                <ul className="mt-6 space-y-5">
                  {details.map(({ Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {label}
                        </span>
                        {href ? (
                          <a
                            href={href}
                            className="font-display text-base font-semibold text-slate-800 transition-colors hover:text-primary"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="font-display text-base font-semibold text-slate-800">
                            {value}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-slate-200 pt-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Follow us
                  </span>
                  <div className="mt-3 flex gap-3">
                    {socials.map(({ Icon, label }) => (
                      <a
                        key={label}
                        href="#"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-colors duration-200 hover:bg-primary hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Markets */}
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Markets we serve
                </h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {markets.map((m) => (
                    <span
                      key={m}
                      className="rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-primary-dark"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
