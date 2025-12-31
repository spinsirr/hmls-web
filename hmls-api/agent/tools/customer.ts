import { z } from "zod";
import { db } from "../../db/client.ts";

export const getCustomerTool = {
  name: "get_customer",
  description: "Look up an existing customer by phone number or email address.",
  parameters: z.object({
    phone: z.string().optional().describe("Customer's phone number"),
    email: z.string().email().optional().describe("Customer's email address"),
  }),
  execute: async (params: { phone?: string; email?: string }) => {
    if (!params.phone && !params.email) {
      return {
        found: false,
        message: "Please provide a phone number or email",
      };
    }

    let query = db.selectFrom("customers").selectAll();

    if (params.phone && params.email) {
      query = query.where((eb) =>
        eb.or([
          eb("phone", "=", params.phone!),
          eb("email", "=", params.email!),
        ])
      );
    } else if (params.phone) {
      query = query.where("phone", "=", params.phone);
    } else if (params.email) {
      query = query.where("email", "=", params.email);
    }

    const customer = await query.executeTakeFirst();

    if (!customer) {
      return {
        found: false,
        message: "No customer found with that information",
      };
    }

    return {
      found: true,
      customer,
    };
  },
};

export const createCustomerTool = {
  name: "create_customer",
  description:
    "Create a new customer record with their contact and vehicle information.",
  parameters: z.object({
    name: z.string().describe("Customer's full name"),
    phone: z.string().describe("Customer's phone number"),
    email: z.string().email().optional().describe("Customer's email address"),
    address: z.string().optional().describe("Customer's address for service"),
    vehicleMake: z.string().optional().describe("Vehicle make (e.g., Toyota)"),
    vehicleModel: z
      .string()
      .optional()
      .describe("Vehicle model (e.g., Camry)"),
    vehicleYear: z.string().optional().describe("Vehicle year (e.g., 2020)"),
  }),
  execute: async (params: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    vehicleMake?: string;
    vehicleModel?: string;
    vehicleYear?: string;
  }) => {
    const vehicleInfo =
      params.vehicleMake || params.vehicleModel || params.vehicleYear
        ? {
          make: params.vehicleMake,
          model: params.vehicleModel,
          year: params.vehicleYear,
        }
        : null;

    const customer = await db
      .insertInto("customers")
      .values({
        name: params.name,
        phone: params.phone,
        email: params.email ?? null,
        address: params.address ?? null,
        vehicle_info: vehicleInfo,
      })
      .returning(["id", "name"])
      .executeTakeFirstOrThrow();

    return {
      success: true,
      customerId: customer.id,
      message: `Customer ${params.name} created successfully`,
    };
  },
};

export const getServicesTool = {
  name: "get_services",
  description:
    "Get the list of available services with descriptions and pricing from the database.",
  parameters: z.object({}),
  execute: async () => {
    const servicesList = await db
      .selectFrom("services")
      .selectAll()
      .where("is_active", "=", true)
      .orderBy("name", "asc")
      .execute();

    return {
      services: servicesList.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        minPrice: s.min_price / 100,
        maxPrice: s.max_price / 100,
        priceRange: `$${s.min_price / 100}-${s.max_price / 100}`,
        duration: s.duration,
        category: s.category,
      })),
    };
  },
};

export const createEstimateTool = {
  name: "create_estimate",
  description:
    "Generate an informal price estimate for the customer. This is NOT a formal quote - just a quick price range to share in chat. Use this before creating a formal Stripe quote.",
  parameters: z.object({
    services: z
      .array(
        z.object({
          name: z.string().describe("Service name"),
          description: z.string().describe("Brief description of work needed"),
          estimatedPrice: z.number().describe("Estimated price in dollars"),
        }),
      )
      .describe("List of services needed"),
    notes: z
      .string()
      .optional()
      .describe("Any additional notes about the estimate"),
  }),
  execute: (params: {
    services?: { name: string; description: string; estimatedPrice: number }[];
    notes?: string;
  }) => {
    const services = params.services ?? [];

    if (services.length === 0) {
      return {
        error: true,
        message:
          "No services provided for estimate. Please specify the services needed.",
      };
    }

    const totalMin = services.reduce(
      (sum, s) => sum + s.estimatedPrice * 0.9,
      0,
    );
    const totalMax = services.reduce(
      (sum, s) => sum + s.estimatedPrice * 1.1,
      0,
    );
    const totalEstimate = services.reduce(
      (sum, s) => sum + s.estimatedPrice,
      0,
    );

    return {
      services,
      estimatedTotal: totalEstimate,
      priceRange: {
        low: Math.round(totalMin),
        high: Math.round(totalMax),
      },
      notes: params.notes,
      disclaimer:
        "This is an informal estimate. Final price may vary based on actual conditions. Would you like me to send you a formal quote?",
    };
  },
};

export const customerTools = [
  getCustomerTool,
  createCustomerTool,
  getServicesTool,
  createEstimateTool,
];
