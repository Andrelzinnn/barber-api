import { eq } from "drizzle-orm";
import { db } from "@/db";
import { barbershopTable } from "@/db/schema";
import {
  UpdateBarbershop,
  createBarbeshopInput,
  uuuidv7Input,
} from "@/types/Barbershop";
import { randomUUIDv7 } from "bun";

export async function getAllBarbershops() {
  return db.query.barbershopTable.findMany();
}

export async function getBarbershopById(id: uuuidv7Input) {
  return db.query.barbershopTable.findFirst({
    where: eq(barbershopTable.id, id),
  });
}

export async function createBarbershop(data: createBarbeshopInput) {
  const barbeshopWithId = {
    ...data,
    id: randomUUIDv7(),
    created_at: new Date().toISOString(),
  };

  return db.insert(barbershopTable).values(barbeshopWithId).returning();
}

export async function updateBarbershop(
  id: uuuidv7Input,
  data: UpdateBarbershop
) {
  const updatedBarbeshop = await db
    .update(barbershopTable)
    .set(data)
    .where(eq(barbershopTable.id, id))
    .returning();
  return updatedBarbeshop;
}

export async function deleteBarbershop(id: uuuidv7Input) {
  const barbeshop = await db
    .delete(barbershopTable)
    .where(eq(barbershopTable.id, id))
    .limit(1)
    .returning();

  return barbeshop;
}
