import { Elysia } from "elysia";
import { createPreferenceServiceById } from "@/services/preference";
import { z } from "zod";
import { betterauth } from "@/auth/auth";
export const paymentRoutes = new Elysia({ prefix: "/api/payments" })
  .use(betterauth)
  .guard(
    {
      beforeHandle({ user }) {
        if (!user) throw new Error("Unauthorized");
      },
      body: z.object({
        id: z.uuidv7(),
      }),
    },
    (app) =>
      app.post(
        "/create-preference",
        async ({ body }) => {
          console.log("Creating preference for service ID:", body.id);
          const preference = await createPreferenceServiceById(body.id);
          return {
            success: true,
            data: preference,
          };
        },
        {
          detail: {
            summary: "Create a payment preference",
            tags: ["payments", "mercadopago"],
          },
        }
      )
  );
