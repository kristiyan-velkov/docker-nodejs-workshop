import { Shield } from "lucide-react";
import { AdminDashboard } from "../components/AdminDashboard";
import { PageShell } from "../components/ui/PageShell";

export const AdminPage = () => (
  <PageShell
    breadcrumbs={[{ label: "Admin" }]}
    eyebrow="Facilitator tools"
    eyebrowIcon={Shield}
    title="Admin Panel"
    description="Manage participants, view questions, and monitor workshop progress."
  >
    <AdminDashboard />
  </PageShell>
);
