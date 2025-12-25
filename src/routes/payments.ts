import { Elysia } from "elysia";
import { createPreferenceServiceById } from "@/services/preference";
import { z } from "zod";
export const paymentRoutes = new Elysia({ prefix: "/api/payments" })
  .guard({
    body: z.object({
      id: z.uuidv7(),
    }),
  })
  .post(
    "/create-preference",
    async ({ body, set }) => {
      try {
        console.log("Creating preference for service ID:", body.id);
        const preference = await createPreferenceServiceById(body.id);
        return {
          success: true,
          data: preference,
        };
      } catch (error) {
        set.status = 400;
        return {
          success: false,
          message: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
    {
      detail: {
        summary: "Create a payment preference",
        tags: ["payments", "mercadopago"],
      },
    }
  );
