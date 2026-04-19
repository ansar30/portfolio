'use client';

import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import type { SiteFooter as SiteFooterModel } from '@/lib/portfolio-helpers';

type HeroSubset = {
  email?: string;
  linkedinUrl?: string;
};

type NavSection = { id: string; title: string; navLabel?: string };

type Props = {
  sections: NavSection[];
  hero: HeroSubset;
  footer: SiteFooterModel;
};

function navLabel(s: NavSection) {
  return (s.navLabel && s.navLabel.trim()) || s.title;
}

export default function SiteFooter({ sections, hero, footer }: Props) {
  const year = new Date().getFullYear();
  const showExtra = Boolean(footer.extraColumnTitle?.trim() && footer.extraLinks?.length);

  return (
    <footer className="mt-10 border-t border-white/[0.08] bg-black/50 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-10 backdrop-blur-md sm:mt-12 md:pb-12 md:pt-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="text-lg font-bold tracking-tight sm:text-xl">
              {footer.headlineAccent ? (
                <>
                  {footer.headline ? (
                    <span className="text-white [text-shadow:0_1px_20px_rgba(0,0,0,0.35)]">{footer.headline} </span>
                  ) : null}
                  <span className="hero-gradient-text">{footer.headlineAccent}</span>
                </>
              ) : (
                <span className="text-white [text-shadow:0_1px_20px_rgba(0,0,0,0.35)]">{footer.headline}</span>
              )}
            </p>
            {footer.subline ? (
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{footer.subline}</p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-2">
              {hero.linkedinUrl ? (
                <a
                  href={hero.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-indigo-500/40 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              ) : null}
              {hero.email ? (
                <a
                  href={`mailto:${hero.email}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-300 transition hover:border-indigo-500/40 hover:text-white"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div
            className={`grid gap-10 ${showExtra ? 'grid-cols-1 sm:grid-cols-2 lg:gap-16' : 'grid-cols-1 sm:max-w-xs'}`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                {footer.linkColumnTitle}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
                <li>
                  <a href="#home" className="transition hover:text-white">
                    Home
                  </a>
                </li>
                {sections.slice(0, 8).map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="transition hover:text-white">
                      {navLabel(s)}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="transition hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {showExtra ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {footer.extraColumnTitle}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
                  {footer.extraLinks.map((l, i) => (
                    <li key={`${l.href}-${i}`}>
                      <a href={l.href} className="transition hover:text-white" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-8 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year}
            {footer.copyrightNote ? ` ${footer.copyrightNote}` : ' All rights reserved.'}
          </p>
          {footer.finePrint ? <p className="text-gray-600">{footer.finePrint}</p> : null}
        </div>
      </div>
    </footer>
  );
}
