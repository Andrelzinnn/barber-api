import { eq } from "drizzle-orm";
import { db } from "@/db";
import { clientTable } from "@/db/schema";
import { newClient } from "@/types/Client";
import { randomUUIDv7 } from "bun";

export async function getAllClients() {
  const result = await db.query.clientTable.findMany();
  return result;
}

export async function getClientByEmail(email: string) {
  const result = await db.query.clientTable.findFirst({
    where: eq(clientTable.email, email),
  });
  return result;
}

export async function createClient(data: newClient) {
  const clientWithId = {
    ...data,
    id: randomUUIDv7(), // ← Gera UUID automaticamente
  };

  return db.insert(clientTable).values(clientWithId).returning();
}
