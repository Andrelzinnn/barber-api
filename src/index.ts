import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { clientRoutes } from "@/routes/clients";
import { servicesRoutes } from "@/routes/services";
import { appointmentRoutes } from "@/routes/appointments";
import { tagsServicesRelationsRoutes } from "@/routes/tagsServicesRelations";
import { paymentRoutes } from "@/routes/payments";
import { auth } from "@/auth/auth";
import { openapi } from "@elysiajs/openapi";
import { OpenAPI } from "@/plugins/better-auth";
import { barbershopRoutes } from "@/routes/barbeshop";
import { tagRoutes } from "./routes/tags";

const app = new Elysia();

app.use([
  cors({
    origin: [
      "https://localhost:5173",
      "https://127.0.0.1:5173",
      "https://192.168.100.9:5173",
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.100.9:5173",

      "https://localhost:8080",
      "https://127.0.0.1:8080",
      "https://192.168.100.9:8080",
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://192.168.100.9:8080",
      "https://localhost:8080",
    ],
    credentials: true,
  }),
  clientRoutes,
  servicesRoutes,
  appointmentRoutes,
  tagsServicesRelationsRoutes,
  tagRoutes,
  barbershopRoutes,
  paymentRoutes,
  openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  }),
]);

app.mount(auth.handler);
app.listen({
  port: 3000,
  hostname: "0.0.0.0",
  tls: {
    key: Bun.file("./localhost+3-key.pem"),
    cert: Bun.file("./localhost+3.pem"),
  },
});

console.log(
  `🦊 Elysia is running at https://${app.server?.hostname}:${app.server?.port}`
);
