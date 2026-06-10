import {
  Ban,
  BookOpen,
  Box,
  Circle,
  Cloud,
  Container,
  Database,
  Download,
  FileCode,
  FileText,
  FolderOpen,
  Globe,
  Hammer,
  HardDrive,
  Layers,
  Lock,
  Network,
  Package,
  Play,
  Rocket,
  Server,
  Settings,
  Shield,
  Terminal,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  box: Box,
  container: Container,
  package: Package,
  "file-code": FileCode,
  "file-text": FileText,
  layers: Layers,
  ban: Ban,
  settings: Settings,
  globe: Globe,
  "hard-drive": HardDrive,
  cloud: Cloud,
  rocket: Rocket,
  zap: Zap,
  lock: Lock,
  shield: Shield,
  "book-open": BookOpen,
  download: Download,
  hammer: Hammer,
  database: Database,
  workflow: Workflow,
  server: Server,
  terminal: Terminal,
  network: Network,
  play: Play,
  circle: Circle,
  "folder-open": FolderOpen,
};

interface AppIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export const AppIcon = ({
  name,
  className = "h-5 w-5",
  strokeWidth = 2,
}: AppIconProps) => {
  const Icon = ICON_MAP[name] ?? Box;
  return <Icon className={className} strokeWidth={strokeWidth} />;
};
