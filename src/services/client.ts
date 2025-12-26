import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clientTable } from "@/db/schema";
import {
  ClientEmail,
  ClientId,
  CreateClientInput,
  UpdateClientInput,
} from "@/types/Client";
import { randomUUIDv7 } from "bun";

export async function getAllClients() {
  const result = await db.query.clientTable.findMany();
  return result;
}

export async function getClientByEmail(email: ClientEmail) {
  const result = await db.query.clientTable.findFirst({
    where: eq(clientTable.email, email),
  });
  return result;
}

export async function getClientById(id: ClientId) {
  const result = await db.query.clientTable.findFirst({
    where: eq(clientTable.email, id),
  });
  return result;
}

export async function createClient(data: CreateClientInput) {
  const clientWithId = {
    ...data,
    id: randomUUIDv7(),
  };

  return db.insert(clientTable).values(clientWithId).returning();
}

export async function updateClient(id: ClientId, data: UpdateClientInput) {
  const updateClient = await db
    .update(clientTable)
    .set(data)
    .where(eq(clientTable.id, id))
    .returning();
  return updateClient;
}

export async function deleteClient(id: ClientId) {
  const client = await db
    .delete(clientTable)
    .where(eq(clientTable.id, id))
    .limit(1)
    .returning();

  return client;
}
