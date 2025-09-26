import { eq } from "drizzle-orm";
import { db } from "@/db";
import { serviceTable } from "@/db/schema";
import { randomUUIDv7 } from "bun";
import { NewService, UpdateService } from "@/types/service";

export async function getAllServices() {
  const services = await db.query.serviceTable.findMany({});
  return services;
}

export async function getServiceById(uuid: string) {
  const service = await db.query.serviceTable.findFirst({
    where: eq(serviceTable.id, uuid),
  });
  return service;
}

export async function createService(data: NewService) {
  const serviceWithId = {
    ...data,
    id: randomUUIDv7(),
  };
  return db.insert(serviceTable).values(serviceWithId).returning();
}

export async function updateServiceById(id: string, data: UpdateService) {
  const service = await db
    .update(serviceTable)
    .set(data)
    .where(eq(serviceTable.id, id))
    .returning();

  return service;
}

export async function deleteService(id: string) {
  const deletedService = await db
    .delete(serviceTable)
    .where(eq(serviceTable.id, id))
    .limit(1)
    .returning();

  return deletedService;
}
