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
import { betterauth } from "@/auth/auth";

export const appointmentRoutes = new Elysia({ prefix: "/api/appointments" })
  .use(betterauth)

  //Rota Pública
  .get("/email/:email", async ({ params, set }) => {
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
  })
  .post("/", async ({ body }) => {
    console.log(body);
    const validatedData = createAppointmentSchema.parse(body);
    const appointment = await createAppointment(validatedData);
    return {
      success: true,
      data: appointment,
    };
  })

  //Rotas Protegidas
  .guard(
    {
      beforeHandle({ user }) {
        if (!user) throw new Error("Unauthorized");
      },
    },
    (app) =>
      app
        .get("/", async () => {
          const appointment = await getAllAppointments();
          return {
            success: true,
            data: appointment,
          };
        })

        .get("/:id", async ({ params }) => {
          const appointment = await getAppointmentById(params.id);
          return {
            success: true,
            data: appointment,
          };
        })

        .get("/date/:date", async ({ params }) => {
          const date = params.date;
          const appointment = await getAppointmentsByDate(date);
          return {
            success: true,
            data: appointment,
          };
        })

        .put("/:id", async ({ body, params }) => {
          const validateData = updateAppointmentSchema.parse(body);
          const id = params.id;
          const appointment = await updateAppointmentById(id, validateData);
          return {
            success: true,
            data: appointment,
          };
        })

        .post("/:id/cancel", async ({ params }) => {
          const id = params.id;
          const status = appointmentStatusSchema.parse(2);
          const appointment = await updateAppointmentStatus(id, status);
          return {
            success: true,
            data: appointment,
          };
        })

        .post("/:id/complete", async ({ params }) => {
          const id = appointmentIdSchema.parse(params.id);
          const status = appointmentStatusSchema.parse(1);
          const appointment = await updateAppointmentStatus(id, status);
          return {
            success: true,
            data: appointment,
          };
        })

        .delete("/:id", async ({ params }) => {
          const deletedAppointment = await deleteAppointment(params.id);
          return {
            success: true,
            data: deletedAppointment,
          };
        })
  );
