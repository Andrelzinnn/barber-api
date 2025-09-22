import { appointmentTable } from "@/db/schema";
import { z } from "zod";

export type NewAppointment = typeof appointmentTable.$inferInsert;
export type Appointment = typeof appointmentTable.$inferSelect;
export type UpdateAppointment = Partial<
  Omit<NewAppointment, "id" | "created_at">
>;

export const createAppointmentSchema = z.object({
  client_id: z.uuidv7(),
  service_id: z.uuidv7(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  notes: z.string().optional(),
});

export const updateAppointmentSchema = z
  .object({
    client_id: z.uuidv7().optional(),
    service_id: z.uuidv7().optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    status: z.number().int().min(0).max(2).optional(), // 0, 1, 2
    notes: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });
