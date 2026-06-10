import type {
  Feature,
  DockerCommand,
  DockerConcept,
  DockerCommandCategory,
} from "../types";

export const FEATURES: Feature[] = [
  {
    icon: "🟢",
    title: "Express 5 Full-Stack API",
    description:
      "Containerize a modern Node.js API with React 19 client, esbuild, and PostgreSQL.",
  },
  {
    icon: "🐳",
    title: "Docker Containerization",
    description:
      "Learn multi-stage builds, Docker Compose profiles, and production deployment strategies.",
  },
  {
    icon: "⚡",
    title: "Compose Watch & Hot Reload",
    description:
      "Develop inside Docker with Vite HMR, file sync, and smart rebuilds on dependency changes.",
  },
  {
    icon: "🔒",
    title: "Security Best Practices",
    description:
      "Non-root production images, vulnerability scanning, and secure Compose networking.",
  },
  {
    icon: "🚀",
    title: "CI/CD with GitHub Actions",
    description:
      "Run tests in containers and push multi-arch images to Docker Hub on main.",
  },
  {
    icon: "📚",
    title: "Hands-On Learning",
    description:
      "Step-by-step tasks with timers to containerize the official Docker Node.js sample app.",
  },
];

export const DOCKER_COMMANDS: DockerCommand[] = [
  {
    title: "Start Development Stack",
    command: "docker compose up app-dev --watch",
    description: "Start API + Vite HMR + Postgres with Compose Watch",
  },
  {
    title: "Start Production Stack",
    command: "docker compose --profile prod up app-prod --build",
    description: "Start production build on port 8080 (Express serves API + client)",
  },
  {
    title: "Run Tests",
    command: "docker compose --profile test run --rm --build app-test",
    description: "Run Vitest with coverage in a test container",
  },
  {
    title: "Start Database Only",
    command: "docker compose up db -d",
    description: "Start PostgreSQL for local npm test outside Compose",
  },
  {
    title: "Build Production Image",
    command: "docker build -t todoapp:local .",
    description: "Build multi-stage production image (Express + built client)",
  },
  {
    title: "Build Development Image",
    command: "docker build -f Dockerfile.development -t todoapp:dev .",
    description: "Build development image with hot reload support",
  },
];

export const DOCKER_CONCEPTS: DockerConcept[] = [
  {
    icon: "📦",
    title: "Docker Image",
    description:
      "A Docker image is a read-only template used to create containers. It contains all the code, runtime, libraries, and dependencies needed to run an application. Images are built from Dockerfiles and can be stored in registries like Docker Hub.",
    example: "docker build -t todoapp:local .",
    docsLink: "https://docs.docker.com/get-started/overview/#docker-images",
  },
  {
    icon: "📝",
    title: "Dockerfile",
    description:
      "A Dockerfile is a text file containing instructions for building a Docker image. This workshop uses multi-stage builds: a builder stage compiles the Vite client and esbuild server bundle, then a slim Node runner serves the app.",
    example:
      "ARG NODE_VERSION=24.16.0-alpine\nFROM node:${NODE_VERSION} AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build",
    docsLink: "https://docs.docker.com/reference/dockerfile/",
  },
  {
    icon: "🐳",
    title: "Docker Container",
    description:
      "A Docker container is a running instance of a Docker image. Containers are isolated, lightweight, and portable environments that run applications. Multiple containers can run from the same image, each with its own isolated filesystem and network.",
    example: "docker run --rm -p 8080:3000 todoapp:local",
    docsLink: "https://docs.docker.com/get-started/overview/#docker-containers",
  },
  {
    icon: "🎼",
    title: "Docker Compose",
    description:
      "Docker Compose is a tool for defining and running multi-container Docker applications. It uses a YAML file (compose.yml) to configure services, networks, and volumes — including profiles for prod and test.",
    example: "docker compose up app-dev --watch",
    docsLink: "https://docs.docker.com/compose/",
  },
  {
    icon: "🚫",
    title: ".dockerignore File",
    description:
      "A .dockerignore file specifies which files and directories should be excluded from the Docker build context. Similar to .gitignore, it helps reduce build time, image size, and prevents sensitive files from being included in images.",
    example: "node_modules/\n.git/\n.env*\ndist/\ncoverage/",
    docsLink: "https://docs.docker.com/build/building/context/#dockerignore",
  },
  {
    icon: "⚙️",
    title: "Docker Engine",
    description:
      "Docker Engine is the core runtime that runs containers. It consists of a daemon (dockerd) that manages containers, images, networks, and volumes, and a REST API that allows applications to interact with the daemon.",
    example: "docker version",
    docsLink: "https://docs.docker.com/engine/",
  },
  {
    icon: "💻",
    title: "Docker Client",
    description:
      "The Docker Client (docker CLI) is the command-line interface that allows users to interact with Docker Engine. It sends commands to the Docker daemon via the REST API to build, run, and manage containers.",
    example: "docker ps\ndocker build\ndocker run",
    docsLink: "https://docs.docker.com/engine/reference/commandline/cli/",
  },
  {
    icon: "🌐",
    title: "Docker Network",
    description:
      "Docker networks enable containers to communicate with each other and with the host. In Compose, services reach each other by name — e.g. the app uses POSTGRES_HOST=db to connect to the database service.",
    example:
      "docker network create my-network\ndocker run --network my-network my-app",
    docsLink: "https://docs.docker.com/network/",
  },
  {
    icon: "💾",
    title: "Docker Volume",
    description:
      "Docker volumes are the preferred mechanism for persisting data generated by containers. Volumes are managed by Docker and can be shared between containers, providing data persistence independent of container lifecycle.",
    example:
      "docker volume create my-volume\ndocker run -v my-volume:/data my-app",
    docsLink: "https://docs.docker.com/storage/volumes/",
  },
  {
    icon: "☁️",
    title: "Docker Hub",
    description:
      "Docker Hub is the world's largest container registry, providing a cloud-based repository for Docker images. It allows you to store, share, and pull Docker images, making it easy to distribute applications.",
    example: "docker pull node:24.16.0-alpine\ndocker push username/todoapp:latest",
    docsLink: "https://docs.docker.com/docker-hub/",
  },
  {
    icon: "🏗️",
    title: "Multi-Stage Build",
    description:
      "Multi-stage builds allow you to use multiple FROM statements in a Dockerfile, enabling you to build in one stage and copy only necessary artifacts to a smaller final image. This significantly reduces image size and improves security.",
    example:
      "FROM node:24.16.0-alpine AS builder\nRUN npm run build\nFROM node:24.16.0-alpine AS runner\nCOPY --from=builder /app/dist ./dist\nUSER node\nENTRYPOINT [\"node\", \"dist/server.js\"]",
    docsLink: "https://docs.docker.com/build/building/multi-stage/",
  },
  {
    icon: "🚀",
    title: "Docker Init",
    description:
      "Docker Init is a command-line tool that helps initialize Docker resources in your project. It automatically generates Dockerfiles, compose files, and .dockerignore files based on your project type, making it easier to get started with Docker.",
    example: "docker init",
    docsLink: "https://docs.docker.com/reference/cli/docker/init/",
  },
];

export const DOCKER_COMMANDS_REFERENCE: DockerCommandCategory[] = [
  {
    icon: "📦",
    category: "Image Commands",
    commands: [
      {
        title: "Build an image",
        command: "docker build -t <image-name>:<tag> .",
        description:
          "Build a Docker image from a Dockerfile in the current directory",
        examples: [
          "docker build -t todoapp:local .",
          "docker build -f Dockerfile.development -t todoapp:dev .",
          "docker build -f Dockerfile.test -t todoapp:test .",
        ],
      },
      {
        title: "List images",
        command: "docker images",
        description: "List all Docker images on your system",
        examples: ["docker images", "docker images | grep todoapp"],
      },
      {
        title: "Remove an image",
        command: "docker rmi <image-name>",
        description: "Remove one or more Docker images",
        examples: [
          "docker rmi todoapp:local",
          "docker rmi $(docker images -q)",
        ],
      },
      {
        title: "Pull an image",
        command: "docker pull <image-name>:<tag>",
        description: "Download an image from a registry",
        examples: [
          "docker pull node:24.16.0-alpine",
          "docker pull postgres:16-alpine",
        ],
      },
      {
        title: "Push an image",
        command: "docker push <image-name>:<tag>",
        description: "Upload an image to a registry",
        examples: [
          "docker push my-username/todoapp:latest",
          "docker push my-registry.com/todoapp:v1.0",
        ],
      },
      {
        title: "Tag an image",
        command: "docker tag <source> <target>",
        description: "Create a tag for an image",
        examples: [
          "docker tag todoapp:local my-username/todoapp:latest",
          "docker tag todoapp:local my-username/todoapp:v1.0",
        ],
      },
    ],
  },
  {
    icon: "🐳",
    category: "Container Commands",
    commands: [
      {
        title: "Run a container",
        command: "docker run [options] <image-name>",
        description: "Create and start a container from an image",
        examples: [
          "docker run --rm -p 8080:3000 todoapp:local",
          "docker run --rm -p 3000:3000 -p 5173:5173 todoapp:dev",
          "docker run --name todoapp-debug -it todoapp:dev sh",
        ],
      },
      {
        title: "List containers",
        command: "docker ps [options]",
        description: "List running containers (use -a for all containers)",
        examples: [
          "docker ps",
          "docker ps -a",
          "docker ps --filter status=exited",
        ],
      },
      {
        title: "Stop a container",
        command: "docker stop <container-id/name>",
        description: "Stop one or more running containers",
        examples: ["docker stop todoapp-dev", "docker stop $(docker ps -q)"],
      },
      {
        title: "Start a container",
        command: "docker start <container-id/name>",
        description: "Start one or more stopped containers",
        examples: ["docker start todoapp-dev", "docker start -a todoapp-dev"],
      },
      {
        title: "Remove a container",
        command: "docker rm <container-id/name>",
        description: "Remove one or more containers",
        examples: [
          "docker rm todoapp-dev",
          "docker rm -f todoapp-dev",
          "docker rm $(docker ps -aq)",
        ],
      },
      {
        title: "Execute command in container",
        command: "docker exec [options] <container> <command>",
        description: "Run a command in a running container",
        examples: [
          "docker exec -it todoapp-dev sh",
          "docker exec todoapp-dev npm test",
          "docker exec todoapp-dev curl -s http://localhost:3000/health",
        ],
      },
      {
        title: "View container logs",
        command: "docker logs [options] <container>",
        description: "Fetch logs from a container",
        examples: [
          "docker logs todoapp-dev",
          "docker logs -f todoapp-dev",
          "docker logs --tail 100 todoapp-prod",
        ],
      },
      {
        title: "Inspect a container",
        command: "docker inspect <container>",
        description: "Return low-level information about a container",
        examples: [
          "docker inspect todoapp-dev",
          "docker inspect --format='{{.NetworkSettings.IPAddress}}' todoapp-dev",
        ],
      },
    ],
  },
  {
    icon: "💾",
    category: "Volume Commands",
    commands: [
      {
        title: "List volumes",
        command: "docker volume ls",
        description: "List all Docker volumes",
        examples: ["docker volume ls"],
      },
      {
        title: "Create a volume",
        command: "docker volume create <volume-name>",
        description: "Create a new volume",
        examples: [
          "docker volume create todoapp-data",
          "docker volume create --driver local my-volume",
        ],
      },
      {
        title: "Inspect a volume",
        command: "docker volume inspect <volume-name>",
        description: "Display detailed information about a volume",
        examples: ["docker volume inspect todoapp-data"],
      },
      {
        title: "Remove a volume",
        command: "docker volume rm <volume-name>",
        description: "Remove one or more volumes",
        examples: [
          "docker volume rm todoapp-data",
          "docker volume rm $(docker volume ls -q)",
        ],
      },
      {
        title: "Remove unused volumes",
        command: "docker volume prune",
        description: "Remove all unused volumes",
        examples: ["docker volume prune", "docker volume prune -f"],
      },
    ],
  },
  {
    icon: "🎼",
    category: "Docker Compose Commands",
    commands: [
      {
        title: "Start services",
        command: "docker compose up [options] [service]",
        description: "Create and start containers",
        examples: [
          "docker compose up app-dev --watch",
          "docker compose --profile prod up app-prod --build -d",
          "docker compose --profile test run --rm --build app-test",
          "docker compose up db -d",
        ],
      },
      {
        title: "Stop services",
        command: "docker compose down [options]",
        description: "Stop and remove containers, networks",
        examples: [
          "docker compose down",
          "docker compose down -v",
          "docker compose --profile prod down",
        ],
      },
      {
        title: "View logs",
        command: "docker compose logs [options] [service]",
        description: "View output from containers",
        examples: [
          "docker compose logs",
          "docker compose logs -f app-dev",
          "docker compose logs app-prod",
        ],
      },
      {
        title: "Execute command",
        command: "docker compose exec <service> <command>",
        description: "Execute a command in a running service",
        examples: [
          "docker compose exec app-dev npm test",
          "docker compose exec app-dev sh",
          "docker compose exec db psql -U todoapp -d todoapp",
        ],
      },
      {
        title: "Build services",
        command: "docker compose build [options] [service]",
        description: "Build or rebuild services",
        examples: [
          "docker compose build app-dev",
          "docker compose build app-prod --no-cache",
          "docker compose build app-test",
        ],
      },
      {
        title: "List services",
        command: "docker compose ps",
        description: "List containers for services",
        examples: ["docker compose ps"],
      },
    ],
  },
];

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/kristiyan-velkov-763130b3/",
  medium: "https://medium.com/@kristiyanvelkov",
  newsletter: "https://frontendworld.substack.com/",
  github: "https://github.com/kristiyan-velkov/docker-nodejs-workshop",
  sampleApp: "https://github.com/kristiyan-velkov/workshop-node-congress",
  githubSponsors: "https://github.com/sponsors/kristiyan-velkov",
  donate: "https://donate.stripe.com/eVq4gz9dKex71ZW68L3F600",
  documentation: "https://docs.docker.com/guides/nodejs",
} as const;
