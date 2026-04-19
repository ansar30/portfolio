'use client';

import React from 'react';
import type { PortfolioData } from '@/lib/portfolio-helpers';

function navLabel(s: { title: string; navLabel?: string }) {
  return (s.navLabel && s.navLabel.trim()) || s.title;
}

function entryCount(section: { type?: string; items?: unknown[]; groups?: unknown[] }) {
  if (section.type === 'grouped-grid') return Array.isArray(section.groups) ? section.groups.length : 0;
  return Array.isArray(section.items) ? section.items.length : 0;
}

type Props = {
  data: PortfolioData;
};

/**
 * Lightweight read-only mirror of the public site (no fixed nav, no Three.js).
 * Updates instantly from Admin state before publish.
 */
export default function PortfolioLivePreview({ data }: Props) {
  const { hero, sections, site } = data;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#070708] text-left text-white shadow-inner">
      {/* Mini nav (not fixed — avoids sticking to the browser viewport) */}
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-zinc-950/95 px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-zinc-900/90">
          {site.nav.logoUrl ? (
            <img
              src={site.nav.logoUrl}
              alt=""
              className="h-full w-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[10px] font-medium tracking-tight text-zinc-300">
              {(site.nav.logoLetter || site.nav.brandName || '?').slice(0, 2).toUpperCase()}
            </span>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-zinc-100">{site.nav.brandName}</p>
          {site.nav.brandTagline ? (
            <p className="mt-0.5 truncate text-[10px] text-zinc-500">{site.nav.brandTagline}</p>
          ) : null}
        </div>
        <span className="hidden shrink-0 text-[10px] text-zinc-500 sm:inline">Preview</span>
      </div>

      <div className="max-h-[min(72vh,640px)] space-y-4 overflow-y-auto overscroll-contain p-4 sm:p-5">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Hero</p>
          <h2 className="mt-2 text-base font-extrabold leading-snug tracking-tight sm:text-lg">
            <span className="text-white">{hero.title1}</span>{' '}
            <span className="text-white/90">{hero.title2}</span>{' '}
            <span className="hero-gradient-text">{hero.gradientTitle}</span>
          </h2>
          <p className="mt-2 line-clamp-5 text-xs leading-relaxed text-gray-400">{hero.description}</p>
          {hero.stats?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {hero.stats.slice(0, 4).map((st, i) => (
                <span
                  key={i}
                  className="rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[10px] text-gray-300"
                >
                  <span className="font-semibold text-white">{st.value}</span> {st.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">Sections</p>
          <ul className="space-y-2">
            {sections.map((s, i) => (
              <li
                key={`${s.id}-${i}`}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white">{s.title}</p>
                  <span className="shrink-0 rounded bg-white/5 px-1.5 py-0.5 text-[9px] uppercase text-gray-500">
                    {s.type}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-gray-500">
                  Nav: <span className="text-gray-400">{navLabel(s)}</span> · {entryCount(s)} entries
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Contact</p>
          <p className="mt-1 truncate text-xs text-gray-400">{hero.email || '—'}</p>
          <p className="truncate text-xs text-gray-400">{hero.phone || '—'}</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">Footer</p>
          <p className="mt-1 text-xs font-bold text-white">
            {site.footer.headline}{' '}
            {site.footer.headlineAccent ? (
              <span className="hero-gradient-text">{site.footer.headlineAccent}</span>
            ) : null}
          </p>
          <p className="mt-1 line-clamp-2 text-[11px] text-gray-500">{site.footer.subline}</p>
        </div>
      </div>
    </div>
  );
}
