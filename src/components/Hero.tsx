import { ChevronDown, ChevronRight, Container, Box } from "lucide-react";
import { SOCIAL_LINKS } from "../constants/data";

export const Hero = () => {
  return (
    <header className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="dot-grid absolute inset-0 opacity-[0.04]" />
        <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/4 rounded-full bg-indigo-100/80 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-violet-100/60 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-eyebrow mb-4">Node.js Congress 2026</p>

            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl xl:text-7xl">
              Master{" "}
              <span className="bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Docker
              </span>{" "}
              for Node.js
            </h1>

            <p className="mt-7 max-w-lg text-xl leading-relaxed text-slate-500">
              Containerize Express + Vite + PostgreSQL with production-ready
              patterns, Compose Watch, and CI/CD. Hands-on tasks with progress
              tracking.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#workshop-materials"
                className="inline-flex items-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white! no-underline shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:text-white! hover:shadow-indigo-300 hover:-translate-y-0.5"
              >
                Start workshop
                <ChevronDown className="h-5 w-5 shrink-0" />
              </a>
              <a
                href={SOCIAL_LINKS.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700! no-underline shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900! hover:-translate-y-0.5"
              >
                View documentation
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
              </a>
            </div>

            <div className="mt-12 grid max-w-sm grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              {[
                { value: "8", label: "Workshop tasks" },
                { value: "Full-stack", label: "Express + Vite" },
                { value: "~3 hrs", label: "Total duration" },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`px-5 py-4 ${i !== 0 ? "border-l border-slate-200" : ""}`}
                >
                  <p className="text-xl font-bold text-slate-900">{value}</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-10 scale-90 rounded-3xl bg-indigo-100/60 blur-3xl" />

            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-slate-50 to-indigo-50/50 p-12 shadow-2xl shadow-slate-300/40 ring-1 ring-slate-200/60">
              <div className="flex items-center justify-center gap-8">
                <div
                  className="flex h-28 w-28 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200"
                  aria-label="Node.js logo"
                >
                  <Box className="h-14 w-14 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-4xl font-bold text-slate-300">+</span>
                <div
                  className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-800 shadow-lg shadow-slate-300/50"
                  aria-label="Docker logo"
                >
                  <Container className="h-14 w-14 text-sky-400" strokeWidth={1.5} />
                </div>
              </div>
              <p className="mt-8 text-center text-sm font-medium text-slate-500">
                Node.js + Docker full-stack containerization
              </p>
            </div>

            <div className="absolute -left-5 top-8 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg shadow-slate-200/60">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                <Container className="h-4 w-4 text-emerald-600" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Multi-stage builds</p>
                <p className="text-[10px] text-slate-400">Production-ready images</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg shadow-slate-200/60">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                <Box className="h-4 w-4 text-indigo-600" />
              </span>
              <div>
                <p className="text-xs font-bold text-slate-900">Compose Watch</p>
                <p className="text-[10px] text-slate-400">Hot reload in Docker</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
    </header>
  );
};
