export type SectionType = 'grid' | 'timeline' | 'grouped-grid' | 'list';

export type HeroStat = { value: string; label: string };

export type PortfolioHero = {
  title1: string;
  title2: string;
  gradientTitle: string;
  description: string;
  resumeUrl: string;
  linkedinUrl: string;
  phone: string;
  email: string;
  stats: HeroStat[];
};

export type PortfolioSection = {
  id: string;
  title: string;
  /** If set, shown in navbar instead of title */
  navLabel?: string;
  type: SectionType;
  items?: unknown;
  groups?: unknown;
};

export type SiteNav = {
  brandName: string;
  brandTagline: string;
  /** Public URL e.g. /uploads/portfolio/abc.png — when set, replaces letter mark */
  logoUrl: string;
  /** 1–2 characters when no logo image */
  logoLetter: string;
  homeLabel: string;
  contactLabel: string;
};

export type FooterLink = { label: string; href: string };

export type SiteFooter = {
  headline: string;
  headlineAccent: string;
  subline: string;
  linkColumnTitle: string;
  /** Optional second column (e.g. legal, blog). Hidden if title empty */
  extraColumnTitle: string;
  extraLinks: FooterLink[];
  copyrightNote: string;
  finePrint: string;
};

export type SiteChrome = {
  nav: SiteNav;
  footer: SiteFooter;
};

export type PortfolioData = {
  hero: PortfolioHero;
  sections: PortfolioSection[];
  site: SiteChrome;
};

export const DEFAULT_SITE: SiteChrome = {
  nav: {
    brandName: '',
    brandTagline: '',
    logoUrl: '',
    logoLetter: '',
    homeLabel: 'Home',
    contactLabel: 'Contact',
  },
  footer: {
    headline: '',
    headlineAccent: '',
    subline: '',
    linkColumnTitle: 'On this page',
    extraColumnTitle: '',
    extraLinks: [],
    copyrightNote: '',
    finePrint: '',
  },
};

export function emptyItemsForType(type: SectionType): unknown[] {
  switch (type) {
    case 'grouped-grid':
      return [];
    case 'timeline':
      return [];
    case 'list':
      return [];
    case 'grid':
    default:
      return [];
  }
}

export function emptyGroupsForGroupedGrid() {
  return [
    {
      title: 'New group',
      categories: [{ name: 'Category', skills: [] as string[] }],
    },
  ];
}

export function normalizeSectionOnTypeChange(section: Record<string, unknown>, newType: SectionType) {
  const next = { ...section, type: newType } as Record<string, unknown>;
  delete next.items;
  delete next.groups;
  if (newType === 'grouped-grid') {
    next.groups = emptyGroupsForGroupedGrid();
  } else {
    next.items = emptyItemsForType(newType);
  }
  return next;
}

function normalizeSite(raw: unknown, hero: PortfolioHero): SiteChrome {
  const s = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const nav = (s.nav && typeof s.nav === 'object' ? s.nav : {}) as Record<string, unknown>;
  const foot = (s.footer && typeof s.footer === 'object' ? s.footer : {}) as Record<string, unknown>;

  const brandName = String(nav.brandName ?? '').trim();
  const headline = String(foot.headline ?? '').trim();
  const headlineAccent = String(foot.headlineAccent ?? '').trim();

  return {
    nav: {
      brandName: brandName || [hero.title1, hero.title2].filter(Boolean).join(' ').trim() || 'Portfolio',
      brandTagline: String(nav.brandTagline ?? '').trim() || String(hero.gradientTitle ?? '').trim(),
      logoUrl: String(nav.logoUrl ?? '').trim(),
      logoLetter: String(nav.logoLetter ?? '').trim().slice(0, 2),
      homeLabel: String(nav.homeLabel ?? DEFAULT_SITE.nav.homeLabel).trim() || DEFAULT_SITE.nav.homeLabel,
      contactLabel:
        String(nav.contactLabel ?? DEFAULT_SITE.nav.contactLabel).trim() ||
        DEFAULT_SITE.nav.contactLabel,
    },
    footer: {
      headline: headline || brandName || [hero.title1, hero.title2].filter(Boolean).join(' ').trim() || 'Portfolio',
      headlineAccent: headlineAccent || String(hero.gradientTitle ?? '').trim(),
      subline:
        String(foot.subline ?? '').trim() ||
        'Built with Next.js & Tailwind. Thanks for visiting.',
      linkColumnTitle:
        String(foot.linkColumnTitle ?? DEFAULT_SITE.footer.linkColumnTitle).trim() ||
        DEFAULT_SITE.footer.linkColumnTitle,
      extraColumnTitle: String(foot.extraColumnTitle ?? '').trim(),
      extraLinks: Array.isArray(foot.extraLinks)
        ? (foot.extraLinks as unknown[])
            .map((l) => {
              const x = (l && typeof l === 'object' ? l : {}) as Record<string, unknown>;
              return { label: String(x.label ?? ''), href: String(x.href ?? '') };
            })
            .filter((l) => l.label && l.href)
        : [],
      copyrightNote: String(foot.copyrightNote ?? '').trim(),
      finePrint:
        String(foot.finePrint ?? '').trim() ||
        'Designed for clarity on every screen size.',
    },
  };
}

export function ensurePortfolioShape(data: unknown): PortfolioData {
  const d = (data && typeof data === 'object' ? data : {}) as Record<string, unknown>;
  const heroRaw = (d.hero && typeof d.hero === 'object' ? d.hero : {}) as Record<string, unknown>;
  const hero: PortfolioHero = {
    title1: String(heroRaw.title1 ?? ''),
    title2: String(heroRaw.title2 ?? ''),
    gradientTitle: String(heroRaw.gradientTitle ?? ''),
    description: String(heroRaw.description ?? ''),
    resumeUrl: String(heroRaw.resumeUrl ?? ''),
    linkedinUrl: String(heroRaw.linkedinUrl ?? ''),
    phone: String(heroRaw.phone ?? ''),
    email: String(heroRaw.email ?? ''),
    stats: Array.isArray(heroRaw.stats)
      ? heroRaw.stats.map((s: unknown) => {
          const x = (s && typeof s === 'object' ? s : {}) as Record<string, unknown>;
          return { value: String(x.value ?? ''), label: String(x.label ?? '') };
        })
      : [],
  };

  const sections: PortfolioSection[] = Array.isArray(d.sections)
    ? (d.sections as Record<string, unknown>[]).map((sec) => ({
        ...sec,
        id: String(sec.id ?? ''),
        title: String(sec.title ?? ''),
        navLabel: String(sec.navLabel ?? '').trim(),
        type: (sec.type as SectionType) || 'grid',
      }))
    : [];

  return {
    hero,
    sections,
    site: normalizeSite(d.site, hero),
  };
}
