import { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Lightbulb,
  Pause,
  Pencil,
  Play,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { SOCIAL_LINKS } from "../constants/data";
import {
  useTaskProgressSync,
  type TimerState,
} from "../hooks/useTaskProgressSync";
import { AppIcon } from "./ui/AppIcon";
import { CodeBlock } from "./ui/CodeBlock";

interface Task {
  id: number;
  title: string;
  description: string;
  estimatedTime: string;
  steps: TaskStep[];
  icon: string;
}

interface TaskStep {
  number: number;
  title: string;
  description: string;
  tips?: string[];
  code?: string;
}

const WORKSHOP_TASKS: Task[] = [
  {
    id: 1,
    title: "Get the Sample Application",
    description:
      "Clone the workshop-node-congress todo app and verify the Express API and Vite client run locally",
    estimatedTime: "10 minutes",
    icon: "download",
    steps: [
      {
        number: 1,
        title: "Clone the sample app",
        description:
          "Clone the official Docker Node.js sample repository. This is the full-stack app you will containerize during the workshop.",
        tips: [
          "git clone https://github.com/kristiyan-velkov/workshop-node-congress",
          "cd workshop-node-congress",
          "This repo has Express 5 API, React 19 client, and PostgreSQL",
        ],
      },
      {
        number: 2,
        title: "Configure environment",
        description:
          "Copy .env.example to .env. This sets ports, Postgres credentials, and NODE_VERSION=24.16.0-alpine.",
        tips: [
          "cp .env.example .env",
          "Review POSTGRES_* and ALLOWED_ORIGINS values",
          "Do not commit .env to git",
        ],
      },
      {
        number: 3,
        title: "Install dependencies",
        description:
          "Run npm install to download all packages. The app uses esbuild for the server and Vite for the client.",
      },
      {
        number: 4,
        title: "Start the app locally",
        description:
          "Run npm run dev:with-db to start Postgres and the app. Verify API at http://localhost:3000/health and frontend at http://localhost:5173.",
        tips: [
          "API health: curl http://localhost:3000/health",
          "Add a todo in the UI to confirm Postgres connectivity",
          "Keep this UI (docker-nodejs-workshop) open for task guidance",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Build and Test the Application Locally",
    description:
      "Verify production build and tests pass before containerizing the full-stack app",
    estimatedTime: "10 minutes",
    icon: "hammer",
    steps: [
      {
        number: 1,
        title: "Build the application",
        description:
          "Run npm run build. This produces dist/server.js (esbuild) and dist/client/ (Vite). These artifacts are what the production Docker image will run.",
        tips: [
          "npm run build:server — API bundle only",
          "npm run build:client — React client only",
          "Fix any TypeScript or build errors before continuing",
        ],
      },
      {
        number: 2,
        title: "Start the database",
        description:
          "Tests need PostgreSQL. Start the db service with Docker Compose or npm run db:start.",
        tips: [
          "docker compose up db -d",
          "Or: npm run db:start",
          "Verify: docker ps | grep todoapp-db",
        ],
      },
      {
        number: 3,
        title: "Run the test suite",
        description:
          "Run npm test or npm run test:coverage. Vitest covers both client and server code.",
        tips: [
          "npm test — quick run",
          "npm run test:coverage — with coverage report",
          "All tests should pass before containerizing",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Generate Docker Files with docker init",
    description:
      "Use Docker's scaffold tool to create starter Docker configuration for the Node full-stack project",
    estimatedTime: "5 minutes",
    icon: "rocket",
    steps: [
      {
        number: 1,
        title: "Run docker init",
        description:
          "In the workshop-node-congress root, run docker init. Answer prompts for a Node.js application with a build step.",
        tips: [
          "Select Node as the application platform",
          "Node.js version: 24.16.0 (match ARG NODE_VERSION)",
          "Package manager: npm",
          "Build command: npm run build",
          "Start command: node dist/server.js (not Vite preview)",
          "Port: 3000",
        ],
      },
      {
        number: 2,
        title: "Review generated files",
        description:
          "Inspect Dockerfile, .dockerignore, compose.yml, and README.Docker.md. These are generic templates — you will replace them with production-ready versions in the next tasks.",
        tips: [
          "Generated files assume a simple Node server, not Express + Vite + Postgres",
          "No multi-stage build or USER node by default",
          "Compose may not include a database service yet",
        ],
      },
      {
        number: 3,
        title: "Test the generated setup",
        description:
          "Try docker compose up --build. Note what works and what is missing (Postgres, dev hot reload, test profile). You will fix these in later tasks.",
      },
    ],
  },
  {
    id: 4,
    title: "Create Production Dockerfile",
    description:
      "Replace the generated Dockerfile with a multi-stage build where Express serves the API and built React client on one port",
    estimatedTime: "20 minutes",
    icon: "package",
    steps: [
      {
        number: 1,
        title: "Create the builder stage",
        description:
          "Start with ARG NODE_VERSION=24.16.0-alpine. Stage 1 (builder): copy package.json and package-lock.json, run npm ci, copy source, run npm run build, then npm prune --omit=dev.",
        tips: [
          "Copy package files before source for layer caching",
          "npm ci ensures reproducible installs",
          "npm prune --omit=dev removes devDependencies for the runner",
        ],
      },
      {
        number: 2,
        title: "Create the runner stage",
        description:
          "Stage 2 (runner): use node:${NODE_VERSION}, set NODE_ENV=production, PORT=3000, HOST=0.0.0.0. Copy pruned node_modules and dist/ from builder with --chown=node:node. Switch to USER node.",
        code: `ARG NODE_VERSION=24.16.0-alpine

FROM node:\${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:\${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0
COPY --from=builder --chown=node:node /app/package.json /app/package-lock.json* ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
USER node
EXPOSE 3000
ENTRYPOINT ["node", "dist/server.js"]`,
      },
      {
        number: 3,
        title: "Build and verify",
        description:
          "Run docker build -t todoapp:local . and inspect with docker images. Start db first, then run the container connected to the Compose network.",
        tips: [
          "docker build -t todoapp:local .",
          "docker compose up db -d",
          "docker compose --profile prod up app-prod --build (after adding compose service)",
          "Prod URL: http://localhost:8080/health",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Create .dockerignore File",
    description:
      "Optimize build context by excluding node_modules, secrets, and build outputs while keeping config files needed for npm run build",
    estimatedTime: "10 minutes",
    icon: "ban",
    steps: [
      {
        number: 1,
        title: "Create .dockerignore",
        description:
          "Create or replace .dockerignore in the project root. Exclude dependencies, build output, secrets, and docs.",
        code: `node_modules/
dist/
.git/
.github/
.env*
coverage/
*.log
.DS_Store
.vscode/
*.md
compose.yml

*.config.js
!vite.config.ts
!esbuild.config.js
!tailwind.config.js
!postcss.config.js
!tsconfig.json`,
      },
      {
        number: 2,
        title: "Keep build configs",
        description:
          "Use negation patterns (!) so vite.config.ts, esbuild.config.js, and tsconfig.json are included. Without these, npm run build fails inside Docker.",
        tips: [
          "Never ignore package-lock.json",
          "Never ignore src/",
          "Never allow .env files in the build context",
        ],
      },
      {
        number: 3,
        title: "Verify faster builds",
        description:
          "Rebuild with docker build -t todoapp:local . and compare build context size. Use docker build --progress=plain to confirm excluded files.",
      },
    ],
  },
  {
    id: 6,
    title: "Create Development Dockerfile",
    description:
      "Set up Dockerfile.development with hot reload, Compose Watch, and root user for Vite bind-mount compatibility",
    estimatedTime: "15 minutes",
    icon: "zap",
    steps: [
      {
        number: 1,
        title: "Create Dockerfile.development",
        description:
          "Use node:24.16.0-alpine, copy package files, npm ci with cache mount, copy source. Expose ports 3000, 5173, 9229. CMD npm run dev:docker. Do NOT set USER node — Vite needs writable bind mounts.",
        code: `ARG NODE_VERSION=24.16.0-alpine
FROM node:\${NODE_VERSION}
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
ENV NODE_ENV=development
EXPOSE 3000 5173 9229
CMD ["npm", "run", "dev:docker"]`,
      },
      {
        number: 2,
        title: "Add app-dev service to compose.yml",
        description:
          "Configure app-dev with Dockerfile.development, POSTGRES_HOST=db, depends_on db with service_healthy, and develop.watch for src sync and package.json rebuild.",
        tips: [
          "POSTGRES_HOST must be db, not localhost",
          "Map ports 3000, 5173, 9229",
          "Keep vite.config.ts mount writable (not :ro)",
        ],
      },
      {
        number: 3,
        title: "Test dev stack with Watch",
        description:
          "Run docker compose up app-dev --watch. Edit src/client/App.tsx and confirm HMR. Change package.json and confirm image rebuild.",
        tips: [
          "Frontend: http://localhost:5173",
          "API: http://localhost:3000/health",
          "Add a todo — data should persist via Postgres",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Docker Compose, PostgreSQL & Test Profile",
    description:
      "Wire up the db service, production profile, and Dockerfile.test for Vitest in containers",
    estimatedTime: "20 minutes",
    icon: "database",
    steps: [
      {
        number: 1,
        title: "Add PostgreSQL service",
        description:
          "Add db service using postgres:16-alpine with healthcheck (pg_isready). Mount a named volume for data persistence.",
        tips: [
          "healthcheck: pg_isready -U todoapp -d todoapp",
          "depends_on: condition: service_healthy on app services",
          "POSTGRES_HOST=db in all app services",
        ],
      },
      {
        number: 2,
        title: "Add app-prod profile",
        description:
          "Add app-prod with profiles: [prod], Dockerfile, port 8080:3000, and ALLOWED_ORIGINS=http://localhost:8080 for local testing.",
        tips: [
          "docker compose --profile prod up app-prod --build -d",
          "curl http://localhost:8080/health",
          "No Vite on :5173 in production — Express serves dist/client",
        ],
      },
      {
        number: 3,
        title: "Create Dockerfile.test",
        description:
          "Full npm ci, chown to node, ENV CI=true, USER node, CMD npm run test:coverage. Add app-test service with profile test.",
        code: `ARG NODE_VERSION=24.16.0-alpine
FROM node:\${NODE_VERSION}
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund
COPY . .
RUN chown -R node:node /app
ENV NODE_ENV=test CI=true
USER node
CMD ["npm", "run", "test:coverage"]`,
      },
      {
        number: 4,
        title: "Run tests in Docker",
        description:
          "Execute docker compose --profile test run --rm --build app-test. Exit code 0 means all Vitest tests passed with coverage.",
      },
    ],
  },
  {
    id: 8,
    title: "Scan Image for Vulnerabilities with Docker Scout",
    description:
      "Scan your production image before pushing to Docker Hub",
    estimatedTime: "5 minutes",
    icon: "shield",
    steps: [
      {
        number: 1,
        title: "Verify Docker Scout",
        description:
          "Docker Scout is built into Docker Desktop. Verify with docker scout --version.",
      },
      {
        number: 2,
        title: "Scan the production image",
        description:
          "Run docker scout cves todoapp:local to analyze CVEs in all layers and dependencies.",
        tips: [
          "docker scout cves todoapp:local",
          "Review Critical and High severity findings first",
        ],
      },
      {
        number: 3,
        title: "Get recommendations",
        description:
          "Run docker scout recommendations todoapp:local for actionable fixes — often base image or dependency updates.",
      },
      {
        number: 4,
        title: "Rebuild if needed",
        description:
          "Update NODE_VERSION or dependencies, rebuild, and rescan until critical issues are resolved.",
        tips: [
          "docker build -t todoapp:local .",
          "docker scout cves todoapp:local",
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Push Image to Docker Hub",
    description:
      "Tag and push your containerized Node.js todo app to Docker Hub",
    estimatedTime: "10 minutes",
    icon: "rocket",
    steps: [
      {
        number: 1,
        title: "Login to Docker Hub",
        description:
          "Create a Docker Hub account if needed, then run docker login.",
        tips: ["docker login", "Use an access token for CI (Task 10)"],
      },
      {
        number: 2,
        title: "Tag the image",
        description:
          "Tag todoapp:local with your Docker Hub username and repository name.",
        tips: [
          "docker tag todoapp:local <username>/workshop-node-congress:latest",
          "Use a descriptive repo name on Docker Hub",
        ],
      },
      {
        number: 3,
        title: "Push the image",
        description:
          "Run docker push <username>/workshop-node-congress:latest and verify on hub.docker.com.",
      },
      {
        number: 4,
        title: "Test pull on another machine",
        description:
          "Pull and run the image elsewhere to confirm it works with Postgres env vars set correctly.",
        tips: [
          "docker pull <username>/workshop-node-congress:latest",
          "Requires POSTGRES_HOST and related env at runtime",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Set Up GitHub Actions CI/CD (Optional)",
    description:
      "Configure automated test-in-container and conditional Docker Hub push on main in workshop-node-congress",
    estimatedTime: "15 minutes",
    icon: "settings",
    steps: [
      {
        number: 1,
        title: "Review the workflow file",
        description:
          "In workshop-node-congress, open .github/workflows/main.yml. It builds Dockerfile.test, runs tests against a Postgres job service, and pushes multi-arch images on push to main only.",
        tips: [
          "Tests use POSTGRES_HOST=localhost with --network host in GHA",
          "Compose uses POSTGRES_HOST=db — different networking context",
          "Push steps use if: github.ref == refs/heads/main",
        ],
      },
      {
        number: 2,
        title: "Fork and add secrets",
        description:
          "Fork workshop-node-congress on GitHub. Add secrets: DOCKER_USERNAME, DOCKERHUB_TOKEN, DOCKERHUB_PROJECT_NAME.",
        tips: [
          "Create Docker Hub token at hub.docker.com/settings/security",
          "Never commit secrets to the repository",
        ],
      },
      {
        number: 3,
        title: "Push and monitor",
        description:
          "Push a commit to main and watch the Actions tab. Tests run on every PR; Docker Hub push runs only on main.",
        tips: [
          "Fork PRs may fail on push steps — expected",
          "Test job should pass on all branches",
        ],
      },
      {
        number: 4,
        title: "Verify Docker Hub tags",
        description:
          "After a successful main push, check Docker Hub for :latest and commit SHA tags.",
      },
    ],
  },
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const calculateTotalEstimatedTime = (): string => {
  const totalMinutes = WORKSHOP_TASKS.reduce((sum, task) => {
    const match = task.estimatedTime.match(/(\d+)/);
    if (match) {
      return sum + parseInt(match[1], 10);
    }
    return sum;
  }, 0);

  if (totalMinutes < 60) {
    return `${totalMinutes} minutes`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  }
  return `${hours} ${hours === 1 ? "hour" : "hours"} ${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  }`;
};

export const WorkshopTasks = () => {
  const { configured } = useAuth();
  const [expandedTask, setExpandedTask] = useState<number | null>(null);
  const [timers, setTimers] = useState<Record<number, TimerState>>({});
  const { clearRemoteProgress } = useTaskProgressSync(timers, setTimers);
  const intervalRefs = useRef<Record<number, NodeJS.Timeout>>({});

  useEffect(() => {
    const currentIntervals = intervalRefs.current;
    return () => {
      Object.values(currentIntervals).forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const toggleTask = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const startTimer = (taskId: number) => {
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
    }

    const interval = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          elapsedTime: (prev[taskId]?.elapsedTime || 0) + 1,
        },
      }));
    }, 1000);

    intervalRefs.current[taskId] = interval;

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        isRunning: true,
        elapsedTime: prev[taskId]?.elapsedTime || 0,
        completed: prev[taskId]?.completed || false,
        completionTime: prev[taskId]?.completionTime,
      },
    }));
  };

  const stopTimer = (taskId: number) => {
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
      delete intervalRefs.current[taskId];
    }

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
        completed: prev[taskId]?.completed || false,
        elapsedTime: prev[taskId]?.elapsedTime || 0,
      },
    }));
  };

  const completeTask = (taskId: number) => {
    if (intervalRefs.current[taskId]) {
      clearInterval(intervalRefs.current[taskId]);
      delete intervalRefs.current[taskId];
    }

    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        isRunning: false,
        completed: true,
        completionTime: prev[taskId]?.elapsedTime || 0,
      },
    }));
  };

  const editTask = (taskId: number) => {
    setTimers((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        completed: false,
        completionTime: undefined,
        isRunning: false,
      },
    }));
  };

  const resetAllProgress = () => {
    Object.values(intervalRefs.current).forEach((interval) => {
      if (interval) clearInterval(interval);
    });
    intervalRefs.current = {};
    setTimers({});
    if (configured) {
      void clearRemoteProgress();
    }
  };

  const totalTime = Object.values(timers).reduce((sum, timer) => {
    const taskTime =
      timer.completed && timer.completionTime
        ? timer.completionTime
        : timer.elapsedTime;
    return sum + taskTime;
  }, 0);

  const completedTasksCount = Object.keys(timers).filter((taskIdStr) => {
    const taskId = parseInt(taskIdStr, 10);
    return (
      WORKSHOP_TASKS.some((task) => task.id === taskId) &&
      timers[taskId]?.completed
    );
  }).length;

  return (
    <div className="space-y-6">
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-1.5 bg-linear-to-r from-indigo-500 to-violet-500" />
        <div className="p-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
          <div className="flex-1">
            <p className="section-eyebrow mb-2">Workshop challenge</p>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Step-by-step tasks
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Follow these step-by-step tasks to containerize the{" "}
              <a
                href={SOCIAL_LINKS.sampleApp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-semibold hover:underline"
              >
                workshop-node-congress
              </a>{" "}
              full-stack Node.js app. Use the timer to track how long each task
              takes you.
            </p>
          </div>
          <div className="shrink-0 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 shadow-sm">
            <p className="flex items-center gap-1 text-xs font-semibold text-slate-600 mb-1">
              <Clock className="h-3.5 w-3.5" />
              Expected Time
            </p>
            <p className="text-lg font-bold text-indigo-600">
              {calculateTotalEstimatedTime()}
            </p>
          </div>
        </div>
        {(totalTime > 0 || completedTasksCount > 0) && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Clock className="h-4 w-4 text-indigo-500" />
                  Total Workshop Time:{" "}
                  <span className="text-lg font-mono font-bold text-indigo-600">
                    {formatTime(totalTime)}
                  </span>
                </p>
                {completedTasksCount > 0 && (
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed Tasks:{" "}
                    <span className="text-lg font-bold text-emerald-600">
                      {completedTasksCount} / {WORKSHOP_TASKS.length}
                    </span>
                  </p>
                )}
              </div>
              <button
                onClick={resetAllProgress}
                className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                <RefreshCw className="h-4 w-4" />
                Reset All Progress
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      {WORKSHOP_TASKS.map((task) => {
        const timer: TimerState = timers[task.id] || {
          isRunning: false,
          elapsedTime: 0,
          completed: false,
        };
        const elapsedTimeFormatted = formatTime(timer.elapsedTime);
        const completionTimeFormatted = timer.completionTime
          ? formatTime(timer.completionTime)
          : null;

        return (
          <div
            key={task.id}
            className={`bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
              timer.completed
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200"
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <AppIcon name={task.icon} className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                      Task {task.id}: {task.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-2">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                        <Clock className="h-3 w-3" />
                        Estimated: {task.estimatedTime}
                      </span>
                      {timer.completed && completionTimeFormatted ? (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed in:
                          </span>
                          <span className="text-lg font-mono font-bold text-emerald-600">
                            {completionTimeFormatted}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Clock className="h-3.5 w-3.5" />
                            Your time:
                          </span>
                          <span
                            className={`text-lg font-mono font-bold ${
                              timer.isRunning
                                ? "text-emerald-600 animate-pulse"
                                : timer.elapsedTime > 0
                                ? "text-blue-600"
                                : "text-slate-400"
                            }`}
                          >
                            {elapsedTimeFormatted}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mb-4 flex-wrap">
                {!timer.completed ? (
                  <>
                    {!timer.isRunning ? (
                      <button
                        onClick={() => startTimer(task.id)}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        <Play className="h-4 w-4" />
                        Start Timer
                      </button>
                    ) : (
                      <button
                        onClick={() => stopTimer(task.id)}
                        className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                      >
                        <Pause className="h-4 w-4" />
                        Stop Timer
                      </button>
                    )}
                    {timer.elapsedTime > 0 && (
                      <button
                        onClick={() => completeTask(task.id)}
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Complete Task
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4" />
                      Task Completed
                    </div>
                    <button
                      onClick={() => editTask(task.id)}
                      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit Task
                    </button>
                  </>
                )}
                <button
                  onClick={() => toggleTask(task.id)}
                  className="ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  {expandedTask === task.id ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Hide Steps
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show Steps
                    </>
                  )}
                </button>
              </div>

              {expandedTask === task.id && (
                <div className="border-t border-slate-200 pt-4 mt-4">
                  <div className="space-y-4">
                    {task.steps.map((step) => (
                      <div
                        key={step.number}
                        className="bg-slate-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {step.number}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800 mb-2">
                              {step.title}
                            </h4>
                            <p className="text-slate-600 text-sm mb-3">
                              {step.description}
                            </p>

                            {step.code && (
                              <div className="mt-3">
                                <CodeBlock code={step.code} filename="terminal" />
                              </div>
                            )}
                            {step.tips && step.tips.length > 0 && (
                              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
                                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                                  <Lightbulb className="h-3.5 w-3.5" />
                                  Tips
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {step.tips.map((tip, index) => (
                                    <li
                                      key={index}
                                      className="text-xs text-amber-700"
                                    >
                                      {tip}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {completedTasksCount === WORKSHOP_TASKS.length && (
        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-emerald-800">
            <Trophy className="h-6 w-6" />
            Congratulations!
          </h3>
          <p className="text-emerald-700 mb-3">
            You&apos;ve successfully containerized your full-stack Node.js
            application! You now have:
          </p>
          <ul className="list-disc list-inside space-y-1 text-emerald-700 mb-4">
            <li>Multi-stage production Dockerfile (Express + built client)</li>
            <li>Development Dockerfile with Compose Watch and hot reload</li>
            <li>Test Dockerfile with Vitest coverage in containers</li>
            <li>Optimized .dockerignore file</li>
            <li>Docker Compose with PostgreSQL, dev, prod, and test profiles</li>
            <li>Production image scanned and pushed to Docker Hub</li>
          </ul>
          {totalTime > 0 && (
            <p className="mb-4 flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Clock className="h-4 w-4" />
              Your total workshop time:{" "}
              <span className="font-mono text-lg">{formatTime(totalTime)}</span>
              — Great job!
            </p>
          )}
          <p className="text-emerald-700">
            Continue learning with the{" "}
            <a
              href={SOCIAL_LINKS.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 hover:underline"
            >
              official Docker Node.js guide
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
};
