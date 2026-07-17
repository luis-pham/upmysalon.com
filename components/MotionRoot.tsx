'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL = 'ums-reveal';
const VISIBLE = 'is-visible';
const ITEM = 'ums-reveal-item';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    if (prefersReducedMotion()) {
      main.querySelectorAll(`.${REVEAL}`).forEach((el) => el.classList.add(VISIBLE));
      return;
    }

    const sections = Array.from(main.querySelectorAll('section'));
    const targets = new Set<Element>();

    sections.forEach((section, index) => {
      // First section (hero) stays immediate; the rest reveal on scroll.
      if (index === 0) return;
      section.classList.add(REVEAL);
      targets.add(section);

      const items = section.querySelectorAll(
        ':scope .grid > a.rounded-3xl, :scope .grid > div.rounded-3xl, :scope .grid > article'
      );
      items.forEach((item, i) => {
        item.classList.add(ITEM);
        (item as HTMLElement).style.setProperty('--ums-delay', `${Math.min(i * 60, 240)}ms`);
      });
    });

    // Explicit opt-in markers (demos, nested blocks)
    main.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add(REVEAL);
      targets.add(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(VISIBLE);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
