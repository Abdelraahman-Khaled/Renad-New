"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Mail, ArrowRight, BadgeCheck, X } from "./icons";

const cardClass =
  "group flex flex-col rounded-3xl border border-slate-100 bg-white p-8 shadow-card transition-shadow duration-300 hover:shadow-lift";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-shadow duration-200 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30";

// Card for a "coming soon" product category. Clicking the card opens a popup
// where the visitor can leave an email to be notified at launch. There is no
// subscription backend yet, so submission confirms locally (like ContactForm).
export default function NotifyCard({ title, comingSoon, notify, children }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  // Close on Escape and lock background scroll while the popup is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className={`${cardClass}${sent ? "" : " cursor-pointer"}`}
        onClick={sent ? undefined : () => setOpen(true)}
        onKeyDown={
          sent
            ? undefined
            : (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(true);
                }
              }
        }
        role={sent ? undefined : "button"}
        tabIndex={sent ? undefined : 0}
        aria-label={sent ? undefined : `${notify.cta} — ${title}`}
      >
        {children}

        <div className="mt-auto pt-8">
          <div className="border-t border-slate-100 pt-5">
            {sent ? (
              <p className="flex items-center gap-2 text-sm font-medium text-primary-dark">
                <BadgeCheck className="h-5 w-5 shrink-0" />
                {notify.success}
              </p>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark">
                  {comingSoon}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-primary-dark">
                  <Mail className="h-4 w-4" />
                  {notify.cta}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${notify.cta} — ${title}`}
          >
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-lift sm:p-10">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={notify.close}
                className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 rtl:left-4 rtl:right-auto"
              >
                <X className="h-5 w-5" />
              </button>

              {sent ? (
                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                    <BadgeCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
                    {notify.success}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 cursor-pointer text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {notify.close}
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">
                    {notify.cta}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {title} — {notify.subtitle}
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                    className="mt-6 space-y-3"
                  >
                    <input
                      type="email"
                      name="email"
                      required
                      autoFocus
                      aria-label={notify.placeholder}
                      placeholder={notify.placeholder}
                      className={field}
                    />
                    <button
                      type="submit"
                      className="group/btn inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
                    >
                      {notify.submit}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 ltr:group-hover/btn:translate-x-0.5 rtl:rotate-180 rtl:group-hover/btn:-translate-x-0.5" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
