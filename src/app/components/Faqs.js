"use client";

import { useId, useState } from "react";
import { ChevronDown } from "./icons";

// Accordion of frequently asked questions. `faqs` is the API shape
// `{ id, question, answer }` where `answer` is trusted HTML from the CMS.
// The first item starts open so the section never reads as empty.
export default function Faqs({ faqs, dict }) {
  const t = dict.aboutPage;
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);
  const baseId = useId();

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <div className="text-center">
          <span className="text-base font-semibold uppercase tracking-[0.18em] text-cta">
            {t.faqsEyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
            {t.faqsHeading}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => {
            const isOpen = faq.id === openId;
            const panelId = `${baseId}-panel-${faq.id}`;
            const buttonId = `${baseId}-button-${faq.id}`;
            return (
              <div key={faq.id}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-start"
                  >
                    <span className="font-display text-lg font-semibold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-6 text-base leading-relaxed text-slate-500 [&_a]:text-primary [&_a]:underline [&_li]:my-1 [&_ol]:list-decimal [&_ol]:ps-5 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ps-5"
                  // Content comes from the trusted in-house CMS backend.
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
