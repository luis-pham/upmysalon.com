'use client';

import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroSlide } from '@/content/hero';

const INTERVAL_MS = 4500;
const SWIPE_THRESHOLD = 40;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      const len = slides.length;
      setIndex(((next % len) + len) % len);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  function onTouchStart(event: TouchEvent) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta < 0) next();
    else prev();
  }

  const active = slides[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute -left-6 top-10 h-28 w-28 rounded-full bg-blush/30 blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.src} className="relative w-full shrink-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1400}
                height={1750}
                priority={i === 0}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>
          ))}
        </div>

        <Link
          href={active.href}
          className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/70 bg-white/92 p-4 shadow-soft backdrop-blur transition hover:bg-white sm:left-8 sm:right-auto sm:max-w-xs"
        >
          <p className="font-semibold leading-6 text-ink">{active.caption}</p>
          <p className="mt-1 text-sm font-semibold text-roseNude">Xem dịch vụ →</p>
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Ảnh hero">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Ảnh ${i + 1}: ${slide.caption}`}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition ${
              i === index ? 'w-7 bg-roseNude' : 'w-2.5 bg-ink/20 hover:bg-ink/35'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
