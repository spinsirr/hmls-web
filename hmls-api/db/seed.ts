import { db, schema } from "./client.ts";

const initialServices = [
  {
    name: "Oil Change",
    description: "Engine oil and filter replacement, fluid top-ups",
    minPrice: 5000, // $50 in cents
    maxPrice: 8000, // $80 in cents
    duration: "30-45 minutes",
    category: "maintenance",
  },
  {
    name: "Brakes",
    description: "Brake pads, rotors, and fluid inspection",
    minPrice: 15000,
    maxPrice: 30000,
    duration: "1-2 hours",
    category: "repair",
  },
  {
    name: "HVAC Service",
    description: "Air conditioning inspection and servicing",
    minPrice: 10000,
    maxPrice: 20000,
    duration: "1-2 hours",
    category: "maintenance",
  },
  {
    name: "Suspension",
    description: "Suspension diagnostics and repair",
    minPrice: 20000,
    maxPrice: 50000,
    duration: "2-4 hours",
    category: "repair",
  },
  {
    name: "Battery & Electrical",
    description: "Starting/charging systems, alternator, battery replacement",
    minPrice: 10000,
    maxPrice: 25000,
    duration: "30 minutes - 2 hours",
    category: "repair",
  },
  {
    name: "Engine Diagnostics",
    description: "Advanced computer diagnostics for engine issues",
    minPrice: 7500,
    maxPrice: 15000,
    duration: "1 hour",
    category: "diagnostic",
  },
  {
    name: "Pre-Purchase Inspection",
    description: "Used vehicle condition assessment before buying",
    minPrice: 10000,
    maxPrice: 15000,
    duration: "1-2 hours",
    category: "diagnostic",
  },
];

async function seed() {
  console.log("Seeding services...");

  for (const service of initialServices) {
    await db
      .insert(schema.services)
      .values(service)
      .onConflictDoNothing();
  }

  console.log(`Seeded ${initialServices.length} services`);

  const count = await db.select().from(schema.services);
  console.log(`Total services in database: ${count.length}`);
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
