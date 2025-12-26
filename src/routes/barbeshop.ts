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
import { betterauth } from "@/auth/auth";

export const barbershopRoutes = new Elysia({ prefix: "/api/barbershops" })
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
          async ({ set }) => {
            const barbershops = await getAllBarbershops();
            return {
              success: true,
              data: barbershops,
            };
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
          },
          {
            detail: {
              summary: "Get a barbershop by ID",
              tags: ["barbershops"],
            },
          }
        )
        .post("/", async ({ body }) => {
          const data = validateBarbershopSchema.parse(body);
          const newBarbershop = await createBarbershop(data);
          return {
            success: true,
            data: newBarbershop,
          };
        })
        .put(
          "/:id",
          async ({ params, body }) => {
            const id = uuidv7Schema.parse(params.id);
            const data = updateBarbershopSchema.parse(body);
            const updatedBarbershop = await updateBarbershop(id, data);
            return {
              success: true,
              data: updatedBarbershop,
            };
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
          async ({ params }) => {
            const id = uuidv7Schema.parse(params.id);
            const deletedBarbershop = await deleteBarbershop(id);
            return {
              success: true,
              data: deletedBarbershop,
            };
          },
          {
            detail: {
              summary: "Delete a barbershop by ID",
              tags: ["barbershops"],
            },
          }
        )
  );
