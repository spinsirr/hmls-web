import { db } from "./client.ts";

const initialServices = [
  {
    name: "Oil Change",
    description: "Engine oil and filter replacement, fluid top-ups",
    min_price: 5000,
    max_price: 8000,
    duration: "30-45 minutes",
    category: "maintenance",
  },
  {
    name: "Brakes",
    description: "Brake pads, rotors, and fluid inspection",
    min_price: 15000,
    max_price: 30000,
    duration: "1-2 hours",
    category: "repair",
  },
  {
    name: "HVAC Service",
    description: "Air conditioning inspection and servicing",
    min_price: 10000,
    max_price: 20000,
    duration: "1-2 hours",
    category: "maintenance",
  },
  {
    name: "Suspension",
    description: "Suspension diagnostics and repair",
    min_price: 20000,
    max_price: 50000,
    duration: "2-4 hours",
    category: "repair",
  },
  {
    name: "Battery & Electrical",
    description: "Starting/charging systems, alternator, battery replacement",
    min_price: 10000,
    max_price: 25000,
    duration: "30 minutes - 2 hours",
    category: "repair",
  },
  {
    name: "Engine Diagnostics",
    description: "Advanced computer diagnostics for engine issues",
    min_price: 7500,
    max_price: 15000,
    duration: "1 hour",
    category: "diagnostic",
  },
  {
    name: "Pre-Purchase Inspection",
    description: "Used vehicle condition assessment before buying",
    min_price: 10000,
    max_price: 15000,
    duration: "1-2 hours",
    category: "diagnostic",
  },
];

async function seed() {
  console.log("Seeding services...");

  // Check if services already exist
  const existing = await db
    .selectFrom("services")
    .select("id")
    .executeTakeFirst();

  if (!existing) {
    await db.insertInto("services").values(initialServices).execute();
  } else {
    console.log("Services already seeded, skipping...");
  }

  console.log(`Seeded ${initialServices.length} services`);

  const services = await db.selectFrom("services").selectAll().execute();
  console.log(`Total services in database: ${services.length}`);
}

seed()
  .then(() => {
    console.log("Seed completed");
    Deno.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    Deno.exit(1);
  });
