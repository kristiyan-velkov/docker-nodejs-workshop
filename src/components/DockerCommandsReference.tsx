import { DOCKER_COMMANDS_REFERENCE } from "../constants/data";
import { AppIcon } from "./ui/AppIcon";
import { CodeBlock } from "./ui/CodeBlock";

export const DockerCommandsReference = () => {
  return (
    <div className="space-y-8">
      {DOCKER_COMMANDS_REFERENCE.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-1 bg-blue-500" />
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <AppIcon name={category.icon} className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {category.category}
              </h3>
            </div>
            <div className="space-y-4">
              {category.commands.map((cmd, cmdIndex) => (
                <div
                  key={cmdIndex}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200"
                >
                  <h4 className="text-base font-semibold text-slate-900">
                    {cmd.title}
                  </h4>
                  <p className="mt-1 mb-3 text-sm text-slate-500">
                    {cmd.description}
                  </p>
                  <CodeBlock code={cmd.command} />
                  {cmd.examples && cmd.examples.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Examples
                      </p>
                      {cmd.examples.map((example, exIndex) => (
                        <CodeBlock key={exIndex} code={example} className="text-xs" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
