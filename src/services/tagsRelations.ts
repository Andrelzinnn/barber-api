import { eq } from "drizzle-orm";
import { db } from "@/db";
import { serviceTagsTable } from "@/db/schema";
import { randomUUIDv7 } from "bun";

export async function getAllServiceTags() {
  return await db.query.serviceTagsTable.findMany({
    with: { service: true, tag: true },
  });
}

export async function getRelationByServiceId(id: string) {
  return db.query.serviceTagsTable.findFirst({
    where: eq(serviceTagsTable.service_id, id),
    with: { service: true, tag: true },
  });
}

export async function getRelationByTagId(id: string) {
  return db.query.serviceTagsTable.findFirst({
    where: eq(serviceTagsTable.tag_id, id),
    with: { service: true, tag: true },
  });
}

export async function createServiceTagRelation(
  serviceId: string,
  tagId: string
) {
  const relation = {
    id: randomUUIDv7(),
    service_id: serviceId,
    tag_id: tagId,
  };

  return db.insert(serviceTagsTable).values(relation).returning();
}

export async function deleteServiceTagRelationByServiceId(serviceId: string) {
  return db
    .delete(serviceTagsTable)
    .where(eq(serviceTagsTable.service_id, serviceId))
    .limit(1)
    .returning();
}

export async function deleteServiceTagRelationByTagId(tagId: string) {
  return db
    .delete(serviceTagsTable)
    .where(eq(serviceTagsTable.tag_id, tagId))
    .limit(1)
    .returning();
}
