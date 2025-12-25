import { appointmentTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { randomUUIDv7 } from "bun";
import {
  AppointmentId,
  AppointmentInput,
  AppointmentStatus,
  AppointmentUpdateInput,
  UpdateAppointment,
} from "@/types/Appointments";
import { ServiceId } from "@/types/service";
import { getServiceById } from "./service";

export async function calculateEndTime(
  startTime: string,
  serviceId: ServiceId
) {
  try {
    const service = await getServiceById(serviceId);
    if (!service) {
      throw new Error("Service not found");
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const duration = service.duration; // duration in minutes

    let endHour = startHour + Math.floor((startMinute + duration) / 60);
    let endMinute = (startMinute + duration) % 60;

    if (endHour >= 24) {
      endHour = endHour % 24; // wrap around if over 24 hours
    }

    const formattedEndHour = String(endHour).padStart(2, "0");
    const formattedEndMinute = String(endMinute).padStart(2, "0");

    return `${formattedEndHour}:${formattedEndMinute}`;
  } catch (error) {
    throw new Error("Error fetching service");
  }
}

export async function getAllAppointments() {
  return await db.query.appointmentTable.findMany({
    with: {
      barbershop: true,
      service: true,
    },
  });
}

export async function getAppointmentById(id: AppointmentId) {
  return await db.query.appointmentTable.findFirst({
    where: eq(appointmentTable.id, id),
    with: {
      barbershop: true,
      service: true,
    },
  });
}

export async function getAppointmentsByDate(date: string) {
  return await db.query.appointmentTable.findMany({
    where: eq(appointmentTable.date, date),
    with: {
      barbershop: true,
      service: true,
    },
    orderBy: appointmentTable.start_time,
  });
}

export async function getAppointmentsByBarbeshopId(barbeshopId: string) {
  return await db.query.appointmentTable.findMany({
    where: eq(appointmentTable.barbershop_id, barbeshopId),
    with: { service: true },
  });
}

export async function getAppointmentByTime(time: string) {
  return await db.query.appointmentTable.findFirst({
    where: eq(appointmentTable.start_time, time),
    with: {
      barbershop: true,
      service: true,
    },
  });
}

export async function getAppointmentByClientEmail(email: string) {
  return await db.query.appointmentTable.findMany({
    where: eq(appointmentTable.client_email, email),
    with: {
      barbershop: true,
      service: true,
    },
  });
}

export async function createAppointment(data: AppointmentInput) {
  const end_time = await calculateEndTime(data.start_time, data.service_id);
  const appointmentWithId = {
    ...data,
    id: randomUUIDv7(),
    end_time: end_time,
  };
  return await db
    .insert(appointmentTable)
    .values(appointmentWithId)
    .returning();
}

export async function updateAppointmentById(
  id: AppointmentId,
  data: AppointmentUpdateInput
) {
  return await db
    .update(appointmentTable)
    .set(data)
    .where(eq(appointmentTable.id, id))
    .returning();
}

export async function deleteAppointment(id: AppointmentId) {
  return await db
    .delete(appointmentTable)
    .where(eq(appointmentTable.id, id))
    .returning();
}

export async function updateAppointmentStatus(
  id: AppointmentId,
  status: AppointmentStatus
) {
  const statusAppointment = await getAppointmentById(id);
  if (statusAppointment?.status === status) {
    throw new Error("Appointment already has this status");
  }
  const appointment = await db
    .update(appointmentTable)
    .set({ status: status })
    .where(eq(appointmentTable.id, id))
    .returning();
  return appointment;
}
