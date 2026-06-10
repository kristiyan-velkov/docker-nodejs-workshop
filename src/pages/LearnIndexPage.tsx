import { Link } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { LEARN_REFERENCE_LINKS } from "../constants/navigation";
import {
  DIFFICULTY_COLORS,
  LEARN_CATEGORY_ORDER,
  LEARN_COLOR_MAP,
  LEARN_ENTRIES,
} from "../constants/learn";
import { AppIcon } from "../components/ui/AppIcon";

const REFERENCE_COLORS = {
  slate: {
    icon: "bg-slate-100 text-slate-600 ring-slate-200",
    accent: "bg-slate-500",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600 ring-emerald-200",
    accent: "bg-emerald-500",
  },
} as const;

export const LearnIndexPage = () => {
  const grouped = LEARN_CATEGORY_ORDER.map((category) => ({
    category,
    entries: LEARN_ENTRIES.filter((e) => e.category === category),
  })).filter((g) => g.entries.length > 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 opacity-[0.035]" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-100/70 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="text-slate-400! no-underline hover:text-slate-600!">
              Workshop
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">Learn</span>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            <BookOpen className="h-4 w-4" />
            Docker Knowledge Base
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Learn{" "}
            <span className="bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
              Docker concepts
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-500">
            Plain-language guides to containerization — images, Compose, multi-stage
            builds, security, and CI/CD. Click a topic for the full explanation and
            official documentation links.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              {LEARN_ENTRIES.length} topics covered
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
              <Zap className="h-4 w-4 text-emerald-500" />
              Linked to workshop tasks
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div>
          <div className="mb-8 flex items-center gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Command reference
            </h2>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
              {LEARN_REFERENCE_LINKS.length} guides
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {LEARN_REFERENCE_LINKS.map((link) => {
              const cm = REFERENCE_COLORS[link.color];
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 no-underline shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${cm.icon}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className={`mb-3 h-1 w-10 rounded-full ${cm.accent}`} />
                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                      {link.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {link.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                      Open guide
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {grouped.map(({ category, entries }) => (
          <div key={category}>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {category}
              </h2>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                {entries.length} {entries.length === 1 ? "topic" : "topics"}
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => {
                const cm = LEARN_COLOR_MAP[entry.color] ?? LEARN_COLOR_MAP.blue;
                return (
                  <Link
                    key={entry.slug}
                    to={`/learn/${entry.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white no-underline shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                  >
                    <div className={`h-1.5 w-full ${cm.accent}`} />
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-5 flex items-start justify-between gap-2">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${cm.icon}`}
                        >
                          <AppIcon name={entry.icon} className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium text-slate-400">
                          {entry.readTime} read
                        </span>
                      </div>

                      <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                        {entry.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                        {entry.short} · {entry.category}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                        {entry.summary}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${DIFFICULTY_COLORS[entry.difficulty]}`}
                        >
                          {entry.difficulty}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 transition-all group-hover:bg-blue-100 group-hover:text-blue-600">
                          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Ready to practice?
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Apply these concepts in the hands-on workshop tasks with the
            workshop-node-congress sample app.
          </p>
          <Link
            to="/tasks"
            className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white! no-underline shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:-translate-y-0.5"
          >
            Go to workshop tasks
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
