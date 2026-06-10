import type { Feature } from "../types";
import { AppIcon } from "./ui/AppIcon";

const ACCENT_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

const ICON_BG = [
  "bg-indigo-50 text-indigo-600 ring-indigo-100",
  "bg-violet-50 text-violet-600 ring-violet-100",
  "bg-sky-50 text-sky-600 ring-sky-100",
  "bg-emerald-50 text-emerald-600 ring-emerald-100",
  "bg-amber-50 text-amber-600 ring-amber-100",
  "bg-rose-50 text-rose-600 ring-rose-100",
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const iconBg = ICON_BG[index % ICON_BG.length];

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <div className={`h-1.5 ${accent}`} />
      <div className="p-6">
        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${iconBg}`}
        >
          <AppIcon name={feature.icon} className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
