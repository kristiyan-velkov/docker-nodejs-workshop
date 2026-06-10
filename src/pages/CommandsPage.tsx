import { Terminal } from "lucide-react";
import { DockerCommandsReference } from "../components/DockerCommandsReference";
import { PageShell } from "../components/ui/PageShell";

export const CommandsPage = () => (
  <PageShell
    breadcrumbs={[
      { label: "Learn", to: "/learn" },
      { label: "Commands" },
    ]}
    eyebrow="Reference"
    eyebrowIcon={Terminal}
    title="Commands Reference"
    description="Every Docker command used in the workshop, organized by category."
  >
    <DockerCommandsReference />
  </PageShell>
);
