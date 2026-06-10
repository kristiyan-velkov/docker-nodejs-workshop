import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { UserHeader } from "./UserHeader";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <UserHeader />
      {children}
      <Footer />
    </div>
  );
};
