"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import ThreeBackground from '../components/three/ThreeBackground';
import TiltCard from '../components/three/TiltCard';
import SiteHeader from '../components/portfolio/SiteHeader';
import ContactPanel from '../components/portfolio/ContactPanel';
import SiteFooter from '../components/portfolio/SiteFooter';
import defaultPortfolio from '../data/defaultPortfolio.json';
import { ensurePortfolioShape } from '@/lib/portfolio-helpers';

// --- Mini Section Components ---

const sectionHeading =
  'mb-8 flex flex-col gap-3 px-0.5 sm:mb-12 sm:flex-row sm:items-baseline sm:gap-x-4 md:mb-16';

const TimelineSection = ({ section }: { section: any }) => {
  const items = section.items || [];
  return (
    <section id={section.id} className="mb-14 scroll-mt-28 sm:mb-20 md:mb-32 md:scroll-mt-36 lg:mb-40">
      <div className={sectionHeading}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          {section.title}
        </motion.h2>
        <div className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block"></div>
      </div>

      {/* Rail + dots share one gutter column so alignment is stable at every breakpoint */}
      <div className="relative mt-4 sm:mt-6">
        {items.length > 0 ? (
          <div
            aria-hidden
            className="pointer-events-none absolute left-[1.25rem] top-4 bottom-4 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400/45 via-white/14 to-white/[0.06] sm:left-[1.5rem] sm:top-5 sm:bottom-5"
          />
        ) : null}
        <ul className="relative m-0 list-none space-y-8 p-0 sm:space-y-10 md:space-y-12">
          {items.map((item: any, index: number) => (
            <li
              key={index}
              className="relative m-0 grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-4 md:gap-x-6"
            >
              <div className="relative z-[1] flex justify-center self-start pt-[1.35rem] sm:pt-7 md:pt-8">
                <span
                  className="block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-indigo-400 bg-[#09090b] shadow-[0_0_0_3px_#09090b,0_0_16px_rgba(129,140,248,0.5)] sm:h-4 sm:w-4 md:h-[1.05rem] md:w-[1.05rem]"
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="group"
                >
                  <TiltCard className="border border-white/10 rounded-2xl bg-white/[0.02] p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6 md:p-8" intensity={2}>
                    <div className="mb-4 flex flex-col justify-between gap-2 md:mb-6 md:flex-row md:items-center md:gap-0">
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">{item.title}</h3>
                        {item.subtitle ? (
                          <p className="mt-0.5 text-sm font-medium text-indigo-300/95 sm:text-base md:text-lg">
                            {item.subtitle}
                          </p>
                        ) : null}
                      </div>
                      {item.date ? (
                        <span className="w-fit shrink-0 rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium sm:text-sm">
                          {item.date}
                        </span>
                      ) : null}
                    </div>
                    {item.bullets ? (
                      <ul className="space-y-2.5 sm:space-y-3">
                        {item.bullets.map((bullet: string, i: number) => (
                          <li
                            key={i}
                            className="group/li flex items-start text-sm leading-relaxed text-gray-400 sm:text-base"
                          >
                            <span className="mr-2.5 mt-1.5 shrink-0 text-indigo-400 transition-transform group-hover/li:scale-110 sm:mr-3">
                              ▹
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </TiltCard>
                </motion.div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const GroupedGridSection = ({ section }: { section: any }) => (
  <section id={section.id} className="mb-14 scroll-mt-28 sm:mb-20 md:mb-32 md:scroll-mt-36 lg:mb-40">
    <div className={sectionHeading}>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
      >
        {section.title}
      </motion.h2>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block"></div>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {section.groups?.map((group: any, idx: number) => (
        <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
          <TiltCard className="border border-white/10 rounded-2xl bg-white/[0.02] p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6 md:p-8" intensity={4}>
            <h3 className="mb-4 text-lg font-bold tracking-tight sm:mb-5 sm:text-xl md:mb-6 md:text-2xl">{group.title}</h3>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {group.categories?.map((category: any, cIdx: number) => (
                <div key={cIdx}>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3 uppercase tracking-wider font-medium">{category.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills?.map((skill: string) => (
                      <span key={skill} className="px-3 py-1.5 bg-white/10 border border-white/10 rounded-lg text-xs sm:text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>
      ))}
    </div>
  </section>
);

const GridSection = ({ section }: { section: any }) => (
  <section id={section.id} className="mb-14 scroll-mt-28 sm:mb-20 md:mb-32 md:scroll-mt-36 lg:mb-40">
    <div className={sectionHeading}>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
      >
        {section.title}
      </motion.h2>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block"></div>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {section.items?.map((item: any, index: number) => (
        <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
          <TiltCard className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 sm:rounded-3xl sm:p-6 md:p-8" intensity={4}>
            {item.metric && (
              <div className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-br from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {item.metric}
              </div>
            )}
            <h3 className="text-base sm:text-lg font-bold mb-2 tracking-tight">{item.title}</h3>
            {item.subtitle && <p className="text-gray-400 text-sm mb-2 font-medium">{item.subtitle}</p>}
            {item.description && <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>}
            {item.date && (
              <div className="mt-4 flex gap-3">
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            )}
          </TiltCard>
        </motion.div>
      ))}
    </div>
  </section>
);

const ListSection = ({ section }: { section: any }) => (
  <section id={section.id} className="mb-14 scroll-mt-28 sm:mb-20 md:mb-32 md:scroll-mt-36 lg:mb-40">
    <div className={sectionHeading}>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
      >
        {section.title}
      </motion.h2>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-white/20 to-transparent sm:block"></div>
    </div>
    <div className="space-y-4 md:space-y-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <TiltCard className="border border-white/10 rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 bg-white/[0.02] backdrop-blur-sm" intensity={4}>
          <div className="space-y-3">
            {section.items?.map((item: string, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base text-gray-400 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </TiltCard>
      </motion.div>
    </div>
  </section>
);

// --- Main Page ---

const Index = () => {
  const { scrollYProgress } = useScroll();
  const [data, setData] = useState(() => ensurePortfolioShape(defaultPortfolio));

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (json && json.hero) {
          setData(
            ensurePortfolioShape({
              ...defaultPortfolio,
              ...json,
              hero: { ...defaultPortfolio.hero, ...json.hero },
              sections: Array.isArray(json.sections) ? json.sections : defaultPortfolio.sections,
              site: json.site ?? defaultPortfolio.site,
            }),
          );
        }
      })
      .catch(() => console.log('Using default data fallback'));
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="fixed inset-0 z-0">
        <ThreeBackground />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-50"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
          boxShadow: '0 0 8px rgba(99,102,241,0.8)',
        }}
      />

      <div className="relative z-10">
        <SiteHeader
          sections={(data.sections || []).map((s: any) => ({
            id: s.id,
            title: s.title,
            navLabel: s.navLabel,
          }))}
          nav={data.site.nav}
        />

        <main className="px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 md:px-10 md:pb-24 md:pt-[calc(6rem+env(safe-area-inset-top))] lg:px-16 lg:pb-28 xl:px-24">
          <section id="home" className="flex min-h-[min(100dvh,52rem)] flex-col justify-center pb-10 pt-2 sm:min-h-[min(100dvh,56rem)] sm:pb-16 sm:pt-6">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col justify-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                  <h1 className="mb-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.45)] sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
                    <span className="block text-white">{data.hero.title1}</span>
                    <span className="mt-1 block text-white/95">{data.hero.title2}</span>
                    <span className="mt-1 block hero-gradient-text">{data.hero.gradientTitle}</span>
                  </h1>
                </motion.div>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-10 max-w-3xl leading-relaxed font-light">
                  {data.hero.description}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a href={data.hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-200">View LinkedIn</a>
                  <a href={data.hero.resumeUrl} download className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-center text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/20">Download Resume</a>
                  {data.hero.email ? (
                    <a href={`mailto:${data.hero.email}`} className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10">
                      Email
                    </a>
                  ) : null}
                  <a
                    href={`tel:${(data.hero.phone || '').replace(/[^0-9+]/g, '')}`}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
                  >
                    {data.hero.phone || 'Phone'}
                  </a>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-8">
                  {(data.hero.stats || []).map((stat: any, i: number) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden min-h-0 w-full lg:block lg:h-[80vh]"
              >
                {/* 3D / visual area — hidden on small screens to tighten hero spacing */}
              </motion.div>
            </div>
          </section>

          <div className="mx-auto w-full max-w-7xl">
            {data.sections?.map((section: any, idx: number) => {
              if (section.type === 'timeline') return <TimelineSection key={idx} section={section} />;
              if (section.type === 'grouped-grid') return <GroupedGridSection key={idx} section={section} />;
              if (section.type === 'grid') return <GridSection key={idx} section={section} />;
              if (section.type === 'list') return <ListSection key={idx} section={section} />;
              return null;
            })}
            <ContactPanel hero={data.hero} />
          </div>
        </main>
        <SiteFooter
          sections={(data.sections || []).map((s: any) => ({
            id: s.id,
            title: s.title,
            navLabel: s.navLabel,
          }))}
          hero={data.hero}
          footer={data.site.footer}
        />
      </div>
    </div>
  );
};

export default Index;
