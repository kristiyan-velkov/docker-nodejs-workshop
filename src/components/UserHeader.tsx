import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, LogOut, Menu, User, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { MAIN_NAV } from "../constants/navigation";

export const UserHeader = () => {
  const { profile, user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName =
    profile?.full_name || profile?.email || user?.email || "Participant";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const navItems = MAIN_NAV.filter((item) => !item.adminOnly || isAdmin);

  const isActive = (item: (typeof navItems)[number]) =>
    item.match?.(location.pathname) ?? location.pathname === item.to;

  const navLinkClass = (active: boolean) =>
    `relative whitespace-nowrap px-3 py-2 text-sm font-medium no-underline transition-colors ${
      active
        ? "text-blue-600!"
        : "text-slate-600! hover:text-slate-900!"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm shadow-blue-200">
            <Container className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-sm font-bold text-slate-900 sm:block">
            Docker<span className="text-blue-600">Workshop</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={navLinkClass(active)}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1 shadow-sm sm:flex">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-[10px] font-bold text-blue-700">
              {initials || <User className="h-3 w-3" />}
            </div>
            <span
              className="hidden max-w-[120px] truncate text-xs font-medium text-slate-700 md:inline"
              title={displayName}
            >
              {displayName}
            </span>
          </div>

          <button
            type="button"
            onClick={() => void signOut()}
            className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 sm:flex"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline">Sign out</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <nav className="grid grid-cols-2 gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition ${
                    active
                      ? "bg-blue-50 text-blue-700!"
                      : "text-slate-600! hover:bg-slate-50 hover:text-slate-900!"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.shortLabel ?? item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="truncate text-sm font-medium text-slate-700">
              {displayName}
            </span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
