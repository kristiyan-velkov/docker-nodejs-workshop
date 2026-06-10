import { Zap } from "lucide-react";
import { CommandsTab } from "../components/CommandsTab";
import { PageShell } from "../components/ui/PageShell";

export const QuickCommandsPage = () => (
  <PageShell
    breadcrumbs={[
      { label: "Learn", to: "/learn" },
      { label: "Quick Commands" },
    ]}
    eyebrow="Copy & run"
    eyebrowIcon={Zap}
    title="Quick Commands"
    description="Ready-to-run commands for development, builds, and deployment."
  >
    <CommandsTab />
  </PageShell>
);
