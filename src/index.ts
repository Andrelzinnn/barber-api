import { Elysia } from "elysia";
import { clientRoutes } from "./routes/clients";
const app = new Elysia({ prefix: "/api" });

app.use(clientRoutes);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
