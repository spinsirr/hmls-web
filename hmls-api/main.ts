import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import task from "./routes/task.ts";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "https://hmls.autos"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Upgrade", "Connection"],
  })
);

// Health check
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.route("/task", task);

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

const port = Number(Deno.env.get("PORT")) || 8080;

console.log(`HMLS API server starting on port ${port}`);

Deno.serve({ port }, app.fetch);
