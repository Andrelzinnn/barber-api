import { Elysia } from "elysia";
import {
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentByClientEmail,
  getAppointmentById,
  getAppointmentsByDate,
  updateAppointmentById,
  updateAppointmentStatus,
} from "@/services/appointments";
import {
  appointmentIdSchema,
  createAppointmentSchema,
  updateAppointmentSchema,
  appointmentStatusSchema,
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

  .get("/client/:email", async ({ params, set }) => {
    try {
      const appointment = await getAppointmentByClientEmail(params.email);
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

  .get("/date/:date", async ({ params, set }) => {
    try {
      const date = params.date;
      const appointment = await getAppointmentsByDate(date);
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
      const validatedData = createAppointmentSchema.parse(body);
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
      const appointment = await updateAppointmentById(id, validateData);
      set.status = 201;
      return {
        success: true,
        data: appointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .get("/:id/cancel", async ({ params, set }) => {
    try {
      const id = params.id;
      const status = appointmentStatusSchema.parse(2);
      const appointment = await updateAppointmentStatus(id, status);
      set.status = 201;
      return {
        success: true,
        data: appointment,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .get("/:id/complete", async ({ params, set }) => {
    try {
      const id = appointmentIdSchema.parse(params.id);
      const status = appointmentStatusSchema.parse(1);
      const appointment = await updateAppointmentStatus(id, status);
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
