import { ClipboardList } from "lucide-react";
import { DockerConcepts } from "../components/DockerConcepts";
import { PageShell } from "../components/ui/PageShell";

export const ConceptsPage = () => (
  <PageShell
    breadcrumbs={[{ label: "Concepts" }]}
    eyebrow="Fundamentals"
    eyebrowIcon={ClipboardList}
    title="Docker Concepts"
    description="Core containerization ideas explained with examples from this workshop."
  >
    <DockerConcepts />
  </PageShell>
);
