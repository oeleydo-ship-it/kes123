export type DisciplineFilter = 'all' | 'frontend' | 'backend' | 'performance';
export type CaseStudyCategory = 'all' | 'SaaS Platforms' | 'Commerce' | 'Developer Tools';

export interface ProofMetric {
  value: string;
  label: string;
  context: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  discipline: Exclude<DisciplineFilter, 'all'>;
  disciplineLabel: string;
  span: 'wide' | 'narrow';
  summary: string;
  deliverables: string[];
  stackPreview: string;
  benchmark: string;
  codeExcerpt: string;
}

export interface CaseStudyMetricRow {
  metric: string;
  before: string;
  after: string;
  delta: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: Exclude<CaseStudyCategory, 'all'>;
  timeline: string;
  stackSummary: string;
  headline: string;
  impactMetric: string;
  impactContext: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
  architectureNotes: string[];
  techStack: string[];
  comparison: CaseStudyMetricRow[];
}

export interface ArchitecturePrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  explanation: string;
  specLabel: string;
  specLines: { key: string; value: string }[];
}

export const HERO_IMAGE = {
  src: '/src/assets/images/hero_web_studio_1795706603270.jpg',
  alt: 'Kestrel Works web engineering studio workspace showing wireframe architecture on a laptop at an oak desk',
};

export const PROOF_METRICS: ProofMetric[] = [
  {
    value: '99.98%',
    label: 'Production Uptime',
    context: 'Measured across 42 client launches (2024–2026)',
  },
  {
    value: '38 ms',
    label: 'Median Edge TTFB',
    context: 'Global CDN & server-rendered storefronts',
  },
  {
    value: '14 wks',
    label: 'Concept to Production',
    context: 'Median full-stack product delivery cycle',
  },
  {
    value: '3.1x',
    label: 'Checkout Conversion Lift',
    context: 'Median organic conversion gain post-rebuild',
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'fullstack-apps',
    number: '01.',
    title: 'Full-Stack Web Applications',
    discipline: 'backend',
    disciplineLabel: 'Backend & APIs',
    span: 'wide',
    summary:
      'End-to-end TypeScript applications built with React, strict API schemas, and PostgreSQL data layers designed for predictable scaling under real customer traffic.',
    deliverables: [
      'Typed REST & GraphQL API contracts',
      'Multi-tenant Postgres schemas & migrations',
      'Real-time collaborative state & WebSockets',
    ],
    stackPreview: 'React 19 · TypeScript · Node.js · PostgreSQL',
    benchmark: 'Sub-65 ms median API p95 latency',
    codeExcerpt: `export async function createOrderHandler(req: TypedRequest<OrderPayload>) {
  const validated = OrderSchema.parse(req.body);
  return db.transaction(async (tx) => {
    const ledger = await tx.insert(orders).values(validated).returning();
    await publishOrderEvent(ledger[0].id);
    return ledger[0];
  });
}`,
  },
  {
    id: 'design-systems',
    number: '02.',
    title: 'Design Systems & UI Kits',
    discipline: 'frontend',
    disciplineLabel: 'Frontend Systems',
    span: 'narrow',
    summary:
      'Accessible, token-driven component libraries engineered for multi-team product velocity without CSS bloat or visual drift.',
    deliverables: [
      'WCAG AA keyboard & screen-reader patterns',
      'Automated visual regression suites',
      'Zero-runtime CSS token architecture',
    ],
    stackPreview: 'React · Tailwind CSS · Radix Primitives',
    benchmark: '100% keyboard & WCAG AA audit pass',
    codeExcerpt: `export const buttonVariants = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-2',
  quiet: 'bg-transparent text-slate-700 hover:bg-slate-100',
} as const;`,
  },
  {
    id: 'commerce-portals',
    number: '03.',
    title: 'Headless Commerce & Portals',
    discipline: 'frontend',
    disciplineLabel: 'Frontend Systems',
    span: 'narrow',
    summary:
      'Bespoke storefronts and B2B customer portals with instant cart mutations, localized pricing, and Stripe billing orchestration.',
    deliverables: [
      'Edge-cached product & catalog rendering',
      'Stripe checkout, webhooks & invoicing',
      'Role-based enterprise account portals',
    ],
    stackPreview: 'Vite · SSR Edge · Stripe API · Redis',
    benchmark: '+38% checkout completion rate',
    codeExcerpt: `export async function syncCartPricing(cartId: string, currency: Currency) {
  const lines = await getCartLines(cartId);
  return calculateTaxAndTotals(lines, currency);
}`,
  },
  {
    id: 'performance-audits',
    number: '04.',
    title: 'Performance Audits & Core Web Vitals',
    discipline: 'performance',
    disciplineLabel: 'Performance',
    span: 'wide',
    summary:
      'Deep bundle analysis, server query profiling, and rendering pipeline remediation for sluggish legacy web apps losing organic conversion.',
    deliverables: [
      'Code-splitting & hydration waterfall fixes',
      'PostgreSQL N+1 query elimination',
      'Core Web Vitals telemetry & CI budgets',
    ],
    stackPreview: 'Lighthouse CI · Flamegraphs · Edge Cache',
    benchmark: 'LCP reduced below 1.1s on 4G mobile',
    codeExcerpt: `export const cachePolicy = {
  immutableAssets: 'public, max-age=31536000, immutable',
  isrDocument: 'public, s-maxage=60, stale-while-revalidate=300',
} as const;`,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'clearledger',
    client: 'ClearLedger Financial',
    category: 'SaaS Platforms',
    timeline: '12 Weeks',
    stackSummary: 'TypeScript · React · PostgreSQL',
    headline: 'Re-architecting a multi-entity treasury ledger for 18,000 finance teams',
    impactMetric: '-62% API p95 latency in 8 weeks',
    impactContext: 'Consolidated 4 legacy SPAs into one typed workspace',
    summary:
      'ClearLedger needed to replace a fragmented dashboard struggling under 200k-row ledger queries. We engineered a virtualized React workspace backed by indexed Postgres materialized views.',
    imageUrl: '/src/assets/images/case_fintech_platform_1795706603293.jpg',
    imageAlt: 'ClearLedger financial ledger web application displayed on an aluminum laptop over stone surface',
    quote: {
      text: 'Before the rebuild, quarter-end reconciliations timed out for enterprise accounts. Kestrel cut p95 query response times by 62% and unified our design system across every screen.',
      author: 'Hannah Lindqvist',
      role: 'VP of Engineering, ClearLedger Financial',
    },
    architectureNotes: [
      'Replaced nested client-side Redux thunks with deterministic query caching and optimistic reconciliation mutations.',
      'Implemented keyset pagination and composite Postgres indexes on ledger_entries(org_id, posted_at) for instant scrolling.',
      'Built a shared tabular numeric component kit enforcing strict decimal precision and keyboard cell navigation.',
    ],
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Playwright'],
    comparison: [
      { metric: 'API p95 Response Time', before: '1,420 ms', after: '540 ms', delta: '-62%' },
      { metric: 'Ledger Grid Render (10k rows)', before: '890 ms', after: '16 ms', delta: '-98%' },
      { metric: 'Lighthouse Accessibility', before: '71 / 100', after: '100 / 100', delta: '+29 pts' },
      { metric: 'Weekly Support Tickets', before: '114 / wk', after: '28 / wk', delta: '-75%' },
    ],
  },
  {
    id: 'archive-01',
    client: 'Archive.01 Atelier',
    category: 'Commerce',
    timeline: '10 Weeks',
    stackSummary: 'Headless Storefront · Edge Cache · Stripe',
    headline: 'Zero-jank editorial storefront and localized checkout for European retail',
    impactMetric: '+$1.8M annual checkout recovery',
    impactContext: 'Measured across 6 months post-launch in UK & EU markets',
    summary:
      'Slow image hydration and multi-step cart redirects were costing Archive.01 mobile buyers at checkout. We built a custom headless storefront with edge-rendered inventory and single-page multi-currency payment.',
    imageUrl: '/src/assets/images/case_commerce_storefront_1795706604662.jpg',
    imageAlt: 'Archive.01 minimalist headless commerce storefront shown on desktop monitor and tablet',
    quote: {
      text: 'Our previous theme took over 4 seconds to become interactive on mobile. The new storefront loads instantaneously and recovered $1.8M in abandoned mobile checkouts within two quarters.',
      author: 'Marcus Sterling',
      role: 'Head of Digital Commerce, Archive.01',
    },
    architectureNotes: [
      'Pre-computed responsive AVIF/WebP image transforms at the edge with zero cumulative layout shift.',
      'Engineered an optimistic bag drawer synchronized with Stripe PaymentIntent sessions for GBP, EUR, and USD.',
      'Integrated editorial lookbook CMS blocks directly into product detail routes without sacrificing static cacheability.',
    ],
    techStack: ['React', 'TypeScript', 'Edge SSR', 'Stripe Elements', 'Headless CMS', 'Cloudflare CDN'],
    comparison: [
      { metric: 'Mobile Largest Contentful Paint', before: '4.3 s', after: '0.9 s', delta: '-79%' },
      { metric: 'Mobile Checkout Conversion', before: '1.8%', after: '4.1%', delta: '+128%' },
      { metric: 'Cumulative Layout Shift', before: '0.24', after: '0.00', delta: 'Zero CLS' },
      { metric: 'Median Edge TTFB', before: '610 ms', after: '34 ms', delta: '-94%' },
    ],
  },
  {
    id: 'traceline',
    client: 'Traceline Observability',
    category: 'Developer Tools',
    timeline: '14 Weeks',
    stackSummary: 'Canvas Flamegraphs · OpenAPI · TypeScript',
    headline: 'Interactive flamegraph explorer and live API reference for distributed systems',
    impactMetric: '48,000 daily active engineers',
    impactContext: 'Adopted as primary trace debugger across 900+ teams',
    summary:
      'Traceline needed a browser-native trace inspector capable of rendering 50,000 spans smoothly at 60fps alongside interactive API documentation.',
    imageUrl: '/src/assets/images/case_devtools_console_1795706604761.jpg',
    imageAlt: 'Traceline developer console displaying API documentation and performance flamegraphs on an ultrawide monitor',
    quote: {
      text: 'Developers judge observability tools by how fast the UI feels under heavy trace payloads. Kestrel delivered a 60fps canvas inspector that never stalls even on massive microservice trees.',
      author: 'Priya Nair',
      role: 'Co-Founder & CTO, Traceline',
    },
    architectureNotes: [
      'Offloaded trace interval indexing to a Web Worker and rendered span bars on a hi-DPI HTML5 Canvas.',
      'Generated interactive OpenAPI request playgrounds directly from typed schema definitions.',
      'Implemented keyboard-first vim-style navigation and shareable deep links to exact millisecond windows.',
    ],
    techStack: ['TypeScript', 'HTML5 Canvas', 'Web Workers', 'React', 'OpenAPI 3.1', 'Vitest'],
    comparison: [
      { metric: '50k-Span Flamegraph Pan/Zoom', before: '14 fps', after: '60 fps', delta: '+4.2x' },
      { metric: 'Initial JS Bundle (Gzip)', before: '680 KB', after: '142 KB', delta: '-79%' },
      { metric: 'Time to Interactive (Trace View)', before: '3.6 s', after: '0.7 s', delta: '-81%' },
      { metric: 'Engineer Daily Retention', before: '41%', after: '78%', delta: '+37 pts' },
    ],
  },
];

export const ARCHITECTURE_PRINCIPLES: ArchitecturePrinciple[] = [
  {
    id: 'edge-delivery',
    number: '01.',
    title: 'Edge-First Delivery & Caching',
    subtitle: 'Sub-50ms initial document responses globally',
    explanation:
      'Every public route is engineered with explicit cache boundaries—separating immutable static assets, stale-while-revalidate editorial pages, and authenticated dynamic fragments so users never wait on cold origin servers.',
    specLabel: 'Caching & Latency Targets',
    specLines: [
      { key: 'Median Global TTFB', value: '< 45 ms' },
      { key: 'Largest Contentful Paint', value: '< 1.2 s (4G)' },
      { key: 'Cumulative Layout Shift', value: '0.00' },
      { key: 'JavaScript Budget (Initial)', value: '< 160 KB gzipped' },
    ],
  },
  {
    id: 'type-contracts',
    number: '02.',
    title: 'End-to-End Type Contracts',
    subtitle: 'Zero schema drift between database, API, and UI',
    explanation:
      'We share validation schemas across client forms, Express/Node handlers, and database queries. Breaking changes fail at compile time in CI rather than surfacing as runtime undefined errors in production.',
    specLabel: 'Engineering Quality Gates',
    specLines: [
      { key: 'TypeScript Strict Mode', value: 'Enforced' },
      { key: 'Domain Logic Unit Tests', value: 'node:test / Vitest' },
      { key: 'End-to-End Critical Flows', value: 'Playwright CI' },
      { key: 'API Payload Validation', value: 'Schema-verified' },
    ],
  },
  {
    id: 'accessible-craft',
    number: '03.',
    title: 'Accessible Semantic Markup',
    subtitle: 'Keyboard navigable, high-contrast, resilient UI',
    explanation:
      'Accessibility is built into primitive components from day one: native buttons and landmarks, visible focus rings, tabular numerals in financial tables, and contrast ratios verified against WCAG AA.',
    specLabel: 'Accessibility Baseline',
    specLines: [
      { key: 'Text Contrast Ratio', value: '>= 4.5 : 1 (WCAG AA)' },
      { key: 'Interactive Touch Target', value: '>= 44 x 44 px' },
      { key: 'Reduced Motion Support', value: 'Respected globally' },
      { key: 'Focus Management', value: 'Visible & trapped in modals' },
    ],
  },
];
