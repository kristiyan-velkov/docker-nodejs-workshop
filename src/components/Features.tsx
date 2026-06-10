import { FEATURES } from "../constants/data";
import { FeatureCard } from "./FeatureCard";

export const Features = () => {
  return (
    <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="section-eyebrow mb-3">What you&apos;ll learn</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Workshop Learning Objectives
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            From local development to production deployment — everything you need
            to containerize a full-stack Node.js application.
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
