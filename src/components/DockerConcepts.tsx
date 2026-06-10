import { BookOpen, ExternalLink } from "lucide-react";
import { DOCKER_CONCEPTS } from "../constants/data";
import { AppIcon } from "./ui/AppIcon";
import { CodeBlock } from "./ui/CodeBlock";

export const DockerConcepts = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {DOCKER_CONCEPTS.map((concept, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="h-1 bg-blue-500" />
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                <AppIcon name={concept.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {concept.title}
              </h3>
            </div>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
              {concept.description}
            </p>
            {concept.example && (
              <div className="mb-4">
                <CodeBlock code={concept.example} filename="example" />
              </div>
            )}
            {concept.docsLink && (
              <a
                href={concept.docsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white no-underline shadow-md shadow-blue-200 transition hover:bg-blue-700"
              >
                <BookOpen className="h-4 w-4" />
                Learn more
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
