export type ProjectTypeId = 'marketing' | 'webapp' | 'commerce' | 'design-system';
export type ComplexityTierId = 'core' | 'multi' | 'enterprise';
export type AddonId = 'cms' | 'auth' | 'billing' | 'audit';
export type LaunchWindowId = '4-6 weeks' | '2-3 months' | '3-6 months' | 'flexible';

export interface ProjectTypeOption {
  id: ProjectTypeId;
  label: string;
  baseWeeks: number;
  baseCostUsd: number;
  summary: string;
}

export interface ComplexityTierOption {
  id: ComplexityTierId;
  label: string;
  multiplier: number;
  extraWeeks: number;
  squad: string;
}

export interface AddonOption {
  id: AddonId;
  label: string;
  weeks: number;
  costUsd: number;
}

export interface EstimateInput {
  projectType: ProjectTypeId;
  complexity: ComplexityTierId;
  addons: AddonId[];
}

export interface SprintPhase {
  phase: string;
  weeks: number;
  deliverable: string;
}

export interface ProjectEstimate {
  minWeeks: number;
  maxWeeks: number;
  minCostUsd: number;
  maxCostUsd: number;
  recommendedSquad: string;
  phases: SprintPhase[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  company: string;
  launchWindow: LaunchWindowId;
  brief: string;
}

export interface InquiryValidationErrors {
  fullName?: string;
  email?: string;
  brief?: string;
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'marketing',
    label: 'Brand & Marketing Site',
    baseWeeks: 5,
    baseCostUsd: 18000,
    summary: 'Editorial web presence, conversion architecture, and technical SEO.',
  },
  {
    id: 'webapp',
    label: 'Web Application / SaaS',
    baseWeeks: 10,
    baseCostUsd: 42000,
    summary: 'Interactive product interface, API orchestration, and real-time state.',
  },
  {
    id: 'commerce',
    label: 'Commerce Storefront',
    baseWeeks: 8,
    baseCostUsd: 34000,
    summary: 'Custom headless storefront, cart flows, and edge-cached catalog.',
  },
  {
    id: 'design-system',
    label: 'Design System & Audit',
    baseWeeks: 6,
    baseCostUsd: 22000,
    summary: 'Tokenized component kit, WCAG AA compliance, and Core Web Vitals tuning.',
  },
];

export const COMPLEXITY_TIERS: ComplexityTierOption[] = [
  {
    id: 'core',
    label: 'Core Launch',
    multiplier: 1.0,
    extraWeeks: 0,
    squad: '1 Staff Engineer · 1 Product Designer',
  },
  {
    id: 'multi',
    label: 'Multi-Integration',
    multiplier: 1.35,
    extraWeeks: 3,
    squad: '2 Full-Stack Engineers · 1 Product Designer',
  },
  {
    id: 'enterprise',
    label: 'Enterprise Scale',
    multiplier: 1.75,
    extraWeeks: 6,
    squad: '3 Engineers · 1 Systems Architect · 1 Designer',
  },
];

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'cms',
    label: 'CMS & Editorial Workflow',
    weeks: 2,
    costUsd: 5500,
  },
  {
    id: 'auth',
    label: 'Auth & Role Permissions',
    weeks: 2,
    costUsd: 7000,
  },
  {
    id: 'billing',
    label: 'Payment & Billing Engine',
    weeks: 3,
    costUsd: 9500,
  },
  {
    id: 'audit',
    label: 'Performance & Accessibility Audit',
    weeks: 1,
    costUsd: 4500,
  },
];

export function calculateProjectEstimate(input: EstimateInput): ProjectEstimate {
  const project = PROJECT_TYPES.find((p) => p.id === input.projectType) ?? PROJECT_TYPES[0];
  const tier = COMPLEXITY_TIERS.find((t) => t.id === input.complexity) ?? COMPLEXITY_TIERS[0];

  const uniqueAddons = Array.from(new Set(input.addons));
  const selectedAddons = ADDON_OPTIONS.filter((a) => uniqueAddons.includes(a.id));

  const addonWeeks = selectedAddons.reduce((sum, a) => sum + a.weeks, 0);
  const addonCost = selectedAddons.reduce((sum, a) => sum + a.costUsd, 0);

  const rawMinWeeks = project.baseWeeks + tier.extraWeeks + addonWeeks;
  const minWeeks = Math.max(4, rawMinWeeks);
  const maxWeeks = minWeeks + Math.max(2, Math.ceil(minWeeks * 0.25));

  const rawCost = Math.round((project.baseCostUsd * tier.multiplier + addonCost) / 500) * 500;
  const minCostUsd = rawCost;
  const maxCostUsd = Math.round((rawCost * 1.2) / 500) * 500;

  const discoveryWeeks = Math.max(1, Math.round(minWeeks * 0.2));
  const hardeningWeeks = Math.max(1, Math.round(minWeeks * 0.2));
  const buildWeeks = Math.max(2, minWeeks - discoveryWeeks - hardeningWeeks);

  const phases: SprintPhase[] = [
    {
      phase: '01. Architecture & UX Spec',
      weeks: discoveryWeeks,
      deliverable: 'Information architecture, API contracts, interactive wireframes',
    },
    {
      phase: '02. Core Engineering Sprints',
      weeks: buildWeeks,
      deliverable: 'Component library, backend routes, integrations & test coverage',
    },
    {
      phase: '03. Hardening & Launch',
      weeks: hardeningWeeks,
      deliverable: 'Load testing, WCAG AA verification, edge deployment & handoff',
    },
  ];

  return {
    minWeeks,
    maxWeeks,
    minCostUsd,
    maxCostUsd,
    recommendedSquad: tier.squad,
    phases,
  };
}

export function formatCurrencyRange(minUsd: number, maxUsd: number): string {
  const fmt = (n: number) => `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${fmt(minUsd)} – ${fmt(maxUsd)}`;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiryForm(data: InquiryFormData): {
  isValid: boolean;
  errors: InquiryValidationErrors;
} {
  const errors: InquiryValidationErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Enter your full name (at least 2 characters).';
  }

  if (!data.email.trim()) {
    errors.email = 'Enter a work email address so we can reply.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Enter a valid email address (for example, alex@company.com).';
  }

  if (!data.brief.trim() || data.brief.trim().length < 15) {
    errors.brief = 'Share at least a brief sentence about your goals (15+ characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
