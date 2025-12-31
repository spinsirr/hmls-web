import { Kysely } from "kysely";
import { PostgresJSDialect } from "kysely-postgres-js";
import postgres from "postgres";
import type { Database } from "./schema.ts";

let _db: Kysely<Database> | null = null;

function getDb(): Kysely<Database> {
  if (!_db) {
    const connectionString = Deno.env.get("DATABASE_URL");
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is required");
    }

    const pg = postgres(connectionString);

    _db = new Kysely<Database>({
      dialect: new PostgresJSDialect({ postgres: pg }),
    });
  }
  return _db;
}

// Proxy for lazy initialization
export const db = new Proxy({} as Kysely<Database>, {
  get(_target, prop) {
    const realDb = getDb();
    const value = realDb[prop as keyof typeof realDb];
    if (typeof value === "function") {
      return value.bind(realDb);
    }
    return value;
  },
});

export * from "./schema.ts";
