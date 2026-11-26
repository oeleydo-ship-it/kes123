export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-base font-semibold tracking-tight text-slate-900">Kestrel Works</p>
          <p className="mt-1 text-sm text-slate-500">
            Full-stack web development, design systems &amp; product engineering. London &amp; Remote.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
          <a href="#capabilities" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Capabilities
          </a>
          <a href="#work" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Selected Work
          </a>
          <a href="#architecture" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Architecture
          </a>
          <a href="#estimate" className="hover:text-slate-900 transition-colors whitespace-nowrap">
            Estimate
          </a>
          <a
            href="mailto:hello@kestrelworks.dev"
            className="text-slate-900 font-medium hover:underline underline-offset-4 whitespace-nowrap"
          >
            hello@kestrelworks.dev
          </a>
        </nav>

        <p className="text-xs text-slate-500 whitespace-nowrap">© 2026 Kestrel Works Ltd.</p>
      </div>
    </footer>
  );
}
