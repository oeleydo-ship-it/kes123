import { useState } from 'react';
import { ARCHITECTURE_PRINCIPLES } from '../data/studioData';

export function ArchitectureSection() {
  const [activeId, setActiveId] = useState(ARCHITECTURE_PRINCIPLES[0].id);
  const current =
    ARCHITECTURE_PRINCIPLES.find((item) => item.id === activeId) ?? ARCHITECTURE_PRINCIPLES[0];

  return (
    <section id="architecture" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-slate-500 mb-2">Engineering Methodology</p>
          <h2
            className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Every repository ships with strict performance and accessibility budgets.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3" role="tablist" aria-label="Architecture principles">
            {ARCHITECTURE_PRINCIPLES.map((principle) => {
              const isSelected = principle.id === current.id;
              return (
                <button
                  key={principle.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(principle.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                    isSelected
                      ? 'border-blue-700 bg-[#f8f9fa]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <p className="text-base font-semibold text-slate-900">
                    {principle.number} {principle.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{principle.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-[#f8f9fa] p-6 sm:p-8">
            <p className="text-xs font-medium text-slate-500">
              {current.number} Architectural Standard
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900 tracking-tight">
              {current.title}
            </h3>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">{current.explanation}</p>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-900 mb-4">{current.specLabel}</p>
              <dl className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
                {current.specLines.map((spec) => (
                  <div
                    key={spec.key}
                    className="px-4 py-3 flex items-center justify-between gap-4 text-sm"
                  >
                    <dt className="text-slate-600">{spec.key}</dt>
                    <dd className="font-mono text-xs sm:text-sm font-medium text-slate-900 tabular-nums">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
