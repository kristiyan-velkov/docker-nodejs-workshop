import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageShellProps {
  breadcrumbs?: BreadcrumbItem[];
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  title: string;
  description?: string;
  children: ReactNode;
}

export const PageShell = ({
  breadcrumbs,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  children,
}: PageShellProps) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="dot-grid absolute inset-0 opacity-[0.03]" />
          <div className="absolute right-0 top-0 h-[320px] w-[320px] -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-100/60 blur-[90px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="text-slate-400! no-underline hover:text-slate-600!">
              Workshop
            </Link>
            {breadcrumbs?.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                <span>/</span>
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="text-slate-400! no-underline hover:text-slate-600!"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-700">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-sm font-semibold text-blue-700">
            {EyebrowIcon && <EyebrowIcon className="h-3.5 w-3.5" />}
            {eyebrow}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-500">
              {description}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {children}
      </div>
    </div>
  );
};
