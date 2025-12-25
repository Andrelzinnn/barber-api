import { serviceTable } from "@/db/schema";
import { z } from "zod";

export type NewService = typeof serviceTable.$inferInsert;

export const validateServiceSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  duration: z.number().int().positive(),
  active: z.boolean().optional().default(true),
});

export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().positive().optional(),
  duration: z.number().int().positive().optional(),
  active: z.boolean().optional(),
});

export const serviceIdSchema = z.uuidv7();

export type UpdateService = z.infer<typeof updateServiceSchema>;
export type ServiceId = z.infer<typeof serviceIdSchema>;
