'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = { q: string; a: string } | [string, string];

export function FaqAccordion({
  eyebrow,
  heading,
  items,
}: {
  eyebrow?: string;
  heading: string;
  items: FaqItem[];
}) {
  const [openFaq, setOpenFaq] = useState(0);
  const normalized = items.map((item) => (Array.isArray(item) ? { q: item[0], a: item[1] } : item));

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-roseNude">{eyebrow}</p>}
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{heading}</h2>
        </div>
        <div className="mt-10 space-y-4">
          {normalized.map(({ q, a }, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={q} className="overflow-hidden rounded-3xl border border-black/6 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-lg font-semibold sm:p-6"
                  aria-expanded={isOpen}
                >
                  {q}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <div className="px-5 pb-6 text-base leading-7 text-black/65 sm:px-6">{a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
