interface CodeBlockProps {
  code: string;
  filename?: string;
  className?: string;
}

export const CodeBlock = ({ code, filename, className = "" }: CodeBlockProps) => {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#0d1117] shadow-lg shadow-black/10 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        {filename && (
          <span className="ml-2 font-mono text-xs text-slate-400">{filename}</span>
        )}
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="block font-mono text-sm leading-relaxed text-[#e6edf3] whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  );
};
