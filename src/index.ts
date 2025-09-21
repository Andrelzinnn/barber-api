import { Elysia } from "elysia";
import { clientRoutes } from "./routes/clients";
import { servicesRoutes } from "./routes/services";
const app = new Elysia({ prefix: "/api" });

app.use([clientRoutes, servicesRoutes]);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}/api`
);
