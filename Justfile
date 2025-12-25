# Development
dev:
    #!/usr/bin/env bash
    cd hmls-api && deno task dev &
    cd hmls-web && bun dev

dev-api:
    cd hmls-api && deno task dev

dev-web:
    cd hmls-web && bun dev

# Infrastructure
run-infra:
    cd hmls-api && podman-compose up -d

stop-infra:
    cd hmls-api && podman-compose down

# Database
db-push:
    cd hmls-api && deno task db:push

db-seed:
    cd hmls-api && deno task db:seed

db-generate:
    cd hmls-api && deno task db:generate

# Code quality
fmt:
    cd hmls-api && deno fmt
    cd hmls-web && bun run format

lint:
    cd hmls-api && deno lint
    cd hmls-web && bun run lint

# Build
build:
    cd hmls-web && bun run build
