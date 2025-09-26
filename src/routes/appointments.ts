import { Elysia } from "elysia";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
} from "@/services/appointments";
import { createAppointmentSchema, NewAppointment } from "@/types/Appointments";
import { handleApiError } from "@/types/HandleApiError";

export const appointmentRoutes = new Elysia({ prefix: "/api/appointments" })
  .get("/", async ({ set }) => {
    try {
      const appointment = await getAllAppointments();
      set.status = 200;
      return {
        success: true,
        data: appointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .get("/:id", async ({ params, set }) => {
    try {
      const appointment = await getAppointmentById(params.id);
      set.status = 200;
      return {
        success: true,
        data: appointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .post("/", async ({ body, set }) => {
    try {
      const validatedData = createAppointmentSchema.parse(
        body
      ) as NewAppointment;
      const appointment = await createAppointment(validatedData);
      set.status = 201;
      return {
        success: true,
        data: appointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .delete("/:id", async ({ params, set }) => {
    try {
      const deletedAppointment = await deleteAppointment(params.id);
      set.status = 201;
      return {
        success: true,
        data: deletedAppointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  });
