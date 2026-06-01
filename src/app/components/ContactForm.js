"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck } from "./icons";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-shadow duration-200 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-slate-100 bg-surface p-10 text-center shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <BadgeCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
          Thank you — message received
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          A member of our team will get back to you shortly to discuss bringing
          your brand to the GCC.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 cursor-pointer text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
            Full name
          </label>
          <input id="name" name="name" type="text" required placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
            Company / Brand
          </label>
          <input id="company" name="company" type="text" placeholder="Company name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            Phone <span className="text-slate-400">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" placeholder="+971 …" className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your brand and which GCC markets you're targeting…"
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark sm:w-auto"
      >
        Send message
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
