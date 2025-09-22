import { appointmentTable, AppointmentStatus } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { uuidv7 } from "zod";
import {
  NewAppointment,
  createAppointmentSchema,
  Appointment,
  UpdateAppointment,
  updateAppointmentSchema,
} from "@/types/Appointments";

export async function getAllAppointments() {}
