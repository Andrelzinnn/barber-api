import { Elysia } from "elysia";
import { z } from "zod";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  updateClient,
} from "@/services/client";
import { NewClient, updateClientSchema } from "@/types/Client";
import { handleApiError } from "@/types/HandleApiError";

const createClientSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.email().optional(),
});

export const clientRoutes = new Elysia({ prefix: "/api/clients" })
  .get(
    "/",
    async ({ set }) => {
      try {
        const clients = await getAllClients();
        return {
          success: true,
          data: clients,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Search all users in database",
        tags: ["users"],
      },
    }
  )
  .get(
    "/:id",
    async ({ params, set }) => {
      try {
        const id = params.id;
        const client = await getClientById(id);
        if (!client) {
          set.status = 404;
          return { success: false, message: "Client not found" };
        }
        return {
          success: true,
          data: client,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "search using ID",
        tags: ["users"],
      },
    }
  )
  .get(
    "/email/:email",
    async ({ params, set }) => {
      try {
        const email = params.email;
        const client = await getClientByEmail(email);
        if (!client) {
          set.status = 404;
          return {
            success: false,
            message: "Client not Found",
          };
        }
        return {
          success: true,
          data: client,
        };
      } catch (error) {
        return handleApiError(error, set);
      }
    },
    {
      detail: {
        summary: "Search client using Email",
        tags: ["users", "email"],
      },
    }
  )
  .post("/", async ({ body, set }) => {
    try {
      const validateData = createClientSchema.parse(body) as NewClient;
      const client = await createClient(validateData);
      set.status = 201;
      return {
        success: true,
        data: client,
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .put("/:id", async ({ params, body, set }) => {
    try {
      const validatedData = updateClientSchema.parse(body);
      const client = await updateClient(params.id, validatedData);
      if (!client || client.length === 0) {
        set.status = 404;
        return { success: false, message: "Client not found" };
      }
      set.status = 200;
      return {
        success: true,
        data: client[0],
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .delete("/:id", async ({ params, set }) => {
    try {
      const deletedClient = await deleteClient(params.id);
      if (!deletedClient || deletedClient.length === 0) {
        set.status = 404;
        return { success: false, message: "Client not found" };
      }
      set.status = 200;
      return {
        success: true,
        data: deletedClient[0],
      };
    } catch (error) {
      return handleApiError(error, set);
    }
  });
