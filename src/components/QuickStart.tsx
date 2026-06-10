import { useAuth } from "../contexts/AuthContext";
import type { TabType } from "../types";
import { AdminDashboard } from "./AdminDashboard";
import { AskQuestionPanel } from "./AskQuestionPanel";
import { CommandsTab } from "./CommandsTab";
import { DockerCommandsReference } from "./DockerCommandsReference";
import { DockerConcepts } from "./DockerConcepts";
import { OverviewTab } from "./OverviewTab";
import { LearnPage } from "./LearnPage";
import { UserProfilePanel } from "./UserProfilePanel";
import { WorkshopTasks } from "./WorkshopTasks";

interface QuickStartProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const QuickStart = ({ activeTab, onTabChange }: QuickStartProps) => {
  const { isAdmin } = useAuth();

  const tabs: { id: TabType; label: string }[] = [
    { id: "tasks", label: "Workshop Tasks" },
    { id: "learn", label: "Learn" },
    { id: "ask-question", label: "Ask Question" },
    { id: "profile", label: "My Profile" },
    ...(isAdmin ? [{ id: "admin" as TabType, label: "Admin Panel" }] : []),
    { id: "concepts", label: "Docker Concepts" },
    { id: "commands-reference", label: "Commands Reference" },
    { id: "overview", label: "Project Overview" },
    { id: "commands", label: "Quick Commands" },
  ];

  return (
    <section
      id="workshop-materials"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="section-eyebrow mb-3">Workshop materials</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Workshop Materials
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-500">
            Follow the tasks, reference commands, and track your progress through
            the workshop.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white! shadow-md shadow-indigo-200"
                  : "border border-slate-200 bg-white text-slate-600! hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900!"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div>
          {activeTab === "tasks" && <WorkshopTasks />}
          {activeTab === "learn" && <LearnPage />}
          {activeTab === "ask-question" && <AskQuestionPanel />}
          {activeTab === "profile" && <UserProfilePanel />}
          {activeTab === "admin" && isAdmin && <AdminDashboard />}
          {activeTab === "concepts" && <DockerConcepts />}
          {activeTab === "commands-reference" && <DockerCommandsReference />}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "commands" && <CommandsTab />}
        </div>
      </div>
    </section>
  );
};
