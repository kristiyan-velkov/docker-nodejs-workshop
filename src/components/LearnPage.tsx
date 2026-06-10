import { useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Zap,
} from "lucide-react";
import {
  DIFFICULTY_COLORS,
  LEARN_CATEGORY_ORDER,
  LEARN_COLOR_MAP,
  LEARN_ENTRIES,
  type LearnEntry,
} from "../constants/learn";
import { AppIcon } from "./ui/AppIcon";
import { CodeBlock } from "./ui/CodeBlock";

export const LearnPage = () => {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    LEARN_ENTRIES[0]?.slug ?? null
  );

  const grouped = LEARN_CATEGORY_ORDER.map((category) => ({
    category,
    entries: LEARN_ENTRIES.filter((e) => e.category === category),
  })).filter((g) => g.entries.length > 0);

  const toggle = (slug: string) => {
    setExpandedSlug((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
        <div className="relative p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
            <BookOpen className="h-4 w-4" />
            Docker Knowledge Base
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Learn{" "}
            <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Docker concepts
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
            Plain-language guides to containerization — images, Compose, multi-stage
            builds, security, and CI/CD. Each topic links to official Docker
            documentation for deeper reading.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600">
              <CheckCircle2 className="h-4 w-4 text-indigo-500" />
              {LEARN_ENTRIES.length} topics covered
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-600">
              <Zap className="h-4 w-4 text-emerald-500" />
              Linked to workshop tasks
            </div>
          </div>
        </div>
      </div>

      {/* Grouped topics */}
      {grouped.map(({ category, entries }) => (
        <div key={category}>
          <div className="mb-6 flex items-center gap-4">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
              {category}
            </h3>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
              {entries.length} {entries.length === 1 ? "topic" : "topics"}
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <LearnTopicCard
                key={entry.slug}
                entry={entry}
                expanded={expandedSlug === entry.slug}
                onToggle={() => toggle(entry.slug)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* CTA */}
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center sm:p-8">
        <h3 className="text-xl font-bold text-slate-900">Ready to practice?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Switch to the Workshop Tasks tab and apply these concepts on the
          workshop-node-congress sample app.
        </p>
        <a
          href="#workshop-materials"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white no-underline shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
        >
          Go to workshop tasks
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

function LearnTopicCard({
  entry,
  expanded,
  onToggle,
}: {
  entry: LearnEntry;
  expanded: boolean;
  onToggle: () => void;
}) {
  const cm = LEARN_COLOR_MAP[entry.color] ?? LEARN_COLOR_MAP.indigo;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
      <div className={`h-1 ${cm.accent}`} />
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${cm.icon}`}
        >
          <AppIcon name={entry.icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-bold text-slate-900">{entry.title}</h4>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DIFFICULTY_COLORS[entry.difficulty]}`}
            >
              {entry.difficulty}
            </span>
            <span className="text-xs text-slate-400">{entry.readTime} read</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{entry.summary}</p>
        </div>
        <ChevronRight
          className={`mt-1 h-5 w-5 shrink-0 text-slate-400 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>

      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
          <div className="space-y-5">
            <div>
              <h5 className="mb-2 text-sm font-semibold text-slate-900">
                What is it?
              </h5>
              <p className="text-sm leading-relaxed text-slate-600">
                {entry.whatIsIt}
              </p>
            </div>

            <div>
              <h5 className="mb-2 text-sm font-semibold text-slate-900">
                Key points
              </h5>
              <ul className="space-y-2">
                {entry.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {entry.example && (
              <div>
                <h5 className="mb-2 text-sm font-semibold text-slate-900">
                  Example
                </h5>
                <CodeBlock code={entry.example} filename={entry.short} />
              </div>
            )}

            <div>
              <h5 className="mb-3 text-sm font-semibold text-slate-900">
                Learn more
              </h5>
              <div className="flex flex-wrap gap-2">
                {entry.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 no-underline shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    <BookOpen className="h-3.5 w-3.5 shrink-0" />
                    {link.title}
                    <span className="text-xs text-slate-400">({link.source})</span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
