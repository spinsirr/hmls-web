import { z } from "zod";

const CALCOM_API_KEY = Deno.env.get("CALCOM_API_KEY");
const CALCOM_EVENT_TYPE_ID = Deno.env.get("CALCOM_EVENT_TYPE_ID");
const CALCOM_API_BASE = "https://api.cal.com/v1";

// Tool definitions for Zypher
export const getAvailabilityTool = {
  name: "get_availability",
  description:
    "Check available time slots for booking an appointment. Returns available slots for the next 7 days.",
  parameters: z.object({
    startDate: z
      .string()
      .describe("Start date in YYYY-MM-DD format (defaults to today)"),
    endDate: z
      .string()
      .describe(
        "End date in YYYY-MM-DD format (defaults to 7 days from start)",
      ),
  }),
  execute: async (params: { startDate?: string; endDate?: string }) => {
    const start = params.startDate || new Date().toISOString().split("T")[0];
    const end = params.endDate ||
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split(
        "T",
      )[0];

    const response = await fetch(
      `${CALCOM_API_BASE}/availability?apiKey=${CALCOM_API_KEY}&eventTypeId=${CALCOM_EVENT_TYPE_ID}&startTime=${start}&endTime=${end}`,
      { method: "GET" },
    );

    if (!response.ok) {
      throw new Error(`Cal.com API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      availableSlots: data.slots || [],
      dateRange: { start, end },
    };
  },
};

export const createBookingTool = {
  name: "create_booking",
  description:
    "Create a new booking/appointment for a customer. Requires customer details and preferred time slot.",
  parameters: z.object({
    name: z.string().describe("Customer's full name"),
    email: z.string().email().describe("Customer's email address"),
    phone: z.string().describe("Customer's phone number"),
    startTime: z
      .string()
      .describe("Appointment start time in ISO 8601 format"),
    duration: z
      .number()
      .describe(
        "Appointment duration in minutes. Determine this based on the services the customer needs.",
      ),
    serviceType: z.string().describe("Type of service requested"),
    location: z.string().describe("Service location/address"),
    notes: z.string().optional().describe("Additional notes about the service"),
  }),
  execute: async (params: {
    name: string;
    email: string;
    phone: string;
    startTime: string;
    duration: number;
    serviceType: string;
    location: string;
    notes?: string;
  }) => {
    const response = await fetch(
      `${CALCOM_API_BASE}/bookings?apiKey=${CALCOM_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventTypeId: Number(CALCOM_EVENT_TYPE_ID),
          start: params.startTime,
          lengthInMinutes: params.duration,
          responses: {
            name: params.name,
            email: params.email,
            phone: params.phone,
            location: params.location,
          },
          metadata: {
            serviceType: params.serviceType,
            notes: params.notes || "",
          },
        }),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create booking: ${error}`);
    }

    const booking = await response.json();
    return {
      success: true,
      bookingId: booking.id,
      confirmationNumber: booking.uid,
      scheduledTime: params.startTime,
      message: `Booking confirmed for ${params.name} on ${
        new Date(params.startTime).toLocaleString()
      }`,
    };
  },
};

export const calcomTools = [getAvailabilityTool, createBookingTool];
