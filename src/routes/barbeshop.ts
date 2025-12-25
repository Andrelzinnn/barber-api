import { Elysia } from "elysia";
import {
  createBarbershop,
  deleteBarbershop,
  getAllBarbershops,
  getBarbershopById,
  updateBarbershop,
} from "@/services/barbershop";
import {
  updateBarbershopSchema,
  uuidv7Schema,
  validateBarbershopSchema,
} from "@/types/Barbershop";
import { handleApiError } from "@/types/HandleApiError";

export const barbershopRoutes = new Elysia({ prefix: "/api/barbershops" })
  .get(
    "/",
    async ({ set }) => {
      try {
        const barbershops = await getAllBarbershops();
        return {
          success: true,
          data: barbershops,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Search all barbershops in database",
        tags: ["barbershops"],
      },
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const id = params.id;
        const barbershop = await getBarbershopById(id);
        if (!barbershop) {
          set.status = 404;
          return { success: false, message: "Barbershop not found" };
        }
        return {
          success: true,
          data: barbershop,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Get a barbershop by ID",
        tags: ["barbershops"],
      },
    }
  )
  .post("/", async ({ body, set }) => {
    try {
      const data = validateBarbershopSchema.parse(body);
      const newBarbershop = await createBarbershop(data);
      return {
        success: true,
        data: newBarbershop,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .put(
    "/:id",
    async ({ params, body, set }) => {
      try {
        const id = uuidv7Schema.parse(params.id);
        const data = updateBarbershopSchema.parse(body);
        const updatedBarbershop = await updateBarbershop(id, data);
        return {
          success: true,
          data: updatedBarbershop,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Update a barbershop by ID",
        tags: ["barbershops"],
      },
    }
  )
  .delete(
    "/:id",
    async ({ params, set }) => {
      try {
        const id = uuidv7Schema.parse(params.id);
        const deletedBarbershop = await deleteBarbershop(id);
        return {
          success: true,
          data: deletedBarbershop,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Delete a barbershop by ID",
        tags: ["barbershops"],
      },
    }
  );
