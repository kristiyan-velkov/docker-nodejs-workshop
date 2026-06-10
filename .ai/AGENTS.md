# docker-nodejs-workshop — Agent Guide

Interactive workshop UI for the Node.js Congress 2026 Docker workshop.

## Repositories

| Repo | Role |
|------|------|
| **docker-nodejs-workshop** (this repo) | React + Vite guide app with tasks, timers, Docker reference |
| **workshop-node-congress** | Sample full-stack app participants containerize |

## Key files

- `src/components/WorkshopTasks.tsx` — 10 interactive tasks + optional GHA task
- `src/constants/data.ts` — features, commands, concepts, social links
- `src/components/Hero.tsx`, `OverviewTab.tsx`, `QuickStart.tsx` — workshop UI

## Conventions (content must match sample app)

- Node image: `24.16.0-alpine`
- Compose file: `compose.yml`
- Services: `app-dev`, `app-prod`, `app-test`, `db`
- Production: Express serves `dist/client` + API on port 3000 (no NGINX)
- Dev: `Dockerfile.development`, root user, `npm run dev:docker`
- Test: `Dockerfile.test`, `npm run test:coverage`

## Commands (this UI repo)

```bash
npm install
npm run dev      # http://localhost:5173
npm test
npm run lint
npm run build
```

## References

- [Docker Node.js guide](https://docs.docker.com/guides/nodejs)
- [workshop-node-congress](https://github.com/kristiyan-velkov/workshop-node-congress)
