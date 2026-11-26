import { FormEvent, RefObject, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  ADDON_OPTIONS,
  AddonId,
  COMPLEXITY_TIERS,
  ComplexityTierId,
  InquiryFormData,
  InquiryValidationErrors,
  LaunchWindowId,
  PROJECT_TYPES,
  ProjectTypeId,
  calculateProjectEstimate,
  formatCurrencyRange,
  validateInquiryForm,
} from '../utils/estimator';

interface EstimatorAndContactProps {
  nameInputRef: RefObject<HTMLInputElement | null>;
  initialReferenceNote?: string;
}

const LAUNCH_WINDOWS: LaunchWindowId[] = ['4-6 weeks', '2-3 months', '3-6 months', 'flexible'];

export function EstimatorAndContact({
  nameInputRef,
  initialReferenceNote = '',
}: EstimatorAndContactProps) {
  const [projectType, setProjectType] = useState<ProjectTypeId>('webapp');
  const [complexity, setComplexity] = useState<ComplexityTierId>('multi');
  const [addons, setAddons] = useState<AddonId[]>(['auth']);

  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    company: '',
    launchWindow: '2-3 months',
    brief: initialReferenceNote,
  });

  const [errors, setErrors] = useState<InquiryValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<{
    form: InquiryFormData;
    estimateSummary: string;
    timelineSummary: string;
    referenceId: string;
  } | null>(null);

  const estimate = useMemo(
    () =>
      calculateProjectEstimate({
        projectType,
        complexity,
        addons,
      }),
    [projectType, complexity, addons]
  );

  const selectedProjectLabel =
    PROJECT_TYPES.find((p) => p.id === projectType)?.label ?? 'Web Application';

  const toggleAddon = (id: AddonId) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateInquiryForm(formData);
    setErrors(result.errors);
    if (!result.isValid) {
      return;
    }

    const referenceId = `KW-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRecord({
      form: { ...formData },
      estimateSummary: formatCurrencyRange(estimate.minCostUsd, estimate.maxCostUsd),
      timelineSummary: `${estimate.minWeeks}–${estimate.maxWeeks} weeks`,
      referenceId,
    });
  };

  const handleResetSubmission = () => {
    setSubmittedRecord(null);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      company: '',
      launchWindow: '2-3 months',
      brief: '',
    });
  };

  return (
    <section id="estimate" className="py-16 lg:py-24 bg-[#f8f9fa]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-slate-500 mb-2">Project Scope &amp; Inquiry</p>
          <h2
            className="text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Estimate your delivery timeline and request a technical proposal.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">1. Primary Build Type</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const active = projectType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setProjectType(type.id)}
                        className={`text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                          active
                            ? 'border-blue-700 bg-blue-50/50 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="block text-sm font-semibold">{type.label}</span>
                        <span className="block text-xs text-slate-500 mt-0.5 leading-snug">
                          {type.summary}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">2. Architecture Scale</p>
                <div className="grid grid-cols-3 gap-2">
                  {COMPLEXITY_TIERS.map((tier) => {
                    const active = complexity === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setComplexity(tier.id)}
                        className={`px-3 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors whitespace-nowrap truncate cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 ${
                          active
                            ? 'border-blue-700 bg-blue-700 text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  3. Integrated Modules (Optional)
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {ADDON_OPTIONS.map((addon) => {
                    const checked = addons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg border text-sm cursor-pointer transition-colors ${
                          checked
                            ? 'border-blue-700 bg-blue-50/40 text-slate-900'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleAddon(addon.id)}
                            className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700 shrink-0"
                          />
                          <span className="font-medium">{addon.label}</span>
                        </span>
                        <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                          +{addon.weeks} {addon.weeks === 1 ? 'week' : 'weeks'}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-500">Estimated Delivery</p>
                  <p
                    data-testid="estimate-weeks"
                    className="mt-1 font-mono text-2xl font-semibold text-slate-900 tabular-nums"
                  >
                    {estimate.minWeeks}–{estimate.maxWeeks} weeks
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Indicative Investment</p>
                  <p
                    data-testid="estimate-cost"
                    className="mt-1 font-mono text-2xl font-semibold text-blue-700 tabular-nums"
                  >
                    {formatCurrencyRange(estimate.minCostUsd, estimate.maxCostUsd)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-600">
                Recommended Squad:{' '}
                <span className="font-medium text-slate-900">{estimate.recommendedSquad}</span>
              </p>

              <div className="mt-5 pt-4 border-t border-slate-200 space-y-2">
                {estimate.phases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="flex items-baseline justify-between gap-4 text-xs"
                  >
                    <span className="font-medium text-slate-800">{phase.phase}</span>
                    <span className="font-mono text-slate-500 tabular-nums shrink-0">
                      {phase.weeks} {phase.weeks === 1 ? 'week' : 'weeks'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
            {submittedRecord ? (
              <div data-testid="inquiry-confirmation" className="my-auto py-6 space-y-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-6 h-6 text-blue-700 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-mono text-slate-500">
                      Proposal Request Logged · {submittedRecord.referenceId}
                    </p>
                    <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                      Thank you, {submittedRecord.form.fullName}.
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      A senior staff engineer will review your scope and send a technical proposal
                      with sprint milestones to{' '}
                      <span className="font-medium text-slate-900">
                        {submittedRecord.form.email}
                      </span>{' '}
                      within one business day.
                    </p>
                  </div>
                </div>

                <dl className="divide-y divide-slate-200 border border-slate-200 rounded-lg bg-[#f8f9fa] text-sm">
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <dt className="text-slate-500">Build Scope</dt>
                    <dd className="font-medium text-slate-900 text-right">{selectedProjectLabel}</dd>
                  </div>
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <dt className="text-slate-500">Estimated Window</dt>
                    <dd className="font-mono text-slate-900 tabular-nums">
                      {submittedRecord.timelineSummary}
                    </dd>
                  </div>
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <dt className="text-slate-500">Indicative Range</dt>
                    <dd className="font-mono text-blue-700 font-semibold tabular-nums">
                      {submittedRecord.estimateSummary}
                    </dd>
                  </div>
                  <div className="px-4 py-3 flex justify-between gap-4">
                    <dt className="text-slate-500">Target Launch</dt>
                    <dd className="text-slate-900">{submittedRecord.form.launchWindow}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={handleResetSubmission}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                >
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Another Inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Request Technical Proposal
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Includes your selected scope ({selectedProjectLabel},{' '}
                    <span className="font-mono tabular-nums">
                      {estimate.minWeeks}–{estimate.maxWeeks} wks
                    </span>
                    ).
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="inquiry-name"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                      placeholder="Alex Mercer"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-name' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                        errors.fullName ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="error-name"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Work Email
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="alex@company.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                        errors.email ? 'border-red-600' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-company"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Company or Website (Optional)
                    </label>
                    <input
                      id="inquiry-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, company: e.target.value }))
                      }
                      placeholder="northbridge.io"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-window"
                      className="block text-sm font-medium text-slate-800 mb-1.5"
                    >
                      Target Launch Window
                    </label>
                    <select
                      id="inquiry-window"
                      value={formData.launchWindow}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          launchWindow: e.target.value as LaunchWindowId,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    >
                      {LAUNCH_WINDOWS.map((win) => (
                        <option key={win} value={win}>
                          {win}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-brief"
                    className="block text-sm font-medium text-slate-800 mb-1.5"
                  >
                    Project Brief &amp; Technical Goals
                  </label>
                  <textarea
                    id="inquiry-brief"
                    rows={4}
                    value={formData.brief}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, brief: e.target.value }));
                      if (errors.brief) setErrors((prev) => ({ ...prev, brief: undefined }));
                    }}
                    placeholder="Describe what you are building, current stack constraints, or performance targets..."
                    aria-invalid={Boolean(errors.brief)}
                    aria-describedby={errors.brief ? 'error-brief' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-700 resize-y ${
                      errors.brief ? 'border-red-600' : 'border-slate-300'
                    }`}
                  />
                  {errors.brief && (
                    <p
                      id="error-brief"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.brief}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    Direct engineer review. Response within 1 business day.
                  </p>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
                  >
                    Send Project Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
