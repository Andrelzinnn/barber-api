import { Elysia } from "elysia";
import {
  createServiceSchema,
  NewService,
  updateServiceSchema,
  serviceIdSchema,
} from "@/types/service";
import {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteService,
  updateActiveServiceStats,
} from "@/services/service";

import { betterauth } from "@/auth/auth";

export const servicesRoutes = new Elysia({ prefix: "/api/services" })
  .use(betterauth)

  //Rotas Públicas
  .get("/", async () => {
    const services = await getAllServices();
    return { success: true, data: services };
  })

  .get("/:id", async ({ params, set }) => {
    const service = await getServiceById(params.id);
    if (!service) {
      set.status = 404;
      return { success: false, message: "Service not found" };
    }
    return { success: true, data: service };
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

        .post("/", async ({ body }) => {
          const validatedData = createServiceSchema.parse(body);
          const service = await createService(validatedData);
          return { success: true, data: service };
        })

        .put("/:id", async ({ params, body, set }) => {
          const validatedData = updateServiceSchema.parse(body);
          const service = await updateServiceById(params.id, validatedData);
          if (!service || service.length === 0) {
            set.status = 404;
            return { success: false, message: "Service not found" };
          }
          return { success: true, data: service };
        })

        .get("/active-stats/:id", async ({ params }) => {
          const id = serviceIdSchema.parse(params.id);
          const resp = await updateActiveServiceStats(id);
          return { success: true, message: resp };
        })

        .delete("/:id", async ({ params, set }) => {
          const id = serviceIdSchema.parse(params.id);
          const deletedService = await deleteService(id);
          if (!deletedService || deletedService.length === 0) {
            set.status = 404;
            return { success: false, message: "Service not found" };
          }
          return { success: true, data: deletedService };
        })
  );
