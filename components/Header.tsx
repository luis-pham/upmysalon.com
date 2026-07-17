'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV_LINKS, SERVICE_LINKS } from '@/lib/constants';

function navClass(isActive: boolean, highlight = false) {
  if (highlight) {
    return `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? 'bg-ink text-cream'
        : 'bg-roseNude/15 text-roseNude hover:bg-ink hover:text-cream'
    }`;
  }
  return `text-sm font-semibold transition hover:text-roseNude ${isActive ? 'text-roseNude' : 'text-ink/75'}`;
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const serviceActive = SERVICE_LINKS.some((item) => pathname === item.href);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="UpMySalon trang chủ">
          {/* Brand kit: header mobile 32–36px, desktop 40–48px — bumped slightly for presence */}
          <img
            src="/brand/logo-horizontal.svg"
            alt="UpMySalon"
            className="h-10 w-auto sm:h-11 md:h-12"
          />
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                className={`inline-flex items-center gap-1 text-sm font-semibold transition hover:text-roseNude ${
                  serviceActive || servicesOpen ? 'text-roseNude' : 'text-ink/75'
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Dịch vụ
                <ChevronDown className={`h-4 w-4 transition ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="absolute right-0 top-full z-50 mt-3 min-w-[220px] overflow-hidden rounded-2xl border border-black/8 bg-white py-2 shadow-soft">
                  {SERVICE_LINKS.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        className={`block px-4 py-2.5 text-sm font-semibold transition hover:bg-cream hover:text-roseNude ${
                          isActive ? 'bg-cream text-roseNude' : 'text-ink/80'
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {NAV_LINKS.map(({ href, label, highlight }) => (
              <Link key={href} href={href} className={navClass(pathname === href, Boolean(highlight))}>
                {label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-black/8 bg-white text-ink lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-black/5 bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Menu điện thoại">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((open) => !open)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-semibold ${
                serviceActive || mobileServicesOpen ? 'bg-white text-roseNude' : 'text-ink/80'
              }`}
              aria-expanded={mobileServicesOpen}
            >
              Dịch vụ
              <ChevronDown className={`h-4 w-4 transition ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-2 flex flex-col gap-1 border-l border-roseNude/20 pl-3">
                {SERVICE_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      pathname === href ? 'bg-white text-roseNude' : 'text-ink/70'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {NAV_LINKS.map(({ href, label, highlight }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold ${
                    highlight
                      ? isActive
                        ? 'bg-ink text-cream'
                        : 'bg-roseNude/15 text-roseNude'
                      : isActive
                        ? 'bg-white text-roseNude'
                        : 'text-ink/80'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
