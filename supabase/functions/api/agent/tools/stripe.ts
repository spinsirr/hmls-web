import { z } from "zod";
import { db, schema } from "../../db/client.ts";
import { eq } from "drizzle-orm";

const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_API_BASE = "https://api.stripe.com/v1";

async function stripeRequest(
  endpoint: string,
  method: "GET" | "POST" = "POST",
  body?: Record<string, unknown>,
) {
  const response = await fetch(`${STRIPE_API_BASE}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body
      ? new URLSearchParams(body as Record<string, string>).toString()
      : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Stripe API error: ${error}`);
  }

  return response.json();
}

// Ensure customer exists in Stripe
async function getOrCreateStripeCustomer(customerId: number) {
  const [customer] = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.id, customerId))
    .limit(1);

  if (!customer) throw new Error("Customer not found");

  // Check if customer has Stripe ID stored (we'd need to add this field)
  // For now, create a new Stripe customer each time or search by email
  const stripeCustomer = await stripeRequest("/customers", "POST", {
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
  });

  return stripeCustomer.id;
}

export const createQuoteTool = {
  name: "create_quote",
  description:
    "Create a quote/estimate for a customer with line items for services. The quote can be sent to the customer for approval.",
  parameters: z.object({
    customerId: z.number().describe("The customer ID from the database"),
    items: z
      .array(
        z.object({
          service: z.string().describe("Service name"),
          description: z.string().describe("Description of the work"),
          amount: z.number().describe("Price in dollars"),
        }),
      )
      .describe("List of services and their prices"),
    expiresInDays: z.number().default(7).describe("Days until quote expires"),
  }),
  execute: async (params: {
    customerId: number;
    items: { service: string; description: string; amount: number }[];
    expiresInDays?: number;
  }) => {
    const stripeCustomerId = await getOrCreateStripeCustomer(params.customerId);

    // Create line items in Stripe format
    const lineItems: Record<string, string> = {};
    params.items.forEach((item, index) => {
      lineItems[`line_items[${index}][price_data][currency]`] = "usd";
      lineItems[`line_items[${index}][price_data][product_data][name]`] =
        item.service;
      lineItems[`line_items[${index}][price_data][product_data][description]`] =
        item.description;
      lineItems[`line_items[${index}][price_data][unit_amount]`] = String(
        Math.round(item.amount * 100),
      );
      lineItems[`line_items[${index}][quantity]`] = "1";
    });

    // Create quote in Stripe
    const stripeQuote = await stripeRequest("/quotes", "POST", {
      customer: stripeCustomerId,
      expires_at: String(
        Math.floor(Date.now() / 1000) +
          (params.expiresInDays || 7) * 24 * 60 * 60,
      ),
      ...lineItems,
    });

    // Finalize the quote so it can be sent
    await stripeRequest(`/quotes/${stripeQuote.id}/finalize`, "POST");

    const totalAmount = params.items.reduce(
      (sum, item) => sum + Math.round(item.amount * 100),
      0,
    );

    // Store in database
    const [quote] = await db
      .insert(schema.quotes)
      .values({
        customerId: params.customerId,
        stripeQuoteId: stripeQuote.id,
        items: params.items,
        totalAmount,
        status: "sent",
        expiresAt: new Date(
          Date.now() + (params.expiresInDays || 7) * 24 * 60 * 60 * 1000,
        ),
      })
      .returning();

    return {
      success: true,
      quoteId: quote.id,
      stripeQuoteId: stripeQuote.id,
      totalAmount: totalAmount / 100,
      hostedUrl: stripeQuote.hosted_quote_url,
      message: `Quote created for $${
        (totalAmount / 100).toFixed(2)
      }. Customer can view and accept at: ${stripeQuote.hosted_quote_url}`,
    };
  },
};

export const createInvoiceTool = {
  name: "create_invoice",
  description:
    "Create and send an invoice to a customer for completed services. The invoice will be emailed to the customer.",
  parameters: z.object({
    customerId: z.number().describe("The customer ID from the database"),
    items: z
      .array(
        z.object({
          service: z.string().describe("Service name"),
          description: z.string().describe("Description of the work completed"),
          amount: z.number().describe("Price in dollars"),
        }),
      )
      .describe("List of services and their prices"),
    bookingId: z.number().optional().describe(
      "Associated booking ID if applicable",
    ),
    dueInDays: z.number().default(7).describe("Days until invoice is due"),
  }),
  execute: async (params: {
    customerId: number;
    items: { service: string; description: string; amount: number }[];
    bookingId?: number;
    dueInDays?: number;
  }) => {
    const stripeCustomerId = await getOrCreateStripeCustomer(params.customerId);

    // Create invoice items first
    for (const item of params.items) {
      await stripeRequest("/invoiceitems", "POST", {
        customer: stripeCustomerId,
        description: `${item.service}: ${item.description}`,
        amount: String(Math.round(item.amount * 100)),
        currency: "usd",
      });
    }

    // Create and finalize invoice
    const stripeInvoice = await stripeRequest("/invoices", "POST", {
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: String(params.dueInDays || 7),
    });

    // Finalize and send
    await stripeRequest(`/invoices/${stripeInvoice.id}/finalize`, "POST");
    await stripeRequest(`/invoices/${stripeInvoice.id}/send`, "POST");

    const totalAmount = params.items.reduce(
      (sum, item) => sum + Math.round(item.amount * 100),
      0,
    );

    // Store in database
    const [invoice] = await db
      .insert(schema.invoices)
      .values({
        customerId: params.customerId,
        bookingId: params.bookingId,
        stripeInvoiceId: stripeInvoice.id,
        items: params.items,
        totalAmount,
        status: "sent",
      })
      .returning();

    return {
      success: true,
      invoiceId: invoice.id,
      stripeInvoiceId: stripeInvoice.id,
      totalAmount: totalAmount / 100,
      hostedUrl: stripeInvoice.hosted_invoice_url,
      message: `Invoice for $${
        (totalAmount / 100).toFixed(2)
      } has been sent to the customer. They can pay at: ${stripeInvoice.hosted_invoice_url}`,
    };
  },
};

export const getQuoteStatusTool = {
  name: "get_quote_status",
  description: "Check the status of a quote (draft, sent, accepted, declined).",
  parameters: z.object({
    quoteId: z.number().describe("The quote ID from the database"),
  }),
  execute: async (params: { quoteId: number }) => {
    const [quote] = await db
      .select()
      .from(schema.quotes)
      .where(eq(schema.quotes.id, params.quoteId))
      .limit(1);

    if (!quote) {
      return { found: false, message: "Quote not found" };
    }

    // Get latest status from Stripe if we have a Stripe ID
    if (quote.stripeQuoteId) {
      const stripeQuote = await stripeRequest(
        `/quotes/${quote.stripeQuoteId}`,
        "GET",
      );

      // Update local status if changed
      if (stripeQuote.status !== quote.status) {
        await db
          .update(schema.quotes)
          .set({ status: stripeQuote.status })
          .where(eq(schema.quotes.id, params.quoteId));
      }

      return {
        found: true,
        quoteId: quote.id,
        status: stripeQuote.status,
        totalAmount: quote.totalAmount / 100,
        items: quote.items,
        expiresAt: quote.expiresAt,
      };
    }

    return {
      found: true,
      quoteId: quote.id,
      status: quote.status,
      totalAmount: quote.totalAmount / 100,
      items: quote.items,
    };
  },
};

export const stripeTools = [
  createQuoteTool,
  createInvoiceTool,
  getQuoteStatusTool,
];
