import { Link, Navigate, useParams } from "react-router-dom";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  DIFFICULTY_COLORS,
  LEARN_BY_SLUG,
  LEARN_COLOR_MAP,
  LEARN_ENTRIES,
} from "../constants/learn";
import { AppIcon } from "../components/ui/AppIcon";
import { CodeBlock } from "../components/ui/CodeBlock";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-eyebrow mb-3">{children}</p>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export const LearnDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? LEARN_BY_SLUG[slug] : undefined;

  if (!entry) {
    return <Navigate to="/learn" replace />;
  }

  const cm = LEARN_COLOR_MAP[entry.color] ?? LEARN_COLOR_MAP.blue;
  const currentIdx = LEARN_ENTRIES.findIndex((e) => e.slug === slug);
  const prev = LEARN_ENTRIES[currentIdx - 1] ?? null;
  const next = LEARN_ENTRIES[currentIdx + 1] ?? null;
  const tagline = entry.tagline ?? entry.summary;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 opacity-[0.03]" />
          <div className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-100/60 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="text-slate-400! no-underline hover:text-slate-600!">
              Workshop
            </Link>
            <span>/</span>
            <Link to="/learn" className="text-slate-400! no-underline hover:text-slate-600!">
              Learn
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">{entry.short}</span>
          </nav>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl ring-1 ${cm.icon} shadow-md`}
            >
              <AppIcon name={entry.icon} className="h-10 w-10" strokeWidth={1.8} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${DIFFICULTY_COLORS[entry.difficulty]}`}
                >
                  {entry.difficulty}
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
                  {entry.readTime} read
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                  {entry.category}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {entry.title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-slate-500 sm:text-xl">
                {tagline}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Card>
          <SectionLabel>What is it?</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900">Plain-language explanation</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {entry.whatIsIt}
          </p>
        </Card>

        <Card>
          <SectionLabel>Key points</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900">What to remember</h2>
          <ul className="mt-5 space-y-3">
            {entry.keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-200">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                </span>
                <p className="text-base leading-relaxed text-slate-600">{point}</p>
              </li>
            ))}
          </ul>
        </Card>

        {entry.example && (
          <div>
            <SectionLabel>Example</SectionLabel>
            <h2 className="mb-5 text-2xl font-bold text-slate-900">Commands & config</h2>
            <CodeBlock code={entry.example} filename={entry.short} />
          </div>
        )}

        <Card>
          <SectionLabel>Learn more</SectionLabel>
          <h2 className="text-2xl font-bold text-slate-900">Official documentation</h2>
          <p className="mt-2 text-sm text-slate-500">
            Deepen your understanding with these trusted Docker resources.
          </p>
          <ul className="mt-6 space-y-3">
            {entry.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 no-underline transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">{link.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500">{link.source}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-between">
          {prev ? (
            <Link
              to={`/learn/${prev.slug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 no-underline shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            >
              <ChevronLeft className="h-4 w-4" />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/learn/${next.slug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 no-underline shadow-sm transition hover:border-blue-200 hover:bg-blue-50 sm:ml-auto"
            >
              {next.title}
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
