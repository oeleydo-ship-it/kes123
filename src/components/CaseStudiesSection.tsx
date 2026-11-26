import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, CaseStudy, CaseStudyCategory } from '../data/studioData';
import { SafeImage } from './SafeImage';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

const CATEGORIES: CaseStudyCategory[] = [
  'all',
  'SaaS Platforms',
  'Commerce',
  'Developer Tools',
];

export function CaseStudiesSection({ onSelectCaseStudy }: CaseStudiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CaseStudyCategory>('all');

  const filteredStudies =
    activeCategory === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.category === activeCategory);

  return (
    <section id="work" className="py-16 lg:py-24 bg-[#f8f9fa] border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500 mb-2">Selected Production Work</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Shipped systems verified by latency, uptime, and revenue outcomes.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter case studies by sector"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              const label = category === 'all' ? 'All Work' : category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-10">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="rounded-xl bg-white border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <div className="lg:col-span-5 bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200">
                <SafeImage
                  src={study.imageUrl}
                  alt={study.imageAlt}
                  fallbackTitle={study.client}
                  className="w-full aspect-[4/3] lg:aspect-auto lg:h-full object-cover block"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-500">
                    {study.client} <span aria-hidden="true">·</span> {study.category}{' '}
                    <span aria-hidden="true">·</span> {study.timeline}{' '}
                    <span aria-hidden="true">·</span> {study.stackSummary}
                  </p>

                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight leading-snug">
                    {study.headline}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {study.summary}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-baseline justify-between gap-4">
                    <div>
                      <p className="font-mono text-lg sm:text-xl font-semibold text-blue-700 tabular-nums">
                        {study.impactMetric}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{study.impactContext}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <blockquote className="max-w-lg">
                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                      &ldquo;{study.quote.text}&rdquo;
                    </p>
                    <footer className="mt-2 text-xs font-medium text-slate-800">
                      {study.quote.author} <span aria-hidden="true">·</span>{' '}
                      <span className="font-normal text-slate-500">{study.quote.role}</span>
                    </footer>
                  </blockquote>

                  <button
                    type="button"
                    onClick={() => onSelectCaseStudy(study)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start sm:self-end cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                  >
                    <span>View Technical Breakdown</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
