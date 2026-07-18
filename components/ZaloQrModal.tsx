'use client';

import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { ZALO_LINK, ZALO_QR_URL } from '@/lib/constants';

type Props = {
  onClose: () => void;
};

export function ZaloQrModal({ onClose }: Props) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/55 px-5 animate-[ums-modal-backdrop_180ms_ease-out]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[420px] rounded-[1.75rem] border border-roseNude/20 bg-cream p-6 shadow-soft animate-[ums-modal-panel_220ms_cubic-bezier(0.22,1,0.36,1)] sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-ink/55 transition hover:bg-roseSoft hover:text-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-blush/40"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-8 text-center">
          <h2 id={titleId} className="text-2xl font-semibold text-ink">
            Nhắn Zalo với UpMySalon
          </h2>
          <p className="mt-3 text-base leading-7 text-black/62">
            Quét mã bằng điện thoại để nhắn với tụi em bằng tiếng Việt.
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-[240px] items-center justify-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:w-[260px]">
          {/* Native img keeps QR sharp; avoid next/image crop/compression. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ZALO_QR_URL}
            alt="Mã QR Zalo của UpMySalon"
            width={220}
            height={220}
            className="h-auto w-full object-contain"
            decoding="async"
          />
        </div>

        <p className="mt-6 text-center text-sm">
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-roseNude underline-offset-2 transition hover:text-ink hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-blush/40"
          >
            Không quét được? Mở Zalo tại đây
          </a>
        </p>
      </div>
    </div>
  );
}
