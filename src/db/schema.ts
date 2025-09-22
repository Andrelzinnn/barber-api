import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
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
});

export const serviceTable = sqliteTable("services", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  price: real("price").notNull(),
});

export const appointmentTable = sqliteTable("appointments", {
  id: text("id").primaryKey(),
  date: text("date").notNull(), // Formato 'YYYY-MM-DD'
  time: text("time").notNull(), // Formato 'HH:MM'
  client_id: text("client_id").notNull(),
  service_id: text("service_id").notNull(),
  status: integer("status").notNull().default(0), // 0=SCHEDULED, 1=COMPLETED, 2=CANCELLED
  notes: text("notes"),
  created_at: text("created_at")
    .notNull()
    .default(sql`(datetime('now'))`),
});

// Relacionamentos (opcional para type safety)

export const appointmentRelations = relations(appointmentTable, ({ one }) => ({
  client: one(clientTable, {
    fields: [appointmentTable.client_id],
    references: [clientTable.id],
  }),
  service: one(serviceTable, {
    fields: [appointmentTable.service_id],
    references: [serviceTable.id],
  }),
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
