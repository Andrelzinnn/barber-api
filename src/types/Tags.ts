import { tagsTable } from "@/db/schema";
import { z } from "zod";

export type NewTag = typeof tagsTable.$inferInsert;
export const validateTagSchema = z.object({
  name: z.string().min(1),
});

export const tagIdSchema = z.uuidv7();

export type uuidv7Input = z.infer<typeof tagIdSchema>;
export type UpdateTagSchema = Partial<Omit<NewTag, "id" | "created_at">>;
export type createTagInput = z.infer<typeof validateTagSchema>;

export const updateTagSchema = z.object({
  name: z.string().min(1).optional(),
});
