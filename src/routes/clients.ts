import { Elysia } from "elysia";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  getClientByEmail,
  updateClient,
} from "@/services/client";
import {
  clientEmailSchema,
  clientIdSchema,
  updateClientSchema,
} from "@/types/Client";
import { createClientSchema } from "@/types/Client";
import { betterauth } from "@/auth/auth";

export const clientRoutes = new Elysia({ prefix: "/api/clients" })
  .use(betterauth)

  //100% Protegidas
  .guard(
    {
      beforeHandle({ user }) {
        if (!user) throw new Error("Unauthorized");
      },
    },
    (app) =>
      app
        .get(
          "/",
          async () => {
            const clients = await getAllClients();
            return {
              success: true,
              data: clients,
            };
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
            const id = clientIdSchema.parse(params.id);
            const client = await getClientById(id);
            if (!client) {
              set.status = 404;
              return { success: false, message: "Client not found" };
            }
            return {
              success: true,
              data: client,
            };
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
            const email = clientEmailSchema.parse(params.email);
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
          },
          {
            detail: {
              summary: "Search client using Email",
              tags: ["users", "email"],
            },
          }
        )
        .post("/", async ({ body, set }) => {
          const validateData = createClientSchema.parse(body);
          const client = await createClient(validateData);
          return {
            success: true,
            data: client,
          };
        })

        .put("/:id", async ({ params, body, set }) => {
          const validatedData = updateClientSchema.parse(body);
          const client = await updateClient(params.id, validatedData);
          if (!client || client.length === 0) {
            set.status = 404;
            return { success: false, message: "Client not found" };
          }
          return {
            success: true,
            data: client[0],
          };
        })

        .delete("/:id", async ({ params, set }) => {
          const id = clientIdSchema.parse(params.id);
          const deletedClient = await deleteClient(id);
          if (!deletedClient || deletedClient.length === 0) {
            set.status = 404;
            return { success: false, message: "Client not found" };
          }
          return {
            success: true,
            data: deletedClient[0],
          };
        })
  );
