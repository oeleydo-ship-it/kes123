import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, PROOF_METRICS } from '../data/studioData';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onScopeBuild: () => void;
}

export function Hero({ onScopeBuild }: HeroProps) {
  return (
    <section id="top" className="pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-1">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-5">
                London &amp; Remote <span aria-hidden="true">·</span> Full-Stack Web Engineering
              </p>

              <h1
                className="text-[clamp(2.25rem,4vw,3.75rem)] font-semibold tracking-tight text-slate-900 leading-[1.08] max-w-2xl"
                style={{ textWrap: 'balance' }}
              >
                Production web applications engineered for speed and clarity.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                We design and build custom React interfaces, resilient TypeScript backends, and
                high-throughput storefronts for software companies that measure engineering by
                conversion, latency, and long-term maintainability.
              </p>
            </div>

            <div className="mt-8 pt-2 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={onScopeBuild}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                <span>Scope Your Build</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#work"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900 transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 rounded-sm"
              >
                Inspect Case Studies
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 bg-white">
              <SafeImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fallbackTitle="Kestrel Works Studio"
                className="w-full aspect-[16/10] lg:aspect-auto lg:h-full object-cover block"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROOF_METRICS.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-2xl sm:text-3xl font-semibold text-slate-900 tabular-nums tracking-tight">
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">{metric.label}</p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">{metric.context}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
