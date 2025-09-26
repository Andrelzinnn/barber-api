import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clientTable } from "@/db/schema";
import { NewClient, UpdateClient } from "@/types/Client";
import { randomUUIDv7 } from "bun";

export async function getAllClients() {
  const result = await db.query.clientTable.findMany();
  return result;
}

export async function getClientById(id: string) {
  const result = await db.query.clientTable.findFirst({
    where: eq(clientTable.email, id),
  });
  return result;
}

export async function createClient(data: NewClient) {
  const clientWithId = {
    ...data,
    id: randomUUIDv7(),
  };

  return db.insert(clientTable).values(clientWithId).returning();
}

export async function updateClient(id: string, data: UpdateClient) {
  const updateClient = await db
    .update(clientTable)
    .set(data)
    .where(eq(clientTable.id, id))
    .returning();
  return updateClient;
}

export async function deleteClient(id: string) {
  const client = await db
    .delete(clientTable)
    .where(eq(clientTable.id, id))
    .limit(1)
    .returning();

  return client;
}
