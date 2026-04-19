"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import defaultData from '../../data/defaultPortfolio.json';
import { useToast } from '../../hooks/use-toast';
import SectionContentEditor from '@/components/admin/SectionContentEditor';
import PortfolioLivePreview from '@/components/admin/PortfolioLivePreview';
import {
  ensurePortfolioShape,
  normalizeSectionOnTypeChange,
  emptyItemsForType,
  type SectionType,
  type PortfolioData,
  type FooterLink,
} from '@/lib/portfolio-helpers';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('hero');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio');
      if (res.ok) {
        const data = await res.json();
        setPortfolioData(ensurePortfolioShape(data));
      } else {
        setPortfolioData(ensurePortfolioShape(defaultData));
      }
    } catch (err) {
      console.warn("Backend unavailable, using default data.", err);
      setPortfolioData(ensurePortfolioShape(defaultData));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsLoggedIn(true);
        toast({ title: "Login Successful", description: "Welcome to the Admin Dashboard." });
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Invalid credentials." });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Login unavailable',
        description: 'Could not reach /api/login. Check the dev server and network, then try again.',
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ensurePortfolioShape(portfolioData)),
      });
      if (res.ok) {
        const json = await res.json().catch(() => null);
        if (json?.data) {
          setPortfolioData(ensurePortfolioShape(json.data));
        }
        toast({ title: "Saved Successfully", description: "Portfolio data has been published live." });
      } else {
        throw new Error('Save failed');
      }
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Save Failed", description: "Could not save to MongoDB." });
    }
    setIsSaving(false);
  };

  const updateHero = (field: string, value: unknown) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      hero: {
        ...portfolioData.hero,
        [field]: value,
      },
    });
  };

  const addHeroStat = () => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      hero: {
        ...portfolioData.hero,
        stats: [...portfolioData.hero.stats, { value: '', label: '' }],
      },
    });
  };

  const updateHeroStat = (index: number, field: 'value' | 'label', value: string) => {
    if (!portfolioData) return;
    const stats = [...portfolioData.hero.stats];
    stats[index] = { ...stats[index], [field]: value };
    setPortfolioData({ ...portfolioData, hero: { ...portfolioData.hero, stats } });
  };

  const removeHeroStat = (index: number) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      hero: {
        ...portfolioData.hero,
        stats: portfolioData.hero.stats.filter((_, i) => i !== index),
      },
    });
  };

  const addSection = () => {
    if (!portfolioData) return;
    const newSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      type: 'grid' as SectionType,
      items: emptyItemsForType('grid'),
    };
    setPortfolioData({
      ...portfolioData,
      sections: [...(portfolioData.sections || []), newSection],
    });
  };

  const removeSection = (index: number) => {
    if (!portfolioData) return;
    const newSections = [...portfolioData.sections];
    newSections.splice(index, 1);
    setPortfolioData({ ...portfolioData, sections: newSections });
  };

  const updateSection = (index: number, field: string, value: unknown) => {
    if (!portfolioData) return;
    const newSections = [...portfolioData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setPortfolioData({ ...portfolioData, sections: newSections });
  };

  const patchSection = (index: number, patch: Record<string, unknown>) => {
    if (!portfolioData) return;
    const newSections = [...portfolioData.sections];
    newSections[index] = { ...newSections[index], ...patch };
    setPortfolioData({ ...portfolioData, sections: newSections });
  };

  const patchSiteNav = (field: string, value: string) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      site: {
        ...portfolioData.site,
        nav: { ...portfolioData.site.nav, [field]: value },
      },
    });
  };

  const patchSiteFooter = (field: string, value: string | FooterLink[]) => {
    if (!portfolioData) return;
    setPortfolioData({
      ...portfolioData,
      site: {
        ...portfolioData.site,
        footer: { ...portfolioData.site.footer, [field]: value },
      },
    });
  };

  const addFooterExtraLink = () => {
    if (!portfolioData) return;
    patchSiteFooter('extraLinks', [
      ...portfolioData.site.footer.extraLinks,
      { label: '', href: '' },
    ]);
  };

  const updateFooterExtraLink = (i: number, field: keyof FooterLink, value: string) => {
    if (!portfolioData) return;
    const next = [...portfolioData.site.footer.extraLinks];
    next[i] = { ...next[i], [field]: value };
    patchSiteFooter('extraLinks', next);
  };

  const removeFooterExtraLink = (i: number) => {
    if (!portfolioData) return;
    patchSiteFooter(
      'extraLinks',
      portfolioData.site.footer.extraLinks.filter((_, j) => j !== i),
    );
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !portfolioData) return;
    if (!password) {
      toast({
        variant: 'destructive',
        title: 'Password needed',
        description: 'Log out and log in again so your password is available, or paste an image URL below.',
      });
      return;
    }
    setUploadBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'X-Admin-Password': password },
        body: fd,
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || j.detail || 'Upload failed');
      patchSiteNav('logoUrl', j.url);
      toast({ title: 'Logo saved', description: `Using ${j.url}` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      toast({ variant: 'destructive', title: 'Upload error', description: msg });
    } finally {
      setUploadBusy(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-2">Sign in to manage your site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-[max(1.5rem,env(safe-area-inset-bottom))] font-sans text-white overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8 md:p-10 lg:p-12">
      <div className="mx-auto max-w-[1600px] space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:pb-6 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent sm:text-3xl md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
              Edit content and watch the live preview update. Publish when you are ready — MongoDB is updated only
              after you click publish.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all sm:px-5 sm:py-3 ${
                showPreview
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'
                  : 'border-white/20 text-gray-300 hover:bg-white/5'
              }`}
            >
              {showPreview ? 'Hide preview' : 'Show preview'}
            </button>
            <button
              type="button"
              onClick={() => setIsLoggedIn(false)}
              className="rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 sm:px-6 sm:py-3"
            >
              Log out
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-black shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all hover:bg-gray-200 disabled:opacity-50 sm:px-8 sm:py-3"
            >
              {isSaving ? 'Saving…' : 'Publish'}
            </button>
          </div>
        </div>

        {portfolioData && (
          <div
            className={`grid gap-6 sm:gap-8 lg:grid-cols-12 ${showPreview ? 'xl:items-start' : ''}`}
          >
            {/* Sidebar Navigation */}
            <div className="space-y-2 lg:col-span-3 xl:col-span-2">
              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'hero' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                Hero & Links
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('site')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'site' ? 'bg-violet-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                Nav & Footer
              </button>

              <div className="pt-4 pb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold px-4">Sections</p>
              </div>

              {portfolioData.sections?.map((section: any, idx: number) => (
                <button
                  key={section.id || idx}
                  onClick={() => setActiveTab(`section-${idx}`)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all truncate ${activeTab === `section-${idx}` ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  {section.title || "Untitled Section"}
                </button>
              ))}

              <button
                onClick={addSection}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-green-400 hover:bg-green-400/10 transition-all border border-dashed border-green-400/30 mt-2"
              >
                + Add New Section
              </button>

              <div className="pt-4 pb-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold px-4">Developer</p>
              </div>
              <button
                onClick={() => setActiveTab('json')}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'json' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                Advanced JSON Editor
              </button>
            </div>

            {/* Content Area */}
            <div
              className={`min-w-0 lg:col-span-9 ${showPreview ? 'xl:col-span-5' : 'xl:col-span-10'}`}
            >
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'hero' && (
                  <div className="space-y-6">
                    <p className="text-xs text-gray-500 px-1">
                      Your <strong className="text-gray-400">display name</strong> in the top bar is set under{' '}
                      <strong className="text-violet-400">Nav &amp; Footer</strong> → Brand name (separate from hero
                      headlines).
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-6 text-indigo-400">Main Assets & Contact</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Resume PDF URL</label>
                          <input 
                            type="text" 
                            value={portfolioData.hero.resumeUrl || ''}
                            onChange={(e) => updateHero('resumeUrl', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">LinkedIn URL</label>
                          <input 
                            type="text" 
                            value={portfolioData.hero.linkedinUrl || ''}
                            onChange={(e) => updateHero('linkedinUrl', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Email Address</label>
                            <input 
                              type="text" 
                              value={portfolioData.hero.email || ''}
                              onChange={(e) => updateHero('email', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Phone Number</label>
                            <input 
                              type="text" 
                              value={portfolioData.hero.phone || ''}
                              onChange={(e) => updateHero('phone', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-6 text-indigo-400">Hero Content</h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Title Line 1</label>
                            <input 
                              type="text" 
                              value={portfolioData.hero.title1 || ''}
                              onChange={(e) => updateHero('title1', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Title Line 2</label>
                            <input 
                              type="text" 
                              value={portfolioData.hero.title2 || ''}
                              onChange={(e) => updateHero('title2', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Gradient Title</label>
                            <input 
                              type="text" 
                              value={portfolioData.hero.gradientTitle || ''}
                              onChange={(e) => updateHero('gradientTitle', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Hero Description</label>
                          <textarea 
                            rows={4}
                            value={portfolioData.hero.description || ''}
                            onChange={(e) => updateHero('description', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-indigo-500 outline-none transition-all resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-indigo-400">Hero stats (under headline)</h3>
                        <button
                          type="button"
                          onClick={addHeroStat}
                          className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                        >
                          + Add stat
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-4">Each stat shows a large value and a short label on the home hero.</p>
                      <div className="space-y-3">
                        {portfolioData.hero.stats.map((stat, si) => (
                          <div key={si} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => updateHeroStat(si, 'value', e.target.value)}
                              className="sm:w-28 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm font-semibold"
                              placeholder="3+"
                            />
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateHeroStat(si, 'label', e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                              placeholder="Years"
                            />
                            <button
                              type="button"
                              onClick={() => removeHeroStat(si)}
                              className="text-xs text-red-300 px-2 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/10 shrink-0"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                        {portfolioData.hero.stats.length === 0 && (
                          <p className="text-xs text-gray-500 italic">No stats — add one or leave empty.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'site' && (
                  <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-violet-400">Top navigation</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Controls the fixed bar (brand, optional image logo, Home / sections / Contact labels).
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Brand name (top left)</label>
                          <input
                            type="text"
                            value={portfolioData.site.nav.brandName}
                            onChange={(e) => patchSiteNav('brandName', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                            placeholder="Mohammed Ansar"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Brand tagline (small line under name)</label>
                          <input
                            type="text"
                            value={portfolioData.site.nav.brandTagline}
                            onChange={(e) => patchSiteNav('brandTagline', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                            placeholder="Senior Full Stack · GenAI"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Logo image URL</label>
                          <input
                            type="text"
                            value={portfolioData.site.nav.logoUrl}
                            onChange={(e) => patchSiteNav('logoUrl', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                            placeholder="/uploads/portfolio/....png or https://..."
                          />
                          <p className="text-[11px] text-gray-500 mt-1">
                            When set, this image replaces the letter badge. Use a square image for best results.
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Letter badge (1–2 chars, if no image)</label>
                          <input
                            type="text"
                            maxLength={2}
                            value={portfolioData.site.nav.logoLetter}
                            onChange={(e) => patchSiteNav('logoLetter', e.target.value.slice(0, 2))}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none uppercase"
                            placeholder="MA"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Home link label</label>
                          <input
                            type="text"
                            value={portfolioData.site.nav.homeLabel}
                            onChange={(e) => patchSiteNav('homeLabel', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Contact link label</label>
                          <input
                            type="text"
                            value={portfolioData.site.nav.contactLabel}
                            onChange={(e) => patchSiteNav('contactLabel', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                      </div>
                      <div className="border border-white/10 rounded-xl p-4 bg-black/30 space-y-2">
                        <label className="block text-xs text-gray-400">Upload logo (saves to /public/uploads)</label>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                          disabled={uploadBusy}
                          onChange={handleLogoUpload}
                          className="block w-full text-xs text-gray-400 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-violet-500"
                        />
                        <p className="text-[11px] text-gray-500">
                          Uses your Admin password from login. On some hosts (e.g. serverless) upload may fail — then
                          place the file in <code className="text-gray-400">public/uploads/portfolio/</code> and paste
                          the URL above.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-violet-400">Footer</h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Public site does not link to the Admin. Optional second column for your own links only.
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Headline (plain)</label>
                          <input
                            type="text"
                            value={portfolioData.site.footer.headline}
                            onChange={(e) => patchSiteFooter('headline', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Headline accent (gradient)</label>
                          <input
                            type="text"
                            value={portfolioData.site.footer.headlineAccent}
                            onChange={(e) => patchSiteFooter('headlineAccent', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-2">Subline</label>
                          <textarea
                            rows={2}
                            value={portfolioData.site.footer.subline}
                            onChange={(e) => patchSiteFooter('subline', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Anchor links column title</label>
                          <input
                            type="text"
                            value={portfolioData.site.footer.linkColumnTitle}
                            onChange={(e) => patchSiteFooter('linkColumnTitle', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-2">Copyright note (after year)</label>
                          <input
                            type="text"
                            value={portfolioData.site.footer.copyrightNote}
                            onChange={(e) => patchSiteFooter('copyrightNote', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                            placeholder="Your Name. All rights reserved."
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-gray-400 mb-2">Fine print (bottom right)</label>
                          <input
                            type="text"
                            value={portfolioData.site.footer.finePrint}
                            onChange={(e) => patchSiteFooter('finePrint', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-violet-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="border border-white/10 rounded-xl p-4 bg-black/30 space-y-3">
                        <div className="flex justify-between items-center gap-2">
                          <label className="text-xs text-gray-400">Optional second column</label>
                          <button
                            type="button"
                            onClick={addFooterExtraLink}
                            className="text-xs px-2 py-1 rounded-lg bg-violet-500/20 text-violet-200 border border-violet-500/30"
                          >
                            + Add link
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Column title (e.g. Legal)"
                          value={portfolioData.site.footer.extraColumnTitle}
                          onChange={(e) => patchSiteFooter('extraColumnTitle', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                        />
                        {portfolioData.site.footer.extraLinks.map((link, li) => (
                          <div key={li} className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              placeholder="Label"
                              value={link.label}
                              onChange={(e) => updateFooterExtraLink(li, 'label', e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                            />
                            <input
                              type="text"
                              placeholder="https://..."
                              value={link.href}
                              onChange={(e) => updateFooterExtraLink(li, 'href', e.target.value)}
                              className="flex-[2] px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => removeFooterExtraLink(li)}
                              className="text-xs text-red-300 px-2 py-2 shrink-0"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab.startsWith('section-') && (() => {
                  const sIdx = parseInt(activeTab.split('-')[1]);
                  const section = portfolioData.sections[sIdx];
                  if (!section) return null;

                  return (
                    <div className="space-y-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-semibold text-cyan-400">Configure Section</h3>
                          <button onClick={() => { removeSection(sIdx); setActiveTab('hero'); }} className="text-red-400 text-sm hover:underline">
                            Delete Section
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Section Title</label>
                              <input 
                                type="text" 
                                value={section.title || ''}
                                onChange={(e) => updateSection(sIdx, 'title', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyan-500 outline-none transition-all font-bold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-400 mb-2">Nav ID (lowercase, no spaces)</label>
                              <input 
                                type="text" 
                                value={section.id || ''}
                                onChange={(e) => updateSection(sIdx, 'id', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyan-500 outline-none transition-all"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">
                              Navbar label <span className="text-gray-600">(optional)</span>
                            </label>
                            <input
                              type="text"
                              value={(section as { navLabel?: string }).navLabel || ''}
                              onChange={(e) => updateSection(sIdx, 'navLabel', e.target.value)}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyan-500 outline-none transition-all"
                              placeholder="Shorter label for top nav; leave blank to use section title"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-2">Layout Type</label>
                            <select
                              value={section.type || 'grid'}
                              onChange={(e) => {
                                const newType = e.target.value as SectionType;
                                const newSections = [...portfolioData.sections];
                                const cur = newSections[sIdx] as Record<string, unknown>;
                                newSections[sIdx] = normalizeSectionOnTypeChange(
                                  cur,
                                  newType,
                                ) as (typeof newSections)[number];
                                setPortfolioData({ ...portfolioData, sections: newSections });
                              }}
                              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 focus:border-cyan-500 outline-none transition-all appearance-none text-white"
                            >
                              <option value="grid">Grid Cards (Achievements, Education, Projects)</option>
                              <option value="timeline">Timeline / Workflow (Experience, History)</option>
                              <option value="grouped-grid">Grouped Grid (Complex Skills)</option>
                              <option value="list">Simple List (Certifications, Badges)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold text-cyan-400">Section content</h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Add, edit, or remove entries with the forms below. Changing layout type resets content to a
                            safe empty shape for that type.
                          </p>
                        </div>
                        <SectionContentEditor
                          section={section as Record<string, unknown>}
                          onPatch={(patch) => patchSection(sIdx, patch)}
                        />
                        <details className="group border border-white/10 rounded-xl p-4 bg-black/30">
                          <summary className="cursor-pointer text-sm text-gray-400 hover:text-white">
                            Raw JSON (this section only)
                          </summary>
                          <p className="text-xs text-gray-500 mt-2 mb-2">
                            Paste bulk JSON for <code className="text-cyan-600/90">items</code> or{' '}
                            <code className="text-cyan-600/90">groups</code> depending on layout.
                          </p>
                          <textarea
                            className="w-full min-h-[280px] mt-2 p-4 rounded-xl bg-black font-mono text-xs border border-white/10 focus:border-cyan-500 outline-none resize-y text-green-400"
                            value={JSON.stringify(
                              section.type === 'grouped-grid'
                                ? section.groups || []
                                : section.items || [],
                              null,
                              2,
                            )}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                patchSection(sIdx, {
                                  [section.type === 'grouped-grid' ? 'groups' : 'items']: parsed,
                                });
                              } catch {
                                /* typing */
                              }
                            }}
                          />
                        </details>
                      </div>
                    </div>
                  );
                })()}

                {activeTab === 'json' && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-[700px]">
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Master JSON Editor</h3>
                    <p className="text-xs text-gray-400 mb-4">This is your raw database state. You can copy/paste this entire block for backups.</p>
                    <textarea 
                      className="w-full flex-1 p-4 rounded-xl bg-black font-mono text-sm border border-white/10 focus:border-purple-500 outline-none resize-none text-green-400"
                      value={JSON.stringify(portfolioData, null, 2)}
                      onChange={(e) => {
                        try {
                          const parsed = JSON.parse(e.target.value);
                          setPortfolioData(ensurePortfolioShape(parsed));
                        } catch {
                          /* typing */
                        }
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </div>

            {showPreview ? (
              <div className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-5rem)] xl:overflow-y-auto xl:overflow-x-hidden xl:self-start">
                <div className="rounded-2xl border border-emerald-500/25 bg-zinc-950/95 p-3 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.12)] sm:p-4">
                  <div className="mb-3 flex flex-col gap-1 border-b border-white/10 pb-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/95">
                      Live preview
                    </span>
                    <span className="text-[10px] leading-snug text-gray-500">
                      Updates as you edit · public site changes only after Publish
                    </span>
                  </div>
                  <PortfolioLivePreview data={portfolioData} />
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
