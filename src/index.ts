import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { clientRoutes } from "./routes/clients";
import { servicesRoutes } from "./routes/services";
import { appointmentRoutes } from "./routes/appointments";
import { auth } from "@/auth/auth";
import { openapi } from "@elysiajs/openapi";
import { OpenAPI } from "@/plugins/better-auth";

const app = new Elysia();

app.use([
  clientRoutes,
  servicesRoutes,
  appointmentRoutes,
  openapi({
    documentation: {
      components: await OpenAPI.components,
      paths: await OpenAPI.getPaths(),
    },
  }),
  cors({
    origin: ["https://localhost:5173", "https://192.168.100.9:5173"],
    credentials: true,
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
