import { db } from "./client.ts";
import { sql } from "kysely";

async function migrate() {
  console.log("Running migrations...");

  // Create tables
  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      min_price INTEGER NOT NULL,
      max_price INTEGER NOT NULL,
      duration VARCHAR(50),
      category VARCHAR(50),
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      phone VARCHAR(20),
      email VARCHAR(255),
      address TEXT,
      vehicle_info JSONB,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS conversations (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      channel VARCHAR(20) NOT NULL DEFAULT 'web',
      started_at TIMESTAMP NOT NULL DEFAULT NOW(),
      ended_at TIMESTAMP
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      conversation_id INTEGER NOT NULL REFERENCES conversations(id),
      role VARCHAR(20) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      service_type VARCHAR(100) NOT NULL,
      scheduled_at TIMESTAMP NOT NULL,
      location TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      notes TEXT,
      calcom_booking_id VARCHAR(100),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS quotes (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      booking_id INTEGER REFERENCES bookings(id),
      stripe_quote_id VARCHAR(100),
      items JSONB NOT NULL,
      total_amount INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      expires_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  await sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      booking_id INTEGER REFERENCES bookings(id),
      quote_id INTEGER REFERENCES quotes(id),
      stripe_invoice_id VARCHAR(100),
      items JSONB NOT NULL,
      total_amount INTEGER NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      paid_at TIMESTAMP,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `.execute(db);

  console.log("Migrations completed!");
  Deno.exit(0);
}

migrate().catch((error) => {
  console.error("Migration failed:", error);
  Deno.exit(1);
});
