import { appointmentTable } from "@/db/schema";
import { z } from "zod";

export type NewAppointment = typeof appointmentTable.$inferInsert;
export type Appointment = typeof appointmentTable.$inferSelect;

export type UpdateAppointment = Partial<
  Omit<NewAppointment, "id" | "created_at">
>;

export const createAppointmentSchema = z.object({
  barbershop_id: z.uuidv7(),
  service_id: z.uuidv7(),
  client_name: z.string().min(1),
  client_email: z.email(),
  client_phone: z.string().min(7).max(15),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  start_time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  //end_time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  status: z.number().int().min(0).max(2).optional().default(0), // 0, 1, 2
  notes: z.string().optional(),
});

export const appointmentIdSchema = z.uuidv7();

export const appointmentStatusSchema = z.number().int().min(0).max(2); // 0, 1, 2

export const updateAppointmentSchema = z
  .object({
    service_id: z.uuidv7().optional(),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    start_time: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    status: z.number().int().min(0).max(2).optional(), // 0, 1, 2
    notes: z.string().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type AppointmentInput = z.infer<typeof createAppointmentSchema>;
export type AppointmentUpdateInput = z.infer<typeof updateAppointmentSchema>;
export type AppointmentId = z.infer<typeof appointmentIdSchema>;
