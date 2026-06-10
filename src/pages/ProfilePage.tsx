import { User } from "lucide-react";
import { UserProfilePanel } from "../components/UserProfilePanel";
import { PageShell } from "../components/ui/PageShell";

export const ProfilePage = () => (
  <PageShell
    breadcrumbs={[{ label: "Profile" }]}
    eyebrow="Your progress"
    eyebrowIcon={User}
    title="My Profile"
    description="View your workshop progress, completed tasks, and account details."
  >
    <UserProfilePanel />
  </PageShell>
);
