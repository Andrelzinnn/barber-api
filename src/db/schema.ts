import {
  sqliteTable,
  text,
  integer,
  real,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
export * from "./auth-schema";
import { relations } from "drizzle-orm";

export const clientTable = sqliteTable("clients", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull().unique(),
  email: text("email").unique(),
  created_at: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
  role: text("role"),
});

export const serviceTable = sqliteTable("services", {
  id: text("id").primaryKey(), // UUID do serviço (UUIDV7)
  name: text("name").notNull(), // nome do serviço
  price: real("price").notNull(), // preço em moeda local
  duration: integer("duration").notNull().default(30), // duração em minutos
  active: integer("active", { mode: "boolean" }).notNull().default(true), // serviço ativo/inativo
  created_at: text("created_at").notNull(),
});

export const tagsTable = sqliteTable("tags", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  created_at: text("created_at").notNull(),
});

export const serviceTagsTable = sqliteTable(
  "service_tags",
  {
    service_id: text("service_id")
      .notNull()
      .references(() => serviceTable.id, { onDelete: "cascade" }),

    tag_id: text("tag_id")
      .notNull()
      .references(() => tagsTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.service_id, table.tag_id] }),
  })
);

export const barbershopTable = sqliteTable("barbershops", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  ownerEmail: text("owner_email").notNull(),
  created_at: text("created_at").notNull(),
});

export const transactionTable = sqliteTable("transactions", {
  id: text("id").primaryKey(),
  appointment_id: text("appointment_id").notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(),
  payment_method: text("payment_method").notNull(),
  created_at: text("created_at").notNull(),
});

export const appointmentTable = sqliteTable("appointments", {
  id: text("id").primaryKey(),
  barbershop_id: text("barbershop_id").notNull(),
  service_id: text("service_id").notNull(),
  client_name: text("client_name").notNull(),
  client_email: text("client_email").notNull(),
  client_phone: text("client_phone").notNull(),
  date: text("date").notNull(), // Formato 'YYYY-MM-DD'
  start_time: text("start_time").notNull(), // Formato 'HH:MM'
  end_time: text("end_time").notNull(), // Formato 'HH:MM'
  status: integer("status").notNull().default(0), // 0=SCHEDULED, 1=COMPLETED, 2=CANCELLED
  notes: text("notes"),
  created_at: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// Relacionamentos (opcional para type safety)

export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  barbershop: one(barbershopTable, {
    fields: [appointmentTable.barbershop_id],
    references: [barbershopTable.id],
  }),
  service: one(serviceTable, {
    fields: [appointmentTable.service_id],
    references: [serviceTable.id],
  }),
}));

export const serviceTagsRelations = relations(serviceTagsTable, ({ one }) => ({
  service: one(serviceTable, {
    fields: [serviceTagsTable.service_id],
    references: [serviceTable.id],
  }),
  tag: one(tagsTable, {
    fields: [serviceTagsTable.tag_id],
    references: [tagsTable.id],
  }),
}));

export const serviceRelations = relations(serviceTable, ({ many }) => ({
  tags: many(serviceTagsTable),
}));

export const tagRelations = relations(tagsTable, ({ many }) => ({
  services: many(serviceTagsTable),
}));

// Tipos TypeScript derivados
export type Client = typeof clientTable.$inferSelect;
export type NewClient = typeof clientTable.$inferInsert;
export type Service = typeof serviceTable.$inferSelect;
export type NewService = typeof serviceTable.$inferInsert;
export type Appointment = typeof appointmentTable.$inferSelect;
export type NewAppointment = typeof appointmentTable.$inferInsert;

// Enum para status (para usar no código)
export const AppointmentStatus = {
  SCHEDULED: 0,
  COMPLETED: 1,
  CANCELLED: 2,
} as const;
