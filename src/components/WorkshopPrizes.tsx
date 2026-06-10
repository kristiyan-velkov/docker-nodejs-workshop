import {
  Award,
  BookOpen,
  ExternalLink,
  Gift,
  Medal,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  BOOK_PRIZE,
  TOTAL_WORKSHOP_TASKS,
  WORKSHOP_PRIZES,
} from "../constants/bookPrize";

const ACCENT_STYLES = {
  amber: {
    ring: "ring-amber-200",
    bg: "bg-linear-to-br from-amber-50 to-yellow-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    icon: "bg-amber-500 text-white shadow-amber-200",
    glow: "shadow-amber-100",
  },
  slate: {
    ring: "ring-slate-200",
    bg: "bg-linear-to-br from-slate-50 to-slate-100",
    border: "border-slate-200",
    badge: "bg-slate-200 text-slate-700",
    icon: "bg-slate-500 text-white shadow-slate-200",
    glow: "shadow-slate-100",
  },
  orange: {
    ring: "ring-orange-200",
    bg: "bg-linear-to-br from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    icon: "bg-orange-500 text-white shadow-orange-200",
    glow: "shadow-orange-100",
  },
} as const;

function PrizeIcon({
  icon,
  className,
}: {
  icon: (typeof WORKSHOP_PRIZES)[number]["icon"];
  className: string;
}) {
  if (icon === "trophy") {
    return <Trophy className={className} />;
  }
  return <Medal className={className} />;
}

function discountedPrice(discount: number) {
  const price = BOOK_PRIZE.regularPrice * (1 - discount / 100);
  return price.toFixed(2);
}

interface WorkshopPrizesProps {
  variant?: "full" | "compact";
}

export const WorkshopPrizes = ({ variant = "full" }: WorkshopPrizesProps) => {
  const isCompact = variant === "compact";

  return (
    <section
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
        isCompact ? "" : "shadow-lg"
      }`}
    >
      <div className="h-1.5 bg-linear-to-r from-amber-400 via-blue-500 to-sky-500" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-amber-100/40 blur-3xl" />

      <div className={`relative ${isCompact ? "p-6 sm:p-8" : "p-6 sm:p-10"}`}>
        <div
          className={`grid gap-8 ${isCompact ? "lg:grid-cols-[1fr_1.1fr] lg:items-center" : "lg:grid-cols-[280px_1fr] lg:gap-12"}`}
        >
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <a
              href={BOOK_PRIZE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block no-underline"
            >
              <div className="absolute -inset-3 rounded-3xl bg-linear-to-br from-blue-200/40 to-amber-200/30 blur-xl transition group-hover:blur-2xl" />
              <img
                src={BOOK_PRIZE.imageUrl}
                alt={`${BOOK_PRIZE.title} book cover`}
                className="relative mx-auto h-auto w-full max-w-[220px] rounded-xl shadow-2xl shadow-slate-300/60 ring-1 ring-slate-200 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-blue-200/50 lg:mx-0"
                loading="lazy"
                width={220}
                height={308}
              />
            </a>

            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {BOOK_PRIZE.stats.map((stat) => (
                <span
                  key={stat.label}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600"
                >
                  {stat.value} {stat.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 text-sm font-semibold text-amber-800">
              <Sparkles className="h-3.5 w-3.5" />
              Workshop prize challenge
            </div>

            <h2
              className={`font-extrabold tracking-tight text-slate-900 ${isCompact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}
            >
              Win{" "}
              <span className="bg-linear-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                {BOOK_PRIZE.title}
              </span>
            </h2>

            <p className="mt-2 text-sm font-semibold text-slate-500">
              {BOOK_PRIZE.subtitle} · by {BOOK_PRIZE.author},{" "}
              {BOOK_PRIZE.authorTitle}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Complete all{" "}
              <strong className="font-semibold text-slate-800">
                {TOTAL_WORKSHOP_TASKS} workshop tasks
              </strong>{" "}
              and race for exclusive rewards on the official guide at{" "}
              <a
                href={BOOK_PRIZE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                dockerfrontend.com
              </a>
              . First to finish wins — speed and accuracy both count.
            </p>

            <div
              className={`mt-8 grid gap-4 ${isCompact ? "sm:grid-cols-3" : "md:grid-cols-3"}`}
            >
              {WORKSHOP_PRIZES.map((prize) => {
                const style = ACCENT_STYLES[prize.accent];
                return (
                  <div
                    key={prize.place}
                    className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm ${style.border} ${style.bg} ${prize.place === 1 ? `shadow-lg ${style.glow}` : ""}`}
                  >
                    {prize.place === 1 && (
                      <div className="absolute right-3 top-3">
                        <Gift className="h-4 w-4 text-amber-500" />
                      </div>
                    )}

                    <div
                      className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl shadow-md ${style.icon}`}
                    >
                      <PrizeIcon icon={prize.icon} className="h-5 w-5" />
                    </div>

                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide ${style.badge}`}
                    >
                      {prize.label}
                    </span>

                    <p className="mt-3 text-2xl font-extrabold text-slate-900">
                      {prize.reward}
                    </p>

                    {prize.discount < 100 && (
                      <p className="mt-1 text-sm font-semibold text-emerald-600">
                        ${discountedPrice(prize.discount)} {BOOK_PRIZE.currency}
                        <span className="ml-1 font-normal text-slate-400 line-through">
                          ${BOOK_PRIZE.regularPrice.toFixed(2)}
                        </span>
                      </p>
                    )}

                    {prize.discount === 100 && (
                      <p className="mt-1 text-sm font-semibold text-emerald-600">
                        ${BOOK_PRIZE.regularPrice.toFixed(2)} value — yours free
                      </p>
                    )}

                    {!isCompact && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {prize.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BOOK_PRIZE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white! no-underline shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:-translate-y-0.5"
              >
                <BookOpen className="h-4 w-4" />
                View book at dockerfrontend.com
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>

              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                Prizes awarded to the first 3 participants who complete all tasks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
