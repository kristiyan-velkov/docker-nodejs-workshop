import { ListChecks } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { WorkshopPrizes } from "../components/WorkshopPrizes";
import { WorkshopTasks } from "../components/WorkshopTasks";

export const TasksPage = () => (
  <PageShell
    breadcrumbs={[{ label: "Tasks" }]}
    eyebrow="Hands-on workshop"
    eyebrowIcon={ListChecks}
    title="Workshop Tasks"
    description="Follow step-by-step tasks to containerize the sample Node.js app. Your progress is saved automatically."
  >
    <div className="space-y-10">
      <WorkshopPrizes />
      <WorkshopTasks />
    </div>
  </PageShell>
);
