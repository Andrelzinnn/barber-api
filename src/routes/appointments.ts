import { Elysia } from "elysia";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentByClientId,
  getAppointmentById,
  updateAppointmentStatus,
} from "@/services/appointments";
import {
  createAppointmentSchema,
  NewAppointment,
  updateAppointmentSchema,
} from "@/types/Appointments";
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

  .get("/client/:id", async ({ params, set }) => {
    try {
      const appointment = await getAppointmentByClientId(params.id);
      if (!appointment) {
        set.status = 400;
        return {
          success: false,
          data: "No appointments",
        };
      }
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
      console.log(body);
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

  .put("/:id", async ({ body, set, params }) => {
    try {
      const validateData = updateAppointmentSchema.parse(body);
      const id = params.id;
      const appointment = await updateAppointmentStatus(id, validateData);
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
