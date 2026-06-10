import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { WorkshopPrizes } from "../components/WorkshopPrizes";
import { WorkshopQuickLinks } from "../components/WorkshopQuickLinks";

export const WorkshopHomePage = () => {
  return (
    <>
      <Hero />
      <section className="border-t border-slate-200 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <WorkshopPrizes variant="compact" />
        </div>
      </section>
      <Features />
      <WorkshopQuickLinks />
    </>
  );
};
