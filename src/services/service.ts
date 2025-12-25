import { eq } from "drizzle-orm";
import { db } from "@/db";
import { serviceTable } from "@/db/schema";
import { randomUUIDv7 } from "bun";
import { NewService, ServiceId, UpdateService } from "@/types/service";

export async function getAllServices() {
  const services = await db.query.serviceTable.findMany({});
  return services;
}

export async function getServiceById(id: ServiceId) {
  const service = await db.query.serviceTable.findFirst({
    where: eq(serviceTable.id, id),
  });
  return service;
}

export async function createService(data: NewService) {
  const serviceWithId = {
    ...data,
    id: randomUUIDv7(),
    created_at: new Date().toISOString(),
  };
  return db.insert(serviceTable).values(serviceWithId).returning();
}

export async function updateServiceById(id: ServiceId, data: UpdateService) {
  const service = await db
    .update(serviceTable)
    .set(data)
    .where(eq(serviceTable.id, id))
    .returning();

  return service;
}

export async function updateActiveServiceStats(id: ServiceId) {
  const service = await getServiceById(id);
  if (!service) {
    throw new Error("Service not found");
  }

  const updatedService = await db
    .update(serviceTable)
    .set({ active: !service.active })
    .where(eq(serviceTable.id, id))
    .returning();

  return updatedService;
}

export async function deleteService(id: ServiceId) {
  const deletedService = await db
    .delete(serviceTable)
    .where(eq(serviceTable.id, id))
    .limit(1)
    .returning();

  return deletedService;
}
