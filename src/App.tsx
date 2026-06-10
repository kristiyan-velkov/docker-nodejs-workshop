import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminRoute } from "./components/AdminRoute";
import { AuthGate } from "./components/AuthGate";
import { AppShell } from "./components/AppShell";
import { AdminPage } from "./pages/AdminPage";
import { AskPage } from "./pages/AskPage";
import { CommandsPage } from "./pages/CommandsPage";
import { ConceptsPage } from "./pages/ConceptsPage";
import { LearnDetailPage } from "./pages/LearnDetailPage";
import { LearnIndexPage } from "./pages/LearnIndexPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QuickCommandsPage } from "./pages/QuickCommandsPage";
import { TasksPage } from "./pages/TasksPage";
import { WorkshopHomePage } from "./pages/WorkshopHomePage";

export function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<WorkshopHomePage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="/concepts" element={<ConceptsPage />} />
        <Route path="/learn" element={<LearnIndexPage />} />
        <Route path="/learn/commands" element={<CommandsPage />} />
        <Route path="/learn/quick-commands" element={<QuickCommandsPage />} />
        <Route path="/learn/:slug" element={<LearnDetailPage />} />
        <Route path="/commands" element={<Navigate to="/learn/commands" replace />} />
        <Route
          path="/quick-commands"
          element={<Navigate to="/learn/quick-commands" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthGate>
        <AppRoutes />
      </AuthGate>
    </BrowserRouter>
  );
}

export default App;
