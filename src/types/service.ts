import { serviceTable } from "@/db/schema";
import { z } from "zod";

export type NewService = typeof serviceTable.$inferInsert;
export const validateServiceSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

export type UpdateService = Partial<Omit<NewService, "id" | "created_at">>;
export const updateServiceSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.number().positive().positive(),
});
