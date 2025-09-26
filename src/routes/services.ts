import { Elysia } from "elysia";
import {
  validateServiceSchema,
  NewService,
  updateServiceSchema,
} from "@/types/service";
import {
  getAllServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteService,
} from "@/services/service";
import { handleApiError } from "@/types/HandleApiError";

export const servicesRoutes = new Elysia({ prefix: "/api/services" })
  .get("/", async ({ set }) => {
    try {
      const services = await getAllServices();
      return { success: true, data: services };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .get("/:id", async ({ params, set }) => {
    try {
      const service = await getServiceById(params.id);
      if (!service) {
        set.status = 404;
        return { success: false, message: "Service not found" };
      }
      return { success: true, data: service };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .post("/", async ({ body, set }) => {
    try {
      const validatedData = validateServiceSchema.parse(body) as NewService;
      const service = await createService(validatedData);
      set.status = 201;
      return { success: true, data: service };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .put("/:id", async ({ params, body, set }) => {
    try {
      const validatedData = updateServiceSchema.parse(body);
      const service = await updateServiceById(params.id, validatedData);
      if (!service || service.length === 0) {
        set.status = 404;
        return { success: false, message: "Service not found" };
      }
      set.status = 200;
      return { success: true, data: service[0] };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .delete("/:id", async ({ params, set }) => {
    try {
      const deletedService = await deleteService(params.id);
      if (!deletedService || deletedService.length === 0) {
        set.status = 404;
        return { success: false, message: "Service not found" };
      }
      set.status = 200;
      return { success: true, data: deletedService[0] };
    } catch (error) {
      return handleApiError(error, set);
    }
  });
