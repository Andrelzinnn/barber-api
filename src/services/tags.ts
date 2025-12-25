import { db } from "@/db";
import { eq } from "drizzle-orm";
import { randomUUIDv7 } from "bun";
import { tagsTable } from "@/db/schema";
import {
  validateTagSchema,
  createTagInput,
  uuidv7Input,
  UpdateTagSchema,
} from "@/types/Tags";

export function getAllTags() {
  return db.query.tagsTable.findMany({});
}

export async function getTagById(id: uuidv7Input) {
  return db.query.tagsTable.findFirst({
    where: eq(tagsTable.id, id),
  });
}

export async function createTag(data: createTagInput) {
  const validatedData = validateTagSchema.parse(data);
  const tagWithId = {
    ...validatedData,
    id: randomUUIDv7(),
    created_at: new Date().toISOString(),
  };
  return db.insert(tagsTable).values(tagWithId).returning();
}

export async function updateTagById(id: uuidv7Input, data: UpdateTagSchema) {
  return db.update(tagsTable).set(data).where(eq(tagsTable.id, id)).returning();
}

export async function deleteTagById(id: uuidv7Input) {
  return db.delete(tagsTable).where(eq(tagsTable.id, id)).limit(1).returning();
}
