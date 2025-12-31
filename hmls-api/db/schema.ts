import type { Generated, Insertable, Selectable, Updateable } from "kysely";

// Table interfaces
export interface ServicesTable {
  id: Generated<number>;
  name: string;
  description: string;
  min_price: number;
  max_price: number;
  duration: string | null;
  category: string | null;
  is_active: Generated<boolean>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface CustomersTable {
  id: Generated<number>;
  name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  vehicle_info: unknown | null;
  created_at: Generated<Date>;
}

export interface ConversationsTable {
  id: Generated<number>;
  customer_id: number | null;
  channel: Generated<string>;
  started_at: Generated<Date>;
  ended_at: Date | null;
}

export interface MessagesTable {
  id: Generated<number>;
  conversation_id: number;
  role: string;
  content: string;
  created_at: Generated<Date>;
}

export interface BookingsTable {
  id: Generated<number>;
  customer_id: number | null;
  service_type: string;
  scheduled_at: Date;
  location: string | null;
  status: Generated<string>;
  notes: string | null;
  calcom_booking_id: string | null;
  created_at: Generated<Date>;
}

export interface QuotesTable {
  id: Generated<number>;
  customer_id: number | null;
  booking_id: number | null;
  stripe_quote_id: string | null;
  items: unknown;
  total_amount: number;
  status: Generated<string>;
  expires_at: Date | null;
  created_at: Generated<Date>;
}

export interface InvoicesTable {
  id: Generated<number>;
  customer_id: number | null;
  booking_id: number | null;
  quote_id: number | null;
  stripe_invoice_id: string | null;
  items: unknown;
  total_amount: number;
  status: Generated<string>;
  paid_at: Date | null;
  created_at: Generated<Date>;
}

// Database interface
export interface Database {
  services: ServicesTable;
  customers: CustomersTable;
  conversations: ConversationsTable;
  messages: MessagesTable;
  bookings: BookingsTable;
  quotes: QuotesTable;
  invoices: InvoicesTable;
}

// Type helpers
export type Service = Selectable<ServicesTable>;
export type NewService = Insertable<ServicesTable>;
export type ServiceUpdate = Updateable<ServicesTable>;

export type Customer = Selectable<CustomersTable>;
export type NewCustomer = Insertable<CustomersTable>;

export type Conversation = Selectable<ConversationsTable>;
export type NewConversation = Insertable<ConversationsTable>;

export type Message = Selectable<MessagesTable>;
export type NewMessage = Insertable<MessagesTable>;

export type Booking = Selectable<BookingsTable>;
export type NewBooking = Insertable<BookingsTable>;

export type Quote = Selectable<QuotesTable>;
export type NewQuote = Insertable<QuotesTable>;

export type Invoice = Selectable<InvoicesTable>;
export type NewInvoice = Insertable<InvoicesTable>;
