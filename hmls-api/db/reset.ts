import postgres from "postgres";

const connectionString = Deno.env.get("DATABASE_URL");
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const sql = postgres(connectionString);

console.log("Dropping all tables...");

await sql`DROP TABLE IF EXISTS invoices, quotes, bookings, messages, conversations, customers, services CASCADE`;

console.log("Tables dropped!");
await sql.end();
Deno.exit(0);
