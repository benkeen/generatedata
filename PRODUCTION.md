# Running generatedata in Production Mode

This guide explains how to run the complete generatedata application locally using Docker.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed and running
- [Node.js](https://nodejs.org/) v24 or higher
- [pnpm](https://pnpm.io/) v10.28.2 or higher

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Configure the application (first time only)
cp packages/config/src/client.config.example.ts packages/config/src/client.config.ts
cp packages/config/src/server.config.example.ts packages/config/src/server.config.ts

# 3. Edit the config files with your settings (see Configuration below)

# 4. Start the application
pnpm run prod
```

The application will be available at `http://localhost:9000` (or whatever port you configured).

## Configuration

Before running, you **must** configure the application by editing two files:

### `packages/config/src/server.config.ts`

| Setting                       | Description                                           |
| ----------------------------- | ----------------------------------------------------- |
| `GD_JWT_SECRET`               | Random string for JWT token generation (change this!) |
| `GD_JWT_REFRESH_TOKEN_SECRET` | Random string for refresh tokens (change this!)       |
| `GD_MYSQL_ROOT_PASSWORD`      | Database root password                                |
| `GD_DB_PORT`                  | Database port (default: 3306)                         |
| `GD_DEFAULT_ADMIN_EMAIL`      | Admin account email                                   |
| `GD_DEFAULT_ADMIN_PASSWORD`   | Admin account password                                |

### `packages/config/src/client.config.ts`

| Setting              | Description                                        |
| -------------------- | -------------------------------------------------- |
| `GD_APP_TYPE`        | `login`, `single`, `open`, or `closed` (see below) |
| `GD_API_SERVER_PORT` | GraphQL server port (default: 3001)                |
| `GD_WEB_SERVER_PORT` | Web server port (default: 9000)                    |
| `GD_DEFAULT_LOCALE`  | Default language (`en`, `fr`, `de`, etc.)          |

#### App Types

- **`login`** - Anonymous access allowed, but users must log in to save data
- **`single`** - Single user mode, no login required
- **`open`** - Anyone can access and create accounts
- **`closed`** - Login required for all access

## Commands

| Command                 | Description                                    |
| ----------------------- | ---------------------------------------------- |
| `pnpm run prod`         | Start the production environment               |
| `pnpm run prod:rebuild` | Rebuild all containers from scratch (no cache) |
| `pnpm run prod:down`    | Stop all containers                            |
| `pnpm run prod:logs`    | View container logs                            |

## Architecture

The production setup runs three Docker containers:

```
┌─────────────────────────────────────────────────────────────┐
│                   Docker Compose                            │
├─────────────┬───────────────────┬──────────────────────────┤
│     db      │      server       │         client           │
│   MariaDB   │   GraphQL API     │   nginx + static files   │
│   :3306     │      :3001        │         :9000            │
└─────────────┴───────────────────┴──────────────────────────┘
```

- **db**: MariaDB database for storing user data and datasets
- **server**: Node.js GraphQL API server
- **client**: nginx serving the React frontend

## Data Persistence

Database data is stored in `./data/db/`. This folder is shared between development and production environments, so your data persists across restarts and between dev/prod modes.

## Troubleshooting

### Port already in use

If you see an error about ports being in use, the development server may still be running:

```bash
# Stop the development server
docker compose -f apps/server/docker-compose.yml down

# Then try again
pnpm run prod
```

### Database connection issues

If the server can't connect to the database, try rebuilding:

```bash
pnpm run prod:down
pnpm run prod:rebuild
```

### Viewing logs

```bash
# All containers
pnpm run prod:logs

# Specific container
docker logs gd-server-prod
docker logs gd-db-prod
docker logs gd-client-prod
```

## Stopping the Application

```bash
pnpm run prod:down
```

This stops all containers but preserves your database data.
