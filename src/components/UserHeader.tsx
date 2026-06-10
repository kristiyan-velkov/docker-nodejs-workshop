import {
  BookOpen,
  Container,
  LayoutDashboard,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface UserHeaderProps {
  onOpenProfile: () => void;
  onOpenLearn?: () => void;
  onOpenAdmin?: () => void;
}

export const UserHeader = ({
  onOpenProfile,
  onOpenLearn,
  onOpenAdmin,
}: UserHeaderProps) => {
  const { profile, user, isAdmin, signOut } = useAuth();

  const displayName =
    profile?.full_name || profile?.email || user?.email || "Participant";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
            <Container className="h-5 w-5 text-white" />
          </div>
          <span className="hidden text-base font-bold text-slate-900 sm:block">
            Docker<span className="text-indigo-600">Workshop</span>
          </span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {onOpenLearn && (
            <button
              type="button"
              onClick={onOpenLearn}
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 sm:flex"
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              Learn
            </button>
          )}
          <button
            type="button"
            onClick={onOpenProfile}
            className="hidden items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100 sm:flex"
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            My Progress
          </button>

          {isAdmin && onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hidden items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-100 sm:flex"
            >
              <Shield className="h-4 w-4 shrink-0" />
              Admin
            </button>
          )}

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1 shadow-sm">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
              {initials || <User className="h-3.5 w-3.5" />}
            </div>
            <span
              className="hidden max-w-[160px] truncate text-sm font-medium text-slate-700 md:inline"
              title={displayName}
            >
              {displayName}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void signOut()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
