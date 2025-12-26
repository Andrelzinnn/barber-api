import { clientTable } from "@/db/schema";
import { z } from "zod";

export type NewClient = typeof clientTable.$inferInsert;
export type UpdateClient = Partial<Omit<NewClient, "id" | "created_at">>;

export const createClientSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(9),
  email: z.email(),
  role: z.enum(["client", "admin"]).optional(),
});

export const clientIdSchema = z.uuidv7();
export const clientEmailSchema = z.email();

export const updateClientSchema = z
  .object({
    name: z.string().min(1).optional(),
    phone: z.string().min(9).optional(),
    email: z.email().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type ClientId = z.infer<typeof clientIdSchema>;
export type ClientEmail = z.infer<typeof clientEmailSchema>;
