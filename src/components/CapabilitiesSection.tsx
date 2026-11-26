import { useState } from 'react';
import { CAPABILITIES, CapabilityItem, DisciplineFilter } from '../data/studioData';

const DISCIPLINE_TABS: { id: DisciplineFilter; label: string }[] = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'frontend', label: 'Frontend Systems' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'performance', label: 'Performance' },
];

export function CapabilitiesSection() {
  const [activeDiscipline, setActiveDiscipline] = useState<DisciplineFilter>('all');
  const [selectedId, setSelectedId] = useState<string>(CAPABILITIES[0].id);

  const visibleCapabilities =
    activeDiscipline === 'all'
      ? CAPABILITIES
      : CAPABILITIES.filter((item) => item.discipline === activeDiscipline);

  const selectedCapability: CapabilityItem =
    visibleCapabilities.find((item) => item.id === selectedId) ?? visibleCapabilities[0];

  return (
    <section id="capabilities" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500 mb-2">Core Engineering Services</p>
            <h2
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Built around maintainable architecture, not disposable templates.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter engineering capabilities by discipline"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto"
          >
            {DISCIPLINE_TABS.map((tab) => {
              const active = activeDiscipline === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setActiveDiscipline(tab.id);
                    const nextList =
                      tab.id === 'all'
                        ? CAPABILITIES
                        : CAPABILITIES.filter((c) => c.discipline === tab.id);
                    if (nextList.length > 0 && !nextList.some((c) => c.id === selectedId)) {
                      setSelectedId(nextList[0].id);
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    active
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {visibleCapabilities.map((item) => {
            const isSelected = selectedCapability.id === item.id;
            const colSpanClass =
              activeDiscipline === 'all' && item.span === 'wide' ? 'lg:col-span-2' : 'lg:col-span-1';

            return (
              <article
                key={item.id}
                className={`${colSpanClass} rounded-xl border p-6 sm:p-8 flex flex-col justify-between transition-colors ${
                  isSelected
                    ? 'border-blue-700 bg-[#f8f9fa]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-3">
                    <span>
                      {item.disciplineLabel} <span aria-hidden="true">·</span> {item.stackPreview}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                    {item.number} {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    {item.summary}
                  </p>

                  <ul className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
                    {item.deliverables.map((del) => (
                      <li key={del} className="leading-snug">
                        {del}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-slate-600 tabular-nums">
                    {item.benchmark}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isSelected}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                      isSelected
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {isSelected ? 'Inspecting Pattern' : 'Inspect Pattern'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium text-slate-500 mb-1">Implementation Pattern</p>
            <h3 className="text-lg font-semibold text-slate-900">
              {selectedCapability.number} {selectedCapability.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Representative production code pattern used in our client repositories. Select any
              capability above to inspect its technical approach.
            </p>
          </div>

          <div className="lg:col-span-8 rounded-xl bg-slate-900 text-slate-100 p-5 sm:p-6 overflow-x-auto border border-slate-800">
            <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-mono">{selectedCapability.id}.ts</span>
              <span>{selectedCapability.stackPreview}</span>
            </div>
            <pre className="font-mono text-xs sm:text-sm leading-relaxed text-slate-200 whitespace-pre">
              <code>{selectedCapability.codeExcerpt}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
