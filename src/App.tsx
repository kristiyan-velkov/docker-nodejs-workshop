import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import { AuthGate } from "./components/AuthGate";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { QuickStart } from "./components/QuickStart";
import { UserHeader } from "./components/UserHeader";
import type { TabType } from "./types";

function WorkshopApp() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("tasks");

  return (
    <div className="min-h-screen bg-white">
      <UserHeader
        onOpenLearn={() => setActiveTab("learn")}
        onOpenProfile={() => setActiveTab("profile")}
        onOpenAdmin={isAdmin ? () => setActiveTab("admin") : undefined}
      />
      <Hero />
      <Features />
      <QuickStart activeTab={activeTab} onTabChange={setActiveTab} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthGate>
      <WorkshopApp />
    </AuthGate>
  );
}

export default App;
