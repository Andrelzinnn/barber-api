import { clientTable } from "@/db/schema";
import { z } from "zod";

export type NewClient = typeof clientTable.$inferInsert;
export type UpdateClient = Partial<Omit<NewClient, "id" | "created_at">>;
export const updateClientSchema = z
  .object({
    name: z.string().min(1).optional(),
    phone: z.string().min(9).optional(),
    email: z.email().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });
