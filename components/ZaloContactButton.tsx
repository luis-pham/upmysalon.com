'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { ZALO_LINK } from '@/lib/constants';
import { ZaloQrModal } from '@/components/ZaloQrModal';

type Props = {
  className?: string;
  children: ReactNode;
  /** Accessible name when children are icon-only. */
  ariaLabel?: string;
};

function isDesktopViewport() {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
}

/**
 * Mobile (&lt;768px): open Zalo profile directly.
 * Desktop/tablet: open QR modal.
 */
export function ZaloContactButton({ className, children, ariaLabel }: Props) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Restore focus after paint so the trigger is interactive again.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
      <a
        ref={triggerRef}
        href={ZALO_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
        className={className}
        onClick={(event) => {
          if (!isDesktopViewport()) return;
          event.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </a>
      {open ? <ZaloQrModal onClose={close} /> : null}
    </>
  );
}
