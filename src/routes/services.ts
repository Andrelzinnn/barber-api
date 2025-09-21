import { Elysia } from "elysia";
import {
  validateServiceSchema,
  NewService,
  updateServiceSchema,
} from "@/types/service"; // type maiúsculo
import {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteService,
} from "@/services/service";

export const servicesRoutes = new Elysia({ prefix: "/services" })
  .get("/", async () => {
    const services = await getAllServices();
    return {
      success: true,
      data: services,
    };
  })
  .get("/:id", async ({ params, set }) => {
    const service = await getServiceById(params.id);

    if (!service) {
      set.status = 404;
      return { success: false, message: "Service not found" };
    }

    return { success: true, data: service };
  })
  .post("/", async ({ body, set }) => {
    const validatedData = validateServiceSchema.parse(body) as NewService;
    const service = await createService(validatedData);
    set.status = 201;
    return {
      success: true,
      data: service,
    };
  })

  .put("/:id", async ({ params, body, set }) => {
    const validatedData = updateServiceSchema.parse(body);
    const service = await updateServiceById(params.id, validatedData);
    set.status = 200;
    return {
      success: true,
      data: service,
    };
  })

  .delete("/:id", async ({ params, set }) => {
    const deletedService = await deleteService(params.id);
    set.status = 200;
    return {
      success: true,
      data: deletedService,
    };
  });
