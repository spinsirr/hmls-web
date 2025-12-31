# Development
dev:
    #!/usr/bin/env bash
    cd hmls-api && deno task dev &
    cd hmls-web && bun dev

dev-api:
    cd hmls-api && deno task dev

dev-web:
    cd hmls-web && bun dev

# Supabase (Database only)
start:
    supabase start

stop:
    supabase stop

status:
    supabase status

# Database
db-migrate:
    cd hmls-api && deno task db:migrate

db-seed:
    cd hmls-api && deno task db:seed

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

# Deploy
deploy-api:
    cd hmls-api && deployctl deploy --project=hmls-api main.ts

deploy-web:
    cd hmls-web && bun run build
