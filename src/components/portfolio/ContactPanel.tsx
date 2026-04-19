'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import TiltCard from '@/components/three/TiltCard';

type HeroSubset = {
  email?: string;
  phone?: string;
  linkedinUrl?: string;
};

type Props = {
  hero: HeroSubset;
};

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export default function ContactPanel({ hero }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const mailtoFallback = () => {
    const to = hero.email || '';
    const subject = encodeURIComponent(form.subject || 'Portfolio inquiry');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    const hasEmailJs =
      EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID;

    if (!hasEmailJs) {
      mailtoFallback();
      setStatus('sent');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'Portfolio contact',
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY! },
      );
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const telHref = `tel:${(hero.phone || '').replace(/[^0-9+]/g, '')}`;

  return (
    <section
      id="contact"
      className="mb-16 scroll-mt-28 sm:mb-20 md:mb-28 md:scroll-mt-36 lg:mb-32"
      aria-labelledby="contact-heading"
    >
      <div className="mb-8 flex flex-col gap-3 px-0.5 sm:mb-10 sm:gap-4 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="min-w-0">
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Let&apos;s{' '}
            <span className="hero-gradient-text">connect</span>
          </motion.h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Share a project idea, role, or question. I&apos;ll get back as soon as I can.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="space-y-4 lg:col-span-5">
          {hero.email ? (
            <a href={`mailto:${hero.email}`} className="block">
              <TiltCard
                className="flex items-start gap-4 border border-white/10 rounded-2xl bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-indigo-500/30"
                intensity={3}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-white sm:text-base">
                    {hero.email}
                  </p>
                </div>
              </TiltCard>
            </a>
          ) : null}

          {hero.phone ? (
            <a href={telHref} className="block">
              <TiltCard
                className="flex items-start gap-4 border border-white/10 rounded-2xl bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-cyan-500/30"
                intensity={3}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                  <Phone className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-medium text-white sm:text-base">{hero.phone}</p>
                </div>
              </TiltCard>
            </a>
          ) : null}

          {hero.linkedinUrl ? (
            <a href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" className="block">
              <TiltCard
                className="flex items-start gap-4 border border-white/10 rounded-2xl bg-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-violet-500/30"
                intensity={3}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-200">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    LinkedIn
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-white sm:text-base">
                    Profile
                  </p>
                </div>
              </TiltCard>
            </a>
          ) : null}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <TiltCard
            className="border border-white/10 rounded-2xl md:rounded-3xl bg-white/[0.02] p-5 sm:p-8 backdrop-blur-sm"
            intensity={2}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-xs font-medium text-gray-400">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:outline-none"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-xs font-medium text-gray-400">
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:outline-none"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className="mb-1.5 block text-xs font-medium text-gray-400">
                  Subject <span className="text-gray-600">(optional)</span>
                </label>
                <input
                  id="c-subject"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:outline-none"
                  placeholder="Project / opportunity"
                />
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-1.5 block text-xs font-medium text-gray-400">
                  Message
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500/50 focus:outline-none min-h-[120px]"
                  placeholder="Tell me a bit about what you have in mind…"
                />
              </div>


              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-500 hover:to-violet-500 disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>
                {status === 'sent' ? (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Thanks — message sent or mail opened.
                  </span>
                ) : null}
                {status === 'error' ? (
                  <span className="text-sm text-red-400">Could not send — try again or use email.</span>
                ) : null}
              </div>
            </form>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
