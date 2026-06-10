import { Copy } from "lucide-react";
import type { DockerCommand } from "../types";
import { CodeBlock } from "./ui/CodeBlock";

interface CommandCardProps {
  command: DockerCommand;
}

export const CommandCard = ({ command }: CommandCardProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command.command);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-1 bg-blue-500" />
      <div className="p-6">
        <h3 className="text-lg font-bold text-slate-900">{command.title}</h3>
        <p className="mt-1 mb-4 text-sm text-slate-500">{command.description}</p>
        <div className="relative">
          <CodeBlock code={command.command} filename="terminal" />
          <button
            onClick={handleCopy}
            className="absolute right-3 top-12 flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
            title="Copy to clipboard"
            aria-label="Copy command to clipboard"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};
