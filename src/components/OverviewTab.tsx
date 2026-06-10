export const OverviewTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#339933]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          🎯 Docker Files
        </h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile</strong> — Multi-stage production build (Express
            serves API + client on port 3000)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile.development</strong> — Dev environment with Vite
            HMR and Compose Watch (ports 3000, 5173)
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>Dockerfile.test</strong> — Vitest with coverage in CI and
            Compose test profile
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            <strong>compose.yml</strong> — Services: app-dev, app-prod, app-test,
            db (Postgres 16)
          </li>
          <li className="text-gray-700 leading-relaxed">
            <strong>.env.example</strong> — Environment template (copy to .env
            before starting)
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#339933]">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🔧 Tech Stack</h3>
        <ul className="space-y-4">
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Express 5 + React 19 with TypeScript
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Vite client + esbuild server bundle
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            PostgreSQL 16 with health checks
          </li>
          <li className="text-gray-700 leading-relaxed pb-4 border-b border-gray-200">
            Node.js 24.16.0 Alpine
          </li>
          <li className="text-gray-700 leading-relaxed">
            Vitest, Docker Compose Watch, GitHub Actions
          </li>
        </ul>
      </div>
    </div>
  );
};
