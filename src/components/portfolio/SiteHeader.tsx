'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { SiteNav } from '@/lib/portfolio-helpers';

export type NavSectionItem = { id: string; title: string; navLabel?: string };

type Props = {
  sections: NavSectionItem[];
  nav: SiteNav;
};

function buildNavItems(sections: NavSectionItem[], homeLabel: string, contactLabel: string) {
  const list: { href: string; label: string }[] = [{ href: '#home', label: homeLabel }];
  for (const s of sections) {
    if (s?.id) {
      const label = (s.navLabel && s.navLabel.trim()) || s.title || 'Section';
      list.push({ href: `#${s.id}`, label });
    }
  }
  list.push({ href: '#contact', label: contactLabel });
  return list;
}

/** Minimal mark: photo or two-letter monogram in a quiet tile */
function BrandMark({ nav }: { nav: SiteNav }) {
  const url = nav.logoUrl?.trim();
  const letter = (nav.logoLetter || nav.brandName || 'P').trim().slice(0, 2).toUpperCase() || 'P';

  return (
    <span className="flex h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/[0.1] bg-zinc-900/90 sm:h-10 sm:w-10 sm:rounded-xl">
      {url ? (
        <img
          src={url}
          alt={nav.brandName ? `${nav.brandName} logo` : 'Site logo'}
          className="h-full w-full object-cover"
          width={40}
          height={40}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-medium tracking-tight text-zinc-200 sm:text-[13px]">
          {letter}
        </span>
      )}
    </span>
  );
}

export default function SiteHeader({ sections, nav }: Props) {
  const [open, setOpen] = useState(false);
  const navItems = buildNavItems(sections, nav.homeLabel, nav.contactLabel);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={[
            'mt-3 flex min-h-[3.25rem] items-center justify-between gap-3 rounded-xl border px-3 py-2 sm:min-h-14 sm:rounded-2xl sm:px-4',
            'border-white/[0.08] bg-black/55 backdrop-blur-xl',
            open ? 'border-white/[0.14]' : '',
          ].join(' ')}
        >
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group flex min-w-0 flex-1 items-center gap-3 sm:gap-3.5 md:max-w-xl md:flex-none lg:max-w-2xl"
          >
            <BrandMark nav={nav} />
            <span className="min-w-0 flex-1 text-left md:flex-none">
              <span className="block truncate text-[0.9375rem] font-medium leading-snug tracking-tight text-zinc-100 sm:text-base">
                {nav.brandName}
              </span>
              {nav.brandTagline ? (
                <span className="mt-0.5 block truncate text-[11px] leading-tight text-zinc-500 sm:text-xs">
                  {nav.brandTagline}
                </span>
              ) : null}
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.05] hover:text-zinc-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 right-4 top-full z-40 mt-2 md:hidden"
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.1] bg-zinc-950/95 py-1 shadow-xl backdrop-blur-xl">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/[0.06] px-4 py-3 text-sm font-medium text-zinc-200 last:border-0 active:bg-white/[0.04]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
