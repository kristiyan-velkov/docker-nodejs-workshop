import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardList,
  HelpCircle,
  ListChecks,
  MessageCircleQuestion,
  Shield,
  Terminal,
  User,
  Zap,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
  adminOnly?: boolean;
  match?: (pathname: string) => boolean;
}

export const MAIN_NAV: NavItem[] = [
  {
    to: "/tasks",
    label: "Tasks",
    icon: ListChecks,
    match: (p) => p === "/tasks",
  },
  {
    to: "/learn",
    label: "Learn",
    icon: BookOpen,
    match: (p) => p.startsWith("/learn"),
  },
  {
    to: "/ask",
    label: "Ask",
    shortLabel: "Ask",
    icon: MessageCircleQuestion,
    match: (p) => p === "/ask",
  },
  {
    to: "/concepts",
    label: "Concepts",
    icon: ClipboardList,
    match: (p) => p === "/concepts",
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
    match: (p) => p === "/profile",
  },
  {
    to: "/admin",
    label: "Admin",
    icon: Shield,
    adminOnly: true,
    match: (p) => p === "/admin",
  },
];

export const HOME_QUICK_LINKS = [
  {
    to: "/tasks",
    title: "Workshop Tasks",
    description: "Step-by-step hands-on exercises with progress tracking.",
    icon: ListChecks,
    color: "blue",
  },
  {
    to: "/learn",
    title: "Learn Docker",
    description: "Plain-language guides to images, Compose, and CI/CD.",
    icon: BookOpen,
    color: "sky",
  },
  {
    to: "/learn/commands",
    title: "Commands Reference",
    description: "Every Docker command you need, organized by category.",
    icon: Terminal,
    color: "slate",
  },
  {
    to: "/ask",
    title: "Ask a Question",
    description: "Get help from the workshop facilitator.",
    icon: HelpCircle,
    color: "emerald",
  },
] as const;

export const LEARN_REFERENCE_LINKS = [
  {
    to: "/learn/commands",
    title: "Commands Reference",
    description:
      "Every Docker command used in the workshop — images, containers, Compose, and more.",
    icon: Terminal,
    color: "slate" as const,
  },
  {
    to: "/learn/quick-commands",
    title: "Quick Commands",
    description:
      "Copy-and-run commands for dev stacks, builds, tests, and deployment.",
    icon: Zap,
    color: "emerald" as const,
  },
] as const;
