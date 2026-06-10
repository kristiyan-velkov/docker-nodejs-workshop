import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { LoginPage } from "./LoginPage";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { configured, loading, session } = useAuth();

  if (!configured) {
    return <LoginPage />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="font-medium">Loading session…</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return <>{children}</>;
};
