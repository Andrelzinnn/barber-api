import { Elysia } from "elysia";
import { db } from "@/db";
import { clientTable } from "@/db/schema";

export const clientRoutes = new Elysia({ prefix: "/clients" })
  .get("/", async () => {
    // listar todos
  })
  .get("/:id", async ({ params }) => {
    // buscar por ID
  })
  .post("/", async ({ body }) => {
    // criar novo
  });
