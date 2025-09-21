import { Elysia } from "elysia";
import { success, z } from "zod";
import {
  createClient,
  getAllClients,
  getClientByEmail,
} from "@/services/client";
import { newClient } from "@/types/Client";

const createClientSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email().optional(),
});

export const clientRoutes = new Elysia({ prefix: "/clients" })
  .get("/", async () => {
    const clients = await getAllClients();
    return {
      messsage: clients,
    };
  })
  .get("/:email", async ({ params }) => {
    const email = params.email;
    const client = await getClientByEmail(email);
    return {
      message: client,
    };
  })
  .post("/", async ({ body, set }) => {
    const validateData = createClientSchema.parse(body) as newClient;
    const client = await createClient(validateData);
    set.status = 201;
    return {
      success: true,
      data: client,
    };
  });
