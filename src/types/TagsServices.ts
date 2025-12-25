import { serviceTagsTable } from "@/db/schema";
import { z } from "zod";

export type NewServiceTag = typeof serviceTagsTable.$inferInsert;
export const validateServiceTagSchema = z.object({
  service_id: z.uuidv7(),
  tag_id: z.uuidv7(),
});

export const serviceTagIdSchema = z.object({
  id: z.uuidv7(),
});

export type UpdateServiceTag = Partial<
  Omit<NewServiceTag, "id" | "created_at">
>;

export const updateServiceTagSchema = z.object({
  service_id: z.uuidv7().optional(),
  tag_id: z.uuidv7().optional(),
});
