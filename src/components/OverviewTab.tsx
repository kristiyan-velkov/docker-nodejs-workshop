import { FileCode, Layers } from "lucide-react";

export const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-indigo-500" />
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
              <FileCode className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Docker Files</h3>
          </div>
          <ul className="space-y-4">
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              <strong>Dockerfile</strong> — Multi-stage production build (Express
              serves API + client on port 3000)
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              <strong>Dockerfile.development</strong> — Dev environment with Vite
              HMR and Compose Watch (ports 3000, 5173)
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              <strong>Dockerfile.test</strong> — Vitest with coverage in CI and
              Compose test profile
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              <strong>compose.yml</strong> — Services: app-dev, app-prod, app-test,
              db (Postgres 16)
            </li>
            <li className="text-sm leading-relaxed text-slate-700">
              <strong>.env.example</strong> — Environment template (copy to .env
              before starting)
            </li>
          </ul>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-violet-500" />
        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 ring-1 ring-violet-100">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tech Stack</h3>
          </div>
          <ul className="space-y-4">
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              Express 5 + React 19 with TypeScript
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              Vite client + esbuild server bundle
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              PostgreSQL 16 with health checks
            </li>
            <li className="border-b border-slate-100 pb-4 text-sm leading-relaxed text-slate-700">
              Node.js 24.16.0 Alpine
            </li>
            <li className="text-sm leading-relaxed text-slate-700">
              Vitest, Docker Compose Watch, GitHub Actions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
