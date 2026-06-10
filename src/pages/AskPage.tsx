import { MessageCircleQuestion } from "lucide-react";
import { AskQuestionPanel } from "../components/AskQuestionPanel";
import { PageShell } from "../components/ui/PageShell";

export const AskPage = () => (
  <PageShell
    breadcrumbs={[{ label: "Ask" }]}
    eyebrow="Get help"
    eyebrowIcon={MessageCircleQuestion}
    title="Ask a Question"
    description="Stuck on a task? Send a question to the workshop facilitator."
  >
    <AskQuestionPanel />
  </PageShell>
);
