# Node.js Docker Workshop — Node.js Congress 2026

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24.16.0-339933.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)

Interactive companion UI for the **Node.js Congress 2026 Docker workshop**. This repository guides participants through containerizing a full-stack Node.js todo application with step-by-step tasks, timers, and Docker reference material.

**Sample app (hands-on work):** [workshop-node-congress](https://github.com/kristiyan-velkov/workshop-node-congress)  
**This repo (workshop guide UI):** [docker-nodejs-workshop](https://github.com/kristiyan-velkov/docker-nodejs-workshop)

## Two-repo setup

| Repository | Purpose |
|------------|---------|
| [workshop-node-congress](https://github.com/kristiyan-velkov/workshop-node-congress) | Express 5 + Vite/React + PostgreSQL todo app you containerize |
| [docker-nodejs-workshop](https://github.com/kristiyan-velkov/docker-nodejs-workshop) | Interactive workshop guide (this repo) |

## Workshop objectives

By the end of this workshop, you will:

- Containerize a full-stack Node.js application with multi-stage Dockerfiles
- Run development with Docker Compose Watch (API + Vite HMR + Postgres)
- Ship a production image where Express serves API and client on one port
- Run Vitest with coverage inside Docker test containers
- Scan images with Docker Scout and push to Docker Hub
- Set up GitHub Actions CI/CD (optional)

## Features

- **10 interactive tasks** (+ 1 optional CI/CD task) with timers and progress tracking
- **Docker concepts** with links to official documentation
- **Commands reference** for images, containers, volumes, and Compose
- **Quick commands** for `app-dev`, `app-prod`, `app-test`, and `db` services
- **LocalStorage persistence** — progress survives page refreshes

## Tech stack (sample app)

- **Backend:** Express 5, esbuild, TypeScript
- **Frontend:** React 19, Vite, Tailwind CSS 4
- **Database:** PostgreSQL 16
- **Runtime:** Node.js 24.16.0 Alpine
- **Testing:** Vitest with coverage
- **CI/CD:** GitHub Actions + Docker Hub

## Authentication & progress tracking (Supabase)

Participants **sign in** before using the workshop. Progress syncs to Supabase; admins track all tasks and questions.

1. Follow [supabase/README.md](./supabase/README.md) — run the SQL migration and enable Email auth.
2. Copy `.env.example` → `.env.local` with your Supabase URL and anon key.
3. After your first sign-up, promote yourself to admin:

```sql
update public.profiles set role = 'admin' where email = 'you@example.com';
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Supabase](https://supabase.com/) project (for login + progress)
- [Docker Compose](https://docs.docker.com/compose/) v2+
- [Node.js](https://nodejs.org/) 24+ (for local dev)
- [Git](https://git-scm.com/)
- [Docker Hub](https://hub.docker.com/) account (for Task 9)

## Getting started

### 1. Clone both repositories

```bash
# Sample app (where you build Docker files)
git clone https://github.com/kristiyan-velkov/workshop-node-congress
cd workshop-node-congress
cp .env.example .env

# Workshop guide UI (in a separate directory)
git clone https://github.com/kristiyan-velkov/docker-nodejs-workshop
cd docker-nodejs-workshop
```

### 2. Start the workshop guide

```bash
cd docker-nodejs-workshop
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the interactive workshop UI.

### 3. Follow tasks in workshop-node-congress

Work through the 10 tasks in the UI while editing files in `workshop-node-congress`.

## Workshop tasks (~2 hours)

1. **Get the Sample Application** (10 min)
2. **Build and Test Locally** (10 min)
3. **Generate Docker Files** with `docker init` (5 min)
4. **Create Production Dockerfile** (20 min)
5. **Create .dockerignore** (10 min)
6. **Create Development Dockerfile** (15 min)
7. **Docker Compose + PostgreSQL + Test** (20 min)
8. **Scan with Docker Scout** (5 min)
9. **Push to Docker Hub** (10 min)
10. **GitHub Actions CI/CD** (15 min, optional)

## Docker commands (sample app)

### Development

```bash
docker compose up app-dev --watch
docker compose logs -f app-dev
```

| Service | URL |
|---------|-----|
| Vite (frontend) | http://localhost:5173 |
| API | http://localhost:3000 |
| Health | http://localhost:3000/health |

### Production

```bash
docker compose --profile prod up app-prod --build -d
curl http://localhost:8080/health
```

### Tests

```bash
docker compose --profile test run --rm --build app-test
```

### Database only

```bash
docker compose up db -d
```

## Project structure

```
docker-nodejs-workshop/
├── src/
│   ├── components/
│   │   ├── WorkshopTasks.tsx    # Interactive 10-task challenge
│   │   ├── DockerConcepts.tsx
│   │   ├── DockerCommandsReference.tsx
│   │   └── ...
│   └── constants/
│       └── data.ts              # Tasks, commands, concepts data
├── .github/workflows/main.yml   # UI repo CI (test + lint)
└── package.json
```

Docker files (`Dockerfile`, `Dockerfile.development`, `Dockerfile.test`, `compose.yml`) are created in **workshop-node-congress** during the workshop tasks.

## Testing this UI repo

```bash
npm test
npm run lint
npm run build
```

## Author

**Kristiyan Velkov**

- [LinkedIn](https://www.linkedin.com/in/kristiyan-velkov-763130b3/)
- [Medium](https://medium.com/@kristiyanvelkov)
- [Docker Node.js Guide](https://docs.docker.com/guides/nodejs)

## License

MIT License — see [LICENSE](LICENSE).
