export type LearnDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type LearnEntry = {
  slug: string;
  title: string;
  short: string;
  tagline?: string;
  category: string;
  difficulty: LearnDifficulty;
  readTime: string;
  icon: string;
  color: string;
  summary: string;
  whatIsIt: string;
  keyPoints: string[];
  example?: string;
  links: { title: string; href: string; source: string }[];
};

export const LEARN_COLOR_MAP: Record<
  string,
  { accent: string; icon: string; ring: string }
> = {
  blue: {
    accent: "bg-blue-500",
    icon: "bg-blue-50 text-blue-600 ring-blue-100",
    ring: "ring-blue-200",
  },
  sky: {
    accent: "bg-sky-500",
    icon: "bg-sky-50 text-sky-600 ring-sky-100",
    ring: "ring-sky-200",
  },
  emerald: {
    accent: "bg-emerald-500",
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    ring: "ring-emerald-200",
  },
  amber: {
    accent: "bg-amber-500",
    icon: "bg-amber-50 text-amber-600 ring-amber-100",
    ring: "ring-amber-200",
  },
  rose: {
    accent: "bg-rose-500",
    icon: "bg-rose-50 text-rose-600 ring-rose-100",
    ring: "ring-rose-200",
  },
};

export const DIFFICULTY_COLORS: Record<LearnDifficulty, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Advanced: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
};

export const LEARN_CATEGORY_ORDER = [
  "Fundamentals",
  "Orchestration",
  "Production & Security",
] as const;

export const LEARN_ENTRIES: ReadonlyArray<LearnEntry> = [
  {
    slug: "docker-image",
    title: "Docker Image",
    short: "Image",
    category: "Fundamentals",
    difficulty: "Beginner",
    readTime: "4 min",
    icon: "package",
    color: "blue",
    summary:
      "A read-only blueprint that packages your app, runtime, and dependencies into a portable artifact you can run anywhere.",
    whatIsIt:
      "A Docker image is an immutable snapshot built from a Dockerfile. It layers filesystem changes on top of a base image (like node:24-alpine). Images are stored locally or pushed to registries such as Docker Hub. Containers are running instances of images.",
    keyPoints: [
      "Images are built with docker build and tagged with names like todoapp:local.",
      "Layers are cached — unchanged steps rebuild faster.",
      "Smaller base images (Alpine, distroless) mean faster deploys and smaller attack surface.",
      "Never store secrets inside an image; inject them at runtime via env vars.",
    ],
    example: "docker build -t todoapp:local .\ndocker images",
    links: [
      {
        title: "Docker images overview",
        href: "https://docs.docker.com/get-started/overview/#docker-images",
        source: "Docker Docs",
      },
      {
        title: "Best practices for writing Dockerfiles",
        href: "https://docs.docker.com/build/building/best-practices/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "dockerfile",
    title: "Dockerfile",
    short: "Dockerfile",
    category: "Fundamentals",
    difficulty: "Beginner",
    readTime: "6 min",
    icon: "file-code",
    color: "sky",
    summary:
      "A recipe of instructions (FROM, COPY, RUN, CMD) that Docker uses to assemble your image layer by layer.",
    whatIsIt:
      "The Dockerfile describes how to install dependencies, build your app, and define the process that runs when a container starts. In this workshop you use multi-stage Dockerfiles: one stage compiles the Vite client and esbuild server, a second stage copies only production artifacts into a slim runner image.",
    keyPoints: [
      "Order instructions from least to most frequently changing to maximise cache hits.",
      "Use COPY package*.json before npm ci so dependency layers cache separately.",
      "Run as a non-root USER in production images.",
      "Use ARG for build-time variables (e.g. NODE_VERSION) and ENV for runtime config.",
    ],
    example:
      "FROM node:24.16.0-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build",
    links: [
      {
        title: "Dockerfile reference",
        href: "https://docs.docker.com/reference/dockerfile/",
        source: "Docker Docs",
      },
      {
        title: "Node.js Docker guide",
        href: "https://docs.docker.com/guides/nodejs/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "container",
    title: "Docker Container",
    short: "Container",
    category: "Fundamentals",
    difficulty: "Beginner",
    readTime: "4 min",
    icon: "container",
    color: "sky",
    summary:
      "An isolated, running process created from an image — your app in a lightweight sandbox.",
    whatIsIt:
      "When you docker run an image, Docker creates a container with its own filesystem, network namespace, and process tree. Containers share the host kernel but are isolated via namespaces and cgroups. They are ephemeral by default; use volumes for data that must survive restarts.",
    keyPoints: [
      "docker run starts a container; --rm removes it when it exits.",
      "-p maps host ports to container ports (e.g. -p 8080:3000).",
      "docker ps lists running containers; docker logs shows stdout/stderr.",
      "One image can spawn many containers, each isolated from the others.",
    ],
    example: "docker run --rm -p 8080:3000 todoapp:local\ndocker ps",
    links: [
      {
        title: "Docker containers overview",
        href: "https://docs.docker.com/get-started/overview/#docker-containers",
        source: "Docker Docs",
      },
      {
        title: "docker run reference",
        href: "https://docs.docker.com/reference/cli/docker/container/run/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "compose",
    title: "Docker Compose",
    short: "Compose",
    category: "Orchestration",
    difficulty: "Intermediate",
    readTime: "7 min",
    icon: "workflow",
    color: "emerald",
    summary:
      "Define multi-container apps in compose.yml — API, database, dev and prod profiles in one file.",
    whatIsIt:
      "Docker Compose orchestrates multiple services on a single machine. Your workshop compose.yml defines app-dev (with Compose Watch), app-prod, app-test, and a Postgres db service. Services communicate over an internal network using service names as hostnames (POSTGRES_HOST=db).",
    keyPoints: [
      "docker compose up starts all services; profiles select prod or test stacks.",
      "Compose Watch syncs file changes and rebuilds when package.json changes.",
      "depends_on and healthchecks coordinate startup order.",
      "Use .env for secrets — never commit real credentials.",
    ],
    example:
      "docker compose up app-dev --watch\ndocker compose --profile prod up app-prod --build",
    links: [
      {
        title: "Compose file reference",
        href: "https://docs.docker.com/compose/compose-file/",
        source: "Docker Docs",
      },
      {
        title: "Compose Watch",
        href: "https://docs.docker.com/compose/how-tos/file-watch/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "networks-volumes",
    title: "Networks & Volumes",
    short: "Networking",
    category: "Orchestration",
    difficulty: "Intermediate",
    readTime: "5 min",
    icon: "network",
    color: "amber",
    summary:
      "Networks let containers talk to each other; volumes persist data beyond container lifetimes.",
    whatIsIt:
      "By default Compose creates a bridge network so the app container reaches Postgres at hostname db. Named volumes (e.g. for Postgres data) survive container recreation. Bind mounts sync host directories into containers — used by Compose Watch for live code sync.",
    keyPoints: [
      "Service DNS names match service keys in compose.yml.",
      "Volumes are managed by Docker and preferred over bind mounts for database data.",
      "Expose only the ports users need; keep databases off public interfaces.",
      "Use docker volume ls and docker network ls to inspect resources.",
    ],
    example:
      "services:\n  app:\n    depends_on:\n      db:\n        condition: service_healthy\n  db:\n    volumes:\n      - pgdata:/var/lib/postgresql/data",
    links: [
      {
        title: "Docker networking",
        href: "https://docs.docker.com/network/",
        source: "Docker Docs",
      },
      {
        title: "Docker volumes",
        href: "https://docs.docker.com/storage/volumes/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "multi-stage",
    title: "Multi-Stage Builds",
    short: "Multi-stage",
    category: "Production & Security",
    difficulty: "Intermediate",
    readTime: "6 min",
    icon: "layers",
    color: "blue",
    summary:
      "Build in a fat stage, copy only compiled output to a minimal production image.",
    whatIsIt:
      "Multi-stage Dockerfiles use multiple FROM statements. The builder stage installs devDependencies, runs npm run build, and produces dist/. The runner stage starts from a fresh Alpine image, copies dist/, runs as non-root, and omits source code and node_modules — dramatically shrinking image size.",
    keyPoints: [
      "Final images should not contain TypeScript sources or devDependencies.",
      "COPY --from=builder copies artifacts between stages.",
      "Pin base image digests in production for reproducible builds.",
      "Scan images with docker scout or trivy before pushing to registries.",
    ],
    example:
      "FROM node:24-alpine AS builder\nRUN npm run build\nFROM node:24-alpine AS runner\nCOPY --from=builder /app/dist ./dist\nUSER node\nCMD [\"node\", \"dist/server.js\"]",
    links: [
      {
        title: "Multi-stage builds",
        href: "https://docs.docker.com/build/building/multi-stage/",
        source: "Docker Docs",
      },
      {
        title: "Node.js production image",
        href: "https://docs.docker.com/guides/nodejs/containerize/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "security",
    title: "Container Security",
    short: "Security",
    category: "Production & Security",
    difficulty: "Advanced",
    readTime: "5 min",
    icon: "shield",
    color: "rose",
    summary:
      "Run as non-root, scan for CVEs, use .dockerignore, and keep base images updated.",
    whatIsIt:
      "Production containers should follow least privilege: non-root USER, read-only filesystem where possible, no secrets in layers, and minimal base images. The workshop .dockerignore excludes node_modules, .git, and .env files from the build context. GitHub Actions runs tests in containers before pushing signed multi-arch images.",
    keyPoints: [
      "Add a non-root user in the Dockerfile and switch with USER.",
      "Use .dockerignore to exclude secrets and unnecessary files.",
      "Run docker scout cves or similar before deploy.",
      "Keep NODE_VERSION and Postgres images pinned and updated.",
    ],
    example: "USER node\nENTRYPOINT [\"node\", \"dist/server.js\"]",
    links: [
      {
        title: "Docker security",
        href: "https://docs.docker.com/engine/security/",
        source: "Docker Docs",
      },
      {
        title: "Docker Scout",
        href: "https://docs.docker.com/scout/",
        source: "Docker Docs",
      },
    ],
  },
  {
    slug: "cicd",
    title: "CI/CD with GitHub Actions",
    short: "CI/CD",
    category: "Production & Security",
    difficulty: "Advanced",
    readTime: "5 min",
    icon: "rocket",
    color: "sky",
    summary:
      "Run tests in Docker on every push, then build and push multi-arch images to Docker Hub.",
    whatIsIt:
      "Continuous integration runs docker compose --profile test to execute Vitest with coverage inside a container — matching production dependencies. On main, the pipeline builds linux/amd64 and linux/arm64 images, tags them, and pushes to Docker Hub using registry secrets stored in GitHub.",
    keyPoints: [
      "Test profile mirrors CI: same Dockerfile.test as local runs.",
      "Use buildx for multi-platform images.",
      "Store DOCKERHUB_USERNAME and DOCKERHUB_TOKEN as GitHub secrets.",
      "Fail the pipeline if tests or vulnerability scans fail.",
    ],
    example:
      "docker compose --profile test run --rm --build app-test\ndocker buildx build --platform linux/amd64,linux/arm64 -t user/todoapp:latest --push .",
    links: [
      {
        title: "GitHub Actions + Docker",
        href: "https://docs.docker.com/guides/gha/",
        source: "Docker Docs",
      },
      {
        title: "Docker Hub",
        href: "https://docs.docker.com/docker-hub/",
        source: "Docker Docs",
      },
    ],
  },
];

export const LEARN_BY_SLUG: Record<string, LearnEntry> = Object.fromEntries(
  LEARN_ENTRIES.map((entry) => [entry.slug, entry])
);
