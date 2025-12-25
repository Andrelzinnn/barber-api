import { barbershopTable } from "@/db/schema";
import { z } from "zod";

export type NewBarbershop = typeof barbershopTable.$inferInsert;

export const validateBarbershopSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(9),
  ownerEmail: z.email(),
});
export const uuidv7Schema = z.uuidv7();

export type uuuidv7Input = z.infer<typeof uuidv7Schema>;
export type createBarbeshopInput = z.infer<typeof validateBarbershopSchema>;

export type UpdateBarbershop = Partial<
  Omit<NewBarbershop, "id" | "created_at">
>;
export const updateBarbershopSchema = z
  .object({
    name: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    phone: z.string().min(9).optional(),
    ownerEmail: z.email().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    error: "At least one field must be provided",
  });
