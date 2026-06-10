import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { HOME_QUICK_LINKS } from "../constants/navigation";

const COLOR_MAP = {
  blue: {
    icon: "bg-blue-100 text-blue-600 ring-blue-200",
    accent: "bg-blue-500",
  },
  sky: {
    icon: "bg-sky-100 text-sky-600 ring-sky-200",
    accent: "bg-sky-500",
  },
  slate: {
    icon: "bg-slate-100 text-slate-600 ring-slate-200",
    accent: "bg-slate-500",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-600 ring-emerald-200",
    accent: "bg-emerald-500",
  },
} as const;

export const WorkshopQuickLinks = () => {
  return (
    <section className="border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-3">Get started</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Workshop sections
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            Each section is its own page — use the header navigation or pick a
            starting point below.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {HOME_QUICK_LINKS.map((link) => {
            const cm = COLOR_MAP[link.color];
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${cm.icon}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`mb-3 h-1 w-10 rounded-full ${cm.accent}`} />
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    {link.description}
                  </p>
                </div>
                <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-blue-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
