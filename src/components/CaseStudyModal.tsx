import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CaseStudy } from '../data/studioData';
import { SafeImage } from './SafeImage';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onRequestSimilar: (clientName: string) => void;
}

export function CaseStudyModal({ study, onClose, onRequestSimilar }: CaseStudyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!study) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [study, onClose]);

  if (!study) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white border-b border-slate-200">
          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">
              {study.client} <span aria-hidden="true">·</span> {study.category}{' '}
              <span aria-hidden="true">·</span> {study.timeline}
            </p>
            <h3
              id="case-study-modal-title"
              className="text-lg font-semibold text-slate-900 truncate"
            >
              Technical Breakdown
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={`Close ${study.client} technical breakdown`}
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
            <SafeImage
              src={study.imageUrl}
              alt={study.imageAlt}
              fallbackTitle={study.client}
              className="w-full h-48 sm:h-56 object-cover block"
            />
          </div>

          <div>
            <p className="font-mono text-sm font-semibold text-blue-700 tabular-nums">
              {study.impactMetric}
            </p>
            <h4 className="mt-1.5 text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
              {study.headline}
            </h4>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {study.summary}
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-900 mb-3">
              Verified Before &amp; After Telemetry
            </h5>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                    <th className="py-3 px-4">Metric</th>
                    <th className="py-3 px-4">Before</th>
                    <th className="py-3 px-4">After Launch</th>
                    <th className="py-3 px-4 text-right">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {study.comparison.map((row) => (
                    <tr key={row.metric}>
                      <td className="py-3 px-4 font-medium text-slate-900">{row.metric}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500 tabular-nums">
                        {row.before}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-900 tabular-nums">
                        {row.after}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-700 text-right tabular-nums">
                        {row.delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-900 mb-3">Architecture Decisions</h5>
            <ul className="space-y-2.5 text-sm text-slate-600 leading-relaxed list-disc pl-5">
              {study.architectureNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Stack: <span className="text-slate-700 font-medium">{study.techStack.join(' · ')}</span>
            </p>

            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestSimilar(study.client);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
            >
              Scope a Similar Build
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
