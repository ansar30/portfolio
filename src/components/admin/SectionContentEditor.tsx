'use client';

import React from 'react';
import type { SectionType } from '@/lib/portfolio-helpers';
import { emptyGroupsForGroupedGrid } from '@/lib/portfolio-helpers';

type GridItem = {
  title?: string;
  subtitle?: string;
  description?: string;
  metric?: string;
  date?: string;
};

type TimelineItem = {
  title?: string;
  subtitle?: string;
  date?: string;
  bullets?: string[];
};

type SkillCategory = { name?: string; skills?: string[] };
type SkillGroup = { title?: string; categories?: SkillCategory[] };

type Props = {
  section: Record<string, unknown> & { type?: string };
  onPatch: (patch: Record<string, unknown>) => void;
};

export default function SectionContentEditor({ section, onPatch }: Props) {
  const type = (section.type || 'grid') as SectionType;

  if (type === 'list') {
    const items = (Array.isArray(section.items) ? section.items : []) as string[];
    const setItems = (next: string[]) => onPatch({ items: next });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-cyan-300">List entries</h4>
          <button
            type="button"
            onClick={() => setItems([...items, ''])}
            className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
          >
            + Add line
          </button>
        </div>
        <p className="text-xs text-gray-500">Each row is one bullet-style line on the public site.</p>
        <div className="space-y-2">
          {items.map((line, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={line}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = e.target.value;
                  setItems(next);
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm focus:border-cyan-500 outline-none"
                placeholder="Certification or achievement text"
              />
              <button
                type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="shrink-0 px-3 py-2 rounded-lg border border-red-500/40 text-red-300 text-xs hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <button
              type="button"
              onClick={() => setItems([''])}
              className="text-sm text-cyan-400 hover:underline"
            >
              Add first list line
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === 'timeline') {
    const items = (Array.isArray(section.items) ? section.items : []) as TimelineItem[];
    const setItems = (next: TimelineItem[]) => onPatch({ items: next });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-cyan-300">Timeline entries</h4>
          <button
            type="button"
            onClick={() =>
              setItems([...items, { title: '', subtitle: '', date: '', bullets: [''] }])
            }
            className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
          >
            + Add entry
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase">Entry {i + 1}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="text-xs text-red-300 hover:underline"
              >
                Remove entry
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Title</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], title: e.target.value };
                    setItems(next);
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Subtitle / company</label>
                <input
                  type="text"
                  value={item.subtitle || ''}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], subtitle: e.target.value };
                    setItems(next);
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">Date range</label>
              <input
                type="text"
                value={item.date || ''}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], date: e.target.value };
                  setItems(next);
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                placeholder="May 2023 - Present"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Bullets (one per line)</label>
              <textarea
                rows={5}
                value={(item.bullets || []).join('\n')}
                onChange={(e) => {
                  const bullets = e.target.value.split('\n');
                  const next = [...items];
                  next[i] = { ...next[i], bullets };
                  setItems(next);
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm font-mono"
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <button
            type="button"
            onClick={() => setItems([{ title: '', subtitle: '', date: '', bullets: [''] }])}
            className="text-sm text-cyan-400 hover:underline"
          >
            Start with one empty timeline entry
          </button>
        )}
      </div>
    );
  }

  if (type === 'grid') {
    const items = (Array.isArray(section.items) ? section.items : []) as GridItem[];
    const setItems = (next: GridItem[]) => onPatch({ items: next });

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-cyan-300">Grid cards</h4>
          <button
            type="button"
            onClick={() =>
              setItems([...items, { title: '', subtitle: '', description: '', metric: '', date: '' }])
            }
            className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
          >
            + Add card
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase">Card {i + 1}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
                className="text-xs text-red-300 hover:underline"
              >
                Remove card
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Metric (optional)</label>
                <input
                  type="text"
                  value={item.metric || ''}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], metric: e.target.value };
                    setItems(next);
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                  placeholder="99.9%"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Date (optional)</label>
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...next[i], date: e.target.value };
                    setItems(next);
                  }}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400">Title</label>
              <input
                type="text"
                value={item.title || ''}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], title: e.target.value };
                  setItems(next);
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Subtitle (optional)</label>
              <input
                type="text"
                value={item.subtitle || ''}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], subtitle: e.target.value };
                  setItems(next);
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Description</label>
              <textarea
                rows={3}
                value={item.description || ''}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...next[i], description: e.target.value };
                  setItems(next);
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
              />
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <button
            type="button"
            onClick={() => setItems([{ title: '', subtitle: '', description: '', metric: '', date: '' }])}
            className="text-sm text-cyan-400 hover:underline"
          >
            Start with one empty card
          </button>
        )}
      </div>
    );
  }

  if (type === 'grouped-grid') {
    const groups = (Array.isArray(section.groups) ? section.groups : []) as SkillGroup[];
    const setGroups = (next: SkillGroup[]) => onPatch({ groups: next });

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-semibold text-cyan-300">Skill groups</h4>
          <button
            type="button"
            onClick={() =>
              setGroups([
                ...groups,
                { title: 'New group', categories: [{ name: 'Category', skills: [] }] },
              ])
            }
            className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
          >
            + Add group
          </button>
        </div>
        {groups.length === 0 && (
          <button
            type="button"
            onClick={() => setGroups(emptyGroupsForGroupedGrid())}
            className="text-sm text-cyan-400 hover:underline"
          >
            Insert default empty group layout
          </button>
        )}
        {groups.map((group, gi) => (
          <div key={gi} className="p-4 rounded-xl border border-cyan-500/20 bg-black/40 space-y-4">
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                value={group.title || ''}
                onChange={(e) => {
                  const next = [...groups];
                  next[gi] = { ...next[gi], title: e.target.value };
                  setGroups(next);
                }}
                className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm font-semibold"
                placeholder="Group title"
              />
              <button
                type="button"
                onClick={() => setGroups(groups.filter((_, j) => j !== gi))}
                className="text-xs px-2 py-2 rounded-lg border border-red-500/40 text-red-300 shrink-0"
              >
                Remove group
              </button>
            </div>
            <div className="space-y-4 pl-2 border-l border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase">Categories</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = [...groups];
                    const cats = [...(next[gi].categories || [])];
                    cats.push({ name: '', skills: [] });
                    next[gi] = { ...next[gi], categories: cats };
                    setGroups(next);
                  }}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  + Add category
                </button>
              </div>
              {(group.categories || []).map((cat, ci) => (
                <div key={ci} className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={cat.name || ''}
                      onChange={(e) => {
                        const next = [...groups];
                        const cats = [...(next[gi].categories || [])];
                        cats[ci] = { ...cats[ci], name: e.target.value };
                        next[gi] = { ...next[gi], categories: cats };
                        setGroups(next);
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                      placeholder="Category name"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = [...groups];
                        const cats = (next[gi].categories || []).filter((_, j) => j !== ci);
                        next[gi] = { ...next[gi], categories: cats };
                        setGroups(next);
                      }}
                      className="text-xs text-red-300 px-2"
                    >
                      ✕
                    </button>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={(cat.skills || []).join(', ')}
                      onChange={(e) => {
                        const skills = e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean);
                        const next = [...groups];
                        const cats = [...(next[gi].categories || [])];
                        cats[ci] = { ...cats[ci], skills };
                        next[gi] = { ...next[gi], categories: cats };
                        setGroups(next);
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-sm"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
