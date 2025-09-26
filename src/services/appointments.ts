import { appointmentTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { randomUUIDv7 } from "bun";
import { NewAppointment, UpdateAppointment } from "@/types/Appointments";

export async function getAllAppointments() {
  return await db.query.appointmentTable.findMany({
    with: {
      client: true,
      service: true,
    },
  });
}

export async function getAppointmentById(id: string) {
  return await db.query.appointmentTable.findFirst({
    where: eq(appointmentTable.id, id),
    with: {
      client: true,
      service: true,
    },
  });
}

export async function getAppointmentsByDate(date: string) {
  return await db.query.appointmentTable.findMany({
    where: eq(appointmentTable.date, date),
    with: {
      client: true,
      service: true,
    },
    orderBy: appointmentTable.time,
  });
}

export async function getAppointmentsByClient(clientId: string) {
  return await db.query.appointmentTable.findMany({
    where: eq(appointmentTable.client_id, clientId),
    with: { service: true },
  });
}

export async function getAppointmentByTime(time: string) {
  return await db.query.appointmentTable.findFirst({
    where: eq(appointmentTable.time, time),
    with: {
      client: true,
      service: true,
    },
  });
}

export async function createAppointment(data: NewAppointment) {
  const appointmentWithId = {
    ...data,
    id: randomUUIDv7(),
  };
  return await db
    .insert(appointmentTable)
    .values(appointmentWithId)
    .returning();
}

export async function updateAppointmentById(
  id: string,
  data: UpdateAppointment
) {
  return await db
    .update(appointmentTable)
    .set(data)
    .where(eq(appointmentTable.id, id))
    .returning();
}

export async function deleteAppointment(id: string) {
  return await db
    .delete(appointmentTable)
    .where(eq(appointmentTable.id, id))
    .returning();
}
