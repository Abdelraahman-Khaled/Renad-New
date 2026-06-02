"use client";

import { useState } from "react";
import { ArrowRight, BadgeCheck } from "./icons";
import { useLang } from "../[lang]/LangContext";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-shadow duration-200 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function ContactForm() {
  const { dict } = useLang();
  const t = dict.contactForm;
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-slate-100 bg-surface p-10 text-center shadow-card">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <BadgeCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-slate-900">
          {t.thankYouTitle}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          {t.thankYouText}
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 cursor-pointer text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          {t.sendAnother}
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
            {t.fullName}
          </label>
          <input id="name" name="name" type="text" required placeholder={t.namePlaceholder} className={field} />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.company}
          </label>
          <input id="company" name="company" type="text" placeholder={t.companyPlaceholder} className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.email}
          </label>
          <input id="email" name="email" type="email" required placeholder={t.emailPlaceholder} className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.phone} <span className="text-slate-400">{t.phoneOptional}</span>
          </label>
          <input id="phone" name="phone" type="tel" placeholder={t.phonePlaceholder} className={field} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t.messagePlaceholder}
          className={`${field} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark sm:w-auto"
      >
        {t.send}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0" />
      </button>
    </form>
  );
}
